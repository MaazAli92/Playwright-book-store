# 📚 Playwright Book Store Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Testing-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![CI](https://github.com/MaazAli92/playwright-book-store/actions/workflows/playwright.yml/badge.svg)
![Status](https://img.shields.io/badge/Status-Active-success)

A **Playwright + TypeScript** automation framework built using **Page Object Model (POM)**, fixtures, and session-based authentication.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

2. Install Playwright browsers
npx playwright install

3. Run tests

npx playwright test

⚙️ Environment Configuration
Create a .env file in the root directory:

BASE_URL=https://demoqa.com
USERNAME=book_store123
PASSWORD=BookStore@123
USERID=bf478f5f-114b-4fff-a1e3-cc86c6cef051

🧱 Framework Architecture
The framework follows Page Object Model (POM) and clean separation of concerns.
📊 High-Level Architecture

architecture_diagram.png

🔐 Authentication Flow

authentication_flow.png

📁 Folder Structure Overview
.
├── fixtures/
│   └── auth-fixture.ts
├── pages/
│   ├── bookDetailsPage.ts
│   ├── bookStorePage.ts
│   ├── loginPage.ts
│   └── profilePage.ts
├── tests/
│   ├── auth.setup.ts
│   ├── bookstore.spec.ts
│   ├── login.spec.ts
│   └── profile.spec.ts
├── utils/
│   ├── apiLogin.ts
│   ├── bookInterface.ts
│   └── constants.ts
├── playwright/.auth/
│   └── user.json
├── playwright.config.ts
├── .env
└── README.md

🧩 Key Components
🔹 Page Object Model (POM)
All UI interactions are encapsulated in pages/
Each page contains:
locators
actions
reusable methods

🔹 Fixtures
Located in fixtures/auth-fixture.ts
Used to inject dependencies like page
Keeps tests clean and reusable

🔹 Tests
Located in tests/
Focus only on test logic and assertions
Use page classes for actions

🔹 Utils
constants.ts → Enums and static values
bookInterface.ts → Type-safe API models

🔐 Authentication Strategy
This framework uses Playwright setup project (auth.setup.ts) for authentication.

How it works:
auth.setup.ts runs first
Performs UI login
Saves session → playwright/.auth/user.json
All other tests reuse this session

🧪 Test Types

🔹 Authenticated Tests
Run with saved session
Skip login
Faster execution

🔹 Login Tests
Run separately
No stored session
Validate:
valid login
invalid login

🧹 Test Cleanup
Books added during tests are removed via afterEach
Ensures:
clean state
repeatable runs

🛠️ Commands
Run all tests
npx playwright test
Run authenticated tests only
npx playwright test --project="Book Store"
Run login tests only
npx playwright test --project=login
Run headed
npx playwright test --headed

📊 Reports
npx playwright show-report

Report location:
playwright-report/

Best Practices Implemented
✅ Page Object Model (POM)
✅ TypeScript typing
✅ API + UI validation
✅ Auth session reuse
✅ Clean architecture
✅ Test isolation
✅ Stable locators
```

📘 Playwright API Automation Framework
A scalable Playwright + TypeScript API test framework built to test all endpoints of:

Restful Booker API

📂 Project Structure

pages/
api/
auth.api.ts
booking.api.ts
ping.api.ts

data/
auth.data.ts
booking.data.ts

utils/
bookInterface.ts // types (request/response models)
date.ts // date utilities

tests/
api/
auth.spec.ts
booking-create.spec.ts
booking-delete.spec.ts
booking-get.spec.ts
booking-patch.spec.ts
booking-put.spec.ts
ping.spec.ts

playwright.config.ts

🧱 Framework Design
🔹 API Layer (pages/api)
Encapsulates all HTTP requests.

🔹 Data Layer (pages/data)
Reusable test data and payload builders.

🔹 Types (pages/utils/bookInterface.ts)
Contains all request and response models.

🔹 Utilities (pages/utils/date.ts)
Handles dynamic date generation:
Ensures checkin and checkout follow YYYY-MM-DD
Supports future date creation for test stability

🔹 Test Layer (tests/api)
Contains:

Test scenarios
Assertions
API chaining (CRUD flows)
