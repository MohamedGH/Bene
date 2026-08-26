export const VIEWS = Object.freeze({
  HOME: "accueil",
  PROJECTS: "projets",
  VOLUNTEERS: "benevoles",
  PROJECT_DETAIL: "projetDetail",
  VOLUNTEER_DETAIL: "benevoleDetail",
  NEW_PROJECT: "nouveauProjet",
  NEW_VOLUNTEER: "nouveauBenevole",
});

export function isKnownView(view) {
  return Object.values(VIEWS).includes(view);
}
