import { uid } from "../utils/id";

export function createProject(input) {
  return { ...input, id: uid(), statut: "ouvert" };
}

export function updateProjectStatus(projects, projectId, statut) {
  return projects.map((project) =>
    project.id === projectId ? { ...project, statut } : project
  );
}

export function filterProjects(projects, search, statut = "tous") {
  const query = search.trim().toLowerCase();
  return projects
    .filter(
      (project) =>
        !query ||
        project.titre.toLowerCase().includes(query) ||
        project.competences.some((skill) => skill.toLowerCase().includes(query))
    )
    .filter((project) => statut === "tous" || project.statut === statut);
}
