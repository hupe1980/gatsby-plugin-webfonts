describe(`fonts`, () => {
  beforeEach(() => {
    cy.visit(`/`).waitForRouteChange();
  });

  it(`displays content with the self hosted font-family`, () => {
    cy.getTestElement(`self-hosted-font`)
      .should(`have.css`, `font-family`)
      .and(`match`, /Open Sans/);
  });

  it(`displays content with the self hosted font-weight`, () => {
    cy.getTestElement(`self-hosted-font`)
      .should(`have.css`, `font-weight`)
      .and(`equal`, `400`);
  });

  it(`displays content with the self hosted font-style`, () => {
    cy.getTestElement(`self-hosted-font`)
      .should(`have.css`, `font-style`)
      .and(`equal`, `normal`);
  });

  it(`displays content with the google font-family`, () => {
    cy.getTestElement(`google-font`)
      .should(`have.css`, `font-family`)
      .and(`match`, /Roboto/);
  });

  it(`displays content with the google font-weight`, () => {
    cy.getTestElement(`google-font`)
      .should(`have.css`, `font-weight`)
      .and(`equal`, `400`);
  });

  it(`displays content with the google font-style`, () => {
    cy.getTestElement(`google-font`)
      .should(`have.css`, `font-style`)
      .and(`equal`, `normal`);
  });

  it(`displays content with the google2 font-family`, () => {
    cy.getTestElement(`google2-font`)
      .should(`have.css`, `font-family`)
      .and(`match`, /Rubik/);
  });

  it(`displays content with the google2 font-weight`, () => {
    cy.getTestElement(`google2-font`)
      .should(`have.css`, `font-weight`)
      .and(`equal`, `400`);
  });

  it(`displays content with the google2 font-style`, () => {
    cy.getTestElement(`google2-font`)
      .should(`have.css`, `font-style`)
      .and(`equal`, `normal`);
  });

  it(`successfully generates CSS @font-face and it's descriptors for google`, () => {
    cy.get(`head`)
      .first()
      .within(($head) => {
        cy.get(`style`)
          .should(`exist`)
          .and(`contain`, `@font-face`)
          .and(
            `contain`,
            `{font-display:swap;font-family:Rubik;font-style:normal;font-weight:300;src:url(/static/webfonts/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1VQ.woff2) format("woff2"),url(/static/webfonts/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1Uw.woff) format("woff")}`,
          );
      });
  });

  it(`successfully generates CSS @font-face and it's descriptors for google2`, () => {
    cy.get(`head`)
      .first()
      .within(($head) => {
        cy.get(`style`)
          .should(`exist`)
          .and(`contain`, `@font-face`)
          .and(
            `contain`,
            `{font-display:swap;font-family:Rubik;font-style:normal;font-weight:300;src:url(/static/webfonts/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1VQ.woff2) format("woff2"),url(/static/webfonts/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1Uw.woff) format("woff")}`,
          );
      });
  });

  it(`successfully generates CSS @font-face and it's descriptors for self hosted`, () => {
    cy.get(`head`)
      .first()
      .within(($head) => {
        cy.get(`style`)
          .should(`exist`)
          .and(`contain`, `@font-face`)
          .and(
            `contain`,
            `{font-display:swap;font-family:Open Sans;font-style:normal;font-weight:300;src:url(/static/webfonts/OpenSans300.woff2) format("woff2")}@font-face{font-display:swap;font-family:Open Sans;font-style:normal;font-weight:400;src:url(/static/webfonts/OpenSans400.woff2) format("woff2")}`,
          );
      });
  });

  it(`successfully loads fonts`, () => {
    cy.document().its(`fonts.status`).should(`equal`, `loaded`);
  });

  it(`successfully loads all google fonts`, () => {
    const validArr = [];
    const getFonts = async (font) => {
      if (font.family === `Roboto`) {
        validArr.push(font.weight);
      }
    };

    cy.document()
      .its(`fonts`)
      .invoke(`forEach`, getFonts)
      .then(() => {
        expect(validArr).to.include(`300`);
        expect(validArr).to.include(`400`);
        expect(validArr).to.include(`500`);
      });
  });

  it(`successfully loads all google2 fonts`, () => {
    const validArr = [];
    const getFonts = async (font) => {
      if (font.family === `Rubik`) {
        validArr.push(font.weight);
      }
    };

    cy.document()
      .its(`fonts`)
      .invoke(`forEach`, getFonts)
      .then(() => {
        expect(validArr).to.include(`300`);
        expect(validArr).to.include(`400`);
        expect(validArr).to.include(`500`);
        expect(validArr).to.include(`600`);
        expect(validArr).to.not.include(`700`);
      });
  });

  it(`successfully loads all self hosted fonts`, () => {
    const validArr = [];
    const getFonts = async (font) => {
      if (font.family === `Open Sans`) validArr.push(font.weight);
    };

    cy.document()
      .its(`fonts`)
      .invoke(`forEach`, getFonts)
      .then(() => {
        expect(validArr).to.include(`300`);
        expect(validArr).to.include(`400`);
        expect(validArr).to.not.include(`500`);
        expect(validArr).to.not.include(`700`);
      });
  });

  it(`successfully adds link to preload self hosted fonts`, () => {
    cy.get(`head`).within(() => {
      cy.get(`link[href="/static/webfonts/OpenSans300.woff2"]`)
        .should(`have.attr`, `rel`, `preload`)
        .and(`have.attr`, `as`, `font`)
        .and(`have.attr`, `type`, `font/woff2`);
    });
    cy.get(`head`).within(() => {
      cy.get(`link[href="/static/webfonts/OpenSans400.woff2"]`)
        .should(`have.attr`, `rel`, `preload`)
        .and(`have.attr`, `as`, `font`)
        .and(`have.attr`, `type`, `font/woff2`);
    });
  });
});
