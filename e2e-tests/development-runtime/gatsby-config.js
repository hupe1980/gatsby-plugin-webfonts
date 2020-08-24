module.exports = {
  plugins: [
    `gatsby-plugin-top-layout`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Roboto`,
              variants: [`300`, `400`, `500`],
            },
          ],
          selfHosted: [
            {
              family: `Open Sans`,
              urls: {
                woff2: `/OpenSans400.woff2`,
              },
            },
          ],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
  siteMetadata: {
    title: `My page`,
  },
};
