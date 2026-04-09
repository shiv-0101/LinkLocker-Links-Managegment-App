# LinkLocker - Product Requirements Document (PRD)

## Version
1.1 (Aligned Draft) - April 9, 2026

## 1. Product Overview

### Product Name
LinkLocker

### Tagline
Never lose a link from DMs again.

### One-Line Pitch
A cross-platform social bookmarking app to save links from DMs, comments, and group chats in seconds, organize them into boards, and discover useful public collections.

### Background
Users get high-value links on Instagram, WhatsApp, Telegram, and similar channels. These links are buried quickly, hard to search, and scattered across platforms. LinkLocker solves fast capture, structured organization, and social discovery in one place.

## 2. Problem Definition

### Primary User Pain Points
1. Links shared in DMs are lost in message history.
2. Group chats mix valuable links with noise and forwards.
3. Comment-section links are not saved by native social tools.
4. Existing saves are platform-specific and fragmented.
5. Current note/bookmark tools are too slow for quick capture.

### Existing Alternatives and Gaps
1. Native social saves keep posts, not external links.
2. Browser bookmarks are weak for mobile-first social workflows.
3. Read-later apps do not support collaborative discovery boards.
4. General productivity tools have high friction for quick save flows.

## 3. Goals and Success Criteria

### Product Goals (MVP)
1. Let users save any URL in under 10 seconds.
2. Let users organize links into boards (public or private).
3. Enable discovery of useful links through public boards.
4. Support reliable metadata enrichment for each saved link.

### Success Metrics (First 30 Days Post-Launch)
1. Time-to-save median: under 10 seconds.
2. At least 60% of active users create 2 or more boards.
3. At least 40% of active users save 5 or more links.
4. At least 20% of active users use Discover at least once per week.
5. Metadata fetch success rate: at least 85% of valid URLs.

## 4. Target Users

1. Students collecting resources from class and community groups.
2. Professionals curating tools and references from team chats.
3. Creators saving inspiration, templates, and learning links.
4. Social-media-heavy users who need cross-platform retrieval.

## 5. Product Scope

### In Scope (MVP)
1. Authentication and user profile (Clerk).
2. Board creation, edit, delete, and privacy toggle.
3. Link add, edit, delete, move between boards.
4. Auto metadata extraction (title, description, image, favicon, domain).
5. Discover feed from public boards.
6. Copy link from discover into personal board.
7. Public board viewing for unauthenticated users.

### Out of Scope (Post-MVP)
1. Browser extensions.
2. Native mobile apps.
3. AI auto-tagging/recommendation engine.
4. Collaboration roles within a board.
5. Monetization and subscriptions.

## 6. Core User Flows

### A. Unauthenticated User
1. Lands on home page and sees featured public boards.
2. Opens a public board and views links.
3. Attempts protected action (save/edit/create) and is prompted to sign in.

### B. Authenticated User - Save Link Quickly
1. Opens dashboard.
2. Uses quick-add input (URL, optional title).
3. Selects existing board or creates new board.
4. Submits and sees link card appear instantly.

### C. Authenticated User - Board Management
1. Creates board with name, description, and public/private status.
2. Edits board metadata.
3. Deletes board (cascades all contained links).

### D. Authenticated User - Discover and Copy
1. Opens Discover page.
2. Browses public boards and link cards.
3. Clicks Save to My Board.
4. Selects target board and confirms save.

## 7. Functional Requirements

### FR-1 Authentication
1. System shall support sign-up/sign-in/sign-out using Clerk.
2. System shall restrict create/update/delete operations to authenticated users.

### FR-2 Board Management
1. System shall allow users to create boards with name, description, and visibility.
2. System shall allow users to update board details.
3. System shall allow users to delete owned boards.
4. System shall enforce ownership on board mutations.

### FR-3 Link Management
1. System shall allow users to add links to owned boards.
2. System shall support optional manual title override.
3. System shall support edit and delete operations on owned links.
4. System shall support moving links between owned boards.

### FR-4 Metadata Enrichment
1. System shall fetch URL metadata on save.
2. System shall store metadata in structured JSON.
3. System shall gracefully fall back when metadata cannot be fetched.

