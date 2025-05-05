import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.locator('.checkout_button');
    this.cartItems      = page.locator('.cart_item');
  }

  /** Click the cart icon and wait for cart.html */
  async navigate(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/.*\/cart\.html$/),
      this.page.locator('.shopping_cart_link').click(),
    ]);
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allInnerTexts();
  }

  /** Click Checkout and wait for checkout‑step‑one.html */
  async checkout(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/.*\/checkout-step-one\.html$/),
      this.checkoutButton.click(),
    ]);
  }
}
