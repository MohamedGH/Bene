import { Filter, HandMetal, Search } from "lucide-react";
import { GREEN, INK, STATUTS, inputStyle, smallBtnStyle, urgenceColor } from "../../constants";
import { SectionHeader } from "../ui/Buttons";
import Tag from "../ui/Tag";
import StatutBadge from "../ui/StatutBadge";
import { Empty } from "../ui/FormControls";

export default function ListeProjets({ projets, search, setSearch, statutFiltre, setStatutFiltre, candidatures, onOpen, onNew }) {
  return (
    <div>
      <SectionHeader title="Besoins à pourvoir" onNew={onNew} newLabel="Déposer un besoin" />
      <div style={{ position: "relative", marginBottom: 14 }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: 13, opacity: 0.5 }} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher par titre ou compétence…" style={{ ...inputStyle, paddingLeft: 34, width: "100%" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <Filter size={14} style={{ opacity: 0.5 }} />
        {["tous", ...STATUTS].map((status) => (
          <button key={status} type="button" onClick={() => setStatutFiltre(status)} style={{ ...smallBtnStyle, padding: "6px 12px", fontSize: "0.78rem", textTransform: "capitalize", background: statutFiltre === status ? INK : "transparent", color: statutFiltre === status ? "#F6F3EC" : INK }}>
            {status}
          </button>
        ))}
      </div>
      {projets.length === 0 && <Empty text="Aucun besoin ne correspond à cette recherche." />}
      <div style={{ display: "grid", gap: 14 }}>
        {projets.map((project) => {
          const count = candidatures.filter((candidate) => candidate.projetId === project.id).length;
          return (
            <button key={project.id} type="button" onClick={() => onOpen(project.id)} style={{ textAlign: "left", width: "100%", border: `1.5px solid ${INK}22`, borderLeft: `5px solid ${urgenceColor(project.urgence)}`, borderRadius: 8, padding: "18px 20px", background: "#fff", cursor: "pointer", color: INK }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.15rem", margin: "0 0 6px" }}>{project.titre}</h3>
                <StatutBadge statut={project.statut} />
              </div>
              <p style={{ margin: "0 0 10px", color: `${INK}bb`, fontSize: "0.9rem", lineHeight: 1.5 }}>{project.description}</p>
              <div>{project.competences.map((skill) => <Tag key={skill}>{skill}</Tag>)}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <span style={{ fontSize: "0.78rem", color: `${INK}88` }}>{project.contact}</span>
                {count > 0 && <span style={{ fontSize: "0.75rem", color: GREEN, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><HandMetal size={13} /> {count} proposé{count > 1 ? "s" : ""}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
