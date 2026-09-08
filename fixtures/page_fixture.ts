import { test as base } from "@playwright/test";
import { ABTestingPage } from "@pages/ab_testing_page";
import { AddElementPage } from "@pages/add_element_page";
import { LoginPage } from "@pages/login_page";
import { SecurePage } from "@pages/secure_page";
import { DragAndDropPage } from "@pages/drag_n_drop";
import { UploadPage } from "@pages/upload_page";

type Pages = {
  abTestPage: ABTestingPage;
  addElementPage: AddElementPage;
  loginPage: LoginPage;
  securePage: SecurePage;
  dragAndDropPage: DragAndDropPage;
  uploadPage: UploadPage;
};

export const test = base.extend<Pages>({
  abTestPage: async ({ page }, use) => {
    await use(new ABTestingPage(page));
  },
  addElementPage: async ({ page }, use) => {
    await use(new AddElementPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  securePage: async ({ page }, use) => {
    await use(new SecurePage(page));
  },
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },
  uploadPage: async ({ page }, use) => {
    await use(new UploadPage(page));
  }
});

export { expect } from "@playwright/test";
