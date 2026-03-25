<!--
Sync Impact Report

- Version change: unknown -> 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> Architecture: Component-first or MVC (AngularJS 1.x)
	- [PRINCIPLE_2_NAME] -> Language: ES5 (or ES6 via Babel)
	- [PRINCIPLE_3_NAME] -> Style: John Papa AngularJS Style Guide
	- [PRINCIPLE_4_NAME] -> Tooling: Gulp/Grunt + Bower/NPM
	- [PRINCIPLE_5_NAME] -> Testing: Jasmine + Karma
- Added sections: Constraints & Compatibility; Development Workflow
- Removed sections: none
- Templates updated: ✅ .specify/templates/plan-template.md
										✅ .specify/templates/spec-template.md
										✅ .specify/templates/tasks-template.md
- Templates pending manual review: none
- Follow-up TODOs: RATIFICATION_DATE set to TODO(RATIFICATION_DATE)
-->

# TodoList-App Constitution

## Core Principles

### Architecture (NON-NEGOTIABLE)
The project MUST use a Component-based architecture when targeting AngularJS 1.5+ (the `component()` API). For older 1.x codebases the MVC pattern using Controllers and Services is acceptable only when migration to components is impractical.
- MUST organize UI units as single-responsibility components (template, controller, bindings, lifecycle hooks).
- When controllers are used, prefer `controllerAs` syntax and avoid implicit `$scope` manipulation.
Rationale: Component-based structure improves encapsulation, testability and eases incremental upgrades toward newer patterns.

### Language & Syntax
Source code MUST be written in ES5. ES6 may be used only if transpiled via a verified Babel build step. TypeScript and modern Angular (2+) language features are PROHIBITED.
- MUST avoid decorators, advanced TypeScript types, and RxJS patterns from Angular 2+.
Rationale: Keep runtime compatibility and minimize build complexity for legacy environments.

### Style & Conventions
Follow the John Papa AngularJS Style Guide as the authoritative style document.
- MUST use consistent module naming, file organization, and injection annotations (`$inject`) to prevent minification issues.
- One component/controller per file; name controllers as `XController` and components as `xComponent` per the guide.
- Dependency injection must be explicit (array-annotated or `$inject`), and lint rules must enforce the guide.
Rationale: Consistency reduces cognitive load, improves reviewability, and prevents common AngularJS pitfalls.

### Tooling
- Build: Use Gulp or Grunt for task automation (build, watch, test, lint, vendor injection).
- Dependencies: Use Bower for front-end legacy packages when required, but keep `package.json` (npm) as the primary source for build tooling and scripts. Vendor packages added via Bower MUST be mirrored or recorded in `bower.json` and `package.json` where applicable.
- Linting: Use ESLint (or JSHint if legacy) configured to enforce ES5 rules and John Papa conventions.
- Tasks: Provide `gulp build`, `gulp test`, `gulp lint`, `gulp watch` (or their `grunt` equivalents).
Rationale: Reproducible builds and standardized automation are critical for legacy code maintainability.

### Testing (NON-NEGOTIABLE)
- Unit tests MUST be written with Jasmine and executed via Karma in CI.
- Coverage thresholds MUST be defined (minimum 70% lines, 70% functions), and failing the threshold blocks merges.
- E2E tests may use Protractor where needed, but unit coverage is the primary gate.
Rationale: Reliable unit testing prevents regressions in brittle, legacy AngularJS applications.

## Constraints & Compatibility
This constitution enforces the following constraints:
- NO Angular 2+ / TypeScript / RxJS code is permitted anywhere in the repo.
- NO React, Vue, Svelte, or other modern SPA frameworks are allowed.
- Supported browsers and runtime environments MUST be documented in `README.md` and in the build matrix (CI) if legacy browser support is required.

## Development Workflow
- Branching: Feature branches MUST follow `feature/NAME` naming. Release branches follow `release/x.y` and hotfixes `hotfix/x.y.z`.
- Pull Requests: PRs MUST include passing `lint`, `test`, and `build` tasks in CI. PR description MUST reference failing tests fixed or new tests added.
- Reviews: At least one maintainer review is REQUIRED for non-trivial changes. Large refactors require a migration plan and staged rollouts.
- Dependency updates: Bower and npm updates MUST be reviewed; major library upgrades require compatibility testing and an explicit migration plan.

## Governance
Amendments to this constitution MUST be proposed as a documented change (issue + PR) and approved by a quorum of active repository maintainers. Amendments MUST include a migration plan for existing code where applicable.

Versioning policy:
- MAJOR: Backward-incompatible governance changes (principle removals or redefinitions).
- MINOR: New principle or mandatory section additions or material expansions.
- PATCH: Clarifications, wording fixes, typos, or non-semantic refinements.

Compliance review expectations:
- Every PR touching source code MUST reference which principles are impacted and how the change complies with them.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-03-25
