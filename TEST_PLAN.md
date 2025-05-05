## Test Plan – Swag Labs Functional Test Automation

Project Overview
The project automates functional testing of the Swag Labs demo site, focusing on login, product selection, cart, and checkout flows. Using Playwright with a Page Object Model, it aims to build a modular, maintainable framework that ensures quick verification of workflows, reduces regression effort, and maintains consistent application quality during testing cycles.

## Tester: Reena Pasunuri – Senior Test Engineer (Automation)

1. **Scope of Testing**
In-Scope Features:
•	User Login: Positive and negative test scenarios with standard and locked-out users.
•	Product Listing: Validate product catalog, sorting mechanisms, and product details.
•	Cart Management: Add, update, and remove items from the cart.
•	Checkout Process: Form validation, successful order completion.
•	Header/Menu Navigation: Validating menu interactions including logout and Reset App State via sidebar menu.

Out-of-Scope Features:
•	Cross-browser compatibility.
•	Mobile device testing.
•	Backend or API layer validation.
•	Performance or load testing.

2. **Functional Test Types Prioritized**
To ensure high functional coverage and early defect detection, the following types of tests are prioritized.

I. **User Flows (End-to-End)**
These reflect the most common customer journeys. Testing them verifies that the core functionality works as intended from start to finish.
II. **Input Validation**
Ensures that the system correctly accepts valid input and rejects invalid data. This is vital for preventing incorrect logins or incomplete checkout details, which directly impact user experience.
III. **Boundary & Edge Case Testing**
Helps detect hidden bugs by testing limits, like empty fields or invalid data formats. Bugs that are commonly missed in happy path testing.
IV. **Negative Testing**
Focuses on how the system behaves under invalid conditions (e.g., empty cart checkout). It ensures graceful error handling and resilience of the application.
V. **UI Navigation & State Handling**
Verifies that key menu features like logout and Reset App State work reliably, which maintains session integrity and ensures a consistent application state.

3. **Test Strategy**
Test cases are designed using a combination of techniques:
•	Equivalence Partitioning: Valid vs. invalid credentials, form input types.
•	Boundary Value Testing: Checkout fields (e.g., blank names or zip codes).
•	Workflow-based Scenarios: End-to-end business logic (add to cart → checkout).
•	State-based Testing: Verifying UI reacts correctly after logout.
•   The framework uses accessibility-based selectors (e.g., getByRole) for improved reliability on dynamic UIs.

4. **Tools & Frameworks for Automation**
The tools were selected based on their speed, flexibility, ease of use, and suitability for modern UI automation:
•	Playwright (TypeScript): Chosen for its fast execution, rich feature set (auto-waiting, multiple browser support), and modern syntax that integrates well with JavaScript/TypeScript projects. It enables precise simulation of real user interactions.
•	Page Object Model (POM): Used to maintain modular, scalable, and reusable code. It separates test logic from UI structure, making the framework easier to maintain as the application grows or changes.
•	HTML Reporter (built-in): Provides clear, visual feedback on test runs with detailed logs, which is useful for both debugging and communicating test results with stakeholders.
•	GitHub: Acts as the version control system for managing code, tracking changes, and enabling collaboration. It's also essential for integrating CI/CD workflows in future expansions.
•	Node.js + VS Code: Provides a lightweight, developer-friendly environment for writing and executing Playwright tests efficiently.

5. **Test Environment**
Test Environment Setup:
•	Application URL: https://www.saucedemo.com/v1/
•	Execution Environment: Local machine (Node.js, VS Code, Git)
•	Tools: Playwright, GitHub for version control, HTML Reporter

6. **Risk Areas Identified**
•	Login failures with valid users (e.g., locked-out scenario).
•	Cart not updating correctly on item removal.
•	Checkout form accepting incomplete or blank input

