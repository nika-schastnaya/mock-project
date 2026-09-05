import { BasePage } from "@framework/pages/base_page";
import { BrowserContext, Page } from "@playwright/test";

export class ABTestingPage extends BasePage {
    readonly url = `${this.BASE_URL}/abtest`;
    readonly experimentID = '298349752';
    readonly variants = {
        control: '298291000',
        variant_1: '298343790',
    };
    constructor (protected page: Page) {
        super(page);
    }

    async goto() {
        await this.page.goto('/abtest');
    }

    async setAbVariant (browserContext: BrowserContext , variantID: string) {
        await browserContext.addCookies ([
            {
                name: 'optimizelyBuckets',
                value: encodeURIComponent(
                    JSON.stringify({
                        [this.experimentID]: variantID,
                    })
                ),
                url: this.url,
            },
        ]);
    }
}