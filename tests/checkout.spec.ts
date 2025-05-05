/**
 * Test Scenario: Checkout Process
 *
 * This file tests:
 * 1. Checkout error on submitting empty fields
 * 2. Checkout error when last name is missing
 * 3. Successful checkout with valid customer details
 *
 * Rationale for Automation:
 * - Checkout is the final step of the purchase flow and business-critical.
 * - Validating form field errors and success cases ensures smooth user journey.
 * - Automating these tests ensures form validations and backend submissions work as intended.
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, checkoutData } from '../utils/testData';

test.describe('Checkout Process', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.goToCart();
    await cartPage.checkout();
  });

  test('Error on empty checkout fields', async ({ page }) => {
    await checkoutPage.fillForm('', '', '');
    await checkoutPage.clickContinue();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
  });

  test('Error when missing last name', async ({ page }) => {
    await checkoutPage.fillForm(checkoutData.firstName, '', checkoutData.postalCode);
    await checkoutPage.clickContinue();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
  });

  test('Complete checkout with valid details', async ({ page }) => {
    await checkoutPage.fillForm(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.waitForOverview();
    await checkoutPage.finishCheckout();

    await page.waitForSelector('.complete-header', { timeout: 5000 });
    await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
  });
});
