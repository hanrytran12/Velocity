# Profile Menu Feature Implementation Plan

## Overview
Implement a profile dropdown menu in the header that displays when user is logged in, with options for Order History and Logout. If user is not logged in, keep existing login behavior.

## Architecture Decisions
- **Auth Context**: Create a new `AuthContext` to manage user authentication state (no existing auth context found)
- **User State**: Track logged-in user info (display name, email) in context
- **Profile Menu Component**: Create new `ProfileMenu.tsx` component as a reusable dropdown
- **Header Integration**: Modify `Header.tsx` to use AuthContext and conditionally render ProfileMenu or Login link
- **Routes**: Use existing `/login` route; create `/order-history` and `/logout` endpoints
- **Styling**: Use existing Tailwind classes and color scheme (orange: `#FF5E1F`, dark: `#1A2E35`)
- **Type Safety**: Implement with TypeScript interfaces for auth state

## Implementation Steps

### Phase 1: Auth Infrastructure
- [x] Create `src/context/AuthContext.tsx` with user state and auth functions
- [x] Export useAuth hook for consuming components
- [x] Wrap app with AuthProvider in `layout.tsx`

### Phase 2: Profile Menu Component
- [x] Create `src/components/ProfileMenu.tsx` with dropdown UI
- [x] Implement dropdown toggle with click-outside detection
- [x] Add Order History and Logout menu items
- [x] Styling with Tailwind (consistent with header)

### Phase 3: Header Integration
- [x] Update `Header.tsx` to import useAuth hook
- [x] Replace hardcoded login link with conditional rendering:
  - If logged in: Show ProfileMenu
  - If not logged in: Show login link
- [x] Display user's display name in ProfileMenu

### Phase 4: Pages & Routes
- [x] Create `/logout` route to clear auth state
- [x] Create `/order-history` page (placeholder for now)
- [x] Update login page to set auth context on successful login

### Phase 5: Testing & Build
- [x] Run `npm run build` and fix any TypeScript errors
- [x] Test login/logout flow
- [x] Test dropdown open/close behavior
- [x] Verify styling matches existing design

## Files to be Modified/Created
- `src/context/AuthContext.tsx` (CREATE)
- `src/components/ProfileMenu.tsx` (CREATE)
- `src/components/Header.tsx` (MODIFY)
- `src/app/layout.tsx` (MODIFY)
- `src/app/login/page.tsx` (MODIFY)
- `src/app/logout/page.tsx` (CREATE)
- `src/app/order-history/page.tsx` (CREATE)

## Done Checklist
- [x] AuthContext created and exported
- [x] ProfileMenu component created with full dropdown functionality
- [x] Header updated to use AuthContext
- [x] Login page integration complete
- [x] Logout route created
- [x] Order History page created
- [x] npm run build succeeds with no errors
- [x] All TypeScript types properly defined
- [x] Styling consistent with existing design
