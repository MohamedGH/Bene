import { useState } from "react";
import { URGENCES, inputStyle, smallBtnStyle, urgenceColor } from "../../constants";
import { Field, Form, SkillInput } from "../ui/FormControls";

export default function NouveauProjet({ onCancel, onSave }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [competences, setCompetences] = useState([]);
  const [contact, setContact] = useState("");
  const [urgence, setUrgence] = useState("moyenne");
  const canSave = titre.trim() && competences.length > 0;

  return (
    <Form title="Déposer un besoin" onCancel={onCancel} onSave={() => onSave({ titre, description, competences, contact, urgence })} canSave={canSave}>
      <Field label="Titre du besoin"><input style={{ ...inputStyle, width: "100%" }} value={titre} onChange={(event) => setTitre(event.target.value)} placeholder="Ex. Refaire une clôture de jardin" /></Field>
      <Field label="Description"><textarea style={{ ...inputStyle, width: "100%", minHeight: 90, resize: "vertical", fontFamily: "Inter, sans-serif" }} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Décrivez le contexte et ce dont vous avez besoin" /></Field>
      <Field label="Compétences requises"><SkillInput value={competences} onChange={setCompetences} placeholder="Ex. Menuiserie" /></Field>
      <Field label="Urgence"><div style={{ display: "flex", gap: 8 }}>{URGENCES.map((level) => <button key={level} type="button" onClick={() => setUrgence(level)} style={{ ...smallBtnStyle, background: urgence === level ? urgenceColor(level) : "transparent", color: urgence === level ? "#fff" : "#1B2A4A", border: `1.5px solid ${urgenceColor(level)}`, textTransform: "capitalize" }}>{level}</button>)}</div></Field>
      <Field label="Contact (nom, structure)"><input style={{ ...inputStyle, width: "100%" }} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Ex. Marie, association du quartier" /></Field>
    </Form>
  );
}
