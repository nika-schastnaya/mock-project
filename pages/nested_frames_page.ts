import { BasePage } from "@framework/pages/base_page";
import { FrameLocator, Locator, Page } from "@playwright/test";

export class NestedFramesPage extends BasePage {
  readonly leftContent: Locator;
  readonly rightContent: Locator;
  readonly middleContent: Locator;
  readonly bottomContent: Locator;

  constructor(protected page: Page) {
    super(page);
    this.leftContent = page
      .frameLocator('[name="frame-top"]')
      .frameLocator('[name="frame-left"]')
      .locator("body");
    this.middleContent = page
      .frameLocator('[name="frame-top"]')
      .frameLocator('[name="frame-middle"]')
      .locator("body");
    this.rightContent = page
      .frameLocator('[name="frame-top"]')
      .frameLocator('[name="frame-right"]')
      .locator("body");
    this.bottomContent = page
      .frameLocator('[name="frame-bottom"]')
      .locator("body");
  }

  async goto() {
    await this.page.goto("/nested_frames");
  }
}
