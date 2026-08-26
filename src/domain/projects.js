import { uid } from "../utils/id";
import { normalizeEntity, uniqueSkills } from "../utils/validation";

export function createProject(input) {
  const project = normalizeEntity(input, ["titre", "description", "contact", "urgence"]);
  return { ...project, id: uid(), competences: uniqueSkills(project.competences), statut: "ouvert" };
}

export function updateProjectStatus(projects, projectId, statut) {
  return projects.map((project) => project.id === projectId ? { ...project, statut } : project);
}

export function filterProjects(projects, search, statut = "tous") {
  const query = search.trim().toLowerCase();
  return projects
    .filter((project) => !query || project.titre.toLowerCase().includes(query) || project.competences.some((skill) => skill.toLowerCase().includes(query)))
    .filter((project) => statut === "tous" || project.statut === statut);
}
