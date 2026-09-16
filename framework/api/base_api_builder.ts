import { APIRequestContext } from "@playwright/test";

export abstract class BaseApiBuilder {
    constructor (protected readonly request: APIRequestContext, protected baseUrl: string) {
    }
}