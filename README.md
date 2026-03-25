# AngularJS Todo App

A legacy AngularJS 1.x to-do list application built with a component-first structure, Bootstrap styling, and `TodoService`-backed `localStorage` persistence.

## Browser Support
- Modern desktop browsers with `localStorage`
- Mobile browsers capable of running AngularJS 1.8.x

## Scripts
```bash
npm install
npm test
npm run lint
npm run build
npm run watch
```

## App Structure
- `index.html` bootstraps AngularJS and Bootstrap from CDNs
- `app/services/todo.service.js` owns task state and persistence
- `app/components/todo-app/` contains the root component and add/filter UI
- `app/components/todo-item/` contains row-level task rendering and actions
- `app/filters/todo-status.filter.js` implements `All` / `Active` / `Completed`

## Manual Verification
1. Add a task and verify it appears immediately.
2. Refresh the page and verify the task remains.
3. Toggle a task complete and verify the remaining counter updates.
4. Switch filters and verify the list changes correctly.
5. Delete a task and verify it disappears permanently.
6. Try adding an empty task and verify validation blocks it.
