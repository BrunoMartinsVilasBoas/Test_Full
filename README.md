# 🚀 Fulll Technical Assessment

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.36.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)

> **Complete solutions to Fulll technical tests** - Algorithm and Frontend exercises

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Project Structure](#️-project-structure)
- [⚡ Installation & Setup](#-installation--setup)
- [🧮 Algorithm Exercise](#-algorithm-exercise)
- [🎨 Frontend Exercise](#-frontend-exercise)
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

# Run linting tests
npm run lint
```

### 🎨 Frontend Exercise

```bash
# Navigate to the front folder
cd front

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting tests
npm run lint
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

## 🛠️ Technologies Used

### Core Technologies

- **React 19.1.1** - Modern UI library
- **TypeScript 5.0+** - Static typing for JavaScript
- **Vite 7.1.7** - Ultra-fast build tool
- **GitHub API** - REST API for user search

### Development Tools

- **ESLint 9.36.0** - Static code analysis
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

### Key Implementation Details

#### Frontend

- **Unique identifiers** : Added `idFull` to handle duplications
- **Timeout management** : Proper cleanup to prevent memory leaks
- **Loading states** : Improved UX with visual feedback
- **Input validation** : Empty field and whitespace checking

---
