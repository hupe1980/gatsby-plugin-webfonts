const defaultFontOptions = {
  fontDisplay: `swap`,
  fontStyle: `normal`,
  fontWeight: 400,
};

const getFontFace = font => {
  const {
    family,
    fontStyle,
    fontDisplay,
    fontWeight,
    urls,
  } = createFontOptions(font);

  const src = Object.entries(urls)
    .map(([format, url]) => `url("${url}") format("${format}")`)
    .join();

  return `
    @font-face {
      font-family: "${family}";
      font-style: ${fontStyle};
      font-display: ${fontDisplay};
      font-weight: ${fontWeight};
      src: ${src};
    }
  `;
};

export default function selfHosted() {
  return fonts => fonts.map(getFontFace);
}

function createFontOptions(options) {
  return {
    ...defaultFontOptions,
    ...options,
  };
}
