import { ApiRequestFacade } from "@services/api/api_request_facade";
import { test as base, request } from "@playwright/test";
import { Config } from "@framework/configuration/configuration_helper";

type ApiUtils = {
  apiRequestBuilder: ApiRequestFacade;
};

export const test = base.extend<ApiUtils>({
  apiRequestBuilder: async ({ request }, use) => {
    await use(new ApiRequestFacade(request, Config.API_BASE_URL));
  },
});

export { expect } from "@playwright/test";
