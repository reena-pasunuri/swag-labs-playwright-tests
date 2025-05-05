/**
 * Test Scenario: Login Functionality
 *
 * This file contains tests for:
 * 1. Valid login with standard_user credentials
 * 2. Invalid login with incorrect credentials
 * 3. Locked-out user login attempt
 *
 * Rationale for Automation:
 * - Login is a critical path for all users and must be verified for access control.
 * - Validating different user states (valid, invalid, locked out) ensures proper access restrictions.
 * - Repetitive nature of login makes it ideal for automation and regression testing.
 */


import { test, expect } from '@playwright/test';
import { LoginPage }   from '../pages/LoginPage';
import { users }       from '../utils/testData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Valid login with standard_user', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/.*\/inventory\.html$/);
  });

  test('Invalid login with wrong credentials', async ({ page }) => {
    await loginPage.login('wrong_user', 'bad_pass');
    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Epic sadface: Username and password do not match/);
  });

  test('Locked out user cannot login', async ({ page }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Sorry, this user has been locked out\./);
  });
});
