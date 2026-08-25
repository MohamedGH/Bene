import { ArrowLeft, CheckCircle2, HandMetal, Sparkles } from "lucide-react";
import { GREEN, INK, smallBtnStyle, urgenceColor } from "../../constants";
import { normalize } from "../../utils/matching";
import Tag from "../ui/Tag";
import Stamp from "../ui/Stamp";
import StatutBadge from "../ui/StatutBadge";

export default function BenevoleDetail({ benevole, ranked, isCandidat, onToggleCandidature, onBack }) {
  return (
    <div>
      <button type="button" onClick={onBack} style={{ ...smallBtnStyle, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, border: "none", paddingLeft: 0 }}><ArrowLeft size={16} /> Retour aux bénévoles</button>
      <div style={{ borderLeft: `5px solid ${GREEN}`, paddingLeft: 16, marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.8rem", margin: "0 0 8px" }}>{benevole.nom}</h2>
        <p style={{ color: `${INK}cc`, lineHeight: 1.6, maxWidth: 620 }}>{benevole.bio}</p>
        <div style={{ margin: "10px 0" }}>{benevole.competences.map((skill) => <Tag key={skill} tone="green">{skill}</Tag>)}</div>
        <div style={{ fontSize: "0.85rem", color: `${INK}88` }}>Disponibilité : {benevole.dispo}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Sparkles size={18} color="#B23A2E" /><h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.2rem", margin: 0 }}>Besoins classés par compatibilité</h3></div>
      <div style={{ display: "grid", gap: 12 }}>
        {ranked.map((project, index) => {
          const candidate = isCandidat(project.id, benevole.id);
          return (
            <div key={project.id} style={{ display: "flex", gap: 16, alignItems: "center", border: `1.5px solid ${candidate ? GREEN : `${INK}22`}`, borderLeft: `5px solid ${urgenceColor(project.urgence)}`, borderRadius: 8, padding: "16px 18px", background: "#fff", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: `${INK}66`, width: 18 }}>{String(index + 1).padStart(2, "0")}</div>
              <Stamp percent={project.score} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><div style={{ fontWeight: 700, fontFamily: "'Fraunces', serif", fontSize: "1.05rem" }}>{project.titre}</div><StatutBadge statut={project.statut} /></div>
                <p style={{ margin: "2px 0 8px", fontSize: "0.85rem", color: `${INK}aa` }}>{project.description}</p>
                <div>{project.competences.map((skill) => <Tag key={skill} tone={benevole.competences.some((available) => normalize(available) === normalize(skill)) ? "green" : "ocre"}>{skill}</Tag>)}</div>
              </div>
              <button type="button" onClick={() => onToggleCandidature(project.id, benevole.id)} style={{ ...smallBtnStyle, display: "flex", alignItems: "center", gap: 6, background: candidate ? GREEN : "transparent", color: candidate ? "#fff" : INK, border: `1.5px solid ${candidate ? GREEN : INK}` }}>{candidate ? <CheckCircle2 size={15} /> : <HandMetal size={15} />}{candidate ? "Proposé" : "Se proposer"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
