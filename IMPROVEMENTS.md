# Future Improvements

This document tracks planned improvements for the project. Work on these items one by one as time permits.

## State Management

### Add Zustand for UI State Management

**Status:** Planned  
**Priority:** High

Replace ad-hoc state management with Zustand for better UI state coordination.

**Tasks:**

- [ ] Install zustand
- [ ] Create store structure for UI state (sidebar, modals, themes, etc.)
- [ ] Migrate existing useState/useContext patterns to Zustand stores
- [ ] Add persistence middleware for user preferences
- [ ] Document store usage patterns

**Benefits:**

- Centralized UI state management
- Better DevTools support
- Simpler state logic compared to Context API
- Less boilerplate than Redux

---

### Add TanStack Query for Server State Management

**Status:** ✅ Completed  
**Priority:** High

Implement TanStack Query (React Query) for efficient server state management.

**Tasks:**

- [x] Install @tanstack/react-query
- [x] Set up QueryClientProvider in app layout
- [x] Configure React Query DevTools
- [x] Create query hooks for Supabase data fetching
- [x] Implement mutations for data updates
- [x] Add optimistic updates for better UX
- [x] Configure caching strategies
- [x] Document query patterns and best practices

**Implementation Details:**

- Created `providers/query-provider.tsx` with QueryClient configuration
- Integrated QueryProvider in `app/layout.tsx`
- Created example hooks in `hooks/queries/`:
  - `use-posts.ts` - Full CRUD operations with optimistic updates
  - `use-auth.ts` - Authentication hooks (session, sign in/up/out)
- Configured default options: 1 minute stale time, 5 minute gc time
- Added comprehensive README with usage examples

**Benefits:**

- Automatic caching and background refetching
- Optimistic updates out of the box
- Better loading and error states
- Reduced boilerplate for data fetching
- Excellent DevTools for debugging

---

## Testing

### Replace Jest with Vitest

**Status:** Planned  
**Priority:** Medium

Migrate from Jest to Vitest for faster, more modern testing.

**Tasks:**

- [ ] Install vitest and related dependencies
- [ ] Update test configuration (vitest.config.ts)
- [ ] Migrate Jest config to Vitest equivalents
- [ ] Update test scripts in package.json
- [ ] Migrate existing tests to Vitest syntax (if any breaking changes)
- [ ] Configure coverage reporting
- [ ] Update CI/CD pipeline if needed
- [ ] Remove Jest dependencies

**Benefits:**

- Native ESM support
- Faster test execution
- Better Vite integration
- Modern API similar to Jest
- Built-in TypeScript support

---

## Linting

### Replace ESLint with Oxlint

**Status:** Planned  
**Priority:** Low

Replace ESLint with Oxlint for significantly faster linting.

**Tasks:**

- [ ] Install oxlint
- [ ] Create oxlint configuration
- [ ] Test oxlint against codebase
- [ ] Evaluate compatibility with existing rules
- [ ] Update lint scripts in package.json
- [ ] Update pre-commit hooks
- [ ] Remove ESLint dependencies
- [ ] Update CI/CD pipeline
- [ ] Document any rule differences or limitations

**Benefits:**

- 50-100x faster than ESLint
- Written in Rust for performance
- Compatible with most ESLint rules
- Reduced node_modules size

**Considerations:**

- May not support all ESLint plugins
- Newer tool with evolving ecosystem
- Need to verify React/Next.js rule coverage

---

## Notes

- These improvements should be implemented one at a time
- Each improvement should be on its own branch
- Run full test suite after each change
- Update documentation as needed
- Consider creating ADRs (Architecture Decision Records) for major changes
