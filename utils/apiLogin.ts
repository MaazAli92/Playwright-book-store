import { Browser, request as playwrightRequest } from '@playwright/test';

const BASE_URL = process.env.BASE_URL!;
const USERNAME = process.env.USERNAME!;
const PASSWORD = process.env.PASSWORD!;

export async function generateStorageState(browser: Browser, storagePath = 'storageState.json') {
  const apiContext = await playwrightRequest.newContext();

  // 1) Generate token
  const tokenRes = await apiContext.post(`${BASE_URL}/Account/v1/GenerateToken`, {
    data: {
      userName: USERNAME,
      password: PASSWORD
    }
  });

  if (!tokenRes.ok()) {
    throw new Error(`GenerateToken failed: ${tokenRes.status()}`);
  }

  const tokenBody = await tokenRes.json();
  const token = tokenBody.token as string | undefined;

  if (!token) {
    throw new Error('GenerateToken did not return a token');
  }

  // 2) Login
  const loginRes = await apiContext.post(`${BASE_URL}/Account/v1/Login`, {
    data: {
      userName: USERNAME,
      password: PASSWORD
    }
  });

  if (!loginRes.ok()) {
    throw new Error(`Login failed: ${loginRes.status()}`);
  }

  const loginBody = await loginRes.json();
  const userId = loginBody.userId as string | undefined;
  const returnedUsername = (loginBody.username || USERNAME) as string;

  if (!userId) {
    throw new Error('Login response did not return userId');
  }

  // 3) Validate user
  const userRes = await apiContext.get(`${BASE_URL}/Account/v1/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!userRes.ok()) {
    throw new Error(`User validation failed: ${userRes.status()}`);
  }

  await apiContext.dispose();

  // 4) Browser context for storage state creation
  const context = await browser.newContext();

  // Block third-party requests so auth state does not get polluted
  const baseHost = new URL(BASE_URL).hostname;
  await context.route('**/*', async (route) => {
    const requestUrl = new URL(route.request().url());

    // allow same-host requests only
    if (requestUrl.hostname === baseHost) {
      await route.continue();
      return;
    }

    await route.abort();
  });

  const page = await context.newPage();

  // 5) Open app origin first
  await page.goto(`${BASE_URL}/profile`, { waitUntil: 'domcontentloaded' });

  // 6) Set localStorage ONLY for demoqa.com origin
  await page.evaluate(
    ({ token, userId, userName }) => {
      window.localStorage.clear();
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('userID', userId);
      window.localStorage.setItem('userName', userName);
    },
    {
      token,
      userId,
      userName: returnedUsername
    }
  );

  await page.reload({ waitUntil: 'domcontentloaded' });

  await context.storageState({ path: storagePath });

  await context.close();

  console.log(`storageState.json created at ${storagePath}`);
}
