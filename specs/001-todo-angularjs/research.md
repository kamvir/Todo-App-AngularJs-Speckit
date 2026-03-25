# Research: AngularJS To-Do Application

## Decision 1: Use AngularJS 1.8.x component architecture with a root `todoApp` component and child `todoItem` component
- **Decision**: Build the UI with AngularJS 1.5+ `component()` APIs, using `todoApp` as the orchestration component and `todoItem` for per-row rendering and actions.
- **Rationale**: This matches the constitution's preference for component-first AngularJS design, keeps templates thin, and supports `controllerAs` syntax cleanly.
- **Alternatives considered**:
  - Traditional `ng-controller` MVC only: rejected because component boundaries better isolate UI responsibilities.
  - Single monolithic component: rejected because row-level behavior and bindings become harder to test.

## Decision 2: Centralize state and persistence in `TodoService`
- **Decision**: Implement a singleton `TodoService` that owns the in-memory array of tasks and persists on every mutation via `localStorage`.
- **Rationale**: A single source of truth simplifies component interactions, makes unit testing straightforward, and satisfies the required architecture.
- **Alternatives considered**:
  - Store state directly in the root controller: rejected because persistence and state logic would be mixed into UI concerns.
  - Persist only on browser unload: rejected because it risks data loss and complicates testing.

## Decision 3: Use a custom AngularJS filter for `All`, `Active`, and `Completed`
- **Decision**: Implement a small custom filter that receives the todo array and current mode (`all`, `active`, `completed`) and returns the visible subset.
- **Rationale**: This keeps filtering logic out of HTML while preserving declarative templates.
- **Alternatives considered**:
  - `ng-show` expressions in the template: rejected because it pushes logic into HTML.
  - Precomputed arrays in controller only: rejected because it adds watch/update complexity for limited benefit.

## Decision 4: Use Bootstrap CDN for layout and AngularJS CDN for app bootstrapping
- **Decision**: Start with CDN script/style tags in `index.html` for AngularJS 1.x and Bootstrap, with local app files loaded after vendors.
- **Rationale**: This satisfies the requested project skeleton quickly and keeps the initial implementation minimal.
- **Alternatives considered**:
  - Vendor files committed locally: rejected for initial implementation because CDN setup is simpler and matches the plan requirement.
  - Webpack/Vite-based bundling: rejected by constitution constraints and unnecessary for this legacy stack.

## Decision 5: Unit test with Jasmine + Karma at service and component-controller levels
- **Decision**: Add Jasmine specs for `TodoService`, `todoApp` controller behavior, and filter behavior; run them through Karma.
- **Rationale**: This covers the key mutation flows, persistence logic, and visible filtering without requiring a full end-to-end stack.
- **Alternatives considered**:
  - E2E-only testing: rejected because service and controller logic need fast regression coverage.
  - Skipping filter tests: rejected because filtering is a user-visible requirement with branch logic.

## Decision 6: Persist task records with a stable schema and storage key
- **Decision**: Store tasks under a namespaced key such as `todoListApp.todos.v1`; each record contains `id`, `description`, `completed`, and `createdAt`.
- **Rationale**: Versioned keys reduce migration ambiguity and the minimal schema supports all current requirements.
- **Alternatives considered**:
  - Use raw array indexes as identifiers: rejected because deletes/reorders make identity brittle.
  - Store only description/completed: rejected because explicit IDs and timestamps improve maintainability and tests.
