# Feature Specification: Todo List (AngularJS 1.x)

**Feature Branch**: `001-todo-angularjs`
**Created**: 2026-03-25
**Status**: Draft
**Input**: User description: "Specify a To-Do List application built with AngularJS 1.x. Requirements: State Management: Use a TodoService to handle the array of tasks and persistence (using localStorage). Components: Create a todoApp root component and a todoItem child component. Features: 1) input field to add tasks (prevent empty entries); 2) list display with description and checkbox; 3) Delete button per task; 4) counter for incomplete tasks; 5) filters All/Active/Completed. Styling: Bootstrap classes. Architecture: use \"controller as\" (`vm`) and no logic in HTML."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add a Task (Priority: P1)
A user can add a new task using an input field and submit control.

**Why this priority**: Core user interaction; app is not useful without adding tasks.

**Independent Test**: Enter a non-empty description, submit, and observe the new task appear in the list and persisted across reload.

**Acceptance Scenarios**:
1. Given the app is open with an empty list, When the user types "Buy milk" and presses Enter or clicks Add, Then the task "Buy milk" appears in the list with an unchecked checkbox and the input is cleared.
2. Given the input is empty or whitespace, When the user attempts to add, Then the action is prevented and a validation state is shown (no blank tasks added).

---

### User Story 2 - Mark Complete & Delete (Priority: P1)
A user can toggle a task's completion state and delete tasks.

**Why this priority**: Basic task lifecycle management.

**Independent Test**: Toggle checkbox updates task state and persists; Delete removes the task from UI and storage.

**Acceptance Scenarios**:
1. Given a task exists and is incomplete, When the user clicks its checkbox, Then it becomes completed and is visually styled as completed; the count of incomplete tasks decrements.
2. Given a task exists, When the user clicks Delete, Then the task is removed from the list and no longer present after reload.

---

### User Story 3 - Filtering & Counters (Priority: P2)
A user can filter the list to show All, Active (incomplete), or Completed tasks; an incomplete-task counter is visible.

**Why this priority**: Improves usability and task management for users with many tasks.

**Independent Test**: Toggle filters and verify visible tasks match filter; counter displays the number of incomplete tasks.

**Acceptance Scenarios**:
1. Given multiple tasks with mixed completion states, When the user selects "Active", Then only incomplete tasks are visible.
2. Given tasks exist, When any task's completion changes, Then the incomplete counter updates immediately.

---

### Edge Cases
- Adding a task with only whitespace must be rejected.
- Deleting the last task leaves an empty list without errors.
- LocalStorage full/unavailable: app should gracefully fail and notify (documented as an assumption if not handled).
- Duplicate task descriptions are allowed (app does not dedupe by default).

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: UI MUST provide a text input and submit control to add a new task.
- **FR-002**: The input MUST reject empty or whitespace-only submissions.
- **FR-003**: Tasks MUST display a description, a completion checkbox, and a Delete button.
- **FR-004**: The system MUST persist tasks in browser `localStorage` via a `TodoService` so data survives page reloads.
- **FR-005**: Users MUST be able to toggle completion; UI MUST update and persist the change.
- **FR-006**: Users MUST be able to delete tasks; deletion MUST remove the task from storage.
- **FR-007**: The UI MUST provide filters for `All`, `Active`, and `Completed` views.
- **FR-008**: The UI MUST display a real-time counter of incomplete tasks.
- **FR-009**: All view controllers/components MUST use `controller as` syntax (use `vm`) and avoid placing logic in templates; all business logic MUST live in `TodoService` or component controllers.
- **FR-010**: Styling MUST use Bootstrap classes for layout and responsive behavior.

### Key Entities
- **TodoItem**: { id: string|number, description: string, completed: boolean, createdAt: ISO8601 string }
- **TodoService (singleton)**: Manages an array of `TodoItem` objects, provides methods: `getAll()`, `add(description)`, `toggle(id)`, `delete(id)`, `countIncomplete()`, and `persist()` (localStorage read/write).

## Success Criteria *(mandatory)*

### Measurable Outcomes
- **SC-001**: Users can add a task and see it appear in the list within 1 second on a typical local development machine.
- **SC-002**: The incomplete-task counter reflects the correct count in 100% of tested toggle/delete scenarios (unit tests cover these).
- **SC-003**: Tasks persist across page reloads in 100% of standard browser sessions that allow `localStorage`.
- **SC-004**: Unit tests for `TodoService` and component controllers achieve at least 80% coverage for lines and functions.

## Assumptions
- The app uses AngularJS 1.5+ where `component()` is available; if the project runs on older 1.x, controllers may be used but must follow `controllerAs` conventions.
- Bootstrap (v3 or v4) is available via Bower/npm; exact version will be chosen by maintainers.
- Browser environments support `localStorage`. If `localStorage` is disabled, the app will surface a graceful error message (out of scope to implement full offline sync).
- No authentication required; data is local to the browser.
- Accessibility (A11y) considerations should be followed (ARIA attributes) but specific WCAG targets are outside this spec.
