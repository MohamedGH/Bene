import { useMemo, useState } from "react";
import { createInitialData } from "../data/seed";
import { createProject, filterProjects, updateProjectStatus } from "../domain/projects";
import { createVolunteer, filterVolunteers } from "../domain/volunteers";
import { isApplication, toggleApplication } from "../domain/applications";
import { findById } from "../domain/selectors";
import { VIEWS } from "../domain/navigation";
import { rankProjectsForVolunteer, rankVolunteersForProject } from "../utils/matching";

export default function useAppState() {
  const initialData = useMemo(() => createInitialData(), []);
  const [projets, setProjets] = useState(initialData.projets);
  const [benevoles, setBenevoles] = useState(initialData.benevoles);
  const [candidatures, setCandidatures] = useState(initialData.candidatures);
  const [view, setView] = useState(VIEWS.HOME);
  const [selectedProjetId, setSelectedProjetId] = useState(null);
  const [selectedBenevoleId, setSelectedBenevoleId] = useState(null);
  const [search, setSearch] = useState("");
  const [benevoleSearch, setBenevoleSearch] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("tous");

  const selectedProjet = useMemo(() => findById(projets, selectedProjetId), [projets, selectedProjetId]);
  const selectedBenevole = useMemo(() => findById(benevoles, selectedBenevoleId), [benevoles, selectedBenevoleId]);
  const filteredProjets = useMemo(() => filterProjects(projets, search, statutFiltre), [projets, search, statutFiltre]);
  const filteredBenevoles = useMemo(() => filterVolunteers(benevoles, benevoleSearch), [benevoles, benevoleSearch]);
  const rankedForProjet = useMemo(() => selectedProjet ? rankVolunteersForProject(selectedProjet, benevoles) : [], [selectedProjet, benevoles]);
  const rankedForBenevole = useMemo(() => selectedBenevole ? rankProjectsForVolunteer(selectedBenevole, projets) : [], [selectedBenevole, projets]);

  const selectProjet = (id) => {
    setSelectedProjetId(id);
    setView(VIEWS.PROJECT_DETAIL);
  };
  const selectBenevole = (id) => {
    setSelectedBenevoleId(id);
    setView(VIEWS.VOLUNTEER_DETAIL);
  };
  const addProjet = (project) => {
    setProjets((current) => [createProject(project), ...current]);
    setView(VIEWS.PROJECTS);
  };
  const addBenevole = (volunteer) => {
    setBenevoles((current) => [createVolunteer(volunteer), ...current]);
    setView(VIEWS.VOLUNTEERS);
  };
  const toggleCandidature = (projetId, benevoleId) => {
    setCandidatures((current) => toggleApplication(current, projetId, benevoleId));
  };
  const setProjetStatut = (projetId, statut) => {
    setProjets((current) => updateProjectStatus(current, projetId, statut));
  };

  return {
    projets, benevoles, candidatures, view, setView, selectedProjet, selectedBenevole,
    search, setSearch, benevoleSearch, setBenevoleSearch, statutFiltre, setStatutFiltre,
    filteredProjets, filteredBenevoles, rankedForProjet, rankedForBenevole,
    isCandidat: (projetId, benevoleId) => isApplication(candidatures, projetId, benevoleId),
    toggleCandidature, setProjetStatut, addProjet, addBenevole, selectProjet, selectBenevole,
  };
}
