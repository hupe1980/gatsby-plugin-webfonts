import postcss from "postcss";
import postcssJs from "postcss-js";
import path from "path";
import { constants, copyFileSync, existsSync, mkdirSync } from "fs";

const defaultFontOptions = {
  fontDisplay: `swap`,
};

export default function selfHosted(
  { cacheFolder, directory, pathPrefix = `` },
  reporter,
) {
  const getFontFace = async (font) => {
    const { family, urls, ...cssProperties } = createFontOptions(font);

    const src = Object.entries(urls)
      .map(([format, url]) => {
        const sourcePath = path.join(directory, url);
        if (!existsSync(sourcePath)) {
          reporter.panicOnBuild(
            `Specified selfHosted font file missing: "${sourcePath}"`,
          );
          return ``;
        }

        const fileName = path.basename(url);
        const cssDir = path.join(
          pathPrefix ? pathPrefix : `/`,
          `static`,
          `webfonts`,
        );

        if (!existsSync(cacheFolder)) {
          mkdirSync(cacheFolder, { recursive: true }, reporter.error);
        }

        const outputPath = path.join(cacheFolder, fileName);

        copyFileSync(
          sourcePath,
          outputPath,
          constants.COPYFILE_FICLONE,
          reporter.error,
        );

        return `url("${cssDir}/${fileName}") format("${format}")`;
      })
      .join(`, `);

    const { css } = await postcss().process(cssProperties, {
      parser: postcssJs,
      from: undefined,
    });

    return `
      @font-face {
        font-family: "${family}";
        src: ${src};
        ${css}
      }
    `;
  };

  return (fonts) => Promise.all(fonts.map(getFontFace));
}

function createFontOptions(options) {
  return {
    ...defaultFontOptions,
    ...options,
  };
}
