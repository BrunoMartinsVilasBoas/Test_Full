# 🚀 Fulll Technical Assessment

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.36.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-1.56.1-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)

> **Complete solutions to Fulll technical tests** - Algorithm and Frontend exercises

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Installation & Setup](#-installation--setup)
- [🧮 Algorithm Exercise](#-algorithm-exercise)
- [🎨 Frontend Exercise](#-frontend-exercise)
- [🧪 Tests](#-tests)
- [🛠️ Technologies Used](#️-technologies-used)
- [📝 Technical Notes](#-technical-notes)

## 🎯 Overview

This repository contains my solutions to the technical exercises provided by **Fulll** as part of the recruitment process. It includes two distinct parts:

### 🧮 **Algorithm Exercise**

Implementation of the **FizzBuzz** algorithm using a modern approach with React and TypeScript.

### 🎨 **Frontend Exercise**

**GitHub user search and management application** with reactive interface and advanced features.

## 🏗️ Project Structure

```
Test_Full/
├── 📁 algo/                    # Algorithm exercise
│   ├── 📁 src/
│   │   ├── 📁 hooks/
│   │   │   └── useAlgo.ts      # Custom FizzBuzz hook
│   │   ├── App.jsx             # Main component
│   │   └── ...
│   └── package.json
├── 📁 front/                   # Frontend exercise
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── SearchInput.tsx     # Search bar
│   │   │   ├── UserList.tsx        # User list
│   │   │   ├── UserItem.tsx        # User item
│   │   │   └── ActionsSelected.tsx # Bulk actions
│   │   ├── 📁 hooks/
│   │   │   └── useUserManagement.ts # User management logic
│   │   ├── 📁 types/
│   │   │   └── github.ts           # TypeScript interfaces
│   │   ├── App.tsx                 # Main component
│   │   └── ...
│   ├── 📁 test/                # Unit tests (Jest)
│   │   ├── ActionsSelected.test.tsx
│   │   ├── SearchInput.test.tsx
│   │   ├── UserItem.test.tsx
│   │   ├── UserList.test.tsx
│   │   └── useUserManagement.test.ts
│   ├── 📁 tests/               # E2E tests (Playwright)
│   │   ├── Action.spec.ts
│   │   └── Search.spec.ts
│   ├── playwright.config.ts
│   ├── jest.config.js
│   └── package.json
└── 📄 README.md
```

## ⚡ Installation & Setup

### Prerequisites

- **Node.js** (version 18+ recommended)
- **npm** or **yarn**

### 🧮 Algorithm Exercise

```bash
# Navigate to the algo folder
cd algo

# Install dependencies
npm install

# Start development server
npm run dev

```

### 🎨 Frontend Exercise

```bash
# Navigate to the front folder
cd front

# Install dependencies
npm install

# Start development server
npm run dev


# Run unit tests (Jest)
npm run test

# Run E2E tests (Playwright)
npx playwright test

# Run E2E tests with UI
npx playwright test --ui

# View Playwright test report
npx playwright show-report
```

## 🧮 Algorithm Exercise

### Implemented Features

- ✅ **Custom `useAlgo` hook** with TypeScript
- ✅ **Optimized FizzBuzz logic** with early returns
- ✅ **React state management** for results
- ✅ **Complete JSDoc documentation**
- ✅ **Interactive user interface**

### Algorithm Logic

```typescript
// Implemented FizzBuzz rules:
// - Divisible by 3 AND 5 → 'FizzBuzz'
// - Divisible by 3 only → 'Fizz'
// - Divisible by 5 only → 'Buzz'
// - Otherwise → returns the number
```

### Usage

Enter a number in the input field and the algorithm will automatically display the corresponding FizzBuzz result.

## 🎨 Frontend Exercise

### Key Features

- **GitHub user search** via official API
- **Smart debouncing** (700ms) to optimize API requests
- **Multiple user selection** with visual management
- **Bulk actions** on selected users:
  - Duplicate users
  - Delete users
  - Reset selection
- **Centralized state management** with custom hook
- **Reactive and modern** interface
- **Complete error handling** (404, 403, 500)
- **Loading states** for better UX
- **Responsive design** for all screen sizes

### Technical Architecture

- **`useUserManagement`** : Custom hook centralizing all business logic
- **Modular components** : SearchInput, UserList, UserItem, ActionsSelected
- **Strict TypeScript** : Complete interfaces for GitHub data
- **Optimized management** : Debouncing and efficient state handling

## 🧪 Tests

The frontend project includes comprehensive test coverage with two types of tests:

### Unit Tests (Jest)

Unit tests for all components and hooks with **React Testing Library**:

- ✅ **`SearchInput.test.tsx`** : Search bar tests
- ✅ **`UserList.test.tsx`** : User list tests
- ✅ **`UserItem.test.tsx`** : Individual item tests
- ✅ **`ActionsSelected.test.tsx`** : Bulk actions tests
- ✅ **`useUserManagement.test.ts`** : Main hook tests

**Command**: `npm run test`

### End-to-End Tests (Playwright)

E2E tests to validate complete user scenarios:

#### 🔍 Search Tests (`Search.spec.ts`)

- ✅ Loading display verification
- ✅ Successful user search
- ✅ "User not found" case handling

#### ⚡ Action Tests (`Action.spec.ts`)

- ✅ Duplicate selected user
- ✅ Delete selected user
- ✅ Select all users

**Commands**:

- Normal execution: `npx playwright test`
- Interactive UI mode: `npx playwright test --ui`
- Detailed report: `npx playwright show-report`

### Test Coverage

- **Components**: 100% of components tested
- **Custom hook**: Business logic fully tested
- **E2E scenarios**: Complete user journeys validated
- **Loading states**: Testing of loading/error/success states
- **User actions**: All interactions tested

## 🛠️ Technologies Used

### Core Technologies

- **React 19.1.1** - Modern UI library
- **TypeScript 5.0+** - Static typing for JavaScript
- **Vite 7.1.7** - Ultra-fast build tool
- **GitHub API** - REST API for user search

### Development Tools

- **ESLint 9.36.0** - Static code analysis
- **Jest 30.2.0** - Unit testing framework
- **Playwright 1.56.1** - End-to-end testing
- **React Testing Library** - Testing utilities for React
- **React Hooks** - Modern state management
- **Custom Hooks** - Reusable and modular logic

## 📝 Technical Notes

### Chosen Architecture

#### Algorithm Exercise

- **Separation of concerns** : Business logic in custom hook
- **TypeScript** for type safety
- **React Hooks** for state management
- **Performance** : Early returns in FizzBuzz algorithm

#### Frontend Exercise

- **Centralized custom hook** : `useUserManagement` encapsulates all logic
- **Reusable components** : Modular and maintainable architecture
- **Strict TypeScript** : Complete interfaces to prevent errors
- **Debouncing** : API call optimization
- **Robust error handling** : Handling all possible error cases

### Applied Best Practices

- ✅ **Complete JSDoc documentation**
- ✅ **Explicit naming** for variables and functions
- ✅ **Appropriate error handling**
- ✅ **Readable and maintainable code**
- ✅ **Strict ESLint configuration**
- ✅ **Rigorous TypeScript typing**
- ✅ **Separated component/logic architecture**
- ✅ **Performance optimization** (debouncing, early returns)
- ✅ **Comprehensive testing** (unit tests with Jest + E2E tests with Playwright)
- ✅ **Test-driven development** for components and hooks

### Key Implementation Details

#### Frontend

- **Unique identifiers** : Added `idFull` to handle duplications
- **Timeout management** : Proper cleanup to prevent memory leaks
- **Loading states** : Improved UX with visual feedback
- **Input validation** : Empty field and whitespace checking

#### Tests

- **Unit testing** : Jest + React Testing Library for component isolation
- **E2E testing** : Playwright for complete user journey validation
- **Test coverage** : All components, hooks, and critical user flows tested
- **Automated testing** : CI/CD ready test suites
- **Multiple browsers** : Cross-browser testing with Playwright (Chromium, Firefox, WebKit)

---
