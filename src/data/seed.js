import { uid } from "../utils/id";

export const seedProjets = [
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

export const seedBenevoles = [
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
