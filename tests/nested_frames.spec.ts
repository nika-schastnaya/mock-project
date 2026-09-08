import { test, expect } from "@fixtures/page_fixture";

test.describe("nested frames suite", () => {
  test("happy path", async ({ nestedFramePage }) => {
    await nestedFramePage.goto();

    await expect(nestedFramePage.bottomContent).toHaveText("BOTTOM");
    await expect(nestedFramePage.leftContent).toHaveText("LEFT");
    await expect(nestedFramePage.rightContent).toHaveText("RIGHT");
    await expect(nestedFramePage.middleContent).toHaveText("MIDDLE");
  });
});
