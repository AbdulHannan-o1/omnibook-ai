---

description: "Task list for Front Page UI/UX Update"
---

# Tasks: Front Page UI/UX Update

**Input**: Design documents from `/specs/001-front-page-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: This plan incorporates Jest/React Testing Library and Cypress/Playwright for comprehensive testing, aligning with the TDD mandate. Therefore, test tasks are included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume Docusaurus web app - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Docusaurus project dependencies (if not already done) in `package.json` and `yarn.lock`
- [x] T002 [P] Configure global CSS variables for color palette in `frontend/src/styles/variables.css`
- [x] T003 [P] Add Orbitron and Inter fonts to the Docusaurus project in `frontend/src/css/custom.css` (or equivalent)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create and configure Dark/Light mode toggle component in `frontend/src/components/DarkModeToggle.tsx`
- [x] T005 Implement Dark/Light mode state management hook in `frontend/src/hooks/useDarkMode.ts`
- [x] T006 Integrate Dark/Light mode toggle into Docusaurus theme layout in `book/src/theme/Layout/index.tsx` (or equivalent)
- [x] T007 Implement subtle animated grid background effect in `frontend/src/styles/global.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Immersive Hero Experience (Priority: P1) 🎯 MVP

**Goal**: Deliver an engaging and futuristic hero section with key calls to action.

**Independent Test**: Load the front page (`/`) and visually verify all elements of the hero section are displayed correctly, including background effects and interactive buttons.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Unit test for `HeroSection` component in `frontend/src/components/HeroSection.test.tsx`
- [x] T009 [P] [US1] Unit test for `GlassmorphismCard` component in `frontend/src/components/GlassmorphismCard.test.tsx`
- [x] T010 [US1] E2E test: Hero section visual fidelity and CTA click in `frontend/tests/e2e/hero.spec.ts`

### Implementation for User Story 1

- [x] T011 [P] [US1] Create `GlassmorphismCard` component in `frontend/src/components/GlassmorphismCard.tsx`
- [x] T012 [P] [US1] Create `HeroSection` component structure in `frontend/src/components/HeroSection.tsx`
- [x] T013 [US1] Implement humanoid silhouette and particle effects in `frontend/src/components/HeroSection.tsx`
- [x] T014 [US1] Implement cyan/purple gradient bloom behind text in `frontend/src/components/HeroSection.tsx`
- [x] T015 [US1] Integrate `GlassmorphismCard` with title, subtitle, and CTA buttons into `HeroSection.tsx`
- [x] T016 [US1] Update `book/src/theme/Root.tsx` (or `book/docs/index.mdx` or similar main page file) to render `HeroSection`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Thematic Feature Exploration (Priority: P2)

**Goal**: Present key thematic areas of the book in an interactive and visually appealing grid.

**Independent Test**: Visually verify the `FeatureGrid` and `FeatureCard` components, including hover effects and content, are displayed correctly below the hero section.

### Tests for User Story 2 ⚠️

- [x] T017 [P] [US2] Unit test for `FeatureCard` component in `frontend/src/components/FeatureCard.test.tsx`
- [x] T018 [P] [US2] Unit test for `FeatureGrid` component in `frontend/src/components/FeatureGrid.test.tsx`
- [x] T019 [US2] E2E test: Feature grid visual fidelity and hover interactions in `frontend/tests/e2e/feature-grid.spec.ts`

### Implementation for User Story 2

- [x] T020 [P] [US2] Create `FeatureCard` component in `frontend/src/components/FeatureCard.tsx` (with glass blur, border, hover glow, icon animation)
- [x] T021 [P] [US2] Create `FeatureGrid` component in `frontend/src/components/FeatureGrid.tsx`
- [x] T022 [US2] Populate `FeatureGrid` with content for "Embodied Cognition", "Human-Robot Synergy", and "Mechanical Intelligence" in `frontend/src/components/FeatureGrid.tsx`
- [x] T023 [US2] Update `book/src/theme/Root.tsx` to render `FeatureGrid` below the `HeroSection`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Concise Book Overview (Priority: P3)

**Goal**: Provide a clear and concise summary of the book's value proposition.

**Independent Test**: Visually verify the "About the Book" section is displayed correctly with its description and benefits list.

### Tests for User Story 3 ⚠️

- [x] T024 [P] [US3] Unit test for `AboutSection` component in `frontend/src/components/AboutSection.test.tsx`
- [x] T025 [US3] E2E test: About section content and presence in `frontend/tests/e2e/about-section.spec.ts`

### Implementation for User Story 3

- [x] T026 [P] [US3] Create `AboutSection` component in `frontend/src/components/AboutSection.tsx`
- [x] T027 [US3] Populate `AboutSection` with the book description and benefit list in `frontend/src/components/AboutSection.tsx`
- [x] T028 [US3] Update `book/src/theme/Root.tsx` to render `AboutSection` below the `FeatureGrid`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Call to Action & Footer (Cross-Cutting Concerns)

**Purpose**: Implement the final interactive call to action and the futuristic footer.

### Tests for Call to Action & Footer ⚠️

- [x] T029 [P] Unit test for `CallToActionSection` component in `frontend/src/components/CallToActionSection.test.tsx`
- [x] T030 [P] Unit test for `Footer` component in `frontend/src/components/Footer.test.tsx`
- [x] T031 E2E test: Call to Action button hover effect and Footer content in `frontend/tests/e2e/cta-footer.spec.ts`

### Implementation for Call to Action & Footer

- [x] T032 [P] Create `CallToActionSection` component in `frontend/src/components/CallToActionSection.tsx`
- [x] T033 [US1] Implement "Start Reading Now" button with underline animation and glowing particle trail on hover in `frontend/src/components/CallToActionSection.tsx`
- [x] T034 [P] Create `Footer` component in `frontend/src/components/Footer.tsx`
- [x] T035 [US1] Populate `Footer` with text and icons with soft neon outlines in `frontend/src/components/Footer.tsx`
- [x] T036 Update `book/src/theme/Root.tsx` to render `CallToActionSection` and `Footer` at the bottom of the page

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T037 Ensure full responsiveness across desktop, tablet, and mobile breakpoints by adjusting CSS in `frontend/src/styles/global.css` and component-specific styles.
- [x] T038 Optimize image assets and CSS for performance in relevant files.
- [x] T039 Integrate front-end error logging and performance monitoring for UI components (e.g., using Sentry or similar).
- [x] T040 Final UI/UX review for overall consistency and aesthetic adherence to the futuristic design philosophy.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services (N/A for this UI feature with no backend models)
- Services before endpoints (N/A for this UI feature)
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks (T001, T002, T003) can run in parallel.
- Foundational tasks (T004, T005, T006, T007) can be worked on in parallel.
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows).
- Within each user story, test tasks marked [P] can run in parallel.
- Implementation tasks marked [P] within a story can run in parallel.
- Different user stories (Phase 3, 4, 5) can be worked on in parallel by different team members after the Foundational phase.

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for HeroSection component in frontend/src/components/HeroSection.test.tsx"
Task: "Unit test for GlassmorphismCard component in frontend/src/components/GlassmorphismCard.test.tsx"
Task: "E2E test: Hero section visual fidelity and CTA click in frontend/tests/e2e/hero.spec.ts"

# Launch parallel implementation tasks for User Story 1 (after tests fail):
Task: "Create GlassmorphismCard component in frontend/src/components/GlassmorphismCard.tsx"
Task: "Create HeroSection component structure in frontend/src/components/HeroSection.Section.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
