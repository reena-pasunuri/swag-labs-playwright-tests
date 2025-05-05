/**
 * Test Scenario: Logout Functionality
 *
 * This test verifies:
 * - User can log out via the side menu.
 *
 * Rationale:
 * - Logout is essential for session security and access control.
 * - Ensures the user is returned to the login screen with a clean session.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Menu & Session Handling', () => {
  test('User can logout successfully (UI navigation)', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Open menu using accessible button name
    const menuButton = page.getByRole('button', { name: 'Open Menu' });
    await menuButton.click();

    // Wait and click the Logout link
    const logoutLink = page.getByRole('link', { name: 'Logout' });
    await logoutLink.waitFor({ state: 'visible', timeout: 5000 });
    await logoutLink.click();

    // Assert that user is redirected to login screen
    await expect(page).toHaveURL(/.*saucedemo\.com\/v1\/index\.html/);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
