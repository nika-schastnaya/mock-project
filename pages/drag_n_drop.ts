import { BasePage } from "@framework/pages/base_page";
import { Locator, Page } from "@playwright/test";

export class DragAndDropPage extends BasePage {
  readonly blockA: Locator;
  readonly blockB: Locator;
  constructor(protected page: Page) {
    super(page);
    this.blockA = page.locator("#column-a");
    this.blockB = page.locator("#column-b");
  }

  async goto() {
    await this.page.goto("/drag_and_drop");
  }
}
