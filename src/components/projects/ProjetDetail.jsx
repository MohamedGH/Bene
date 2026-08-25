import { ArrowLeft, CheckCircle2, HandMetal, Sparkles } from "lucide-react";
import { GREEN, INK, STATUTS, smallBtnStyle, statutColor, urgenceColor } from "../../constants";
import { normalize } from "../../utils/matching";
import Tag from "../ui/Tag";
import Stamp from "../ui/Stamp";
import StatutBadge from "../ui/StatutBadge";

export default function ProjetDetail({ projet, ranked, isCandidat, onToggleCandidature, onSetStatut, onBack }) {
  return (
    <div>
      <button type="button" onClick={onBack} style={{ ...smallBtnStyle, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, border: "none", paddingLeft: 0 }}><ArrowLeft size={16} /> Retour aux besoins</button>
      <div style={{ borderLeft: `5px solid ${urgenceColor(projet.urgence)}`, paddingLeft: 16, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.8rem", margin: "0 0 8px" }}>{projet.titre}</h2>
          <StatutBadge statut={projet.statut} />
        </div>
        <p style={{ color: `${INK}cc`, lineHeight: 1.6, maxWidth: 620 }}>{projet.description}</p>
        <div style={{ margin: "10px 0" }}>{projet.competences.map((skill) => <Tag key={skill} tone="ocre">{skill}</Tag>)}</div>
        <div style={{ fontSize: "0.85rem", color: `${INK}88`, marginBottom: 14 }}>Contact : {projet.contact}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.78rem", color: `${INK}88` }}>Avancement :</span>
          {STATUTS.map((status) => <button key={status} type="button" onClick={() => onSetStatut(projet.id, status)} style={{ ...smallBtnStyle, padding: "5px 11px", fontSize: "0.75rem", textTransform: "capitalize", background: projet.statut === status ? statutColor(status) : "transparent", color: projet.statut === status ? "#fff" : statutColor(status), border: `1.5px solid ${statutColor(status)}` }}>{status}</button>)}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><Sparkles size={18} color="#B23A2E" /><h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.2rem", margin: 0 }}>Bénévoles classés par compatibilité</h3></div>
      <div style={{ display: "grid", gap: 12 }}>
        {ranked.map((volunteer, index) => {
          const candidate = isCandidat(projet.id, volunteer.id);
          return (
            <div key={volunteer.id} style={{ display: "flex", gap: 16, alignItems: "center", border: `1.5px solid ${candidate ? GREEN : `${INK}22`}`, borderRadius: 8, padding: "16px 18px", background: "#fff", flexWrap: "wrap" }}>
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: `${INK}66`, width: 18 }}>{String(index + 1).padStart(2, "0")}</div>
              <Stamp percent={volunteer.score} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 700, fontFamily: "'Fraunces', serif", fontSize: "1.05rem" }}>{volunteer.nom}</div>
                <p style={{ margin: "2px 0 8px", fontSize: "0.85rem", color: `${INK}aa` }}>{volunteer.bio}</p>
                <div>{volunteer.competences.map((skill) => <Tag key={skill} tone={projet.competences.some((required) => normalize(required) === normalize(skill)) ? "green" : "ink"}>{skill}</Tag>)}</div>
              </div>
              <button type="button" onClick={() => onToggleCandidature(projet.id, volunteer.id)} style={{ ...smallBtnStyle, display: "flex", alignItems: "center", gap: 6, background: candidate ? GREEN : "transparent", color: candidate ? "#fff" : INK, border: `1.5px solid ${candidate ? GREEN : INK}` }}>
                {candidate ? <CheckCircle2 size={15} /> : <HandMetal size={15} />}{candidate ? "Proposé" : "Se proposer"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
