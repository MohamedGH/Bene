# Domain layer

Files in this directory must remain independent from React and browser APIs.

- `projects.js`: project creation, filtering and status transitions.
- `volunteers.js`: volunteer creation and filtering.
- `applications.js`: application invariants and toggling.
- `selectors.js`: pure entity/application selectors.
- `navigation.js`: application view identifiers.

This boundary keeps business rules reusable when persistence or a backend is introduced later.
