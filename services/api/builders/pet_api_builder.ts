import { BaseApiBuilder } from "@framework/api/base_api_builder";
import { APIRequestContext } from "@playwright/test";
import { ApiResult, toApiResult } from "@services/api/types/api_results";
import { Category, Pet, PetStatus, Tag } from "@services/api/types/pet";
import { ApiPaths } from "@services/api/constants/api_urls";

export type CreatePetApiResult = ApiResult<Pet>;
export type GetPetApiResult = ApiResult<Pet>;
export type DeletePetApiResult = ApiResult<Pet>;

export class PetApiBuilder extends BaseApiBuilder {
  private body: Partial<Pet> = {};
  private headers: Record<string, string> = {};
  private rawBody: unknown;

  constructor(
    protected readonly request: APIRequestContext,
    protected baseUrl: string,
  ) {
    super(request, baseUrl);
  }

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
    const response = await this.request.post(`${this.baseUrl}${ApiPaths.pet}`, {
      data: this.rawBody !== undefined ? this.rawBody : this.body,
      headers: this.headers,
    });

    return toApiResult<Pet>(response);
  }

  async sendGetPet(id: number | string): Promise<GetPetApiResult> {
    const response = await this.request.get(
      `${this.baseUrl}${ApiPaths.petById(id)}`,
      {
        headers: this.headers,
      },
    );

    return toApiResult<Pet>(response);
  }

  async sendDeletePet(id: string): Promise<DeletePetApiResult> {
    const response = await this.request.delete(
      `${this.baseUrl}${ApiPaths.petById(id)}`,
      {
        headers: this.headers,
      },
    );

    return toApiResult<Pet>(response);
  }
}
