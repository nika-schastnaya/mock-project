import { BasePage } from "@framework/pages/base_page";
import { BrowserContext, Locator, Page } from "@playwright/test";

type Variant = {
  id: string;
  header: string;
};

export class ABTestingPage extends BasePage {
  readonly url = `${this.BASE_URL}/abtest`;
  readonly header: Locator;
  readonly experimentID = "298349752";
  readonly variants = {
    control: {
      id: "298291000",
      header: "A/B Test Control",
    },
    variant_1: {
      id: "298343790",
      header: "A/B Test Variation 1",
    },
  };

  constructor(protected page: Page) {
    super(page);
    this.header = page.getByRole("heading");
  }

  async goto() {
    await this.page.goto("/abtest");
  }

  async setAbVariant(variant: Variant) {
    await this.page.context().addCookies([
      {
        name: "optimizelyBuckets",
        value: encodeURIComponent(
          JSON.stringify({
            [this.experimentID]: variant.id,
          }),
        ),
        url: this.url,
      },
    ]);
  }
}
