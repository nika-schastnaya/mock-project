import { ABTestingPage } from "@pages/ab_testing_page";
import { expect, test } from "../fixtures/page_fixture";

test.describe("ab_testing", () => {
  test("control variant", async ({ page, context, abTestPage }) => {
    await abTestPage.setAbVariant(context, abTestPage.variants.control);
    await abTestPage.goto();

    await expect(
      page.getByRole("heading", { name: "A/B Test Control" }),
    ).toBeVisible();
  });

  test("test variant", async ({ page, context, abTestPage }) => {
    await abTestPage.setAbVariant(context, abTestPage.variants.variant_1);
    await abTestPage.goto();

    await expect(
      page.getByRole("heading", { name: "A/B Test Variation 1" }),
    ).toBeVisible();
  });

  test("variant is not changed after page reload", async ({
    page,
    context,
    abTestPage,
  }) => {
    await abTestPage.setAbVariant(context, abTestPage.variants.control);

    await abTestPage.goto();
    await expect(
      page.getByRole("heading", { name: "A/B Test Control" }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "A/B Test Control" }),
    ).toBeVisible();
  });

  test("variant is not changed after redirection to another page", async ({
    page,
    context,
    abTestPage,
  }) => {
    await abTestPage.setAbVariant(context, abTestPage.variants.variant_1);

    await abTestPage.goto();
    await expect(
      page.getByRole("heading", { name: "A/B Test Variation 1" }),
    ).toBeVisible();
    await page.goto("https://google.com/");
    await abTestPage.goto();
    await expect(
      page.getByRole("heading", { name: "A/B Test Variation 1" }),
    ).toBeVisible();
  });
});
