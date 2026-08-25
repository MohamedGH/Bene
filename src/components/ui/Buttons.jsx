import { Plus } from "lucide-react";
import { INK, PAPER, primaryBtnStyle, smallBtnStyle } from "../../constants";

export function NavBtn({ active, onClick, icon, children }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 6, border: `1.5px solid ${active ? INK : "transparent"}`, background: active ? INK : "transparent", color: active ? PAPER : INK, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" }}>
      {icon}
      {children}
    </button>
  );
}

export function SectionHeader({ title, onNew, newLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.6rem", margin: 0 }}>{title}</h2>
      <button type="button" style={primaryBtnStyle} onClick={onNew}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Plus size={16} /> {newLabel}</span>
      </button>
    </div>
  );
}

export function StatCard({ label, value, onClick, tone }) {
  return (
    <div onClick={onClick} style={{ border: `1.5px solid ${INK}22`, borderRadius: 8, padding: "18px 20px", cursor: onClick ? "pointer" : "default", background: "#fff" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "2rem", color: tone || INK }}>{value}</div>
      <div style={{ fontSize: "0.82rem", color: `${INK}99`, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export { primaryBtnStyle, smallBtnStyle };
