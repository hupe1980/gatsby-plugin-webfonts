# gatsby-plugin-webfonts

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin to handle cdn, base64 and self hosted webfonts

- Creates minified @font-face CSS rules
- Supports font-display property (Default: 'swap')
- Handles preconnect and preload optimizations
- Automatically downloads fonts for self hosting
- Supports cdn, base64 and self hosted Fonts (Default: 'selfHosted')
- Supports header user-agent for specific font type

## Install

```sh
// with npm
npm install gatsby-plugin-webfonts

// with yarn
yarn add gatsby-plugin-webfonts
```

## How to use

Edit `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto", // 'font-family' property
              variants: ["300", "400", "500"],
              //subsets: ['latin'],
              //text: 'Hello',
              //fontDisplay: 'swap' || 'auto' || 'block' || 'fallback' || 'optional',
              //strategy: 'selfHosted' || 'base64' || 'cdn',
              // Other properties as per https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face (except 'src' & 'font-family') can go here i.e.
              //[cssProperty]: 'value',
            },
          ],
          selfHosted: [
            {
              family: "Open Sans",
              urls: {
                woff2: `/font/OpenSans400.woff2`,
                woff: `/font/OpenSans400.woff`,
                //[format]: '/[filepath]/[filename],
              },
              //[cssProperty]: 'value',
            },
          ],
        },
        // formatAgents: {
        //   eot: `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)`,
        //   ttf: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8`,
        //   woff: `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`,
        //   woff2: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
        // },
        //formats: ['woff2', 'woff', 'otf', 'ttf'],
        //useMinify: true,
        //usePreload: true,
        //usePreconnect: false,
      },
    },
  ],
};
```

## Google Fonts

Using [Google's Font API](https://code.google.com/apis/webfonts/docs/getting_started.html), name the font families you'd like to load.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["300", "400", "500"],
            },
            {
              family: "Open Sans Condensed",
              variants: ["300", "700"],
            },
          ],
        },
      },
    },
  ],
};
```

You can also supply the text parameter or array of subsets to perform character subsetting:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["300", "400", "500"],
              text: "Hello",
            },
            {
              family: "Roboto",
              variants: ["300", "400", "500"],
              subsets: ["latin", ""],
            },
          ],
        },
      },
    },
  ],
};
```

Pass you user-agent for specific font type:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["300", "400", "500"],
            },
          ],
        },
        formatAgents: {
          woff: `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`,
          woff2: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
        },
      },
    },
  ],
};
```

The text subsetting functionality is only available for Google fonts.

### Google Fonts v2

> This is an extension of the "Google Fonts" setting which uses the latest API.

You can also use the latest [Google Fonts API v2](https://developers.google.com/fonts/docs/css2).

Use the `axes` option like so:

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: "Roboto",
              axes: "wght@300;400;500",
            },
          ],
        },
      },
    },
  ],
};
```

A [variable font](https://web.dev/variable-fonts/) packs all the styles and weights of a font family into a single file.

Only a few Google Fonts are available as [variable fonts](https://fonts.google.com/variablefonts).
Some have their own custom axes that can be set accordingly.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: "Rubik",
              axes: "wght@300..600", // multiple ranges are supported, ex: "wght@300..500;700..900"
            },
          ],
        },
      },
    },
  ],
};
```

## Self Hosted Fonts

Add your own self hosted font files. The plugin will handle the imports & preloading. Strategy is always `selfHosted`, subsets are already defined within your font file, preconnect is unnecessary as the fonts will be served from your already connected host.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          selfHosted: [
            {
              family: "Open Sans",
              urls: {
                // src attributes
                // path relative to gatsby project root
                woff2: `/fonts/filename.woff2`,
                woff: `/fonts/filename.woff`,
                otf: `/fonts/filename.otf`,
                ttf: `/fonts/filename.ttf`,
              },
              fontStyle: "light",
              fontWeight: 300,
            },
          ],
        },
      },
    },
  ],
};
```

Just put your font files in your desired location and include that location in the `urls` as per the above example.
As per gatsby docs it is recommended not to put fonts in the `/static` directory. This plugin will automatically be copy them across to `/public/webfonts/selfHosted`.

## License

[MIT](LICENSE)
