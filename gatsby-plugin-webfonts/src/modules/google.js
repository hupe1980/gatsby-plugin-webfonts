import { downloadCss, downloadFonts, parseCss, encodeFonts } from "./utils";

const API_URL = `https://fonts.googleapis.com/css`;

const defaultFontOptions = {
  fontDisplay: `swap`,
  strategy: `selfHosted`, //'base64' || 'cdn'
};

export default function google(
  { cacheFolder, pathPrefix, formats, formatAgents },
  version,
) {
  return (fonts) =>
    Promise.all(
      fonts.map(async (font) => {
        const { fontDisplay, strategy } = createFontOptions(font);

        const requestUrl = createRequestUrl(font, version);

        const cssStrings = await Promise.all(
          formats.map(async (format) => {
            const css = await downloadCss(requestUrl, formatAgents[format]);

            if (strategy === `cdn`) return css;

            return strategy === `selfHosted`
              ? downloadFonts(css, cacheFolder, pathPrefix)
              : encodeFonts(css);
          }),
        );

        return parseCss(cssStrings.join(``), {
          fontDisplay,
          useMerge: strategy !== `base64`,
        });
      }),
    );
}

export function isGooglePreconnectEnabled(options) {
  const { usePreconnect } = options;
  const fonts = options.fonts.google;

  if (!usePreconnect) return false;

  if (!fonts || fonts.length === 0) return false;

  return (
    fonts.findIndex((font) => {
      const { strategy } = createFontOptions(font);
      return strategy === `cdn`;
    }) > -1
  );
}

export function createRequestUrl(font, version) {
  if (!font.family) return null;

  let requestUrl = API_URL;

  if (version === 2) {
    requestUrl += `2`;
  }

  requestUrl += `?family=${font.family.replace(/ /g, `+`)}`;

  switch (version) {
    case 1:
      if (font.variants) {
        requestUrl += `:${font.variants.join(`,`)}`;
      }
      break;
    case 2:
      if (font.axes) {
        requestUrl += `:${font.axes}`;
      }
      break;
    default:
      return null;
  }

  if (font.subsets) {
    requestUrl += `&subset=${font.subsets.join(`,`)}`;
  }

  if (font.text && font.text.length > 0) {
    requestUrl += `&text=${encodeURIComponent(font.text)}`;
  }

  if (font.fontDisplay) {
    requestUrl += `&display=${encodeURIComponent(font.fontDisplay)}`;
  }

  return requestUrl;
}

function createFontOptions(options) {
  return {
    ...defaultFontOptions,
    ...options,
  };
}
