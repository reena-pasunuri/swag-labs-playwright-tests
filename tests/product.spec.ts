/**
 * Test Scenario: Add Product to Cart
 *
 * This file tests:
 * - Adding a product to the cart from the products page
 *
 * Rationale for Automation:
 * - Adding to cart is a core conversion action and highly used by customers.
 * - Needs frequent regression checks to ensure it doesn't break with product updates.
 * - Simple, yet critical test that benefits from automation.
 */


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { users } from '../utils/testData';

test('Add a product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  await loginPage.navigate();
  await loginPage.login(users.standard.username, users.standard.password);

  await productPage.addToCart('Sauce Labs Backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
