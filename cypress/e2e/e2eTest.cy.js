// Monitor console warnings, errors, and logs
let consoleError;
let consoleWarning;
let consoleLog;

Cypress.on("window:before:load", (win) => {
  consoleError = cy.spy(win.console, "error");
  consoleWarning = cy.spy(win.console, "warn");
  consoleLog = cy.spy(win.console, "log");
});
const DELAY = 1000;

describe("Basic Tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(`http://localhost:${Cypress.env("theport") || 8080}`);
  });
  it("basic check to ensure tests run", () => {
    cy.get("h2").first().should("include.text", "Problem 1");
  });

  afterEach(() => {
    // Confirm there are no console log/warning/errors after every test iteration.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    /* eslint-disable no-unused-expressions */
    // Confirm there are no console log/warning/errors after every test iteration.
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(DELAY).then(() => {
      if (consoleLog.called) {
        throw new Error(
          "YOU SHOULD NOT HAVE console.log() IN YOUR SUBMITTED CODE \n".repeat(
            100
          )
        );
      }
      if (consoleError.called) {
        throw new Error(
          "ERRORS FOUND IN YOUR CODE, CHECK THE JS CONSOLE. THOSE NEED TO BE FIXED BEFORE TESTS WILL WORK. \n".repeat(
            100
          )
        );
      }
      if (consoleWarning.called) {
        throw new Error(
          "WARNINGS FOUND IN YOUR CODE, CHECK THE JS CONSOLE YOU NEED TO FIX THOSE FOR TESTS TO PASS \n".repeat(
            100
          )
        );
      }
    });
  });
});
