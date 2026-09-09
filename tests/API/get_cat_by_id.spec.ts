import { test, expect } from "@fixtures/page_fixture";
import { get } from "node:http";

test("", async ({ request }) => {
  const response = await request.get("https://petstore.swagger.io/v2/pet/1", {
    headers: { accept: "application/json" },
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
});
