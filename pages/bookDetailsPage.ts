import { Page } from '@playwright/test';
import { USER_ACTION } from '../utils/constants';
import type { SelectedBookDetails } from '../utils/bookInterface';

export class BookDetailsPage {
  constructor(private page: Page) {}

  async addToCollection(): Promise<{ book: SelectedBookDetails }> {
    const [bookResponse] = await Promise.all([
      this.page.waitForResponse((response) => {
        return response.request().method() === 'GET' && response.url().includes('/BookStore/v1/Book?ISBN=') && response.status() === 200;
      }),
      this.page.locator(`text=${USER_ACTION.ADD_COLLECTION}`).click()
    ]);

    const book = (await bookResponse.json()) as SelectedBookDetails;
    return { book };
  }
}
