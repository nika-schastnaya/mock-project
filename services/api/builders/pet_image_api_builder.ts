import { BaseApiBuilder } from "@framework/api/base_api_builder";
import { ApiResponse } from "@services/api/types/api_response";
import { ApiResult, toApiResult } from "@services/api/types/api_results";
import { APIRequestContext } from "@playwright/test";
import { UploadFile } from "@services/api/types/upload_file";
import { ApiPaths } from "@services/api/constants/api_urls";

export type UploadImageApiResult = ApiResult<ApiResponse>;

export class PetImageBuilder extends BaseApiBuilder {
  private headers: Record<string, string> = {};

  constructor(
    protected request: APIRequestContext,
    protected baseUrl: string,
  ) {
    super(request, baseUrl);
  }

  async sendUploadFile(
    id: number | string,
    file?: UploadFile,
    metadata?: string,
  ): Promise<UploadImageApiResult> {
    const multipart: Record<string, string | UploadFile> = {};

    if (metadata !== undefined) {
      multipart.metadata = metadata;
    }

    if (file !== undefined) {
      multipart.file = file;
    }
    const response = await this.request.post(
      `${this.baseUrl}${ApiPaths.uploadImageById(id)}`,
      {
        headers: this.headers,
        multipart,
      },
    );

    return toApiResult<ApiResponse>(response);
  }
}
