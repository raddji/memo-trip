describe('Memo Trip basic test', () => {
  it('Visits Memo Trip', () => {
    cy.visit('http://memo-trip.herokuapp.com/')

    cy.contains('Memories').click()
    cy.contains('Birthday Month').click()

    cy.url().should('include', '/memotrips')
    cy.url().should('include', 'memotrips/1')

    cy.get('input').should('be.enabled')
  })
})