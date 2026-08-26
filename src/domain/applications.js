import { uid } from "../utils/id";

export function isApplication(candidateApplications, projectId, volunteerId) {
  return candidateApplications.some(
    ({ projetId, benevoleId }) => projetId === projectId && benevoleId === volunteerId
  );
}

export function toggleApplication(applications, projectId, volunteerId) {
  if (isApplication(applications, projectId, volunteerId)) {
    return applications.filter(
      ({ projetId, benevoleId }) => !(projetId === projectId && benevoleId === volunteerId)
    );
  }
  return [...applications, { id: uid(), projetId: projectId, benevoleId: volunteerId }];
}
