import { expect, test } from "@fixtures/page_fixture";

test.describe("ab_testing", () => {
  test("control variant", async ({ abTestPage }) => {
    const variant = abTestPage.variants.control;
    await abTestPage.setAbVariant(variant);
    await abTestPage.goto();

    await expect(abTestPage.header).toHaveText(variant.header);
  });

  test("test variant", async ({ abTestPage }) => {
    const variant = abTestPage.variants.variant_1;
    await abTestPage.setAbVariant(variant);
    await abTestPage.goto();

    await expect(abTestPage.header).toHaveText(variant.header);
  });

  test("variant is not changed after page reload", async ({
    page,
    abTestPage,
  }) => {
    const variant = abTestPage.variants.control;
    await abTestPage.setAbVariant(variant);
    await abTestPage.goto();

    await expect(abTestPage.header).toHaveText(variant.header);

    await page.reload();

    await expect(abTestPage.header).toHaveText(variant.header);
  });

  test("variant persists after navigating away", async ({
    page,
    abTestPage,
  }) => {
    const variant = abTestPage.variants.variant_1;
    await abTestPage.setAbVariant(variant);
    await abTestPage.goto();

    await expect(abTestPage.header).toHaveText(variant.header);

    await page.goto("/");
    await abTestPage.goto();

    await expect(abTestPage.header).toHaveText(variant.header);
  });
});
