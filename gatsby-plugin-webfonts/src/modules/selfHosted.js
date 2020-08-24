import postcss from "postcss";
import postcssJs from "postcss-js";

const defaultFontOptions = {
  fontDisplay: `swap`,
};

const getFontFace = async font => {
  const { family, urls, ...cssProperties } = createFontOptions(font);

  const { css } = await postcss().process(cssProperties, {
    parser: postcssJs,
    from: undefined,
  });

  const src = Object.entries(urls)
    .map(([format, url]) => `url("${url}") format("${format}")`)
    .join();

  return `
    @font-face {
      font-family: "${family}";
      src: ${src};
      ${css}
    }
  `;
};

export default function selfHosted() {
  return fonts => Promise.all(fonts.map(getFontFace));
}

function createFontOptions(options) {
  return {
    ...defaultFontOptions,
    ...options,
  };
}
