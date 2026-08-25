import { INK, PAPER } from "./constants";
import useAppState from "./hooks/useAppState";
import Header from "./components/layout/Header";
import Accueil from "./components/home/Accueil";
import ListeProjets from "./components/projects/ListeProjets";
import ProjetDetail from "./components/projects/ProjetDetail";
import NouveauProjet from "./components/projects/NouveauProjet";
import ListeBenevoles from "./components/volunteers/ListeBenevoles";
import BenevoleDetail from "./components/volunteers/BenevoleDetail";
import NouveauBenevole from "./components/volunteers/NouveauBenevole";

export default function App() {
  const state = useAppState();

  const renderView = () => {
    switch (state.view) {
      case "projets":
        return (
          <ListeProjets
            projets={state.filteredProjets}
            search={state.search}
            setSearch={state.setSearch}
            statutFiltre={state.statutFiltre}
            setStatutFiltre={state.setStatutFiltre}
            candidatures={state.candidatures}
            onOpen={state.selectProjet}
            onNew={() => state.setView("nouveauProjet")}
          />
        );
      case "benevoles":
        return (
          <ListeBenevoles
            benevoles={state.filteredBenevoles}
            search={state.benevoleSearch}
            setSearch={state.setBenevoleSearch}
            onOpen={state.selectBenevole}
            onNew={() => state.setView("nouveauBenevole")}
          />
        );
      case "projetDetail":
        return state.selectedProjet ? (
          <ProjetDetail
            projet={state.selectedProjet}
            ranked={state.rankedForProjet}
            isCandidat={state.isCandidat}
            onToggleCandidature={state.toggleCandidature}
            onSetStatut={state.setProjetStatut}
            onBack={() => state.setView("projets")}
          />
        ) : null;
      case "benevoleDetail":
        return state.selectedBenevole ? (
          <BenevoleDetail
            benevole={state.selectedBenevole}
            ranked={state.rankedForBenevole}
            isCandidat={state.isCandidat}
            onToggleCandidature={state.toggleCandidature}
            onBack={() => state.setView("benevoles")}
          />
        ) : null;
      case "nouveauProjet":
        return <NouveauProjet onCancel={() => state.setView("projets")} onSave={state.addProjet} />;
      case "nouveauBenevole":
        return <NouveauBenevole onCancel={() => state.setView("benevoles")} onSave={state.addBenevole} />;
      case "accueil":
      default:
        return <Accueil setView={state.setView} projets={state.projets} benevoles={state.benevoles} candidatures={state.candidatures} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: PAPER, color: INK, fontFamily: "Inter, system-ui, sans-serif" }}>
      <Header view={state.view} onNavigate={state.setView} />
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px 80px" }}>
        {renderView()}
      </main>
    </div>
  );
}
