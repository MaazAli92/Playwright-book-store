import { Page, Locator, expect } from '@playwright/test';
import { SelectedBookDetails } from '../utils/bookInterface';
import { USER_ACTION } from '../utils/constants';

export class ProfilePage {
  readonly page: Page;
  readonly confirmDeleteButton: Locator;
  readonly addToCollectionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmDeleteButton = page.locator('#closeSmallModal-ok');
    this.addToCollectionButton = page.getByText(USER_ACTION.ADD_COLLECTION);
  }

  private bookRowByISBN(isbn: string): Locator {
    return this.page.locator(`tr:has(#delete-record-${isbn})`);
  }

  private deleteButtonByISBN(isbn: string): Locator {
    return this.page.locator(`#delete-record-${isbn}`);
  }

  private titleLinkByISBN(isbn: string): Locator {
    return this.page.locator(`a[href*="${isbn}"]`);
  }

  private authorCellByISBN(isbn: string): Locator {
    return this.bookRowByISBN(isbn).locator('td').nth(2);
  }

  private publisherCellByISBN(isbn: string): Locator {
    return this.bookRowByISBN(isbn).locator('td').nth(3);
  }

  private deleteButtonByTitle(title: string): Locator {
    return this.page.locator(`tr:has-text("${title}") span[title="Delete"]`);
  }

  async verifyBookAdded(book: SelectedBookDetails) {
    const row = this.bookRowByISBN(book.isbn);

    // Validating Title, Author and Publisher
    await expect(row).toBeVisible();
    await expect(this.titleLinkByISBN(book.isbn)).toHaveText(book.title);
    await expect(this.authorCellByISBN(book.isbn)).toHaveText(book.author);
    await expect(this.publisherCellByISBN(book.isbn)).toHaveText(book.publisher);
  }

  async deleteBook(title: string) {
    await this.deleteButtonByTitle(title).click();
    await this.confirmDeleteButton.click();
  }

  async deleteBookByISBN(isbn: string) {
    const row = this.bookRowByISBN(isbn);

    await this.deleteButtonByISBN(isbn).click();
    await this.confirmDeleteButton.click();
    // wait for row to disappear
    await row.waitFor({ state: 'detached' });
  }

  async validateAddingExistingBook(book: SelectedBookDetails) {
    const row = this.bookRowByISBN(book.isbn);
    const titleLink = this.titleLinkByISBN(book.isbn);

    await expect(row).toBeVisible();
    await expect(titleLink).toHaveText(book.title);

    await titleLink.click();

    await expect(this.page).toHaveURL(new RegExp(`/books\\?search=${book.isbn}`));

    const dialogPromise = this.page.waitForEvent('dialog');
    const addBookResponsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/BookStore/v1/Books') && response.request().method() === 'POST'
    );

    await this.addToCollectionButton.click();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Book already present in the your collection!');
    await dialog.accept();

    const addBookResponse = await addBookResponsePromise;
    expect(addBookResponse.status()).toBe(400);

    const responseBody = await addBookResponse.json();
    expect(responseBody.code).toBe('1210');
    expect(responseBody.message).toBe("ISBN already present in the User's Collection!");

    return responseBody;
  }
}
