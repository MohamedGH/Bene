import { statutColor } from "../../constants";

export default function StatutBadge({ statut }) {
  const color = statutColor(statut);
  return (
    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.04em", color, border: `1px solid ${color}`, borderRadius: 4, padding: "2px 8px", whiteSpace: "nowrap" }}>
      {statut}
    </span>
  );
}
