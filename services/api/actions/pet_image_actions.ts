import {
  PetImageBuilder,
  UploadImageApiResult,
} from "@services/api/builders/pet_image_api_builder";
import { UploadFile } from "@services/api/types/upload_file";
import { expect } from "@playwright/test";

export class PetImageActions {
  constructor(private petImageBuilder: PetImageBuilder) {}

  async uploadImageByPetIdSuccessfully(
    id: number | string,
    file: UploadFile,
    metadata?: string,
  ): Promise<UploadImageApiResult> {
    const uploadResponse = await this.uploadImageByPetId(id, file, metadata);

    expect(uploadResponse.ok).toBeTruthy();
    expect(uploadResponse.body.code).toBe(200);
    expect(uploadResponse.body.message).toContain(file.name);

    return uploadResponse;
  }

  async uploadImageByPetId(
    id: number | string,
    file?: UploadFile,
    metadata?: string,
  ): Promise<UploadImageApiResult> {
    return this.petImageBuilder.sendUploadFile(id, file, metadata);
  }
}
