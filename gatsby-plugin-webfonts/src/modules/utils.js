import path from "path";
import fs from "fs-extra";
import axios from "axios";
import postcss from "postcss";
import postcssJs from "postcss-js";

function fontFaceReducer(fontDisplay = `swap`, useMerge) {
  return (acc, obj) => {
    if (useMerge) {
      const { fontFamily, fontStyle, fontWeight } = obj;
      const srcs = obj.src.split(`,`);

      const index = acc.findIndex((element) => {
        return (
          element.fontFamily === fontFamily &&
          element.fontWeight === fontWeight &&
          element.fontStyle === fontStyle
        );
      });

      if (index > -1) {
        // we don't know how many 'local'-names the font might have, so we
        // just use the last entry, which should be the 'url' entry of the
        // requested type.
        acc[index].src = `${acc[index].src}, ${srcs[srcs.length - 1]}`;
        return acc;
      }
    }

    obj.fontDisplay = fontDisplay;
    acc.push(obj);

    return acc;
  };
}

export async function parseCss(cssString, { fontDisplay = `swap`, useMerge }) {
  const root = postcss.parse(cssString);
  const cssObject = postcssJs.objectify(root);

  if (cssObject[`@font-face`]) {
    const reducer = fontFaceReducer(fontDisplay, useMerge);
    cssObject[`@font-face`] = Array.isArray(cssObject[`@font-face`])
      ? cssObject[`@font-face`].reduce(reducer, [])
      : reducer([], cssObject[`@font-face`]);
  }

  const { css } = await postcss().process(cssObject, {
    parser: postcssJs,
    from: undefined,
  });

  return css;
}

export async function downloadCss(url, userAgent, headers = {}) {
  const response = await axios.get(url, {
    headers: {
      accept: `text/css,*/*;q=0.1`,
      "User-Agent": userAgent,
      ...headers,
    },
  });

  return response.data;
}

export async function downloadFont(url, headers = {}) {
  const response = await axios.get(url, {
    responseType: `arraybuffer`,
    headers,
  });

  return response.data;
}

export async function downloadFonts(css, downloadFolder, pathPrefix) {
  const regex = /url\((.+?)\)/gi;
  const fontUrls = css
    .match(regex)
    .map((urlString) => urlString.replace(regex, `$1`));

  const fontSrcs = await Promise.all(
    fontUrls.map(async (fontUrl) => {
      const { pathname } = new URL(fontUrl);
      const filePath = path.join(downloadFolder, pathname);

      const font = await downloadFont(fontUrl);

      await fs.outputFile(filePath, font);

      return `${pathPrefix || ``}/static/webfonts${pathname}`;
    }),
  );

  fontSrcs.forEach((src, index) => (css = css.replace(fontUrls[index], src)));

  return css;
}

export async function encodeFonts(css) {
  const regex = /url\((.+?)\)/gi;
  const fontUrls = css
    .match(regex)
    .map((urlString) => urlString.replace(regex, `$1`));

  const fontsEncoded = await Promise.all(
    fontUrls.map(async (fontUrl) => {
      const font = await downloadFont(fontUrl);
      const format = path.extname(fontUrl).substring(1);
      return `"data:application/x-font-${format};base64,${Buffer.from(
        font,
        `binary`,
      ).toString(`base64`)}"`;
    }),
  );

  fontsEncoded.forEach(
    (font, index) => (css = css.replace(fontUrls[index], font)),
  );

  return css;
}
