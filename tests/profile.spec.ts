import { test, expect } from '../fixtures/auth-fixture';
import { BookStorePage } from '../pages/bookStorePage';
import { BookDetailsPage } from '../pages/bookDetailsPage';
import { ProfilePage } from '../pages/profilePage';
import { BOOK_NAME } from '../utils/constants';
import type { SelectedBookDetails } from '../utils/bookInterface';

const BASE_URL = process.env.BASE_URL!;

let addedBook: SelectedBookDetails | null = null;

test.afterEach(async ({ page }) => {
  if (!addedBook) return;

  const profilePage = new ProfilePage(page);

  await page.goto(`${BASE_URL}/profile`);

  // optional safety: check if book still exists
  try {
    await profilePage.deleteBookByISBN(addedBook.isbn);
    console.log(`Cleaned up book: ${addedBook.title}`);
  } catch (e) {
    console.warn('Cleanup skipped or failed:', e);
  }

  addedBook = null; // reset for next test
});

test('End to End test - Validate adding a book and trying to Re-Add it, should gives an error', async ({ page }) => {
  const bookStorePage = new BookStorePage(page);
  const bookDetailsPage = new BookDetailsPage(page);
  const profilePage = new ProfilePage(page);

  await page.goto(`${BASE_URL}/books`);

  await bookStorePage.searchBook(BOOK_NAME.JAVASCRIPT);
  await bookStorePage.selectBook(BOOK_NAME.JAVASCRIPT);

  const { book } = await bookDetailsPage.addToCollection();

  //For cleanup
  addedBook = book;

  await page.goto(`${BASE_URL}/profile`);
  await profilePage.verifyBookAdded(book);

  const duplicateBookResponse = await profilePage.validateAddingExistingBook(book);

  expect(duplicateBookResponse.code).toBe('1210');
});
