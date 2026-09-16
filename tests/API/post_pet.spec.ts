import { test, expect } from "@fixtures/page_fixture";
import { Config } from "@framework/configuration/configuration_helper";

test.describe("post /pet suite", () => {
  test("happy path", async ({ request }) => {
    //arrange
    const data = {
      id: 0,
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

    const { id, ...expData } = data;

    //act
    const response = await request.post(`${Config.API_BASE_URL}/pet`, {
      headers: { accept: "application/json" },
      data: data,
    });

    //assert
    expect(response.status()).toBe(200);
    const resBody = await response.json();
    expect(resBody).toMatchObject(expData);
  });
});
