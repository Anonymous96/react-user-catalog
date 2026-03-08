# User Catalog

A user catalog page built with React and TypeScript, powered by the [DummyJSON](https://dummyjson.com/docs/users) public API.

## Features

- Browse a paginated list of users (12 per page)
- Search users by name in real time
- Responsive card layout with avatar, contact info, company, and location
- Skeleton loading state and error handling

## Project structure

```
src/
├── components/     # UI components (UserCard, SearchBar, Pagination)
├── hooks/          # useUsers — state and side effects
├── services/       # userService — API calls
└── types/          # TypeScript interfaces
```

## Tech stack

- React 18
- TypeScript
- Vite

## Getting started

**Requirements:** Node.js 20+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Production build
npm run build
npm run preview
```
