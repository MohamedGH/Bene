import { useState } from "react";
import { X } from "lucide-react";
import { INK, PAPER, inputStyle, primaryBtnStyle, smallBtnStyle } from "../../constants";
import Tag from "./Tag";

export function SkillInput({ value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const next = draft.trim();
    if (next && !value.includes(next)) onChange([...value, next]);
    setDraft("");
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); add(); } }} placeholder={placeholder} style={inputStyle} />
        <button type="button" onClick={add} style={smallBtnStyle}>Ajouter</button>
      </div>
      <div style={{ marginTop: 8 }}>
        {value.map((skill) => (
          <span key={skill} style={{ display: "inline-flex", alignItems: "center", marginRight: 6, marginBottom: 6 }}>
            <Tag>{skill}</Tag>
            <button type="button" onClick={() => onChange(value.filter((item) => item !== skill))} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: -4, color: INK, opacity: 0.5 }} aria-label={`Retirer ${skill}`}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Form({ title, children, onCancel, onSave, canSave }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.6rem", marginBottom: 20 }}>{title}</h2>
      <div style={{ display: "grid", gap: 18, maxWidth: 560 }}>{children}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
        <button type="button" style={primaryBtnStyle} disabled={!canSave} onClick={onSave}>Publier</button>
        <button type="button" style={smallBtnStyle} onClick={onCancel}>Annuler</button>
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: `${INK}dd` }}>{label}</div>
      {children}
    </label>
  );
}

export function Empty({ text }) {
  return <div style={{ border: `1.5px dashed ${INK}44`, borderRadius: 8, padding: "30px 20px", textAlign: "center", color: `${INK}88` }}>{text}</div>;
}

export function TextInput(props) {
  return <input {...props} style={{ ...inputStyle, width: "100%", ...(props.style || {}) }} />;
}

export { PAPER };
