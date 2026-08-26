import { uid } from "../utils/id";
import { normalizeEntity, uniqueSkills } from "../utils/validation";

export function createVolunteer(input) {
  const volunteer = normalizeEntity(input, ["nom", "bio", "dispo"]);
  return { ...volunteer, id: uid(), competences: uniqueSkills(volunteer.competences) };
}

export function filterVolunteers(volunteers, search) {
  const query = search.trim().toLowerCase();
  return volunteers.filter((volunteer) => !query || volunteer.nom.toLowerCase().includes(query) || volunteer.competences.some((skill) => skill.toLowerCase().includes(query)));
}
