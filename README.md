# Jeroen Admin Dashboard 🎨

A premium, high-fidelity admin dashboard for managing the Jeroen Recipe App ecosystem. Built with React, TypeScript, and Vite.

## ✨ Features

- **Recipe Management**: Standardized interface for adding, editing, and deleting recipes.
- **User Management**: Overview and management of registered users.
- **Advanced Search & Filtering**: Fast, debounced search and category-based filtering for 800+ recipes.
- **Responsive Design**: Clean, modern UI optimized for desktop management.
- **Rich Media**: Support for recipe image uploads and previews.
- **Real-time Updates**: Powered by Redux Toolkit Query (RTK Query) for seamless data synchronization.

## 🛠 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Redux Toolkit & RTK Query
- **Styling**: Vanilla CSS (Custom premium design system)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Configuration
Ensure the backend is running at `http://localhost:5000` or update the `baseUrl` in `src/services/api/recipeApi.ts`.

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🏗 Project Structure

- `src/components/`: Reusable UI components (RecipeModal, RecipeTable, etc.)
- `src/pages/`: Main page views (RecipeManagement, UserManagement)
- `src/services/`: API services and custom hooks (RTK Query)
- `src/store/`: Redux store configuration
- `src/assets/`: Global styles and static assets
