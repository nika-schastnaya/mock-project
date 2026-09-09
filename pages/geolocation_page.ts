import { BasePage } from "@framework/pages/base_page";
import { Locator, Page } from "@playwright/test";

export class GeolocationPage extends BasePage {
  readonly geoButton: Locator;
  readonly latValue: Locator;
  readonly longValue: Locator;
  constructor(protected page: Page) {
    super(page);
    this.geoButton = page.getByRole("button", { name: "Where am I?" });
    this.latValue = page.locator("#lat-value");
    this.longValue = page.locator("#long-value");
  }

  async goto() {
    await this.page.goto("/geolocation");
  }
}