### FR-5 Discover
1. System shall expose only public boards in discover views.
2. System shall allow authenticated users to copy links from discover to their boards.
3. System shall prevent private board content from being exposed.

### FR-6 Public Access
1. System shall allow unauthenticated users to view public boards.
2. System shall block access to private boards and protected dashboard routes.

## 8. Non-Functional Requirements

1. Performance: initial page load under 3 seconds on average broadband for landing and dashboard.
2. Reliability: CRUD operations should return success/failure deterministically with clear error states.
3. Security: Supabase RLS must enforce user-level ownership and public visibility rules.
4. Usability: common actions (save link, create board) should require minimal clicks and clear feedback.
5. Maintainability: codebase should follow modular folder structure defined in project architecture.

## 9. Tech and Architecture Alignment

### Frontend
1. React 18 + Vite.
2. Tailwind CSS for styling.
3. React Router for route-level access control.

### Backend
1. Node.js + Express API routes.
2. Metadata scraping via Cheerio + node-fetch.

### Data and Auth
1. Supabase PostgreSQL as primary database.
2. Supabase JS client for data operations.
3. Clerk for authentication and user identity.

### Deployment
1. Vercel for frontend and server hosting.

## 10. Data Model (MVP)

### Boards
1. id (uuid, primary key)
2. user_id (text)
3. name (text, required)
4. description (text, optional)
5. is_public (boolean, default false)
6. link_count (int, derived or maintained)
7. created_at (timestamp)

### Links
1. id (uuid, primary key)
2. board_id (uuid, fk to boards, cascade delete)
3. user_id (text)
4. title (text, required)
5. url (text, required)
6. metadata (jsonb)
7. source_type (text, optional)
8. click_count (int, default 0)
9. created_at (timestamp)

### Security Rules (High-Level)
1. Anyone can read public boards and their links.
2. Only owner can create/update/delete their boards and links.
3. Private boards and links are never readable by non-owners.

## 11. UI Pages and Component Mapping

### Pages
1. LandingPage: public entry, featured public boards.
2. Dashboard: user boards and quick add flow.
3. BoardView: board details and link grid.
4. Discover: browse and copy from public boards.
5. Profile: basic account and user context.

### Key Components
1. boards: BoardCard, BoardGrid, CreateBoardModal, EditBoardModal.
2. links: LinkCard, LinkGrid, QuickAddBar, EditLinkModal.
3. discover: DiscoverBoardCard, CopyLinkModal.
4. common: Navbar, Footer, LoadingSpinner.

## 12. Low-Fidelity Mockups (Main Pages)

Note: These are structural wireframes for product direction, not final visual design.

### Mockup A: Landing Page (Public)

```text
+--------------------------------------------------------------------------------+
| LinkLocker                               [Discover] [Sign In] [Get Started]    |
+--------------------------------------------------------------------------------+
| HERO                                                                           |
| Never lose a link from DMs again                                              |
| Save in seconds. Organize in boards. Discover what others save.               |
| [Start Saving Free] [Browse Public Boards]                                     |
+--------------------------------------------------------------------------------+
| Featured Public Boards                                                         |
| +-------------------+ +-------------------+ +-------------------+             |
| | Design Resources  | | AI Tools          | | Startup Playbooks |             |
| | 24 links          | | 31 links          | | 12 links          |             |
| | by @userA         | | by @userB         | | by @userC         |             |
| +-------------------+ +-------------------+ +-------------------+             |
+--------------------------------------------------------------------------------+
| Footer: About | Privacy | Terms | Contact                                       |
+--------------------------------------------------------------------------------+
```

### Mockup B: Dashboard (Authenticated)

```text
+--------------------------------------------------------------------------------+
| LinkLocker          [My Boards] [Discover] [Profile] [User Menu]               |
+--------------------------------------------------------------------------------+
| Quick Add                                                                    [+]|
| URL: [https://.........................................................]        |
| Title (optional): [....................................................]        |
| Board: [Select Board v]                                      [Save Link]       |
+--------------------------------------------------------------------------------+
| My Boards                                                                       |
| +-------------------+ +-------------------+ +-------------------+              |
| | UI Inspiration    | | Learning          | | Startup Research  |              |
| | Public            | | Private           | | Private           |              |
| | 18 links          | | 42 links          | | 9 links           |              |
| +-------------------+ +-------------------+ +-------------------+              |
|                         [Create New Board]                                      |
+--------------------------------------------------------------------------------+
```

