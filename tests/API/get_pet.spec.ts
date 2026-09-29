import { test, expect } from "@fixtures/api_fixture";
import { randomInt } from "node:crypto";

test.describe("get /pet/{pet_id} suite", () => {
  test("get /pet/{pet_id} happy path", async ({ apiActions }) => {
    //Arrange
    const createdPet = await apiActions.petActions().createRandomPet();

    //Act
    const getResponse = await apiActions
      .petActions()
      .getPetByIdSuccessfully(createdPet.body.id);

    //Assert
    expect(getResponse.body).toMatchObject(createdPet.body);
  });

  test("get /pet/{pet_id} - validate non existing", async ({ apiActions }) => {
    const id = randomInt(-120, 0);

    const res = await apiActions.petActions().getPetById(id);

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      code: 1,
      type: "error",
      message: "Pet not found",
    });
  });

  test("get /pet/{pet_id} - validate empty id", async ({ apiActions }) => {
    const id = "";

    const response = await apiActions.petActions().getPetById(id);

    expect(response.status).toBe(405);
  });

  test.fail(
    "get /pet/{pet_id} - validate incorrect id",
    async ({ apiActions }) => {
      const id = "ID";
      const response = await apiActions.petActions().getPetById(id);

      expect(response.status).toBe(400);
    },
  );
});
