import { test } from "@fixtures/api_fixture";
import { UploadFile } from "@services/api/types/upload_file";
import { readFile } from "node:fs/promises";

test.describe("post /uploadImage suite", () => {
  test("post /uploadImage happy path + metadata", async ({
    pathHelper,
    apiActions,
  }) => {
    const imageName = "avocado_wink.png";
    const path = pathHelper.resolveUploadPath() + `/${imageName}`;
    const file: UploadFile = {
      name: imageName,
      mimeType: "image/png",
      buffer: await readFile(path),
    };
    const meta = "profile picture";
    const pet = await apiActions.petActions().createRandomPet();

    await apiActions
      .petImageActions()
      .uploadImageByPetIdSuccessfully(pet.body.id, file, meta);
  });
  test("post /uploadImage happy path without metadata", async ({
    pathHelper,
    apiActions,
  }) => {
    const imageName = "avocado_wink.png";
    const path = pathHelper.resolveUploadPath() + `/${imageName}`;
    const file: UploadFile = {
      name: imageName,
      mimeType: "image/png",
      buffer: await readFile(path),
    };
    const pet = await apiActions.petActions().createRandomPet();

    await apiActions
      .petImageActions()
      .uploadImageByPetIdSuccessfully(pet.body.id, file);
  });
});
