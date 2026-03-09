# React User Catalog

A user catalog built with React and TypeScript, powered by the [DummyJSON](https://dummyjson.com/docs/users) public API.

## Features

- Browse a paginated list of users (12 per page)
- Search users by name with debounced input
- URL-synced state — search query and page survive refresh and browser navigation
- Responsive card grid (1 → 2 → 3 → 4 columns)
- Skeleton loading screens matching card dimensions
- Image fallback for missing avatars
- Error boundary with retry
- Fully accessible (ARIA labels, semantic HTML, keyboard navigation)

## Project structure

```
src/
├── components/     # Reusable UI — UserCard, SearchBar, Pagination, Skeleton, EmptyState, ErrorBoundary
├── config/         # Shared constants (BASE_URL, PAGE_SIZE)
├── hooks/          # useUsers — data fetching, debounce, abort, URL sync
├── pages/          # UsersPage — page-level layout and composition
├── services/       # userService — API layer
└── types/          # TypeScript interfaces
```

## Tech stack

- React 18
- TypeScript
- Vite
- TailwindCSS v4
- React Router v7
- Lucide React

## Getting started

**Requirements:** Node.js 20+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
npm run build
npm run preview
```

## Code quality

```bash
npm run lint        # ESLint
npm run lint:fix    # ESLint with auto-fix
npm run format      # Prettier
```
