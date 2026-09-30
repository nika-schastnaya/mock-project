import { expect, test } from "@fixtures/api_fixture";
import { prepareRandomPetData } from "@framework/test data/data_randomiser";
import { randomInt } from "node:crypto";

test.describe("put /pet suite", () => {
  test("put /pet happy path", async ({ apiActions }) => {
    const pet = prepareRandomPetData();
    const response = await apiActions.petActions().updatePetSuccessfully(pet);

    expect(response.body).toMatchObject(pet);
  });

  test("put /pet - empty object creates new record", async ({ apiActions }) => {
    const pet = {};
    const response = await apiActions.petActions().updatePetSuccessfully(pet);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      photoUrls: [],
      tags: [],
    });
  });

  test.fail("put /pet - validation not found id", async ({ apiActions }) => {
    let pet = prepareRandomPetData();
    pet.id = randomInt(-999, 0);

    const response = await apiActions.petActions().updatePet(pet);
    expect(response.status).toBe(400);
    expect(response.body).toBe;
  });
});
