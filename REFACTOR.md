# Refactoring checklist

- [x] Keep `App.jsx` as a composition root only.
- [x] Extract project domain operations.
- [x] Extract volunteer domain operations.
- [x] Extract application invariants.
- [x] Centralize navigation identifiers.
- [x] Add pure selectors.
- [x] Isolate and make demo seed data deterministic.
- [x] Normalize project and volunteer inputs at the domain boundary.
- [x] Extract view routing from `App.jsx`.
- [x] Keep matching framework-independent.
- [x] Document architecture boundaries.
- [x] Run build verification through GitHub Actions on `main`, `chantier`, and refactor branches.
