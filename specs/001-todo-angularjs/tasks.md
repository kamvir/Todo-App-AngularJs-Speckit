# Tasks: AngularJS To-Do Application

**Input**: Design documents from `/specs/001-todo-angularjs/`
**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Jasmine + Karma unit tests are required because the specification explicitly includes measurable unit-test coverage goals.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base AngularJS 1.x application structure

- [X] T001 Create npm metadata and test scripts in `package.json`
- [X] T002 Create legacy vendor metadata for AngularJS and Bootstrap in `bower.json`
- [X] T003 [P] Create CDN-backed application shell in `index.html`
- [X] T004 [P] Create the root AngularJS module in `app/app.js`
- [X] T005 [P] Configure Jasmine + Karma runner in `karma.conf.js`
- [X] T006 [P] Configure legacy task automation for lint/test workflows in `gulpfile.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core state and persistence infrastructure that MUST be complete before any user story work begins

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Implement single-source-of-truth task state and `localStorage` persistence in `app/services/todo.service.js`
- [X] T008 Create `TodoService` unit coverage for load/add/count/persist behavior in `tests/unit/todo.service.spec.js`

**Checkpoint**: Foundation ready — all user stories can now build on the same data source

---

## Phase 3: User Story 1 - Add a Task (Priority: P1) 🎯 MVP

**Goal**: Let a user add a non-empty task and immediately see it rendered from `TodoService`

**Independent Test**: Open the app, add a valid task, confirm it appears in the list, reload the page, and verify the same task is still present; attempt a blank submission and confirm no task is added.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T009 [P] [US1] Create add-task and empty-input unit tests in `tests/unit/todo-app.component.spec.js`

### Implementation for User Story 1

- [X] T010 [P] [US1] Create the `todoApp` root component controller in `app/components/todo-app/todo-app.component.js`
- [X] T011 [P] [US1] Create the root component template with Bootstrap add form and basic list rendering in `app/components/todo-app/todo-app.template.html`
- [X] T012 [US1] Register the `todoApp` component in `app/app.js`
- [X] T013 [US1] Implement `vm.addTask`, input reset, and empty-entry validation in `app/components/todo-app/todo-app.component.js`

**Checkpoint**: User Story 1 is fully functional and independently testable as the MVP slice

---

## Phase 4: User Story 2 - Mark Complete & Delete (Priority: P1)

**Goal**: Let a user toggle completion state and delete tasks through a dedicated child component

**Independent Test**: Add two tasks, toggle one complete, delete the other, reload the page, and verify the completion and deletion states persist correctly.

### Tests for User Story 2 ⚠️

- [X] T014 [P] [US2] Extend service persistence tests for toggle/delete behavior in `tests/unit/todo.service.spec.js`
- [X] T015 [P] [US2] Create checkbox/delete interaction tests for the child component in `tests/unit/todo-item.component.spec.js`

### Implementation for User Story 2

- [X] T016 [P] [US2] Create the `todoItem` child component controller in `app/components/todo-item/todo-item.component.js`
- [X] T017 [P] [US2] Create the `todoItem` template with checkbox, description, and Delete button in `app/components/todo-item/todo-item.template.html`
- [X] T018 [US2] Register the `todoItem` component in `app/app.js`
- [X] T019 [US2] Replace basic row rendering with `todoItem` `ng-repeat` output in `app/components/todo-app/todo-app.template.html`
- [X] T020 [US2] Implement `vm.toggleTask` and `vm.deleteTask` callbacks in `app/components/todo-app/todo-app.component.js`

**Checkpoint**: User Stories 1 and 2 both work with persisted add, complete, and delete flows

---

## Phase 5: User Story 3 - Filtering & Counters (Priority: P2)

**Goal**: Let a user switch between All, Active, and Completed tasks while seeing a live incomplete-task counter

**Independent Test**: Add multiple tasks, complete a subset, toggle each filter, and verify the visible list plus remaining count always match expected state.

### Tests for User Story 3 ⚠️

- [X] T021 [P] [US3] Create filter-mode unit tests for all/active/completed behavior in `tests/unit/todo-status.filter.spec.js`

### Implementation for User Story 3

- [X] T022 [P] [US3] Create the `todoStatus` filter in `app/filters/todo-status.filter.js`
- [X] T023 [US3] Register the `todoStatus` filter in `app/app.js`
- [X] T024 [US3] Add Bootstrap filter controls and incomplete-task counter to `app/components/todo-app/todo-app.template.html`
- [X] T025 [US3] Implement `vm.filterMode`, `vm.setFilter`, and `vm.getIncompleteCount` in `app/components/todo-app/todo-app.component.js`

**Checkpoint**: All user stories are independently functional, including persisted filtering and live counts

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, documentation, and verification across user stories

- [X] T026 [P] Add run, test, and browser support instructions to `README.md`
- [X] T027 [P] Sync verification steps with final behavior in `specs/001-todo-angularjs/quickstart.md`
- [X] T028 Add empty-state and validation presentation polish in `app/styles/app.css`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 completion because it refactors the initial list rendering into the `todoItem` child component
- **User Story 3 (Phase 5)**: Depends on User Story 2 completion because filtering relies on persisted completed-state behavior already exposed in the UI
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational — establishes the MVP add-task flow
- **User Story 2 (P1)**: Starts after User Story 1 — adds completion and deletion on top of the root component flow
- **User Story 3 (P2)**: Starts after User Story 2 — adds filtering and remaining-count visibility

### Within Each User Story

- Tests MUST be written and fail before implementation
- Component/controller registration follows component/filter creation
- Root-template updates follow component availability
- Story-specific controller wiring follows template and service contracts
- Each story must pass its independent manual test before moving on

### Parallel Opportunities

- `T003`, `T004`, `T005`, and `T006` can run in parallel after `T001` and `T002`
- `T009`, `T010`, and `T011` can run in parallel within User Story 1
- `T014`, `T015`, `T016`, and `T017` can run in parallel within User Story 2
- `T021` and `T022` can run in parallel within User Story 3
- `T026` and `T027` can run in parallel in the polish phase

---

## Parallel Example: User Story 1

```bash
Task: "T009 [US1] Create add-task and empty-input unit tests in tests/unit/todo-app.component.spec.js"
Task: "T010 [US1] Create the todoApp root component controller in app/components/todo-app/todo-app.component.js"
Task: "T011 [US1] Create the root component template with Bootstrap add form and basic list rendering in app/components/todo-app/todo-app.template.html"
```

## Parallel Example: User Story 2

```bash
Task: "T014 [US2] Extend service persistence tests for toggle/delete behavior in tests/unit/todo.service.spec.js"
Task: "T015 [US2] Create checkbox/delete interaction tests for the child component in tests/unit/todo-item.component.spec.js"
Task: "T016 [US2] Create the todoItem child component controller in app/components/todo-item/todo-item.component.js"
Task: "T017 [US2] Create the todoItem template with checkbox, description, and Delete button in app/components/todo-item/todo-item.template.html"
```

## Parallel Example: User Story 3

```bash
Task: "T021 [US3] Create filter-mode unit tests for all/active/completed behavior in tests/unit/todo-status.filter.spec.js"
Task: "T022 [US3] Create the todoStatus filter in app/filters/todo-status.filter.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify task creation, validation, and reload persistence
5. Demo or ship the MVP slice if desired

### Incremental Delivery

1. Complete Setup + Foundational to establish the module, tooling, and `TodoService`
2. Deliver User Story 1 for add-task functionality
3. Deliver User Story 2 for completion and deletion behavior
4. Deliver User Story 3 for filtering and counters
5. Finish with documentation and presentation polish

### Parallel Team Strategy

1. Developer A: setup/tooling tasks
2. Developer B: `TodoService` and its unit tests after setup
3. After foundation:
   - Developer A: root component/controller work
   - Developer B: child component and specs
   - Developer C: filter work and documentation once completion behavior is stable

---

## Notes

- All tasks follow the required checklist format: checkbox, task ID, optional `[P]`, required story label for user-story tasks, and exact file path
- User-story tasks are grouped to preserve independent testability and MVP delivery
- The task order follows the requested implementation phases while keeping the deliverables story-oriented
- No extension hooks were configured for pre-task generation