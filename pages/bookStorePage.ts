import { Page, Locator } from '@playwright/test';

export class BookStorePage {
  readonly page: Page;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#searchBox');
  }

  private bookLink(title: string): Locator {
    return this.page.getByRole('link', { name: title });
  }

  async searchBook(title: string) {
    await this.searchInput.fill(title);
  }

  async selectBook(title: string) {
    await this.bookLink(title).click();
  }
}
