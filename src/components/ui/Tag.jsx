import { INK, GREEN } from "../../constants";

export default function Tag({ children, tone = "ink" }) {
  const colors = {
    ink: { bg: "rgba(27,42,74,0.08)", fg: INK },
    ocre: { bg: "rgba(217,164,65,0.18)", fg: "#8a5c14" },
    green: { bg: "rgba(47,93,78,0.12)", fg: GREEN },
  };
  const color = colors[tone] || colors.ink;

  return (
    <span style={{
      background: color.bg,
      color: color.fg,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: "0.72rem",
      letterSpacing: "0.02em",
      padding: "3px 8px",
      borderRadius: 4,
      display: "inline-block",
      marginRight: 6,
      marginBottom: 6,
    }}>
      {children}
    </span>
  );
}
