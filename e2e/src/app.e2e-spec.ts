import { AppPage } from "./app.po";
import { browser, logging } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toContain("eShop");
  });

  it("should navigate to PDP", async () => {
    await page.navigateToPDP();
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toContain("/pdp");
  });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);

  //   console.log("\n\n\n logs =-----> ", logs);

  //   browser.sleep(5000);

  //   expect(logs).not.toContain(
  //     jasmine.objectContaining({
  //       level: logging.Level.SEVERE,
  //     } as logging.Entry)
  //   );
  // });
});