### Mockup C: Board View (Pinterest-Style Grid)

```text
+--------------------------------------------------------------------------------+
| < Back to Boards                              Board: UI Inspiration (Public)    |
| Description: Product, UX, and motion references                                  |
| [Edit Board] [Delete Board]                                                      |
+--------------------------------------------------------------------------------+
| Filters: [Newest v] [Domain v] [Search links.............................]      |
+--------------------------------------------------------------------------------+
| +-------------+ +-------------+ +-------------+ +-------------+                |
| | Thumbnail   | | Thumbnail   | | Thumbnail   | | Thumbnail   |                |
| | Title       | | Title       | | Title       | | Title       |                |
| | domain.com  | | site.ai     | | ux.tools    | | blog.dev    |                |
| | [Open][...] | | [Open][...] | | [Open][...] | | [Open][...] |                |
| +-------------+ +-------------+ +-------------+ +-------------+                |
| +-------------+ +-------------+                                                  |
| | Thumbnail   | | Thumbnail   |                                                  |
| | Title       | | Title       |                                                  |
| | docs.io     | | medium.com  |                                                  |
| | [Open][...] | | [Open][...] |                                                  |
| +-------------+ +-------------+                                                  |
+--------------------------------------------------------------------------------+
```

### Mockup D: Discover Page

```text
+--------------------------------------------------------------------------------+
| Discover Public Boards                                  [Search topics....]     |
+--------------------------------------------------------------------------------+
| Topics: [All] [Design] [AI] [Productivity] [Startups]                           |
+--------------------------------------------------------------------------------+
| +------------------------+ +------------------------+                           |
| | Board: AI Tools        | | Board: Founder Notes   |                           |
| | by @maker01            | | by @builder99          |                           |
| | - Prompt Library       | | - Fundraising deck     |                           |
| | - Model Comparison     | | - GTM checklist        |                           |
| | [Open Board] [Save...] | | [Open Board] [Save...] |                           |
| +------------------------+ +------------------------+                           |
+--------------------------------------------------------------------------------+
| Save to My Board Modal                                                           |
| Link: Model Comparison Sheet                                                     |
| Choose board: [Learning v]                                   [Cancel] [Save]    |
+--------------------------------------------------------------------------------+
```

### Mockup E: Mobile Quick Save (Responsive Priority)

```text
+--------------------------------------+
| LinkLocker                  [Profile]|
+--------------------------------------+
| Quick Save                           |
| URL                                  |
| [https://.........................]  |
| Board                                |
| [Select v]                           |
| [Save Link]                          |
+--------------------------------------+
| My Boards                            |
| [UI Inspiration] 18 links            |
| [Learning] 42 links                  |
| [Create Board]                       |
+--------------------------------------+
```

## 13. Risks and Mitigations

1. Metadata scraping failures due to blocked sites.
Mitigation: fallback fields, retry policy, manual title editing.
2. Abuse/spam in public discover content.
Mitigation: basic reporting/removal path and visibility controls.
3. Scope creep during challenge timeline.
Mitigation: strict MVP boundaries and phased backlog.

## 14. Delivery Plan

### Milestone 1: Foundation
1. Repo setup, routing, auth integration, database schema, RLS.

### Milestone 2: Core CRUD
1. Board and link create/read/update/delete with ownership checks.

### Milestone 3: Discover and Sharing
1. Public board listing and copy-to-board flow.

### Milestone 4: Hardening and Demo
1. Error states, empty states, polish, deployment, walkthrough data.

## 15. Acceptance Criteria (MVP Sign-Off)

1. A signed-in user can create a board and save a link to it.
2. Metadata is fetched and displayed for most valid URLs.
3. User can edit/delete own boards and links.
4. Public boards are visible without login.
5. Private boards are inaccessible to other users.
6. Discover shows public content and supports copy-to-my-board.
7. End-to-end flow works on deployed environment.

## 16. After NOW (Execution Plan From Demo UI to Working Product)

This section defines the exact sequence to move from current demo UI to fully functional MVP.

