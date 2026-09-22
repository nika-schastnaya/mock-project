import { test, expect } from "@fixtures/api_fixture";
import { randomInt } from "node:crypto";

test.describe("get /pet/{pet_id} suite", () => {
  test("get /pet/{pet_id} happy path", async ({ apiRequestBuilder }) => {
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
    const createResponse = await apiRequestBuilder
      .petBuilder()
      .withId(data.id)
      .withName(data.name)
      .withStatus("available")
      .withCategory(data.category)
      .withTags(data.tags)
      .sendCreatePet();

    expect(createResponse.ok).toBeTruthy();

    const getResponse = await apiRequestBuilder
      .petBuilder()
      .sendGetPet(data.id);

    expect(getResponse.ok).toBeTruthy();
    expect(getResponse.body).toMatchObject(data);
  });

  test("get /pet/{pet_id} - validate non existing", async ({
    apiRequestBuilder,
  }) => {
    const id = randomInt(-120, 0);

    const getResponse = await apiRequestBuilder.petBuilder().sendGetPet(id);

    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toMatchObject({
      code: 1,
      type: "error",
      message: "Pet not found",
    });
  });

  test("get /pet/{pet_id} - validate empty id", async ({
    apiRequestBuilder,
  }) => {
    const id = "";

    const response = await apiRequestBuilder.petBuilder().sendGetPet(id);

    expect(response.status).toBe(405);
  });

  test.fail(
    "get /pet/{pet_id} - validate incorrect id",
    async ({ apiRequestBuilder }) => {
      const id = "ID";
      const response = await apiRequestBuilder.petBuilder().sendGetPet(id);

      expect(response.status).toBe(400);
    },
  );
});
