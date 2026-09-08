import { BasePage } from "@framework/pages/base_page";
import { Locator, Page } from "@playwright/test";

export class UploadPage extends BasePage {
  readonly chooseFileButton: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFilesSection: Locator;
  readonly dragDropUpload: Locator;
  readonly fileInputs: Locator;

  constructor(protected page: Page) {
    super(page);
    this.chooseFileButton = page.getByRole("button", { name: "Choose file" });
    this.uploadButton = page.getByRole("button", { name: "Upload" });
    this.uploadedFilesSection = page.locator("#uploaded-files");
    this.dragDropUpload = page.locator("#drag-drop-upload");
    this.fileInputs = page.locator('input[type="file"]');
  }
  async goto() {
    await this.page.goto("/upload");
  }
}
