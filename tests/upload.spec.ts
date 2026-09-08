import { test, expect } from "@fixtures/page_fixture";
import { UploadPage } from "@pages/upload_page";

test.describe("upload file suite", () => {
  test.fail("upload using button", async ({ uploadPage }) => {
    await uploadPage.goto();

    await uploadPage.chooseFileButton.setInputFiles(
      "../Downloads/avocado_wink.png",
    );
    await uploadPage.uploadButton.click();

    await expect(uploadPage.uploadedFilesSection).toContainText(
      "avocado_wink.png",
    );
  });

  test.fail(
    "upload using click on drag and drop zone",
    async ({ uploadPage }) => {
      await uploadPage.goto();

      await uploadPage.dragDropUpload.click();
      await uploadPage.fileInputs
        .nth(1)
        .setInputFiles("../Downloads/avocado_wink.png");

      await expect(uploadPage.dragDropUpload).toContainText("avocado_wink.png");
      await uploadPage.uploadButton.click();

      await expect(uploadPage.uploadedFilesSection).toContainText(
        "avocado_wink.png",
      );
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
    async ({ uploadPage }) => {
      await uploadPage.goto();

      await uploadPage.dragDropUpload.click();
      await uploadPage.fileInputs
        .nth(1)
        .setInputFiles([
          "../Downloads/avocado_wink.png",
          "../Downloads/avocadotongue_q.png",
        ]);

      await expect(uploadPage.dragDropUpload).toContainText("avocado_wink.png");
      await expect(uploadPage.dragDropUpload).toContainText(
        "avocadotongue_q.png",
      );
      await uploadPage.uploadButton.click();

      await expect(uploadPage.uploadedFilesSection).toContainText(
        "avocado_wink.png",
      );
      await expect(uploadPage.uploadedFilesSection).toContainText(
        "avocadotongue_q.png",
      );
    },
  );
});
