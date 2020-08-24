# gatsby-plugin-webfonts

> A [Gatsby](https://github.com/gatsbyjs/gatsby) plugin to handle cdn, base64 and self hosted webfonts

- Creates minified @font-face CSS rules
- Supports font-display property (Default: 'swap')
- Handles preconnect and preload optimizations
- Automatically downloads fonts for self hosting
- Supports cdn, base64 and self hosted Fonts (Default: 'selfHosted')

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
            },
          ],
        },
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

The text subsetting functionality is only available for Google fonts.

## License

[MIT](LICENSE)
