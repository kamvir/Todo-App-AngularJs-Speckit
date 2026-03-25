# Component and Service Contracts

## Root Component: `todoApp`
- **Responsibility**: Own the page-level UI state, expose add/filter/toggle/delete actions, and bind rendered data from `TodoService`.
- **Inputs**: None.
- **Outputs**: None via AngularJS bindings; user interactions dispatch to controller methods.
- **Controller contract**:
  - `vm.newTaskDescription`: string
  - `vm.filterMode`: `all` | `active` | `completed`
  - `vm.todos`: array of `TodoItem`
  - `vm.addTask()`: validates input and delegates to `TodoService.add`
  - `vm.toggleTask(id)`: delegates to `TodoService.toggle`
  - `vm.deleteTask(id)`: delegates to `TodoService.delete`
  - `vm.getIncompleteCount()`: delegates to `TodoService.countIncomplete`
  - `vm.setFilter(mode)`: updates filter mode

## Child Component: `todoItem`
- **Responsibility**: Render a single task row with checkbox, description, and delete button.
- **Bindings**:
  - `< todo`: `TodoItem`
  - `& onToggle`: callback invoked with task id
  - `& onDelete`: callback invoked with task id
- **Behavior contract**:
  - Checkbox click invokes `onToggle({ id: todo.id })`
  - Delete click invokes `onDelete({ id: todo.id })`
  - Completed state is visual only; persistence is handled outside the component

## Service: `TodoService`
- **Responsibility**: Single source of truth for task state and persistence.
- **Public API**:
  - `getAll() -> TodoItem[]`
  - `add(description) -> TodoItem|null`
  - `toggle(id) -> void`
  - `delete(id) -> void`
  - `countIncomplete() -> number`
  - `load() -> TodoItem[]`
  - `persist() -> void`
- **Persistence contract**:
  - Storage key: `todoListApp.todos.v1`
  - Serialization format: JSON array of `TodoItem`
  - Persist invoked after each successful add/toggle/delete mutation

## Filter: `todoStatus`
- **Responsibility**: Return visible tasks for `all`, `active`, or `completed` mode.
- **Signature**:
  - `todoStatus(items, mode) -> TodoItem[]`
- **Behavior contract**:
  - `all`: returns all items
  - `active`: returns items with `completed === false`
  - `completed`: returns items with `completed === true`
  - Invalid mode: behaves as `all`
