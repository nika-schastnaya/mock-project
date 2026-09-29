import { faker } from "@faker-js/faker";
import { Pet, PetStatus } from "@services/api/types/pet";

export function prepareRandomPetData(status: PetStatus = "available"): Pet {
  return {
    id: faker.number.int({ min: 0, max: 9999 }),
    category: {
      id: faker.number.int({ min: 0 }),
      name: faker.animal.type(),
    },
    name: faker.animal.petName(),
    photoUrls: [],
    tags: [
      {
        id: faker.number.int({ min: 0 }),
        name: faker.word.noun(),
      },
    ],
    status,
  };
}
