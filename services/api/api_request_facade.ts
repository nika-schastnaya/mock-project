import { APIRequestContext } from "@playwright/test";
import { PetApiBuilder } from "@services/api/builders/pet_api_builder";
import { OrderApiBuilder } from "@services/api/builders/order_api_builder";

export class ApiRequestFacade {
  constructor(
    protected readonly request: APIRequestContext,
    protected baseUrl: string,
  ) {}

  petBuilder = () => new PetApiBuilder(this.request, this.baseUrl);
  orderBuilder = () => new OrderApiBuilder(this.request, this.baseUrl);
}
