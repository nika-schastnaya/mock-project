import { test, expect } from "@fixtures/page_fixture";

test.describe("upload file suite", () => {
  test("upload using button", async ({ uploadPage, pathHelper }) => {
    const uploadsFolder = pathHelper.resolveUploadPath();
    const fileName = "avocado_wink.png";
    await uploadPage.goto();

    await uploadPage.chooseFileButton.setInputFiles(
      `${uploadsFolder}/${fileName}`,
    );
    await uploadPage.uploadButton.click();

    await expect(uploadPage.uploadedFilesSection).toContainText(fileName);
  });

  test.fail(
    "upload using click on drag and drop zone",
    async ({ uploadPage, pathHelper }) => {
      const uploadsFolder = pathHelper.resolveUploadPath();
      const fileName = "avocado_wink.png";
      await uploadPage.goto();

      await uploadPage.dragDropUpload.click();
      await uploadPage.fileInputs
        .nth(1)
        .setInputFiles(`${uploadsFolder}/${fileName}`);

      await expect(uploadPage.dragDropUpload).toContainText(fileName);
      await uploadPage.uploadButton.click();

      await expect(uploadPage.uploadedFilesSection).toContainText(fileName);
    },
  );

  test.fail(
    "upload empty file result in validation error",
    async ({ uploadPage }) => {
      await uploadPage.goto();

      await uploadPage.uploadButton.click();

      await expect(uploadPage.chooseFileButton).toHaveText("no file selected");
    },
  );

  test.fail(
    "multiple file upload via drag and drop area",
    async ({ uploadPage, pathHelper }) => {
      const uploadsFolder = pathHelper.resolveUploadPath();
      const fileNameFirst = "avocado_wink.png";
      const fileNameSecond = "avocadotongue_q.png";
      await uploadPage.goto();

      await uploadPage.dragDropUpload.click();
      await uploadPage.fileInputs
        .nth(1)
        .setInputFiles([
          `${uploadsFolder}/${fileNameFirst}`,
          `${uploadsFolder}/${fileNameSecond}`,
        ]);

      await expect(uploadPage.dragDropUpload).toContainText(fileNameFirst);
      await expect(uploadPage.dragDropUpload).toContainText(fileNameSecond);
      await uploadPage.uploadButton.click();

      await expect(uploadPage.uploadedFilesSection).toContainText(
        fileNameFirst,
      );
      await expect(uploadPage.uploadedFilesSection).toContainText(
        fileNameSecond,
      );
    },
  );
});
