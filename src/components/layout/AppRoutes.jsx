import { VIEWS } from "../../domain/navigation";
import Accueil from "../home/Accueil";
import ListeProjets from "../projects/ListeProjets";
import ProjetDetail from "../projects/ProjetDetail";
import NouveauProjet from "../projects/NouveauProjet";
import ListeBenevoles from "../volunteers/ListeBenevoles";
import BenevoleDetail from "../volunteers/BenevoleDetail";
import NouveauBenevole from "../volunteers/NouveauBenevole";

export default function AppRoutes({ state }) {
  switch (state.view) {
    case VIEWS.PROJECTS:
      return <ListeProjets projets={state.filteredProjets} search={state.search} setSearch={state.setSearch} statutFiltre={state.statutFiltre} setStatutFiltre={state.setStatutFiltre} candidatures={state.candidatures} onOpen={state.selectProjet} onNew={() => state.setView(VIEWS.NEW_PROJECT)} />;
    case VIEWS.VOLUNTEERS:
      return <ListeBenevoles benevoles={state.filteredBenevoles} search={state.benevoleSearch} setSearch={state.setBenevoleSearch} onOpen={state.selectBenevole} onNew={() => state.setView(VIEWS.NEW_VOLUNTEER)} />;
    case VIEWS.PROJECT_DETAIL:
      return state.selectedProjet ? <ProjetDetail projet={state.selectedProjet} ranked={state.rankedForProjet} isCandidat={state.isCandidat} onToggleCandidature={state.toggleCandidature} onSetStatut={state.setProjetStatut} onBack={() => state.setView(VIEWS.PROJECTS)} /> : null;
    case VIEWS.VOLUNTEER_DETAIL:
      return state.selectedBenevole ? <BenevoleDetail benevole={state.selectedBenevole} ranked={state.rankedForBenevole} isCandidat={state.isCandidat} onToggleCandidature={state.toggleCandidature} onBack={() => state.setView(VIEWS.VOLUNTEERS)} /> : null;
    case VIEWS.NEW_PROJECT:
      return <NouveauProjet onCancel={() => state.setView(VIEWS.PROJECTS)} onSave={state.addProjet} />;
    case VIEWS.NEW_VOLUNTEER:
      return <NouveauBenevole onCancel={() => state.setView(VIEWS.VOLUNTEERS)} onSave={state.addBenevole} />;
    case VIEWS.HOME:
    default:
      return <Accueil setView={state.setView} projets={state.projets} benevoles={state.benevoles} candidatures={state.candidatures} />;
  }
}
