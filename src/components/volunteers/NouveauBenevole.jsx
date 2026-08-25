import { useState } from "react";
import { inputStyle } from "../../constants";
import { Field, Form, SkillInput } from "../ui/FormControls";

export default function NouveauBenevole({ onCancel, onSave }) {
  const [nom, setNom] = useState("");
  const [bio, setBio] = useState("");
  const [competences, setCompetences] = useState([]);
  const [dispo, setDispo] = useState("");
  const canSave = nom.trim() && competences.length > 0;

  return (
    <Form title="Devenir bénévole" onCancel={onCancel} onSave={() => onSave({ nom, bio, competences, dispo })} canSave={canSave}>
      <Field label="Nom"><input style={{ ...inputStyle, width: "100%" }} value={nom} onChange={(event) => setNom(event.target.value)} placeholder="Votre nom" /></Field>
      <Field label="Présentation"><textarea style={{ ...inputStyle, width: "100%", minHeight: 80, resize: "vertical", fontFamily: "Inter, sans-serif" }} value={bio} onChange={(event) => setBio(event.target.value)} placeholder="Quelques mots sur vous et votre motivation à aider" /></Field>
      <Field label="Compétences"><SkillInput value={competences} onChange={setCompetences} placeholder="Ex. Traduction" /></Field>
      <Field label="Disponibilité"><input style={{ ...inputStyle, width: "100%" }} value={dispo} onChange={(event) => setDispo(event.target.value)} placeholder="Ex. Week-ends, soirs en semaine…" /></Field>
    </Form>
  );
}
