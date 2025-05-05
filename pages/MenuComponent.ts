import { Page } from '@playwright/test';

export class MenuComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    // Use accessible name instead of ID
    const menuButton = this.page.getByRole('button', { name: 'Open Menu' });
    await menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await menuButton.click();

    // Wait for Logout to confirm menu is open
    const logoutLink = this.page.getByRole('link', { name: 'Logout' });
    await logoutLink.waitFor({ state: 'visible', timeout: 5000 });
  }

  async logout() {
    await this.open();
    const logoutLink = this.page.getByRole('link', { name: 'Logout' });
    await logoutLink.click();
  }

  async resetAppState() {
    await this.open();
    const resetLink = this.page.getByRole('link', { name: 'Reset App State' });
    await resetLink.click();
  }
}
