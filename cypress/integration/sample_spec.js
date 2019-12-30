describe("Tic Tac Toe test", () => {
  beforeEach(() => {
    console.log("before each test ");
  });
  afterEach(() => {
    cy.get('.App .clear-game button[class="clear-btn"]').click();
  });

  it("Should click buttons 0, 1 and 2 and win", () => {
    cy.visit("http://localhost:3000/");
    const clicks = [0, 3, 2, 4, 1];
    const winners = [0, 1, 2];
    clicks.forEach(click => {
      cy.get(`.App .board button[class="number ${click} lose"]`).click();
    });

    winners.forEach(winner => {
      cy.get(`.App .board button[class~="${winner}"]`).should(
        "have.class",
        "winner"
      );
    });
  });

  it("Should click buttons 3, 4 and 5 and win", () => {
    cy.visit("http://localhost:3000/");
    const clicks = [0, 3, 6, 4, 7, 5];
    const winners = [3, 4, 5];
    clicks.forEach(click => {
      cy.get(`.App .board button[class="number ${click} lose"]`).click();
    });

    winners.forEach(winner => {
      cy.get(`.App .board button[class~="${winner}"]`)
        .should("have.class", "winner")
        .contains("O");
    });
  });
});
