import { expect, test } from "@fixtures/page_fixture";
import { randomInt } from "crypto";

test.describe("add and remove elements", () => {
  test("no elements", async ({ addElementPage }) => {
    await addElementPage.goto();

    await expect(addElementPage.deleteButton).toBeHidden();
  });

  test("one element added and removed", async ({ addElementPage }) => {
    await addElementPage.goto();

    await addElementPage.addElement();
    await expect(addElementPage.deleteButton).toBeVisible();
    await addElementPage.deleteFirstElement();
    await expect(addElementPage.deleteButton).toBeHidden();
  });

  test("several elements added", async ({ addElementPage }) => {
    await addElementPage.goto();
    const num = randomInt(2, 10);

    await addElementPage.addNumberOfElements(num);
    await expect(addElementPage.deleteButton).toHaveCount(num);
    await addElementPage.deleteNumberOfElements(num);
    await expect(addElementPage.deleteButton).toHaveCount(0);
  });
});
