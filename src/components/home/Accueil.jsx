import { STAMP, GREEN, primaryBtnStyle, smallBtnStyle } from "../../constants";
import { StatCard } from "../ui/Buttons";

export default function Accueil({ setView, projets, benevoles, candidatures }) {
  const ouverts = projets.filter((project) => project.statut !== "terminé").length;

  return (
    <div>
      <section style={{ marginBottom: 48 }}>
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: STAMP, marginBottom: 10 }}>
          Entraide locale · 100% gratuit
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "clamp(2rem, 6vw, 3rem)", lineHeight: 1.05, margin: "0 0 16px" }}>
          Un coup de main,<br />juste à côté de chez vous.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 560, color: "#1B2A4Acc" }}>
          Publiez un besoin, ou proposez vos compétences. Chaque bénévole est classé selon la correspondance réelle entre ce qu'il sait faire et ce qui est demandé — comme un tampon de compatibilité sur chaque profil.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <button type="button" style={primaryBtnStyle} onClick={() => setView("nouveauProjet")}>Déposer un besoin</button>
          <button type="button" style={smallBtnStyle} onClick={() => setView("nouveauBenevole")}>Devenir bénévole</button>
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <StatCard label="Besoins ouverts" value={ouverts} onClick={() => setView("projets")} />
        <StatCard label="Bénévoles inscrits" value={benevoles.length} onClick={() => setView("benevoles")} />
        <StatCard label="Mises en relation" value={candidatures.length} tone={STAMP} />
        <StatCard label="Coût" value="0€" tone={GREEN} />
      </section>
    </div>
  );
}
