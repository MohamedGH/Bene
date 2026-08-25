export function normalize(value) {
  return value.trim().toLowerCase();
}

export function matchScore(requiredSkills, volunteerSkills) {
  if (requiredSkills.length === 0) return 0;

  const required = requiredSkills.map(normalize);
  const available = new Set(volunteerSkills.map(normalize));
  const hits = required.filter((skill) => available.has(skill)).length;

  return Math.round((hits / required.length) * 100);
}

export function rankVolunteersForProject(project, volunteers) {
  return volunteers
    .map((volunteer) => ({
      ...volunteer,
      score: matchScore(project.competences, volunteer.competences),
    }))
    .sort((a, b) => b.score - a.score);
}

export function rankProjectsForVolunteer(volunteer, projects) {
  return projects
    .map((project) => ({
      ...project,
      score: matchScore(project.competences, volunteer.competences),
    }))
    .sort((a, b) => b.score - a.score);
}
