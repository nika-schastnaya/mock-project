import { BaseApiBuilder } from "@framework/api/base_api_builder";
import { APIRequestContext } from "@playwright/test";
import { Order, OrderStatus } from "@services/api/types/order";
import { ApiResult, toApiResult } from "../types/api_results";
import { ApiPaths } from "../constants/api_urls";

export type CreateOrderApiResult = ApiResult<Order>;
export type GetOrderApiResult = ApiResult<Order>;
export type DeleteOrderApiResult = ApiResult<Order>;

export class OrderApiBuilder extends BaseApiBuilder {
  private body: Partial<Order> = {};
  private headers: Record<string, string> = {};
  private rawBody: unknown;

  constructor(
    protected request: APIRequestContext,
    protected baseUrl: string,
  ) {
    super(request, baseUrl);
  }

  withId(id: number): this {
    this.body.id = id;
    return this;
  }

  withPetId(petId: number): this {
    this.body.petId = petId;
    return this;
  }

  withQuantity(quantity: number): this {
    this.body.quantity = quantity;
    return this;
  }

  withShipDate(shipDate: string): this {
    this.body.shipDate = shipDate;
    return this;
  }

  withStatus(status: OrderStatus): this {
    this.body.status = status;
    return this;
  }

  withComplete(complete: boolean): this {
    this.body.complete = complete;
    return this;
  }

  async sendCreateOrder(): Promise<CreateOrderApiResult> {
    const response = await this.request.post(
      `${this.baseUrl}${ApiPaths.order}`,
      {
        headers: this.headers,
        data: this.rawBody !== undefined ? this.rawBody : this.body,
      },
    );
    return toApiResult<Order>(response);
  }

  async sendGetOrder(id: number | string): Promise<GetOrderApiResult> {
    const response = await this.request.get(
      `${this.baseUrl}${ApiPaths.orderById(id)}`,
      {
        headers: this.headers,
      },
    );
    return toApiResult<Order>(response);
  }

  async sendDeleteOrder(id: number | string): Promise<DeleteOrderApiResult> {
    const response = await this.request.delete(
      `${this.baseUrl}${ApiPaths.orderById(id)}`,
      {
        headers: this.headers,
      },
    );
    return toApiResult<Order>(response);
  }
}
