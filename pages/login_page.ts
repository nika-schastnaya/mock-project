import { Locator, Page } from "@playwright/test";
import { SecurePage } from "@pages/secure_page";
import { BasePage } from "@framework/pages/base_page";

export class LoginPage extends BasePage {
    readonly errorFlash: Locator;
    readonly url = `${this.BASE_URL}/login`;
    
    constructor (protected page: Page) {
        super(page);
        this.errorFlash = page.locator('#flash');
    }

    async loginViaUI (username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: ' Login' }).click();

        return new SecurePage(this.page);
    }

    async goto () {
        await this.page.goto('/login');
    }
}