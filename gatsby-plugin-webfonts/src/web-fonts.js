import path from "path";
import fs from "fs-extra";
import postcss from "postcss";
import cssnano from "cssnano";

import google from "./modules/google";
import selfHosted from "./modules/selfHosted";

export default async function webFonts(options, reporter) {
  const modules = {
    google: google(options, 1),
    google2: google(options, 2),
    selfHosted: selfHosted(options, reporter),
  };

  const merge = async (css) => {
    const plugins = options.useMinify
      ? [
          cssnano({
            preset: `default`,
          }),
        ]
      : [];

    const { css: minifiedCss } = await postcss(plugins).process(css, {
      from: undefined,
    });

    return minifiedCss;
  };

  const cssStrings = await Promise.all(
    Object.keys(options.fonts).map((key) => {
      return modules[key](options.fonts[key]);
    }),
  );

  const css = await merge(cssStrings.flat().join(``));
  const filePath = path.join(options.cacheFolder, `webfonts.css`);
  await fs.outputFile(filePath, css);
}
