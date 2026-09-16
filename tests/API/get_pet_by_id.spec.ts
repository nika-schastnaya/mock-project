import { test, expect } from "@fixtures/api_fixture";
import { Config } from "@framework/configuration/configuration_helper";
import { PetApiBuilder } from "@services/api/builders/pet_api_builder";
import { randomInt } from "node:crypto";

test.describe("get /pet/{pet_id} suite", () => {
  test("get /pet/{pet_id} happy path 2.0", async ({ apiRequestBuilder }) => {
    const id = randomInt(1, 9999);
    console.log(id);
    const data = {
      id: id,
      category: {
        id: 1,
        name: "puppy",
      },
      name: "Pierniczek",
      photoUrls: [],
      tags: [
        {
          id: 1,
          name: "pots",
        },
      ],
      status: "available",
    };
    const createResponse = await apiRequestBuilder.petBuilder()
    .withId(data.id)
    .withName(data.name)
    .withStatus('available')
    .withCategory(data.category)
    .withTags(data.tags)
    .sendCreatePet();

    expect(createResponse.ok).toBeTruthy();
    
    const getResponse = await apiRequestBuilder.petBuilder()
    .sendGetPet(data.id);

    expect (getResponse.ok).toBeTruthy();
    expect (getResponse.body).toMatchObject(data);

  });

  test("get /pet/{pet_id} happy path", async ({ request }) => {
    const id = randomInt(1, 9999);
    const data = {
      id: id,
      category: {
        id: 1,
        name: "puppy",
      },
      name: "Pierniczek",
      photoUrls: [],
      tags: [
        {
          id: 1,
          name: "pots",
        },
      ],
      status: "available",
    };
    const createResponse = await request.post(`${Config.API_BASE_URL}/pet`, {
      data: data,
    });
    expect(createResponse.status()).toBe(200);
    const response = await request.get(`${Config.API_BASE_URL}/pet/${id}`, {
      headers: { accept: "application/json" },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toMatchObject(data);
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
  });

  test.fail(
    "get /pet/{pet_id} - validate incorrect id",
    async ({ request }) => {
      const id = "ID";
      const response = await request.get(`${Config.API_BASE_URL}/pet/${id}`, {
        headers: { accept: "application/json" },
      });
      expect(response.status()).toBe(400);
    },
  );
});
