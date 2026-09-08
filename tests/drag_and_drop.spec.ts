import { test, expect } from "@fixtures/page_fixture";

test.describe("drag and drop suite", () => {
  test("block changes its order if dropped over another block", async ({ dragAndDropPage }) => {
    await dragAndDropPage.goto();

    await dragAndDropPage.blockA.dragTo(dragAndDropPage.blockB);

    await expect(dragAndDropPage.blockA).toContainText('B');
    await expect(dragAndDropPage.blockB).toContainText('A');

    await dragAndDropPage.blockA.dragTo(dragAndDropPage.blockB);

    await expect(dragAndDropPage.blockA).toContainText('A');
    await expect(dragAndDropPage.blockB).toContainText('B');
  });

  test('block does not change its order if dropped over self', async ({ dragAndDropPage }) => {
    await dragAndDropPage.goto();

    await dragAndDropPage.blockA.dragTo(dragAndDropPage.blockA);

    await expect(dragAndDropPage.blockA).toContainText('A');
    await expect(dragAndDropPage.blockB).toContainText('B');
  });

  test('block does not change its order if dropped over other element', async ({ page, dragAndDropPage }) => {
    await dragAndDropPage.goto();

    await dragAndDropPage.blockA.dragTo(page.getByRole('heading'));

    await expect(dragAndDropPage.blockA).toContainText('A');
    await expect(dragAndDropPage.blockB).toContainText('B');
  });
});
