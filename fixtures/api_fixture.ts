import { ApiRequestFacade } from "@services/api/api_request_facade";
import { test as base, request } from "@playwright/test";
import { Config } from "@framework/configuration/configuration_helper";
import { ApiActionFacade } from "@services/api/api_action_facade";

type ApiUtils = {
  apiRequestBuilder: ApiRequestFacade;
  apiActions: ApiActionFacade;
};

export const test = base.extend<ApiUtils>({
  apiRequestBuilder: async ({ request }, use) => {
    await use(new ApiRequestFacade(request, Config.API_BASE_URL));
  },
  apiActions: async ({ apiRequestBuilder }, use) => {
    await use(new ApiActionFacade(apiRequestBuilder));
  },
});

export { expect } from "@playwright/test";
