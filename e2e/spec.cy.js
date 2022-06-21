describe('Memo Trip basic test', () => {
  it('Visits Memo Trip', () => {
    cy.visit('http://memo-trip.herokuapp.com/')

    it('Checks links', () => {
      cy.contains('Memories').click()
      cy.contains('Birthday Month').click()
    })

    it ('Checks url paths', () => {
      cy.url().should('include', '/memotrips')
      cy.url().should('include', 'memotrips/1')
    })
    it ('Verifies input fields are enabled', () => {
      cy.get('input').should('be.enabled')
    })
  })
})