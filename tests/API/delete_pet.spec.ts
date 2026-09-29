import { expect, test } from "@fixtures/api_fixture";
import { randomInt } from "crypto";

test.describe("delete /pet/{pet_id} suite", () => {
  test("delete /pet/{id} happy path", async ({ apiActions }) => {
    const pet = await apiActions.petActions().createRandomPet();

    await apiActions.petActions().deletePetByIdSuccessfully(pet.body.id);
  });

  test("delete /pet/{id} - validate non-existing id", async ({
    apiActions,
  }) => {
    const id = randomInt(-9999, 0);

    const response = await apiActions.petActions().deletePetById(id);

    expect(response.status).toBe(404);
    expect(response.body).toBeUndefined();
  });

  test("delete /pet/{id} - repeat on the same object", async ({
    apiActions,
  }) => {
    const pet = await apiActions.petActions().createRandomPet();

    await apiActions.petActions().deletePetByIdSuccessfully(pet.body.id);
    const response = await apiActions.petActions().deletePetById(pet.body.id);

    expect(response.status).toBe(404);
    expect(response.body).toBeUndefined();
  });

  test("delete /pet/{id} - validate empty id", async ({ apiActions }) => {
    const id = "";

    const response = await apiActions.petActions().deletePetById(id);

    expect(response.status).toBe(405);
  });

  test.fail("delete /pet/{id} - validate text id", async ({ apiActions }) => {
    const id = "ID";

    const response = await apiActions.petActions().deletePetById(id);

    expect(response.status).toBe(405);
  });
});
