export const findById = (items, id) => items.find((item) => item.id === id);

export function countApplicationsForProject(applications, projectId) {
  return applications.filter((application) => application.projetId === projectId).length;
}

export function countApplicationsForVolunteer(applications, volunteerId) {
  return applications.filter((application) => application.benevoleId === volunteerId).length;
}
