import { browser, by, element } from "protractor";

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css("app-root .navbar-brand")).getText();
  }

  async navigateToPDP(): Promise<any> {
    const card = element.all(by.css("app-root .product-card__wrapper")).first();

    await card.click();
  }
}
