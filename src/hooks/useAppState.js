import { useMemo, useState } from "react";
import { seedBenevoles, seedProjets } from "../data/seed";
import { rankProjectsForVolunteer, rankVolunteersForProject } from "../utils/matching";
import { uid } from "../utils/id";

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

  const selectedProjet = projets.find((project) => project.id === selectedProjetId);
  const selectedBenevole = benevoles.find((volunteer) => volunteer.id === selectedBenevoleId);

  const isCandidat = (projetId, benevoleId) =>
    candidatures.some((candidate) => candidate.projetId === projetId && candidate.benevoleId === benevoleId);

  const toggleCandidature = (projetId, benevoleId) => {
    setCandidatures((current) =>
      isCandidat(projetId, benevoleId)
        ? current.filter((candidate) => !(candidate.projetId === projetId && candidate.benevoleId === benevoleId))
        : [...current, { id: uid(), projetId, benevoleId }]
    );
  };

  const setProjetStatut = (projetId, statut) => {
    setProjets((current) => current.map((project) => project.id === projetId ? { ...project, statut } : project));
  };

  const addProjet = (project) => {
    setProjets((current) => [{ ...project, id: uid(), statut: "ouvert" }, ...current]);
    setView("projets");
  };

  const addBenevole = (volunteer) => {
    setBenevoles((current) => [{ ...volunteer, id: uid() }, ...current]);
    setView("benevoles");
  };

  const filteredProjets = useMemo(() => {
    const query = search.toLowerCase();
    return projets
      .filter((project) => project.titre.toLowerCase().includes(query) || project.competences.some((skill) => skill.toLowerCase().includes(query)))
      .filter((project) => statutFiltre === "tous" || project.statut === statutFiltre);
  }, [projets, search, statutFiltre]);

  const filteredBenevoles = useMemo(() => {
    const query = benevoleSearch.toLowerCase();
    return benevoles.filter((volunteer) => volunteer.nom.toLowerCase().includes(query) || volunteer.competences.some((skill) => skill.toLowerCase().includes(query)));
  }, [benevoles, benevoleSearch]);

  const rankedForProjet = useMemo(() => selectedProjet ? rankVolunteersForProject(selectedProjet, benevoles) : [], [selectedProjet, benevoles]);
  const rankedForBenevole = useMemo(() => selectedBenevole ? rankProjectsForVolunteer(selectedBenevole, projets) : [], [selectedBenevole, projets]);

  return {
    projets, benevoles, candidatures, view, setView,
    selectedProjet, selectedBenevole,
    search, setSearch, benevoleSearch, setBenevoleSearch,
    statutFiltre, setStatutFiltre,
    filteredProjets, filteredBenevoles,
    rankedForProjet, rankedForBenevole,
    isCandidat, toggleCandidature, setProjetStatut, addProjet, addBenevole,
    selectProjet: (id) => { setSelectedProjetId(id); setView("projetDetail"); },
    selectBenevole: (id) => { setSelectedBenevoleId(id); setView("benevoleDetail"); },
  };
}
