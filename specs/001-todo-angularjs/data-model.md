# Data Model: AngularJS To-Do Application

## Entity: TodoItem
- **Purpose**: Represents a single task displayed in the to-do list.
- **Fields**:
  - `id`: string; unique identifier generated at creation time.
  - `description`: string; trimmed task text entered by the user.
  - `completed`: boolean; indicates whether the task is done.
  - `createdAt`: string; ISO 8601 timestamp used for stable ordering and diagnostics.
- **Validation rules**:
  - `description` MUST be non-empty after trimming whitespace.
  - `description` SHOULD be stored exactly as entered after trimming; no HTML is allowed.
  - `completed` defaults to `false` on creation.
- **State transitions**:
  - `new` -> `active` when created with `completed = false`
  - `active` -> `completed` when toggled on
  - `completed` -> `active` when toggled off
  - Any state -> `deleted` when removed by user action

## Entity: TodoCollection
- **Purpose**: In-memory aggregate owned by `TodoService`.
- **Fields**:
  - `items`: array of `TodoItem`
  - `storageKey`: string; namespaced `localStorage` key
  - `loadError`: boolean|string; optional indicator for persistence failure state
- **Validation rules**:
  - `items` MUST always be an array.
  - Persisted payload MUST deserialize into valid `TodoItem` shapes; invalid records are ignored or sanitized.
- **Behavior**:
  - On app startup, `TodoService` hydrates `items` from `localStorage`.
  - On add/toggle/delete, `TodoService` mutates `items` and immediately persists.

## Entity: FilterState
- **Purpose**: Controls which tasks are visible in the root component.
- **Fields**:
  - `mode`: enum(`all`, `active`, `completed`)
- **Validation rules**:
  - Unrecognized values MUST fall back to `all`.
- **State transitions**:
  - `all` <-> `active`
  - `all` <-> `completed`
  - `active` <-> `completed`

## Relationships
- `TodoCollection.items` contains zero or more `TodoItem` records.
- `FilterState.mode` determines which `TodoItem` records are rendered by the view layer.
- `TodoService` is the only writer for `TodoCollection` and its `TodoItem` members.
