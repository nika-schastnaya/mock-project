import { BaseApiBuilder } from "@framework/api/base_api_builder";
import { APIRequestContext } from "@playwright/test";
import { Inventory } from "@services/api/types/inventory";
import { ApiPaths } from "@services/api/constants/api_urls";
import { ApiResult, toApiResult } from "@services/api/types/api_results";

export type GetInventoryApiResult = ApiResult<Inventory>;

export class InventoryBuilder extends BaseApiBuilder {
  private headers: Record<string, string> = {};

  constructor(
    protected request: APIRequestContext,
    protected baseUrl: string,
  ) {
    super(request, baseUrl);
  }

  async sendGetInventory(): Promise<GetInventoryApiResult> {
    const response = await this.request.get(
      `${this.baseUrl}${ApiPaths.inventory}`,
      {
        headers: this.headers,
      },
    );
    return toApiResult<Inventory>(response);
  }
}
