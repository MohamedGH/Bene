import React, { useState, useMemo } from "react";
import { Plus, X, Search, HandHeart, ClipboardList, Users, ArrowLeft, Sparkles, CheckCircle2, HandMetal, Filter } from "lucide-react";

// ---------- Design tokens ----------
// Palette: encre (#1B2A4A), papier (#F6F3EC), tampon rouge (#B23A2E), ocre (#D9A441), vert entraide (#2F5D4E)
// Display: Fraunces (serif, caractère) / Body: Inter / Data: JetBrains-like mono via ui-monospace

const INK = "#1B2A4A";
const PAPER = "#F6F3EC";
const STAMP = "#B23A2E";
const OCRE = "#D9A441";
const GREEN = "#2F5D4E";

const uid = () => Math.random().toString(36).slice(2, 9);

const seedProjets = [
  {
    id: uid(),
    titre: "Refaire le site d'une association de quartier",
    description:
      "Notre asso d'aide aux devoirs a un site cassé depuis 2 ans. Il faudrait le refaire simplement, avec un formulaire de contact et un agenda.",
    competences: ["React", "Design web", "Hébergement"],
    contact: "Fatou, présidente asso Les Petits Pas",
    urgence: "moyenne",
    statut: "ouvert",
  },
  {
    id: uid(),
    titre: "Traduire des fiches santé en 4 langues",
    description:
      "Un centre de santé communautaire a besoin de traduire 10 fiches d'information (arabe, turc, anglais, espagnol).",
    competences: ["Traduction", "Arabe", "Turc", "Espagnol"],
    contact: "Dr Meyer, centre de santé Belleville",
    urgence: "haute",
    statut: "en cours",
  },
  {
    id: uid(),
    titre: "Monter une étagère et réparer une porte",
    description:
      "Une personne âgée a besoin d'aide pour du petit bricolage à domicile, rien de lourd.",
    competences: ["Bricolage", "Menuiserie"],
    contact: "Robert, 78 ans",
    urgence: "basse",
    statut: "ouvert",
  },
];

const STATUTS = ["ouvert", "en cours", "terminé"];

function statutColor(s) {
  return s === "terminé" ? GREEN : s === "en cours" ? OCRE : INK;
}

const seedBenevoles = [
  {
    id: uid(),
    nom: "Léa Morvan",
    bio: "Développeuse front-end, je fais du bénévolat le week-end pour des assos.",
    competences: ["React", "Design web", "CSS"],
    dispo: "Week-ends",
  },
  {
    id: uid(),
    nom: "Karim Haddad",
    bio: "Bilingue arabe/français, je traduis souvent pour des structures sociales.",
    competences: ["Traduction", "Arabe", "Anglais"],
    dispo: "Soirs en semaine",
  },
  {
    id: uid(),
    nom: "Solène Petit",
    bio: "Bricoleuse amateur, j'aide mes voisins depuis des années.",
    competences: ["Bricolage", "Menuiserie", "Jardinage"],
    dispo: "Selon besoin",
  },
];

// ---------- Matching ----------
function normalize(s) {
  return s.trim().toLowerCase();
}

function matchScore(competencesRequises, competencesBenevole) {
  if (competencesRequises.length === 0) return 0;
  const req = competencesRequises.map(normalize);
  const has = new Set(competencesBenevole.map(normalize));
  const hits = req.filter((c) => has.has(c)).length;
  return Math.round((hits / req.length) * 100);
}

// ---------- Small UI atoms ----------
function Tag({ children, tone = "ink" }) {
  const colors = {
    ink: { bg: "rgba(27,42,74,0.08)", fg: INK },
    ocre: { bg: "rgba(217,164,65,0.18)", fg: "#8a5c14" },
    green: { bg: "rgba(47,93,78,0.12)", fg: GREEN },
  };
  const c = colors[tone];
  return (
    <span
      style={{
        background: c.bg,
        color: c.fg,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.02em",
        padding: "3px 8px",
        borderRadius: "4px",
        display: "inline-block",
        marginRight: "6px",
        marginBottom: "6px",
      }}
    >
      {children}
    </span>
  );
}

