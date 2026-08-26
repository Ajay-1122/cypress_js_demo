describe('Iframe handling on QA Practice iframe page', () => {

  const iframeSelector = '[class="embed-responsive-item"]';

  it('should load album content inside iframe and interact with elements', () => {

    cy.visit('https://www.qa-practice.com/elements/iframe/iframe_page');

    cy.getIframeBody(iframeSelector).within(() => {

      cy.contains('Something short and leading about the collection below').should('be.visible');

      cy.contains('Main call to action').should('be.visible').and('have.attr', 'href');
      cy.contains('Secondary action').should('be.visible').and('have.attr', 'href');

      cy.contains('Album example is © Bootstrap').should('be.visible');
    });
  });
});