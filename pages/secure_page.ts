import { BasePage } from "@framework/pages/base_page";
import { Locator, Page } from "@playwright/test";

export class SecurePage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly url = `${this.BASE_URL}/secure`;

  constructor(protected page: Page) {
    super(page);
    this.welcomeMessage = page.locator("h4");
  }
}
