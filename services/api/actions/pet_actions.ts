import { CreatePetApiResult, PetApiBuilder } from "../builders/pet_api_builder";
import { expect } from "@playwright/test";
import { prepareRandomPetData } from "@framework/test data/data_randomiser";
import { Pet } from "../types/pet";

export class PetActions {
  constructor(private petBuilder: PetApiBuilder) {}

  async createRandomPet(): Promise<CreatePetApiResult> {
    const pet = prepareRandomPetData();
    const createResponse = await this.petBuilder
      .withFullBody(pet as Partial<Pet>)
      .sendCreatePet();

    expect(createResponse.ok).toBeTruthy();

    return createResponse;
  }

  //TODO: create function for getting and deleting a pet with status code assertion and body not null assertion.
}
