import { Config } from "@framework/configuration/configuration_helper";
import { APIRequestContext } from "@playwright/test";
import { ApiResult, toApiResult } from "@services/api/types/api_results";
import { Category, Pet, PetStatus, Tag } from "@services/api/types/pet";

export type CreatePetApiResult = ApiResult<Pet>;
export type GetPetApiResult = ApiResult<Pet>;
export type DeletePetApiResult = ApiResult<Pet>;

export class PetApiBuilder {
  private body: Partial<Pet> = {};
  private headers: Record<string, string> = {};
  private rawBody: unknown;

  constructor(private readonly request: APIRequestContext) {}

  withId(id: number): this {
    this.body.id = id;
    return this;
  }

  withCategory(category: Category): this {
    this.body.category = category;
    return this;
  }

  withName(name: string): this {
    this.body.name = name;
    return this;
  }

  withPhotoUrls(photoUrls: string[]): this {
    this.body.photoUrls = photoUrls;
    return this;
  }

  withTags(tags: Tag[]): this {
    this.body.tags = tags;
    return this;
  }

  withStatus(status: PetStatus): this {
    this.body.status = status;
    return this;
  }

  async sendCreatePet(): Promise<CreatePetApiResult> {
    const response = await this.request.post(`${Config.API_BASE_URL}/pet`, {
      data: this.rawBody !== undefined ? this.rawBody : this.body,
      headers: this.headers,
    });

    return toApiResult<Pet>(response);
  }

  async sendGetPet(id: number): Promise<GetPetApiResult> {
    const response = await this.request.get(`${Config.API_BASE_URL}/pet/${id}`, { 
      headers: this.headers
    });

    return toApiResult<Pet>(response);
  }

  async sendDeletePet(id: number): Promise<DeletePetApiResult> {
    const response = await this.request.delete(`${Config.API_BASE_URL}/pet/${id}`, {
      headers: this.headers
    });

    return toApiResult<Pet>(response);
  }
    
}
