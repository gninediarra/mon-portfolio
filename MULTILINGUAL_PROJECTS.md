# 🌍 Guide - Projets Multilingues

## 📖 Vue d'ensemble

Votre portfolio est maintenant **entièrement multilingue** ! Les projets (titres, descriptions, détails) changent automatiquement selon la langue sélectionnée (**EN / FR / BM / AR**).

---

## 🎯 Fonctionnement

### Structure des traductions

Les traductions des projets sont stockées dans l'objet `T[lang].projects` :

```javascript
const T = {
  en: {
    projects: {
      santeConnect: { nm: "...", dc: "...", desc_long: "...", highlights: [...] },
      droneProject: { nm: "...", dc: "...", desc_long: "...", highlights: [...] },
      // ...autres projets
    }
  },
  fr: {
    projects: {
      santeConnect: { nm: "...", dc: "...", desc_long: "...", highlights: [...] },
      // ...
    }
  },
  // ...en, bm, ar
}
```

### Champs traduits pour chaque projet

Pour chaque projet, vous devez traduire ces 4 champs :

| Champ | Utilisation | Exemple |
|-------|-----------|---------|
| **nm** | Titre du projet | "HEALTH CONNECT — AI-Driven..." |
| **dc** | Description courte (aperçu) | "AI-powered post-hospital monitoring..." |
| **desc_long** | Description complète (dans la modale) | "An innovative telemedicine system..." |
| **highlights** | Points clés (liste à puces) | `["Ministry of Health Project + ESPRIT", ...]` |

---

## 🔧 Comment ça marche techniquement

### 1. **Hook personnalisé** : `useProjectTranslation`

```javascript
const useProjectTranslation = (projectId, lang) => {
  const projectTranslations = T[lang]?.projects?.[projectId] || {};
  return projectTranslations;
};
```

Ce hook récupère les traductions d'un projet selon :
- `projectId` : l'ID unique du projet (ex: `"santeConnect"`)
- `lang` : la langue active (ex: `"en"`, `"fr"`, `"bm"`, `"ar"`)

### 2. **IDs des projets**

Chaque projet a un `id` unique :

```javascript
const PRJ = [
  { id: "santeConnect", nm: "...", dc: "...", ...},
  { id: "droneProject", nm: "...", dc: "...", ...},
  // ...
];
```

### 3. **Affichage multilingue**

Dans la section des projets (grille) et la modale :

```javascript
// Récupérer les traductions
const projTrans = useProjectTranslation(p.id, lang);

// Créer un objet avec les textes traduits
const displayProject = {
  ...p,
  nm: projTrans.nm || p.nm,           // Titre traduit
  dc: projTrans.dc || p.dc,           // Description traduite
  desc_long: projTrans.desc_long || p.desc_long,  // Description longue
  highlights: projTrans.highlights || p.highlights, // Points clés
};

// Afficher le projet traduit
<h2>{displayProject.nm}</h2>
<p>{displayProject.dc}</p>
```

---

## 🚀 Comment ajouter un nouveau projet multilingue

### Étape 1️⃣ : Ajouter le projet dans `PRJ`

```javascript
const PRJ = [
  // ... autres projets
  {
    id: "monNouveauProjet",  // ⚠️ ID UNIQUE en camelCase
    tp: "tb2",
    lb: "Category",
    nm: "TITRE EN FRANÇAIS",
    dc: "Description courte en français",
    desc_long: "Description longue en français",
    tg: ["Tech1", "Tech2"],
    year: "2025",
    role: "Role",
    status: "Production",
    metrics: [{ k: "Métrique", v: "Valeur" }],
    demo: "https://...",
    color: "#60a5fa",
    emoji: "🎯",
    highlights: ["Point 1", "Point 2"],
  },
];
```

### Étape 2️⃣ : Ajouter les traductions anglaises

```javascript
const T = {
  en: {
    projects: {
      // ... autres projets
      monNouveauProjet: {
        nm: "MY NEW PROJECT — English Title",
        dc: "Short description in English",
        desc_long: "Long description in English",
        highlights: ["Highlight 1", "Highlight 2"],
      }
    }
  }
}
```

### Étape 3️⃣ : Ajouter les traductions françaises

