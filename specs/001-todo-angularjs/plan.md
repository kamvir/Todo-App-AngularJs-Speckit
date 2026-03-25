# Implementation Plan: AngularJS To-Do Application

**Branch**: `001-todo-angularjs` | **Date**: 2026-03-25 | **Spec**: `/specs/001-todo-angularjs/spec.md`
**Input**: Feature specification from `/specs/001-todo-angularjs/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a browser-based to-do list application using AngularJS 1.x with Bootstrap styling. The implementation centers on a singleton `TodoService` as the single source of truth for task state and `localStorage` persistence, a `todoApp` root component for page orchestration, and a reusable `todoItem` child component for row-level rendering and actions. Delivery will follow the requested sequence: project skeleton, data service, root component, add-task flow, task list/item component, filters plus persistence checks, and final validation/error handling.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript ES5 targeting AngularJS 1.5+ component APIs; ES6 allowed only if transpiled via Babel  
**Primary Dependencies**: AngularJS 1.8.x, Bootstrap CDN, Jasmine, Karma, angular-mocks  
**Storage**: Browser `localStorage` via `TodoService`  
**Testing**: Jasmine + Karma unit tests for service, filter, and component controllers  
**Target Platform**: Desktop and mobile browsers that support AngularJS 1.x and `localStorage`
**Project Type**: Single-page web application  
**Performance Goals**: Initial render and add-task update complete within 1 second for typical local workloads; filter changes feel instantaneous for lists under 500 items  
**Constraints**: No Angular 2+, no TypeScript, no React/Vue, no logic in HTML, use `controllerAs` syntax, Bootstrap classes for layout  
**Scale/Scope**: Single-user browser-local to-do app with tens to low hundreds of tasks per user session

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Gates determined based on the constitution file. For projects following this repository's
AngularJS legacy guidance the gate MUST verify:
- Component vs MVC decision (1.5+ component API preferred)
- Language constraints (ES5 or ES6 via Babel only; no TypeScript)
- Style conformity (John Papa AngularJS Style Guide)
- Tooling present (Gulp/Grunt tasks, bower.json / package.json)
- Testing setup (Jasmine + Karma configuration present)

Pre-Phase 0 gate status: PASS
- Architecture uses AngularJS `component()` for `todoApp` and `todoItem`.
- Language remains ES5-first with no Angular 2+ constructs.
- Controllers use `vm` and business logic stays in service/controllers, not templates.
- Tooling plan includes npm/Bower metadata and Gulp/Grunt-compatible task hooks.
- Testing plan uses Jasmine + Karma for unit coverage.

Post-Phase 1 design gate status: PASS
- Research, data model, and contracts preserve a single-source-of-truth `TodoService`.
- Filter logic is isolated in a custom AngularJS filter instead of template expressions.
- Planned file structure supports John Papa style separation by component/service/filter.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
index.html
app/
├── app.js
├── components/
│   ├── todo-app/
│   │   ├── todo-app.component.js
│   │   └── todo-app.template.html
│   └── todo-item/
│       ├── todo-item.component.js
│       └── todo-item.template.html
├── services/
│   └── todo.service.js
├── filters/
│   └── todo-status.filter.js
└── styles/
  └── app.css

tests/
└── unit/
  ├── todo.service.spec.js
  ├── todo-app.component.spec.js
  └── todo-status.filter.spec.js

package.json
bower.json
karma.conf.js
gulpfile.js or Gruntfile.js
```

**Structure Decision**: Use a single front-end project rooted at the repository root. Application code lives in `app/` separated by component, service, filter, and style concerns, while Jasmine/Karma specs live in `tests/unit/`. This structure fits AngularJS 1.x component architecture and keeps build/test tooling simple.

## Implementation Phases

### Phase 1: Project Skeleton
- Create `index.html` with AngularJS 1.x and Bootstrap CDNs.
- Add base layout container and mount the `todoApp` root component.
- Create `app/app.js` to define the AngularJS module and register dependencies.
- Add minimal `package.json`, `bower.json`, and task runner placeholders needed for lint/test/build workflows.

### Phase 2: Data Service
- Implement `TodoService` before UI components.
- Add `localStorage` load/persist helpers and mutation methods: `getAll`, `add`, `toggle`, `delete`, `countIncomplete`.
- Treat the service as the single source of truth for all task state.

### Phase 3: Root Component
- Create the `todoApp` component and `TodoController` using `controllerAs` with `vm`.
- Bind service-backed task data, active filter mode, and UI actions through controller methods.
- Keep templates presentation-only with no inline decision logic.

### Phase 4: Task Input
- Build add-task input and submit behavior first to verify the end-to-end data flow into `TodoService`.
- Reset input after successful create and surface validation state for invalid submissions.

### Phase 5: Task List & Item Component
- Render tasks with `ng-repeat` over filtered service data.
- Create the `todoItem` child component to encapsulate checkbox and delete button behavior.
- Ensure toggle and delete actions delegate back to `TodoService` through root-controller callbacks.

### Phase 6: Filters & Persistence
- Add `All`, `Active`, and `Completed` controls using a custom AngularJS filter.
- Ensure every mutation path persists immediately to `localStorage`.
- Verify page reload rehydrates state and preserves visible counts.

### Phase 7: Validation
- Add basic empty-input and whitespace validation.
- Present a Bootstrap-styled validation message or invalid field state.
- Cover validation, persistence, and filter behavior with Jasmine + Karma tests.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
