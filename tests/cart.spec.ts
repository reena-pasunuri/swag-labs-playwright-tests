/**
 * Test Scenario: Shopping Cart Functionality
 *
 * This file includes tests for:
 * 1. Verifying cart is empty by default on login
 * 2. Removing a product from the cart
 *
 * Rationale for Automation:
 * - Cart is core to the e-commerce flow and must handle edge cases reliably.
 * - Tests ensure the state is correctly reset between sessions and products can be removed.
 * - Automating these checks ensures user experience remains consistent during updates.
 */


import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../utils/testData';

test.describe('Cart Functionality', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('Cart is empty by default', async () => {
    await cartPage.navigate();
    await expect(cartPage.getItemNames()).resolves.toHaveLength(0);
  });

  test('Remove a product from cart', async ({ page }) => {
    await productPage.addToCart('Sauce Labs Backpack');
    await productPage.addToCart('Sauce Labs Bike Light');
    await cartPage.navigate();

    await cartPage.removeItem('Sauce Labs Bike Light');
    await expect(cartPage.getItemNames()).resolves.not.toContain('Sauce Labs Bike Light');
  });
});
