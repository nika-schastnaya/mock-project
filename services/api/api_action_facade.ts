import { PetActions } from "./actions/pet_actions";
import { ApiRequestFacade } from "./api_request_facade";

export class ApiActionFacade {
  constructor(private apiRequestFacade: ApiRequestFacade) {}

  petActions = () => new PetActions(this.apiRequestFacade.petBuilder());
}
