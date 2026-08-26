import { uid } from "../utils/id";

export function createVolunteer(input) {
  return { ...input, id: uid() };
}

export function filterVolunteers(volunteers, search) {
  const query = search.trim().toLowerCase();
  return volunteers.filter(
    (volunteer) =>
      !query ||
      volunteer.nom.toLowerCase().includes(query) ||
      volunteer.competences.some((skill) => skill.toLowerCase().includes(query))
  );
}
