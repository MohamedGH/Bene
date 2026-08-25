import { Search } from "lucide-react";
import { INK, inputStyle } from "../../constants";
import { SectionHeader } from "../ui/Buttons";
import Tag from "../ui/Tag";
import { Empty } from "../ui/FormControls";

export default function ListeBenevoles({ benevoles, search, setSearch, onOpen, onNew }) {
  return (
    <div>
      <SectionHeader title="Bénévoles disponibles" onNew={onNew} newLabel="Devenir bénévole" />
      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: 13, opacity: 0.5 }} />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher par nom ou compétence…" style={{ ...inputStyle, paddingLeft: 34, width: "100%" }} />
      </div>
      {benevoles.length === 0 && <Empty text="Aucun bénévole ne correspond à cette recherche." />}
      <div style={{ display: "grid", gap: 14 }}>
        {benevoles.map((volunteer) => (
          <button key={volunteer.id} type="button" onClick={() => onOpen(volunteer.id)} style={{ textAlign: "left", width: "100%", border: `1.5px solid ${INK}22`, borderRadius: 8, padding: "18px 20px", background: "#fff", cursor: "pointer", color: INK }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", margin: "0 0 4px" }}>{volunteer.nom}</h3>
            <p style={{ margin: "0 0 10px", color: `${INK}bb`, fontSize: "0.9rem", lineHeight: 1.5 }}>{volunteer.bio}</p>
            <div>{volunteer.competences.map((skill) => <Tag key={skill} tone="green">{skill}</Tag>)}</div>
            <div style={{ fontSize: "0.78rem", color: `${INK}88`, marginTop: 6 }}>Disponibilité : {volunteer.dispo}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
