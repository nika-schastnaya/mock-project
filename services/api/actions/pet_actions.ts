import {
  CreatePetApiResult,
  DeletePetApiResult,
  GetPetApiResult,
  PetApiBuilder,
  PutPetApiResult,
} from "@services/api/builders/pet_api_builder";
import { expect } from "@playwright/test";
import { prepareRandomPetData } from "@framework/test data/data_randomiser";
import { Pet } from "@services/api/types/pet";

export class PetActions {
  constructor(private petBuilder: PetApiBuilder) {}

  async createRandomPet(): Promise<CreatePetApiResult> {
    const pet = prepareRandomPetData();
    const createResponse = await this.createPet(pet);

    expect(createResponse.ok).toBeTruthy();

    return createResponse;
  }

  async createPet(pet: Partial<Pet>): Promise<CreatePetApiResult> {
    return this.petBuilder.withFullBody(pet).sendCreatePet();
  }

  async getPetByIdSuccessfully(id: number | string): Promise<GetPetApiResult> {
    const getResponse = await this.getPetById(id);

    expect(getResponse.ok).toBeTruthy();
    expect(getResponse.body).not.toBeNull();

    return getResponse;
  }

  async getPetById(id: number | string): Promise<GetPetApiResult> {
    return this.petBuilder.sendGetPet(id);
  }

  async updatePetSuccessfully(pet: Partial<Pet>): Promise<PutPetApiResult> {
    const updateResponse = await this.updatePet(pet);

    expect(updateResponse.ok).toBeTruthy();
    expect(updateResponse.body).not.toBeNull();

    return updateResponse;
  }

  async updatePet(pet: Partial<Pet>): Promise<PutPetApiResult> {
    return this.petBuilder.withFullBody(pet).sendPutPet();
  }

  async deletePetByIdSuccessfully(
    id: number | string,
  ): Promise<DeletePetApiResult> {
    const deleteResponse = await this.deletePetById(id);

    expect(deleteResponse.ok).toBeTruthy();
    expect(deleteResponse.body).not.toBeNull();
    expect(deleteResponse.body.message).toBe(String(id));

    return deleteResponse;
  }

  async deletePetById(id: number | string): Promise<DeletePetApiResult> {
    return this.petBuilder.sendDeletePet(id);
  }
}
