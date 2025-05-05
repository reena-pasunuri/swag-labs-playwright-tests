import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart(productName: string) {
    const item = this.page.locator('.inventory_item', { hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart(): Promise<void> {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL(/.*\/cart\.html$/);
  }

  /** Return 0 if no badge, or the number shown */
  async getCartCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() === 0) return 0;
    const text = await badge.textContent();
    return parseInt(text || '0', 10);
  }
}
