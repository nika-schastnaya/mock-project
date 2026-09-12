import { test, expect } from "@fixtures/page_fixture";
import { Config } from "@framework/configuration/configuration_helper";
import { randomInt } from "node:crypto";
import { get } from "node:http";

test.describe("get /pet/{pet_id} suite", () => {
  test("get /pet/{pet_id} happy path", async ({ request }) => {
    const id = randomInt(1, 9999);
    const createResponse = await request.put(`${Config.API_BASE_URL}/pet`, {
      data: {
        id: id,
        category: {
          id: 1,
          name: "puppy",
        },
        name: "Pierniczek | Precelek | Cynamonek",
        photoUrls: [],
        tags: [
          {
            id: 1,
            name: "pots",
          },
        ],
        status: "available",
      },
    });
    expect(createResponse.status()).toBe(200);
    const response = await request.get(`${Config.API_BASE_URL}/pet/${id}`, {
      headers: { accept: "application/json" },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("category");
    expect(responseBody).toHaveProperty("name");
    expect(responseBody).toHaveProperty("photoUrls");
    expect(responseBody).toHaveProperty("tags");
    expect(responseBody).toHaveProperty("status");
  });

  test("get /pet/{pet_id} - validate non existing", async ({ request }) => {
    const id = randomInt(-120, 0);
    const response = await request.get(`${Config.API_BASE_URL}/pet/${id}`, {
      headers: { accept: "application/json" },
    });
    expect(response.status()).toBe(404);
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
      code: 1,
      type: "error",
      message: "Pet not found",
    });
  });

  test("get /pet/{pet_id} - validate empty id", async ({ request }) => {
    const id = "";
    const response = await request.get(`${Config.API_BASE_URL}/pet/${id}`, {
      headers: { accept: "application/json" },
    });
    expect(response.status()).toBe(405);
    console.log(response.json());
  });

  test.fail(
    "get /pet/{pet_id} - validate incorrect id",
    async ({ request }) => {
      const id = "ID";
      const response = await request.get(`${Config.API_BASE_URL}/pet/${id}`, {
        headers: { accept: "application/json" },
      });
      expect(response.status()).toBe(400);
      console.log(response.json());
    },
  );
});
