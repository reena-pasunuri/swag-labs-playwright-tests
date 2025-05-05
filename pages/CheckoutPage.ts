import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Fills the personal information form fields on the checkout step one page.
   */
  async fillForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
    await this.page.waitForSelector('[data-test="firstName"]', { timeout: 5000 });
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  /**
   * Clicks the Continue button, with logging and fallback if it's not found.
   */
  async clickContinue(): Promise<void> {
    try {
      console.log('Waiting for CONTINUE button...');
      const continueButton = this.page.locator('input.btn_primary.cart_button');
      await continueButton.waitFor({ state: 'visible', timeout: 7000 });
      console.log('CONTINUE button found. Clicking...');
      await continueButton.click();
    } catch (error) {
      console.error('CONTINUE button was not clickable — possible UI issue or wrong page.');
      throw error;
    }
  }

  /**
   * Waits for the Checkout Overview page to fully load.
   */
  async waitForOverview(): Promise<void> {
    console.log('Waiting for checkout overview page...');
    await this.page.waitForURL(/.*checkout-step-two\.html/, { timeout: 5000 });
    await this.page.waitForSelector('.summary_info', { timeout: 5000 });
    console.log('Overview page loaded.');
  }

  /**
   * Clicks the Finish button after confirming presence and visibility.
   */
  async clickFinish(): Promise<void> {
    try {
      console.log('Waiting for FINISH button...');
      const finishButton = this.page.locator('a.btn_action.cart_button');

      const html = await this.page.content();
      console.log('Current page HTML snapshot:\n', html.slice(0, 1000));

      await finishButton.waitFor({ state: 'visible', timeout: 5000 });
      console.log('FINISH button found. Clicking...');
      await finishButton.click();
    } catch (error) {
      console.error('FINISH button was not clickable — possible UI issue or wrong selector.');
      throw error;
    }
  }

  /**
   * Completes the checkout by clicking the Finish button.
   */
  async finishCheckout(): Promise<void> {
    await this.clickFinish();
  }

  /**
   * Returns the thank-you header text from the confirmation page.
   */
  async verifyThankYouMessage(): Promise<string | null> {
    await this.page.waitForSelector('.complete-header', { timeout: 5000 });
    return this.page.locator('.complete-header').textContent();
  }
}
