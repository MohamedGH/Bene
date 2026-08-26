# Architecture

Bene follows a layered React architecture:

- `src/components/` — presentation and user interaction.
- `src/hooks/` — React application state and orchestration.
- `src/domain/` — framework-independent business rules and selectors.
- `src/data/` — seed/demo data and data factories.
- `src/utils/` — small reusable technical utilities.
- `src/styles/` — global styling.

`App.jsx` is intentionally kept as the composition root. It wires the application state, layout and view routing without containing domain rules.

## Domain boundaries

Project operations live in `domain/projects.js`, volunteer operations in `domain/volunteers.js`, and applications in `domain/applications.js`. Matching remains a pure utility and can therefore be tested independently of React.

The seed factory returns fresh arrays so state mutations never share mutable arrays with module-level demo data.
