import { test } from "@fixtures/page_fixture";

test.describe("drag and drop suite", () => {
  test("object changes its order", async ({ dragAndDropPage }) => {
    await dragAndDropPage.goto();

    await dragAndDropPage.blockA.dragTo(dragAndDropPage.blockB);
  });
});
