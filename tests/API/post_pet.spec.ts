import { test, expect } from "@fixtures/api_fixture";
//TODO: refactor to the new system and add post conditions
//TODO: add upload_image endpoint coverage
//TODO: add put endpoint and coverage
//TODO: add delete endpoint coverage

test.describe("post /pet suite", () => {
  test("happy path", async ({ apiRequestBuilder }) => {
    //arrange
    const data = {
      category: {
        id: 1,
        name: "puppy",
      },
      name: "Cynamonek",
      photoUrls: [],
      tags: [
        {
          id: 1,
          name: "pots",
        },
      ],
      status: "available",
    };

    //act
    const response = await apiRequestBuilder
      .petBuilder()
      .withCategory(data.category)
      .withName(data.name)
      .withPhotoUrls(data.photoUrls)
      .withStatus("available")
      .withTags(data.tags)
      .sendCreatePet();

    //assert
    expect(response.ok).toBeTruthy();
    expect(response.body).toMatchObject(data);
  });
});
