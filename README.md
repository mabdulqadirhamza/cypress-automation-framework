# Cypress E2E Test Automation Framework

End-to-end test automation framework for [Demo Web Shop](https://demowebshop.tricentis.com/) using Cypress.

## 📋 Features

- Page Object Model (POM) design pattern
- Reusable selector files
- Custom Cypress commands
- Test data management with fixtures
- Comprehensive test coverage for e-commerce flows
- Screenshot capture on failures

## 🛠️ Tech Stack

- **Cypress** v15.7.0
- **Node.js**
- **JavaScript**
- **cypress-real-events** v1.15.0

## 📁 Project Structure

```
cypress-automation/
├── cypress/
│   ├── e2e/                    # Test specs
│   │   ├── registration/       # User registration tests
│   │   ├── login/              # Login & authentication tests
│   │   ├── search/             # Search functionality tests
│   │   ├── plp/                # Product listing page tests
│   │   ├── pdp/                # Product detail page tests
│   │   ├── add_to_cart/        # Add to cart tests
│   │   ├── shopping_cart/      # Shopping cart tests
│   │   ├── checkout/           # Checkout flow tests
│   │   ├── my_account/         # User account tests
│   │   ├── wishlist/           # Wishlist tests
│   │   ├── shipping/           # Shipping tests
│   │   └── dashboard/          # Dashboard tests
│   ├── fixtures/               # Test data
│   │   ├── users.json          # User credentials
│   │   └── profile.json        # Profile data
│   ├── pages/                  # Page objects
│   │   ├── homePage.js
│   │   └── searchPage.js
│   ├── support/                # Support files
│   │   ├── commands.js         # Custom commands
│   │   ├── e2e.js              # Global config
│   │   └── *Selectors.js       # Element selectors
│   └── screenshots/            # Test screenshots
├── cypress.config.js           # Cypress configuration
├── package.json
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mabdulqadirhamza/cypress-automation-framework
cd cypress-automation-framework
```

2. Install dependencies:
```bash
npm install
```

3. Update test credentials in `cypress/fixtures/users.json`:
```json
{
  "defaultUser": {
    "email": "your-test-email@example.com",
    "password": "your-test-password"
  }
}
```

## ▶️ Running Tests

### Open Cypress Test Runner (GUI Mode)
```bash
npx cypress open
```

### Run All Tests (Headless Mode)
```bash
npx cypress run
```

### Run All Tests (Headed Mode)
```bash
npm run test:all
```

### Run Specific Test File
```bash
npx cypress run --spec "cypress/e2e/login/login.cy.js"
```

### Run Tests in Specific Browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## 📝 Test Modules

| Module | Test Count | Description |
|--------|------------|-------------|
| Registration | 22 | User registration validations |
| Login | 24 | Authentication & session tests |
| Search | - | Product search functionality |
| PLP | - | Product listing & filters |
| PDP | - | Product details & variants |
| Add to Cart | - | Add products to cart |
| Shopping Cart | - | Cart operations |
| Checkout | - | Order placement flow |
| My Account | - | User profile management |
| Wishlist | - | Wishlist operations |

## 🔧 Configuration

Key configurations in `cypress.config.js`:

```javascript
{
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    watchForFileChanges: true,
    experimentalStudio: true
  }
}
```

## 📦 Custom Commands

Located in `cypress/support/commands.js`:

- `cy.login(email, password)` - Login with credentials
- `cy.visitHomePage()` - Navigate to homepage

## 🎯 Best Practices

- Selectors are centralized in `support/*Selectors.js` files
- Test data is managed through fixtures
- Page objects for reusable page interactions
- Descriptive test case IDs (e.g., TC_LOGIN_001)
- Independent test cases with proper setup/teardown

## 📸 Screenshots & Videos

- Screenshots are automatically captured on test failures
- Stored in `cypress/screenshots/`
- Videos stored in `cypress/videos/` (gitignored)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📄 License

This project is for educational and testing purposes.

## 🔗 Application Under Test

[Demo Web Shop](https://demowebshop.tricentis.com/)
