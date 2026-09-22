import { test, expect } from "@fixtures/api_fixture";

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
