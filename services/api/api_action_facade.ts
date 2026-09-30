import { PetActions } from "./actions/pet_actions";
import { ApiRequestFacade } from "./api_request_facade";
import { PetImageActions } from "./actions/pet_image_actions";

export class ApiActionFacade {
  constructor(private apiRequestFacade: ApiRequestFacade) {}

  petActions = () => new PetActions(this.apiRequestFacade.petBuilder());
  petImageActions = () =>
    new PetImageActions(this.apiRequestFacade.petImageBuilder());
}
