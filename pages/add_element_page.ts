import { BasePage } from "@framework/pages/base_page";
import { Locator, Page } from "@playwright/test";

export class AddElementPage extends BasePage {
    readonly addButton: Locator;
    readonly deleteButton: Locator;
    constructor (protected page: Page) {
        super(page);
        this.addButton = page.getByRole('button', { name: 'Add Element' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async goto() {
        await this.page.goto('/add_remove_elements/');
    }

    async addElement() {
        await this.addButton.click();
    }

    async deleteFirstElement() {
        await this.deleteButton.first().click();
    }

    async addNumberOfElements(number: number) {
        let i = 0;
                while ( i < number ) {
                    await this.addElement();
                    i++;
                }

            }
    async deleteNumberOfElements(number: number) {
        let i = 0;
            while ( i < number ) {
            await this.deleteFirstElement();
            i++;
        }
    }
        
}