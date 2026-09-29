import { test, expect } from "@fixtures/api_fixture";
import { prepareRandomPetData } from "@framework/test data/data_randomiser";
//TODO: add post conditions
//TODO: add upload_image endpoint coverage
//TODO: add put endpoint and coverage
//TODO: add delete endpoint coverage

test.describe("post /pet suite", () => {
  test("happy path", async ({ apiActions }) => {
    //arrange
    const pet = prepareRandomPetData();

    //act
    const response = await apiActions.petActions().createPet(pet);

    //assert
    expect(response.ok).toBeTruthy();
    expect(response.body).toMatchObject(pet);
  });

  test.fail("empty object in body", async ({ apiActions }) => {
    const pet = {};

    const response = await apiActions.petActions().createPet(pet);

    expect(response.status).toBe(405);
  });
});
