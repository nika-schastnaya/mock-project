import { test as base } from "@playwright/test";
import { ABTestingPage } from "../pages/ab_testing_page";
import { AddElementPage } from "../pages/add_element_page";
import { LoginPage } from "../pages/login_page";
import { SecurePage } from "../pages/secure_page";

type Pages = {
  abTestPage: ABTestingPage;
  addElementPage: AddElementPage;
  loginPage: LoginPage;
  securePage: SecurePage;
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
});

export { expect } from "@playwright/test";
