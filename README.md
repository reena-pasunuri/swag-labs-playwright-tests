## Swag Labs Playwright Automation

This project contains an automated end-to-end test framework built with **Playwright** and **TypeScript** for the Swag Labs (SauceDemo) (https://www.saucedemo.com/) demo application. The framework is built using the **Page Object Model (POM)** for scalability and easy maintenance.

## Test Scenarios Covered

1. **Login**
   - Valid login with standard user
   - Invalid login with wrong credentials
   - Login attempt with locked-out user

2. **Product & Cart**
   - Add product to cart from product page
   - Cart is empty by default
   - Remove a product from the cart

3. **Checkout Process**
   - Error validation for empty checkout fields
   - Error validation when missing last name
   - Complete checkout with valid customer info and verify order confirmation

4. **Logout & Session Handling**
   - Logout via sidebar menu and return to login screen


## Project Structure

swag-labs-automation/
├── pages/               # Page Object Model classes
├── tests/               # Test specifications
├── utils/               # Test data and utilities
├── .gitignore           # Git ignored files and folders
├── package.json         # Project metadata and dependencies
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
├── TEST_PLAN.md         # Functional testing plan
├── BUG_REPORT.md        # Known bugs or issues (if any)
└── README.md            # Project documentation


## Technologies

- Playwright – Browser automation framework
- TypeScript – Static typing for JavaScript
- Page Object Model – Design pattern for test maintainability
- HTML Reporter – Automatically generated visual test reports


## How to Run

1. **Install Dependencies:** Ensure [Node.js](https://nodejs.org/) is installed, then run:

    npm install
    npx playwright install

2. **Run Tests:** Execute all tests in headless mode (default):

    npx playwright test


3. **Run tests** To run with the browser UI (headed mode) for debugging

    npx playwright test --headed

4. **View HTML Report**
View Reports: After test execution, Playwright will generate a detailed HTML report. If there are failures, a browser will open automatically. To manually open the report at any time:

    npx playwright show-report

## Troubleshooting Notes
- The [Swag Labs](https://www.saucedemo.com/v1/) site may respond slowly or behave inconsistently at times.
- If you encounter test timeouts, run tests with increased timeout:

    npx playwright test --timeout=60000
  
## Other documents
- [Test Plan](TEST_PLAN.md)
- [Bug Report](BUG_REPORT.md)


## Author
Reena Pasunuri
ISTQB Certified  Software Test Engineer 