```javascript
const T = {
  fr: {
    projects: {
      // ... autres projets
      monNouveauProjet: {
        nm: "MON NOUVEAU PROJET — Titre Français",
        dc: "Description courte en français",
        desc_long: "Description longue en français",
        highlights: ["Point clé 1", "Point clé 2"],
      }
    }
  }
}
```

### Étape 4️⃣ : Ajouter les traductions Bambara et Arabe

Répétez l'étape 2-3 pour les sections `bm` et `ar` de `T`.

---

## ✅ Vérifier que tout fonctionne

1. Changez la langue dans la navigation (EN / FR / BM / AR)
2. Vérifiez que :
   - ✅ Le titre du projet change
   - ✅ La description change
   - ✅ Les points clés changent
   - ✅ La description longue dans la modale change

---

## 📝 Checklist pour ajouter un nouveau projet

```
□ Créer un ID unique (ex: "monProjet")
□ Ajouter le projet dans PRJ[] avec l'ID
□ Ajouter les traductions EN dans T.en.projects
□ Ajouter les traductions FR dans T.fr.projects
□ Ajouter les traductions BM dans T.bm.projects
□ Ajouter les traductions AR dans T.ar.projects
□ Tester chaque langue pour vérifier l'affichage
```

---

## 🎨 Exemple complet : Ajouter un projet "Mon IA"

### Dans `PRJ` :
```javascript
{
  id: "monIA",
  tp: "tm2",
  lb: "AI Research",
  nm: "MON IA — AI Project (French Default)",
  dc: "Un projet d'IA innovant",
  desc_long: "Une description détaillée du projet...",
  tg: ["Python", "TensorFlow"],
  year: "2025",
  role: "Lead AI Engineer",
  status: "Production",
  metrics: [{ k: "Models", v: "5+" }],
  demo: "https://youtu.be/...",
  color: "#a78bfa",
  emoji: "🤖",
  highlights: ["Innovation 1", "Innovation 2"],
}
```

### Dans `T.en.projects` :
```javascript
monIA: {
  nm: "MY AI — AI Project",
  dc: "An innovative AI project",
  desc_long: "A detailed description of the project...",
  highlights: ["Innovation 1", "Innovation 2"],
}
```

### Dans `T.fr.projects` :
```javascript
monIA: {
  nm: "MON IA — Projet IA",
  dc: "Un projet d'IA innovant",
  desc_long: "Une description détaillée du projet...",
  highlights: ["Innovation 1", "Innovation 2"],
}
```

### Dans `T.bm.projects` :
```javascript
monIA: {
  nm: "N KA IA — IA Baara",
  dc: "IA baara kunnafoni",
  desc_long: "IA baara ka gafe gɔ...",
  highlights: ["Kunnafoni 1", "Kunnafoni 2"],
}
```

### Dans `T.ar.projects` :
```javascript
monIA: {
  nm: "مشروع الذكاء الاصطناعي الخاص بي",
  dc: "مشروع ذكاء اصطناعي مبتكر",
  desc_long: "وصف تفصيلي للمشروع...",
  highlights: ["الابتكار 1", "الابتكار 2"],
}
```

---

## 🔄 Avantages de cette approche

✅ **Propre** - Séparation claire entre contenu et traductions  
✅ **Maintenable** - Facile d'ajouter/modifier des projets  
✅ **Scalable** - Ajouter une nouvelle langue ? Juste 1 objet `projects` par langue  
✅ **Flexible** - Changer une traduction sans toucher au code React  
✅ **Performance** - Les traductions sont chargées une seule fois au démarrage  

---

## 🐛 Dépannage

### Le projet n'affiche pas la bonne traduction

Vérifiez que :
1. L'ID dans `PRJ` = l'ID dans `T[lang].projects` 
2. La langue est correctement sélectionnée
3. Tous les 4 champs (nm, dc, desc_long, highlights) sont traduits

### La modale affiche du texte en français même en anglais

Vérifiez que vous avez passé `lang={lang}` au composant `ProjectModal` (c'est déjà fait ✅).

---

## 📚 Fichiers modifiés

- [App.jsx](App.jsx) - Ajout du hook et traductions pour les 6 projets (4 langues)

---

**Bon courage pour votre portfolio multilingue !** 🚀