### Current Status (As of April 9, 2026)
1. Frontend demo UI is implemented.
2. Routing and page structure are available.
3. Data is currently mocked in hooks.
4. Real authentication and database persistence are pending.

### Phase A: Database Foundation (Supabase First)

#### A1. Create Production Schema
1. Create `boards` table with: `id`, `user_id`, `name`, `description`, `is_public`, `created_at`.
2. Create `links` table with: `id`, `board_id`, `user_id`, `title`, `url`, `metadata`, `created_at`.
3. Add foreign key: `links.board_id -> boards.id` with cascade delete.
4. Add indexes: `boards.user_id`, `boards.is_public`, `links.board_id`, `links.user_id`, `links.created_at`.

#### A2. Enable Row Level Security
1. Enable RLS on both `boards` and `links`.
2. Add public read policy for public boards and links belonging to public boards.
3. Add owner-only CRUD policies for boards and links.

#### A3. Definition of Done
1. SQL migration runs without errors.
2. Anonymous reads only public content.
3. Authenticated users can only mutate own data.

### Phase B: Clerk Authentication Integration

#### B1. Frontend Auth Wiring
1. Wrap app with Clerk provider.
2. Replace mock auth hook with Clerk user/session data.
3. Update navbar profile/sign-in state from Clerk.

#### B2. Route Protection
1. Keep landing and discover public.
2. Guard dashboard, create, edit, delete actions.
3. Redirect unauthenticated users to sign-in.

#### B3. Definition of Done
1. Sign-in/sign-out works.
2. Protected pages block guests.
3. Current user id is available where needed for ownership checks.

### Phase C: Replace Mock Data With Real Data

#### C1. Boards Data Flow
1. Replace `useBoards` mock state with Supabase queries.
2. Implement create/update/delete board actions.
3. Refresh board list after each mutation.

#### C2. Links Data Flow
1. Replace `useLinks` mock state with Supabase queries by board id.
2. Implement create/update/delete link actions.
3. Preserve ownership behavior: edit icon only when `link.user_id == current_user_id`.

#### C3. Definition of Done
1. Reloading the app keeps data (real persistence).
2. New links and boards are visible after refresh.
3. Unauthorized edit/delete is blocked both in UI and by RLS.

### Phase D: Metadata Pipeline (URL Enrichment)

#### D1. Save Flow Upgrade
1. On link save, call metadata endpoint.
2. Store metadata JSON in `links.metadata`.
3. Add fallback when metadata fetch fails (still save link).

#### D2. Validation and Error Handling
1. Validate URL format before submit.
2. Show user-friendly error on invalid URL/network failure.
3. Avoid duplicate submit by disabling save while request is active.

#### D3. Definition of Done
1. Most valid URLs save with metadata.
2. Invalid URLs are rejected with clear messages.
3. Save flow remains under target interaction time.

### Phase E: Discover and Copy-to-Board (Real)

#### E1. Discover Query
1. Fetch only public boards.
2. Show board owner info and counts.
3. Paginate or limit initial load for performance.

#### E2. Copy Flow
1. Allow authenticated user to copy a discovered link to own board.
2. Enforce ownership for destination board.
3. Prevent duplicate inserts when copying same URL into same board (optional MVP+).

#### E3. Definition of Done
1. Discover lists only public data.
2. Copy action creates link in selected owned board.
3. Guests are prompted to sign in for copy action.

### Phase F: Hardening, QA, and Deployment

#### F1. QA Checklist
1. Create, edit, delete board.
2. Add, edit, delete link.
3. Public vs private visibility.
4. Discover browse and copy.
5. Mobile responsive checks on landing, dashboard, board, discover.

#### F2. Deployment Checklist
1. Set production env vars (Clerk + Supabase + API).
2. Deploy frontend and backend.
3. Run smoke test on deployed URLs.

#### F3. Definition of Done
1. End-to-end user journey works in production.
2. No critical console or API errors on main flows.
3. PRD acceptance criteria are fully satisfied.

### Recommended Start Task (Do This First)
1. Implement Phase A1 and A2 SQL migration in Supabase.
2. Share migration result and policy output.
3. Then proceed immediately to Phase B (Clerk integration).