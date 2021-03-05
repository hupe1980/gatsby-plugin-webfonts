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
              family: "Roboto",
              variants: ["300", "400", "500"],
              //subsets: ['latin']
              //text: 'Hello'
              //fontDisplay: 'swap',
              //strategy: 'selfHosted' // 'base64' || 'cdn'
            },
          ],
          selfHosted: [
            {
              family: "Open Sans",
              urls: {
                woff2: `/OpenSans400.woff2`,
                woff: `/OpenSans400.woff`,
                truetype: `/OpenSans400.ttf`,
              },
              //fontStyle: 'normal'
              //fontDisplay: 'swap',
              //fontWeight: 400,
              //cssProperty: 'value'
            },
          ],
        },
        // formatAgents: {
        //   eot: `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)`,
        //   ttf: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8`,
        //   woff: `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`,
        //   woff2: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
        // },
        //formats: ['woff2', 'woff'],
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

You can also supply the text parameter to perform character subsetting:

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


## License

[MIT](LICENSE)
