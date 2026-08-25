import { GREEN, OCRE, STAMP } from "../../constants";

export default function Stamp({ percent }) {
  const color = percent >= 70 ? GREEN : percent >= 40 ? OCRE : STAMP;

  return (
    <div style={{
      width: 64,
      height: 64,
      borderRadius: "50%",
      border: `2.5px solid ${color}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      transform: "rotate(-6deg)",
      flexShrink: 0,
      position: "relative",
    }}>
      <div style={{ position: "absolute", inset: 3, border: `1px dashed ${color}`, borderRadius: "50%" }} />
      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.1rem", color }}>
        {percent}%
      </span>
      <span style={{ fontSize: "0.5rem", letterSpacing: "0.08em", color, textTransform: "uppercase", fontFamily: "ui-monospace, monospace" }}>
        match
      </span>
    </div>
  );
}
