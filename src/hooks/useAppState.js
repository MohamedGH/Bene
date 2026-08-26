import { useMemo, useState } from "react";
import { seedBenevoles, seedProjets } from "../data/seed";
import { createProject, filterProjects, updateProjectStatus } from "../domain/projects";
import { createVolunteer, filterVolunteers } from "../domain/volunteers";
import { isApplication, toggleApplication } from "../domain/applications";
import { rankProjectsForVolunteer, rankVolunteersForProject } from "../utils/matching";

export default function useAppState() {
  const [projets, setProjets] = useState(seedProjets);
  const [benevoles, setBenevoles] = useState(seedBenevoles);
  const [candidatures, setCandidatures] = useState([]);
  const [view, setView] = useState("accueil");
  const [selectedProjetId, setSelectedProjetId] = useState(null);
  const [selectedBenevoleId, setSelectedBenevoleId] = useState(null);
  const [search, setSearch] = useState("");
  const [benevoleSearch, setBenevoleSearch] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("tous");

  const selectedProjet = useMemo(
    () => projets.find((project) => project.id === selectedProjetId),
    [projets, selectedProjetId]
  );
  const selectedBenevole = useMemo(
    () => benevoles.find((volunteer) => volunteer.id === selectedBenevoleId),
    [benevoles, selectedBenevoleId]
  );

  const filteredProjets = useMemo(
    () => filterProjects(projets, search, statutFiltre),
    [projets, search, statutFiltre]
  );
  const filteredBenevoles = useMemo(
    () => filterVolunteers(benevoles, benevoleSearch),
    [benevoles, benevoleSearch]
  );
  const rankedForProjet = useMemo(
    () => (selectedProjet ? rankVolunteersForProject(selectedProjet, benevoles) : []),
    [selectedProjet, benevoles]
  );
  const rankedForBenevole = useMemo(
    () => (selectedBenevole ? rankProjectsForVolunteer(selectedBenevole, projets) : []),
    [selectedBenevole, projets]
  );

  const selectProjet = (id) => {
    setSelectedProjetId(id);
    setView("projetDetail");
  };

  const selectBenevole = (id) => {
    setSelectedBenevoleId(id);
    setView("benevoleDetail");
  };

  const addProjet = (project) => {
    setProjets((current) => [createProject(project), ...current]);
    setView("projets");
  };

  const addBenevole = (volunteer) => {
    setBenevoles((current) => [createVolunteer(volunteer), ...current]);
    setView("benevoles");
  };

  const toggleCandidature = (projetId, benevoleId) => {
    setCandidatures((current) => toggleApplication(current, projetId, benevoleId));
  };

  const setProjetStatut = (projetId, statut) => {
    setProjets((current) => updateProjectStatus(current, projetId, statut));
  };

  return {
    projets,
    benevoles,
    candidatures,
    view,
    setView,
    selectedProjet,
    selectedBenevole,
    search,
    setSearch,
    benevoleSearch,
    setBenevoleSearch,
    statutFiltre,
    setStatutFiltre,
    filteredProjets,
    filteredBenevoles,
    rankedForProjet,
    rankedForBenevole,
    isCandidat: (projetId, benevoleId) => isApplication(candidatures, projetId, benevoleId),
    toggleCandidature,
    setProjetStatut,
    addProjet,
    addBenevole,
    selectProjet,
    selectBenevole,
  };
}
