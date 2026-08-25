export const INK = "#1B2A4A";
export const PAPER = "#F6F3EC";
export const STAMP = "#B23A2E";
export const OCRE = "#D9A441";
export const GREEN = "#2F5D4E";

export const STATUTS = ["ouvert", "en cours", "terminé"];
export const URGENCES = ["basse", "moyenne", "haute"];

export function statutColor(statut) {
  return statut === "terminé" ? GREEN : statut === "en cours" ? OCRE : INK;
}

export function urgenceColor(urgence) {
  return urgence === "haute" ? STAMP : urgence === "moyenne" ? OCRE : GREEN;
}

export const inputStyle = {
  flex: 1,
  padding: "10px 12px",
  border: `1.5px solid ${INK}22`,
  borderRadius: 6,
  fontFamily: "Inter, system-ui, sans-serif",
  fontSize: "0.92rem",
  background: "#fff",
  color: INK,
  outline: "none",
};

export const smallBtnStyle = {
  padding: "10px 14px",
  border: `1.5px solid ${INK}`,
  borderRadius: 6,
  background: "transparent",
  color: INK,
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "0.85rem",
  cursor: "pointer",
};

export const primaryBtnStyle = {
  padding: "11px 18px",
  border: "none",
  borderRadius: 6,
  background: INK,
  color: PAPER,
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "0.9rem",
  cursor: "pointer",
};
