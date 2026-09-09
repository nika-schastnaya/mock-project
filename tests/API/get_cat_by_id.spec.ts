import { test, expect } from "@fixtures/page_fixture";
import { Config } from "@framework/configuration/configuration_helper";
import { get } from "node:http";

test("get /pet/{pet_id} happy path", async ({ request }) => {
  const response = await request.get(`${Config.API_BASE_URL}/pet/1`, {
    headers: { accept: "application/json" },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
});
