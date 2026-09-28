import { test, expect } from "@fixtures/api_fixture";
import { randomInt } from "node:crypto";

// TODO: refactor existing tests to the new system
test.describe("get /pet/{pet_id} suite", () => {
  test("get /pet/{pet_id} happy path", async ({
    apiRequestBuilder,
    apiActions,
  }) => {
    //Arrange
    const createdPet = await apiActions.petActions().createRandomPet();

    //Act
    const getResponse = await apiRequestBuilder
      .petBuilder()
      .sendGetPet(createdPet.body.id);

    //Assert
    expect(getResponse.ok).toBeTruthy();
    expect(getResponse.body).toMatchObject(createdPet.body);
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
