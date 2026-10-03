import { ApiRequestFacade } from "@services/api/api_request_facade";
import { test as base, request } from "@playwright/test";
import { Config } from "@framework/configuration/configuration_helper";
import { ApiActionFacade } from "@services/api/api_action_facade";
import { PathHelper } from "@framework/utils/path_helper";
import { CleaupRegistry } from "@framework/utils/cleanup_helper";

type ApiUtils = {
  apiRequestBuilder: ApiRequestFacade;
  apiActions: ApiActionFacade;
  pathHelper: PathHelper;
  cleanup: CleaupRegistry;
};

export const test = base.extend<ApiUtils>({
  apiRequestBuilder: async ({ request }, use) => {
    await use(new ApiRequestFacade(request, Config.API_BASE_URL));
  },
  apiActions: async ({ apiRequestBuilder }, use) => {
    await use(new ApiActionFacade(apiRequestBuilder));
  },
  pathHelper: new PathHelper(),
  cleanup: async ({}, use) => {
    const cleanup = new CleaupRegistry();
    await use(cleanup);
    await cleanup.run();
  },
});

export { expect } from "@playwright/test";
