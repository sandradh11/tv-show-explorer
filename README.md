# TV Show Explorer - The Powerpuff Girls

A small `Next.js` + `TypeScript` application that allows the user to explore the Powerpuff girls TV show and it's episodes.

![alt text](image.png)

## Architecture Decisions

Tech used: `Next.js`, `TypeScript`, `React 18+`, `Tailwind CSS`, `Vitest` + `React Testing Library`, TVMaze API

### Server vs Client Components

Pages are built as `Server Components` for data fetching and rendering with `Client component` used only where interactivity is needed.

### Data Fetching

All TVMaze API calls are centralized in a `lib/` layer and use time-based revalidation to balance performance and freshnes

### Error Handling

Explicit route-level `error.tsx`, `loading.tsx` and `not-found.tsx` files to handle error handling and loading states.

### Accessibility

The UI relies on native `HTML` elements and clear labels to ensure accessibility.

## Key Trade-offs

### Native <select> instead of a custom dropdown

### Client-side filtering for episode search

### Static hero image

### Minimal client-side state

## What I Would Improve With More Time

### Allow users to favorite episodes and implement pagination on results

### Add i18n support

### Enhance error recovery and reasearch more on API error codes and handling
