import { test, expect } from '../fixtures/auth-fixture';
import { BookStorePage } from '../pages/bookStorePage';
import { BookDetailsPage } from '../pages/bookDetailsPage';
import { ProfilePage } from '../pages/profilePage';
import { BOOK_NAME } from '../utils/constants';

const BASE_URL = process.env.BASE_URL!;

test('Add a book to collection and than Delete it', async ({ page }) => {
  const bookStorePage = new BookStorePage(page);
  const bookDetailsPage = new BookDetailsPage(page);
  const profilePage = new ProfilePage(page);

  await page.goto(`${BASE_URL}/books`);

  // I have used enums instead of passing hardcoded parameters
  await bookStorePage.searchBook(BOOK_NAME.GIT);
  await bookStorePage.selectBook(BOOK_NAME.GIT);

  //Adding Book to the collection and storing the details in Interface
  const { book } = await bookDetailsPage.addToCollection();

  expect(book.title).toBe(BOOK_NAME.GIT);

  await page.goto(`${BASE_URL}/profile`);
  await profilePage.verifyBookAdded(book);

  await profilePage.deleteBook(book.title);
});

//this is a separate test only to delete
test('Delete a book from collection', async ({ page }) => {
  const profilePage = new ProfilePage(page);
  await page.goto(`${BASE_URL}/profile`);
  await profilePage.deleteBook(BOOK_NAME.GIT);
});