function Stamp({ percent }) {
  const color = percent >= 70 ? GREEN : percent >= 40 ? OCRE : STAMP;
  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 3,
          border: `1px dashed ${color}`,
          borderRadius: "50%",
        }}
      />
      <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.1rem", color }}>
        {percent}%
      </span>
      <span
        style={{
          fontSize: "0.5rem",
          letterSpacing: "0.08em",
          color,
          textTransform: "uppercase",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        match
      </span>
    </div>
  );
}

function SkillInput({ value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft("");
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          style={inputStyle}
        />
        <button type="button" onClick={add} style={smallBtnStyle}>
          Ajouter
        </button>
      </div>
      <div style={{ marginTop: 8 }}>
        {value.map((c) => (
          <span key={c} style={{ display: "inline-flex", alignItems: "center", marginRight: 6, marginBottom: 6 }}>
            <Tag tone="ink">{c}</Tag>
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== c))}
              style={{ background: "none", border: "none", cursor: "pointer", marginLeft: -4, color: INK, opacity: 0.5 }}
              aria-label={`Retirer ${c}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
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

const smallBtnStyle = {
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

const primaryBtnStyle = {
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

function urgenceColor(u) {
  return u === "haute" ? STAMP : u === "moyenne" ? OCRE : GREEN;
}

// ---------- Main App ----------
export default function App() {
  const [projets, setProjets] = useState(seedProjets);
  const [benevoles, setBenevoles] = useState(seedBenevoles);
  const [candidatures, setCandidatures] = useState([]); // { id, projetId, benevoleId }
  const [view, setView] = useState("accueil"); // accueil | projets | benevoles | projetDetail | benevoleDetail | nouveauProjet | nouveauBenevole
  const [selectedProjetId, setSelectedProjetId] = useState(null);
  const [selectedBenevoleId, setSelectedBenevoleId] = useState(null);
  const [search, setSearch] = useState("");
  const [benevoleSearch, setBenevoleSearch] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("tous");

  const selectedProjet = projets.find((p) => p.id === selectedProjetId);
  const selectedBenevole = benevoles.find((b) => b.id === selectedBenevoleId);

  const isCandidat = (projetId, benevoleId) =>
    candidatures.some((c) => c.projetId === projetId && c.benevoleId === benevoleId);

  const toggleCandidature = (projetId, benevoleId) => {
    setCandidatures((prev) =>
      isCandidat(projetId, benevoleId)
        ? prev.filter((c) => !(c.projetId === projetId && c.benevoleId === benevoleId))
        : [...prev, { id: uid(), projetId, benevoleId }]
    );
  };

  const setProjetStatut = (projetId, statut) => {
    setProjets((prev) => prev.map((p) => (p.id === projetId ? { ...p, statut } : p)));
  };

  const rankedForProjet = useMemo(() => {
    if (!selectedProjet) return [];
    return benevoles
      .map((b) => ({ ...b, score: matchScore(selectedProjet.competences, b.competences) }))
      .sort((a, b) => b.score - a.score);
  }, [selectedProjet, benevoles]);

  const rankedForBenevole = useMemo(() => {
    if (!selectedBenevole) return [];
    return projets
      .map((p) => ({ ...p, score: matchScore(p.competences, selectedBenevole.competences) }))
      .sort((a, b) => b.score - a.score);
  }, [selectedBenevole, projets]);

  const filteredProjets = projets
    .filter(
      (p) =>
        p.titre.toLowerCase().includes(search.toLowerCase()) ||
        p.competences.some((c) => c.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((p) => statutFiltre === "tous" || p.statut === statutFiltre);

  const filteredBenevoles = benevoles.filter(
    (b) =>
      b.nom.toLowerCase().includes(benevoleSearch.toLowerCase()) ||
      b.competences.some((c) => c.toLowerCase().includes(benevoleSearch.toLowerCase()))
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: PAPER,
        color: INK,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid ${GREEN};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          borderBottom: `1.5px solid ${INK}22`,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setView("accueil")}>
          <HandHeart size={26} color={STAMP} />
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.4rem" }}>
            Entr'aide
          </span>
        </div>
        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <NavBtn active={view === "projets"} onClick={() => setView("projets")} icon={<ClipboardList size={16} />}>
            Besoins
          </NavBtn>
          <NavBtn active={view === "benevoles"} onClick={() => setView("benevoles")} icon={<Users size={16} />}>
            Bénévoles
          </NavBtn>
        </nav>
      </header>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px 80px" }}>
        {view === "accueil" && (
          <Accueil setView={setView} projets={projets} benevoles={benevoles} candidatures={candidatures} />
        )}

        {view === "projets" && (
          <ListeProjets
            projets={filteredProjets}
            search={search}
            setSearch={setSearch}
            statutFiltre={statutFiltre}
            setStatutFiltre={setStatutFiltre}
            candidatures={candidatures}
            onOpen={(id) => {
              setSelectedProjetId(id);
              setView("projetDetail");
            }}
            onNew={() => setView("nouveauProjet")}
          />
        )}

        {view === "benevoles" && (
          <ListeBenevoles
            benevoles={filteredBenevoles}
            search={benevoleSearch}
            setSearch={setBenevoleSearch}
            onOpen={(id) => {
              setSelectedBenevoleId(id);
              setView("benevoleDetail");
            }}
            onNew={() => setView("nouveauBenevole")}
          />
        )}

        {view === "projetDetail" && selectedProjet && (
          <ProjetDetail
            projet={selectedProjet}
            ranked={rankedForProjet}
            isCandidat={isCandidat}
            onToggleCandidature={toggleCandidature}
            onSetStatut={setProjetStatut}
            onBack={() => setView("projets")}
          />
        )}

        {view === "benevoleDetail" && selectedBenevole && (
          <BenevoleDetail
            benevole={selectedBenevole}
            ranked={rankedForBenevole}
            isCandidat={isCandidat}
            onToggleCandidature={toggleCandidature}
            onBack={() => setView("benevoles")}
          />
        )}

        {view === "nouveauProjet" && (
          <NouveauProjet
            onCancel={() => setView("projets")}
            onSave={(p) => {
              setProjets([{ ...p, id: uid(), statut: "ouvert" }, ...projets]);
              setView("projets");
            }}
          />
        )}

        {view === "nouveauBenevole" && (
          <NouveauBenevole
            onCancel={() => setView("benevoles")}
            onSave={(b) => {
              setBenevoles([{ ...b, id: uid() }, ...benevoles]);
              setView("benevoles");
            }}
          />
        )}
      </main>
    </div>
  );
}

function NavBtn({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: 6,
        border: `1.5px solid ${active ? INK : "transparent"}`,
        background: active ? INK : "transparent",
        color: active ? PAPER : INK,
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: "0.88rem",
        cursor: "pointer",
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function Accueil({ setView, projets, benevoles, candidatures }) {
  const ouverts = projets.filter((p) => p.statut !== "terminé").length;
  return (
    <div>
      <section style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: STAMP,
            marginBottom: 10,
          }}
        >
          Entraide locale · 100% gratuit
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            fontSize: "clamp(2rem, 6vw, 3rem)",
            lineHeight: 1.05,
            margin: "0 0 16px",
          }}
        >
          Un coup de main,
          <br />
          juste à côté de chez vous.
        </h1>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.6, maxWidth: 560, color: `${INK}cc` }}>
          Publiez un besoin, ou proposez vos compétences. Chaque bénévole est classé
          selon la correspondance réelle entre ce qu'il sait faire et ce qui est demandé —
          comme un tampon de compatibilité sur chaque profil.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <button style={primaryBtnStyle} onClick={() => setView("nouveauProjet")}>
            Déposer un besoin
          </button>
          <button style={smallBtnStyle} onClick={() => setView("nouveauBenevole")}>
            Devenir bénévole
          </button>
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

function StatCard({ label, value, onClick, tone }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `1.5px solid ${INK}22`,
        borderRadius: 8,
        padding: "18px 20px",
        cursor: onClick ? "pointer" : "default",
        background: "#fff",
      }}
    >
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "2rem", color: tone || INK }}>
        {value}
      </div>
      <div style={{ fontSize: "0.82rem", color: `${INK}99`, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function SectionHeader({ title, onNew, newLabel }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.6rem", margin: 0 }}>{title}</h2>
      <button style={primaryBtnStyle} onClick={onNew}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> {newLabel}
        </span>
      </button>
    </div>
  );
}

function ListeProjets({ projets, search, setSearch, statutFiltre, setStatutFiltre, candidatures, onOpen, onNew }) {
  return (
    <div>
      <SectionHeader title="Besoins à pourvoir" onNew={onNew} newLabel="Déposer un besoin" />
      <div style={{ position: "relative", marginBottom: 14 }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: 13, opacity: 0.5 }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par titre ou compétence…"
          style={{ ...inputStyle, paddingLeft: 34, width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <Filter size={14} style={{ opacity: 0.5 }} />
        {["tous", ...STATUTS].map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => setStatutFiltre(s)}
            style={{
              ...smallBtnStyle,
              padding: "6px 12px",
              fontSize: "0.78rem",
              textTransform: "capitalize",
              background: statutFiltre === s ? INK : "transparent",
              color: statutFiltre === s ? PAPER : INK,
            }}
          >
            {s}
          </button>
        ))}
      </div>
      {projets.length === 0 && <Empty text="Aucun besoin ne correspond à cette recherche." />}
      <div style={{ display: "grid", gap: 14 }}>
        {projets.map((p) => {
          const nbCandidats = candidatures.filter((c) => c.projetId === p.id).length;
          return (
            <div
              key={p.id}
              onClick={() => onOpen(p.id)}
              style={{
                border: `1.5px solid ${INK}22`,
                borderLeft: `5px solid ${urgenceColor(p.urgence)}`,
                borderRadius: 8,
                padding: "18px 20px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.15rem", margin: "0 0 6px" }}>{p.titre}</h3>
                <StatutBadge statut={p.statut} />
              </div>
              <p style={{ margin: "0 0 10px", color: `${INK}bb`, fontSize: "0.9rem", lineHeight: 1.5 }}>{p.description}</p>
              <div>{p.competences.map((c) => <Tag key={c}>{c}</Tag>)}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <span style={{ fontSize: "0.78rem", color: `${INK}88` }}>{p.contact}</span>
                {nbCandidats > 0 && (
                  <span style={{ fontSize: "0.75rem", color: GREEN, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                    <HandMetal size={13} /> {nbCandidats} proposé{nbCandidats > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatutBadge({ statut }) {
  const color = statutColor(statut);
  return (
    <span
      style={{
        fontFamily: "ui-monospace, monospace",
        fontSize: "0.68rem",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color,
        border: `1px solid ${color}`,
        borderRadius: 4,
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {statut}
    </span>
  );
}

function ListeBenevoles({ benevoles, search, setSearch, onOpen, onNew }) {
  return (
    <div>
      <SectionHeader title="Bénévoles disponibles" onNew={onNew} newLabel="Devenir bénévole" />
      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search size={16} style={{ position: "absolute", left: 12, top: 13, opacity: 0.5 }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou compétence…"
          style={{ ...inputStyle, paddingLeft: 34, width: "100%" }}
        />
      </div>
      {benevoles.length === 0 && <Empty text="Aucun bénévole ne correspond à cette recherche." />}
      <div style={{ display: "grid", gap: 14 }}>
        {benevoles.map((b) => (
          <div
            key={b.id}
            onClick={() => onOpen(b.id)}
            style={{ border: `1.5px solid ${INK}22`, borderRadius: 8, padding: "18px 20px", background: "#fff", cursor: "pointer" }}
          >
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", margin: "0 0 4px" }}>{b.nom}</h3>
            <p style={{ margin: "0 0 10px", color: `${INK}bb`, fontSize: "0.9rem", lineHeight: 1.5 }}>{b.bio}</p>
            <div>{b.competences.map((c) => <Tag key={c} tone="green">{c}</Tag>)}</div>
            <div style={{ fontSize: "0.78rem", color: `${INK}88`, marginTop: 6 }}>Disponibilité : {b.dispo}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjetDetail({ projet, ranked, isCandidat, onToggleCandidature, onSetStatut, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{ ...smallBtnStyle, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, border: "none", paddingLeft: 0 }}>
        <ArrowLeft size={16} /> Retour aux besoins
      </button>
      <div style={{ borderLeft: `5px solid ${urgenceColor(projet.urgence)}`, paddingLeft: 16, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.8rem", margin: "0 0 8px" }}>{projet.titre}</h2>
          <StatutBadge statut={projet.statut} />
        </div>
        <p style={{ color: `${INK}cc`, lineHeight: 1.6, maxWidth: 620 }}>{projet.description}</p>
        <div style={{ margin: "10px 0" }}>{projet.competences.map((c) => <Tag key={c} tone="ocre">{c}</Tag>)}</div>
        <div style={{ fontSize: "0.85rem", color: `${INK}88`, marginBottom: 14 }}>Contact : {projet.contact}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.78rem", color: `${INK}88` }}>Avancement :</span>
          {STATUTS.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => onSetStatut(projet.id, s)}
              style={{
                ...smallBtnStyle,
                padding: "5px 11px",
                fontSize: "0.75rem",
                textTransform: "capitalize",
                background: projet.statut === s ? statutColor(s) : "transparent",
                color: projet.statut === s ? "#fff" : statutColor(s),
                border: `1.5px solid ${statutColor(s)}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Sparkles size={18} color={STAMP} />
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.2rem", margin: 0 }}>
          Bénévoles classés par compatibilité
        </h3>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {ranked.map((b, i) => {
          const candidat = isCandidat(projet.id, b.id);
          return (
            <div
              key={b.id}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                border: `1.5px solid ${candidat ? GREEN : INK + "22"}`,
                borderRadius: 8,
                padding: "16px 18px",
                background: "#fff",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: `${INK}66`, width: 18 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <Stamp percent={b.score} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 700, fontFamily: "'Fraunces', serif", fontSize: "1.05rem" }}>{b.nom}</div>
                <p style={{ margin: "2px 0 8px", fontSize: "0.85rem", color: `${INK}aa` }}>{b.bio}</p>
                <div>{b.competences.map((c) => <Tag key={c} tone={projet.competences.some((r) => normalize(r) === normalize(c)) ? "green" : "ink"}>{c}</Tag>)}</div>
              </div>
              <button
                type="button"
                onClick={() => onToggleCandidature(projet.id, b.id)}
                style={{
                  ...smallBtnStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: candidat ? GREEN : "transparent",
                  color: candidat ? "#fff" : INK,
                  border: `1.5px solid ${candidat ? GREEN : INK}`,
                }}
              >
                {candidat ? <CheckCircle2 size={15} /> : <HandMetal size={15} />}
                {candidat ? "Proposé" : "Se proposer"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BenevoleDetail({ benevole, ranked, isCandidat, onToggleCandidature, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{ ...smallBtnStyle, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, border: "none", paddingLeft: 0 }}>
        <ArrowLeft size={16} /> Retour aux bénévoles
      </button>
      <div style={{ borderLeft: `5px solid ${GREEN}`, paddingLeft: 16, marginBottom: 28 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: "1.8rem", margin: "0 0 8px" }}>{benevole.nom}</h2>
        <p style={{ color: `${INK}cc`, lineHeight: 1.6, maxWidth: 620 }}>{benevole.bio}</p>
        <div style={{ margin: "10px 0" }}>{benevole.competences.map((c) => <Tag key={c} tone="green">{c}</Tag>)}</div>
        <div style={{ fontSize: "0.85rem", color: `${INK}88` }}>Disponibilité : {benevole.dispo}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Sparkles size={18} color={STAMP} />
        <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.2rem", margin: 0 }}>
          Besoins classés par compatibilité
        </h3>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {ranked.map((p, i) => {
          const candidat = isCandidat(p.id, benevole.id);
          return (
            <div
              key={p.id}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                border: `1.5px solid ${candidat ? GREEN : INK + "22"}`,
                borderLeft: `5px solid ${urgenceColor(p.urgence)}`,
                borderRadius: 8,
                padding: "16px 18px",
                background: "#fff",
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", color: `${INK}66`, width: 18 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <Stamp percent={p.score} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 700, fontFamily: "'Fraunces', serif", fontSize: "1.05rem" }}>{p.titre}</div>
                  <StatutBadge statut={p.statut} />
                </div>
                <p style={{ margin: "2px 0 8px", fontSize: "0.85rem", color: `${INK}aa` }}>{p.description}</p>
                <div>{p.competences.map((c) => <Tag key={c} tone={benevole.competences.some((r) => normalize(r) === normalize(c)) ? "green" : "ocre"}>{c}</Tag>)}</div>
              </div>
              <button
                type="button"
                onClick={() => onToggleCandidature(p.id, benevole.id)}
                style={{
                  ...smallBtnStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: candidat ? GREEN : "transparent",
                  color: candidat ? "#fff" : INK,
                  border: `1.5px solid ${candidat ? GREEN : INK}`,
                }}
              >
                {candidat ? <CheckCircle2 size={15} /> : <HandMetal size={15} />}
                {candidat ? "Proposé" : "Se proposer"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NouveauProjet({ onCancel, onSave }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [competences, setCompetences] = useState([]);
  const [contact, setContact] = useState("");
  const [urgence, setUrgence] = useState("moyenne");

  const canSave = titre.trim() && competences.length > 0;

  return (
    <Form
      title="Déposer un besoin"
      onCancel={onCancel}
      onSave={() => onSave({ titre, description, competences, contact, urgence })}
      canSave={canSave}
    >
      <Field label="Titre du besoin">
        <input style={{ ...inputStyle, width: "100%" }} value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Ex. Refaire une clôture de jardin" />
      </Field>
      <Field label="Description">
        <textarea
          style={{ ...inputStyle, width: "100%", minHeight: 90, resize: "vertical", fontFamily: "Inter, sans-serif" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez le contexte et ce dont vous avez besoin"
        />
      </Field>
      <Field label="Compétences requises">
        <SkillInput value={competences} onChange={setCompetences} placeholder="Ex. Menuiserie" />
      </Field>
      <Field label="Urgence">
        <div style={{ display: "flex", gap: 8 }}>
          {["basse", "moyenne", "haute"].map((u) => (
            <button
              type="button"
              key={u}
              onClick={() => setUrgence(u)}
              style={{
                ...smallBtnStyle,
                background: urgence === u ? urgenceColor(u) : "transparent",
                color: urgence === u ? "#fff" : INK,
                border: `1.5px solid ${urgenceColor(u)}`,
                textTransform: "capitalize",
              }}
            >
              {u}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Contact (nom, structure)">
        <input style={{ ...inputStyle, width: "100%" }} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Ex. Marie, association du quartier" />
      </Field>
    </Form>
  );
}

function NouveauBenevole({ onCancel, onSave }) {
  const [nom, setNom] = useState("");
  const [bio, setBio] = useState("");
  const [competences, setCompetences] = useState([]);
  const [dispo, setDispo] = useState("");

  const canSave = nom.trim() && competences.length > 0;

  return (
    <Form
      title="Devenir bénévole"
      onCancel={onCancel}
      onSave={() => onSave({ nom, bio, competences, dispo })}
      canSave={canSave}
    >
      <Field label="Nom">
        <input style={{ ...inputStyle, width: "100%" }} value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Votre nom" />
      </Field>
      <Field label="Présentation">
        <textarea
          style={{ ...inputStyle, width: "100%", minHeight: 80, resize: "vertical", fontFamily: "Inter, sans-serif" }}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Quelques mots sur vous et votre motivation à aider"
        />
      </Field>
      <Field label="Compétences">
        <SkillInput value={competences} onChange={setCompetences} placeholder="Ex. Traduction" />
      </Field>
      <Field label="Disponibilité">
        <input style={{ ...inputStyle, width: "100%" }} value={dispo} onChange={(e) => setDispo(e.target.value)} placeholder="Ex. Week-ends, soirs en semaine…" />
      </Field>
    </Form>
  );
}

function Form({ title, children, onCancel, onSave, canSave }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: "1.6rem", marginBottom: 20 }}>{title}</h2>
      <div style={{ display: "grid", gap: 18, maxWidth: 560 }}>{children}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
        <button style={primaryBtnStyle} disabled={!canSave} onClick={onSave} type="button">
          Publier
        </button>
        <button style={smallBtnStyle} onClick={onCancel} type="button">
          Annuler
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: 6, color: `${INK}dd` }}>{label}</div>
      {children}
    </label>
  );
}

function Empty({ text }) {
  return (
    <div style={{ border: `1.5px dashed ${INK}44`, borderRadius: 8, padding: "30px 20px", textAlign: "center", color: `${INK}88` }}>
      {text}
    </div>
  );
}
