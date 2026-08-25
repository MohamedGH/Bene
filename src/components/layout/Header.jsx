import { ClipboardList, HandHeart, Users } from "lucide-react";
import { INK, STAMP } from "../../constants";
import { NavBtn } from "../ui/Buttons";

export default function Header({ view, onNavigate }) {
  return (
    <header style={{ borderBottom: `1.5px solid ${INK}22`, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <button type="button" onClick={() => onNavigate("accueil")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: "none", border: 0, color: INK }}>
        <HandHeart size={26} color={STAMP} />
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.4rem" }}>Entr'aide</span>
      </button>
      <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <NavBtn active={view === "projets"} onClick={() => onNavigate("projets")} icon={<ClipboardList size={16} />}>Besoins</NavBtn>
        <NavBtn active={view === "benevoles"} onClick={() => onNavigate("benevoles")} icon={<Users size={16} />}>Bénévoles</NavBtn>
      </nav>
    </header>
  );
}
