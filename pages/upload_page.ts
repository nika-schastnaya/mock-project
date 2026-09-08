import { BasePage } from "@framework/pages/base_page";
import { Page } from "@playwright/test";

export class UploadPage extends BasePage {
    readonly chooseFileButton: Locator;
    readonly uploadButton: Locator;

    constructor (protected page: Page) {
        super(page);
        this.chooseFileButton = page.getByRole('button', { name: 'Choose file' });
        this.uploadButton = page.getByRole('button', { name: 'Upload' });
    }
    async goto(){
        await this.page.goto('/upload');
    }
}