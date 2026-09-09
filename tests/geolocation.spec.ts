import { test, expect } from "@fixtures/page_fixture";

test.describe("geolocation suite", () => {
  test("happy path with current geolocation", async ({
    geolocationPage,
    context,
  }) => {
    await geolocationPage.goto();
    await context.setGeolocation({
      longitude: 21.070826326603346,
      latitude: 52.253710043191376,
    });
    await geolocationPage.geoButton.click();

    await expect(geolocationPage.longValue).toContainText("21.07");
    await expect(geolocationPage.latValue).toContainText("52.25");
  });

  test.use({
    permissions: ["geolocation"],
    geolocation: { latitude: 40.7829154, longitude: -73.9589494 },
  });
  test("New-York geolocation", async ({ geolocationPage }) => {
    await geolocationPage.goto();

    await geolocationPage.geoButton.click();

    await expect(geolocationPage.longValue).toContainText("-73.95");
    await expect(geolocationPage.latValue).toContainText("40.78");
  });
});
