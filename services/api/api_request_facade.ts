import { APIRequestContext } from "@playwright/test";
import { PetApiBuilder } from "./builders/pet_api_builder";

export class ApiRequestFacade {
    constructor (protected readonly request: APIRequestContext, protected baseUrl: string) {
    }

    petBuilder = () => new PetApiBuilder (this.request, this.baseUrl);
}