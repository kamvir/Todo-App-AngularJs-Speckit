# Quickstart: AngularJS To-Do Application

## Prerequisites
- A browser that supports AngularJS 1.x and `localStorage`
- Node.js and npm for test tooling
- Optional: Bower if legacy package mirroring is required

## Planned Project Layout
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
```

## Implementation Order
1. Create `index.html` with AngularJS and Bootstrap CDNs plus local script loading.
2. Define the root AngularJS module in `app/app.js`.
3. Implement `TodoService` with `localStorage` hydration and persistence.
4. Add the `todoApp` root component and its controller.
5. Implement add-task flow and validation.
6. Add the `todoItem` child component and list rendering.
7. Implement filtering and incomplete counter.
8. Add Jasmine + Karma unit tests and verify persistence behavior.

## Test Commands (planned)
```bash
npm install
npm test
npm run lint
npm run build
```

## Run Locally
```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Manual Verification Checklist
- Add a valid task and confirm it appears immediately.
- Refresh the page and confirm the task persists.
- Toggle a task complete and confirm the incomplete counter updates.
- Switch among `All`, `Active`, and `Completed` filters.
- Delete a task and confirm it is removed from the list and from persisted storage.
- Attempt to add an empty task and confirm validation blocks it.
- Confirm the empty-state message appears when all tasks are deleted.
