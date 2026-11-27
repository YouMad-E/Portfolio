/* ==========================================================
   Portfolio de Youssef Madane — carnet de notes interactif
   Sommaire :
     1. Configuration et données (FR / EN)
     2. Utilitaires (langue, échappement, coloration syntaxique)
     3. Sorties des cellules (HTML + comportements)
     4. Graphe de compétences (canvas + physique)
     5. Carnet (cellules, exécution, clavier, navigation)
     6. Thème, langue et démarrage
   ========================================================== */
"use strict";

/* ---------- 1. Configuration et données ---------- */

// ====== À PERSONNALISER ======
// Formulaire : créez un formulaire gratuit sur https://formspree.io puis collez ici son URL
// (ex. "https://formspree.io/f/abcdwxyz"). Laissé vide, le bouton « Envoyer » ouvre votre messagerie (mailto).
const FORM_URL = "https://formspree.io/f/meagvdzv";
const GITHUB_URL = "https://github.com/YouMad-E"; // ← votre profil GitHub
const LINKEDIN_URL = ""; // ← ex. "https://www.linkedin.com/in/votre-profil" (laisser vide pour masquer)
const EMAIL = "youssef.madane22@gmail.com"; // ← votre adresse e-mail (laisser vide pour masquer)
// ==============================
const GH_USER_URL = GITHUB_URL.replace(/\/$/, "");
const GH_ICON =
  '<svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

const PROFILE = {
  name: "Youssef Madane",
  title: {
    fr: "Étudiant en Master Intelligence artificielle et ses applications en vision et robotique",
    en: "Master’s student in Artificial Intelligence and its Applications in Vision and Robotics",
  },
  about: {
    fr: [
      "Étudiant en M2 IA²VR (Intelligence Artificielle, Vision et Robotique) à l'Université de Lorraine, je combine une solide expertise en génie logiciel et architectures système avec la maîtrise de l'apprentissage automatique, de la vision par ordinateur et de la robotique interactive. Spécialisé dans la conception de solutions d'IA robustes et performantes, j'applique notamment l'apprentissage profond et la modélisation statistique à des domaines critiques tels que la sécurité réseau, le traitement d'images avancé et la commande robotique.",
    ],
    en: [
      "As a Master’s student in IA²VR (Artificial Intelligence, Computer Vision, and Robotics) at the University of Lorraine, I combine a strong expertise in software engineering and system architecture with advanced skills in machine learning, computer vision, and interactive robotics. Specialized in designing robust, high-performance AI solutions, I apply deep learning and statistical modeling to critical domains such as network security, advanced image processing, and robotic control.",
    ],
  },
  formation: [
    {
      degree: { fr: "Master Informatique", en: "Master in Computer Science" },
      track: {
        fr: "PT Intelligence Artificielle et ses Applications en Vision et Robotique",
        en: "AI and its Applications in Vision and Robotics",
      },
      org: "Université de Lorraine",
      period: { fr: "2025/2026 (en cours)", en: "2025/2026 (in progress)" },
      url: "https://formations.univ-lorraine.fr/fr/diplomes-et-formations/bac4-bac5/master/2324-master-informatique-pt-intelligence-artificielle-et-ses-applications-en-vision-et-robotique.html",
    },
    {
      degree: { fr: "Licence Informatique", en: "Bachelor in Computer Science" },
      track: { fr: "Parcours Informatique", en: "Computer Science track" },
      org: "ISIMA, Université Clermont Auvergne",
      url: "https://www.isima.fr/2025/05/15/la-licence-informatique/",
    },
    {
      degree: {
        fr: "Licence Sciences et Techniques (LST)",
        en: "Bachelor of Science and Technology (LST)",
      },
      track: {
        fr: "Génie électrique et informatique industrielle",
        en: "Electrical Engineering and Industrial Computing",
      },
      org: "Faculté des Sciences et Techniques de Mohammedia (FSTM)",
      url: "https://www.fstm.ac.ma/formation_initiale/files/lst/version_diplome_2025/LST_GEII.pdf",
    },
    {
      degree: {
        fr: "Introduction à l’Intelligence Artificielle",
        en: "Introduction to Artificial Intelligence",
      },
      track: "Elements of AI",
      org: "Université de Helsinki – Sorbonne Université",
      url: "https://elementsofai.com",
    },
    {
      degree: "Getting Started with Deep Learning",
      track: "NVIDIA",
      org: "NVIDIA Deep Learning Institute",
      url: "https://www.nvidia.com",
    },
    {
      degree: "Exploring Adversarial Machine Learning",
      track: "NVIDIA",
      org: "NVIDIA Deep Learning Institute",
      url: "https://www.nvidia.com",
    },
    {
      degree: { fr: "Python pour la science des données", en: "Python for Data Science" },
      track: "OpenClassrooms",
      org: { fr: "Nettoyage et analyse de jeu de données", en: "Data cleaning and analysis" },
      url: "https://openclassrooms.com/en/courses/7410486-nettoyez-et-analysez-votre-jeu-de-donnees",
    },
  ],
  skills: [
    {
      id: "ia",
      color: "#0f9488",
      name: { fr: "Intelligence artificielle", en: "Artificial intelligence" },
      items: {
        fr: ["Deep Learning", "CNN", "Transformers", "Apprentissage par renforcement", "Modélisation probabiliste", "RAG"],
        en: ["Deep Learning", "CNN", "Transformers", "Reinforcement learning", "Probabilistic modeling", "RAG"],
      },
    },
    {
      id: "vision",
      color: "#3b73e8",
      name: { fr: "Vision", en: "Vision" },
      items: {
        fr: ["Vision par ordinateur", "Réalité augmentée", "Réalité virtuelle"],
        en: ["Computer vision", "Augmented reality", "Virtual reality"],
      },
    },
    {
      id: "robotique",
      color: "#d9531e",
      name: { fr: "Robotique", en: "Robotics" },
      items: {
        fr: ["Planification de trajectoires", "Commande", "Temps réel"],
        en: ["Motion planning", "Control", "Real-time systems"],
      },
    },
    {
      id: "langages",
      color: "#8a5cf0",
      name: { fr: "Langages de programmation", en: "Programming languages" },
      items: ["C/C++", "Python", "PyTorch", "ROS2", "Assembleur", "Java", "JavaScript", "eBPF", "Visual Basic", "Prolog"],
    },
    {
      id: "bdd",
      color: "#c2a000",
      name: { fr: "Bases de données", en: "Databases" },
      items: ["MySQL", "MariaDB", "MongoDB"],
    },
    {
      id: "outils",
      color: "#d6336c",
      name: { fr: "Outils et frameworks", en: "Tools & frameworks" },
      items: ["Git", "Linux", "Ubuntu", "Eclipse", "FileZilla", "CodeIgniter", "Make"],
    },
    {
      id: "methodes",
      color: "#5c7cfa",
      name: { fr: "Méthodes d’analyse", en: "Analysis methods" },
      items: ["UML", "CRUD", "Scrum", "XML Schema", "WSDL"],
    },
  ],
  projects: [
    {
      name: "Adaptation et intégration des modèles IA dans un réseau de communication",
      nameEn: "Adapting and integrating AI models into a communication network",
      url: "", // projet mené au LORIA (équipe RESIST) : pas de dépôt public
      tech: ["C/C++", "Python", "eBPF"],
      desc: {
        fr: "Étude bibliographique sur les limites des modèles d’IA en réseau temps réel, puis pare-feu eBPF à arbres de décision permutables dans le noyau, mis à jour par un modèle d’IA en espace utilisateur (LORIA, équipe RESIST)",
        en: "Literature review on the limits of AI models in real-time networking, then an eBPF firewall with swappable decision trees in the kernel, updated by a user-space AI model (LORIA, RESIST team)",
      },
    },
    {
      name: "Mon agenda",
      nameEn: "My agenda",
      url: "https://github.com/YouMad-E/Monagenda",
      tech: ["Node.js"],
      desc: {
        fr: "Application web pour gérer ses calendriers et ses rendez-vous : collaboration en temps réel, multi-calendriers, planification avancée",
        en: "Web app to manage calendars and appointments: real-time collaboration, multiple calendars, advanced scheduling",
      },
    },
    {
      name: "Filtre anti-spam intelligent",
      nameEn: "Intelligent spam filter",
      url: "https://github.com/YouMad-E/Filtre-anti-spam-intelligent",
      tech: ["Python", "Naïve Bayes"],
      techEn: ["Python", "Naive Bayes"],
      desc: {
        fr: "Classifieur naïf de Bayes (sac de mots binaire, lissage de Laplace, calculs en log) avec apprentissage en ligne exact et sérialisation du modèle : 2,8 % d’erreur sur la base de test",
        en: "Naive Bayes classifier (binary bag of words, Laplace smoothing, log-space scores) with exact online learning and model serialization: 2.8% error on the test set",
      },
    },
    {
      name: "Commande de moteur BLDC – FSTM Electronics Lab",
      nameEn: "BLDC motor control – FSTM Electronics Lab",
      url: "", // stage de fin de Licence : pas de dépôt public
      tech: ["STM32", "C", "MATLAB/Simulink"],
      desc: {
        fr: "Stage de fin de Licence : programmation d’un microcontrôleur STM32 pour piloter le moteur BLDC d’un fauteuil roulant, à capteurs à effet Hall (commande six-step, PWM, régulation de vitesse et de courant), validée par simulation",
        en: "Bachelor’s final-year internship: programming an STM32 microcontroller to drive a Hall-sensor BLDC wheelchair motor (six-step control, PWM, speed and current regulation), validated through simulation",
      },
    },
  ],
};

/* Textes de l'interface */
const I18N = {
  fr: {
    pageTitle: "Youssef Madane — Portfolio",
    skip: "Aller au contenu",
    "nav.home": "Accueil",
    "nav.edu": "Formation",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    runAll: "Tout exécuter",
    restart: "Redémarrer le noyau",
    run: "Exécuter la cellule",
    help: "Raccourcis clavier",
    close: "Fermer",
    theme: "Changer de thème",
    langLabel: "Switch to English",
    kernelIdle: "inactif",
    kernelBusy: "occupé",
    modeCommand: "Mode commande",
    modeEdit: "Mode édition",
    cell: "Cellule",
    permalink: "Lien vers cette section",
    "h.edu": "Formation | Certification",
    "h.skills": "Compétences",
    "h.projects": "Projets",
    "h.contact": "Contact",
    tip: "Cliquez sur ▶ ou appuyez sur <kbd>Maj</kbd> + <kbd>Entrée</kbd> pour exécuter une cellule, ou utilisez « Tout exécuter ». <kbd>?</kbd> affiche les raccourcis.",
    graphAria: "Arbre interactif : le profil, ses catégories de compétences et les compétences associées",
    graphHint: "Survolez ou touchez un nœud pour voir ses liens. Cliquez sur une catégorie pour la replier ou la déplier, glissez un nœud pour le déplacer.",
    legendAria: "Catégories de compétences",
    colName: "nom",
    colTech: "technologies",
    colDesc: "description",
    colLink: "lien",
    sortBy: "Trier par",
    rows: (n) => `${n} lignes × 4 colonnes`,
    lastName: "Nom",
    firstName: "Prénom",
    email: "E-mail",
    subject: "Objet",
    message: "Message",
    send: "Envoyer",
    sending: "Envoi en cours…",
    sent: "Message envoyé. Merci !",
    sendError: "L’envoi a échoué. Réessayez, ou écrivez-moi via GitHub.",
    netAria: "Réseau de neurones : les champs du formulaire alimentent les neurones d’entrée, le signal traverse trois couches cachées jusqu’au neurone de sortie",
    netFields: ["nom", "prénom", "e-mail", "objet", "message"],
    netIn: "entrée",
    netHidden: "couches cachées",
    netOut: "sortie",
    netReady: "prêt",
    helpTitle: "Raccourcis clavier",
    keys: [
      ["Maj + Entrée", "Exécuter la cellule et passer à la suivante"],
      ["Ctrl / ⌘ + Entrée", "Exécuter la cellule"],
      ["↑ ↓ ou k j", "Changer de cellule"],
      ["Échap", "Quitter le mode édition"],
      ["?", "Afficher cette aide"],
    ],
  },
  en: {
    pageTitle: "Youssef Madane — Portfolio",
    skip: "Skip to content",
    "nav.home": "Home",
    "nav.edu": "Education",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    runAll: "Run all",
    restart: "Restart kernel",
    run: "Run cell",
    help: "Keyboard shortcuts",
    close: "Close",
    theme: "Toggle theme",
    langLabel: "Passer en français",
    kernelIdle: "idle",
    kernelBusy: "busy",
    modeCommand: "Command mode",
    modeEdit: "Edit mode",
    cell: "Cell",
    permalink: "Link to this section",
    "h.edu": "Education | Certification",
    "h.skills": "Skills",
    "h.projects": "Projects",
    "h.contact": "Contact",
    tip: "Click ▶ or press <kbd>Shift</kbd> + <kbd>Enter</kbd> to run a cell, or use “Run all”. <kbd>?</kbd> shows the shortcuts.",
    graphAria: "Interactive tree: the profile, its skill categories and the skills in each",
    graphHint: "Hover or tap a node to see its links. Click a category to collapse or expand it, drag a node to move it.",
    legendAria: "Skill categories",
    colName: "name",
    colTech: "technologies",
    colDesc: "description",
    colLink: "link",
    sortBy: "Sort by",
    rows: (n) => `${n} rows × 4 columns`,
    lastName: "Last name",
    firstName: "First name",
    email: "Email address",
    subject: "Subject",
    message: "Message",
    send: "Send",
    sending: "Sending…",
    sent: "Message sent. Thank you!",
    sendError: "Sending failed. Please try again, or reach me via GitHub.",
    netAria: "Neural network: the form fields feed the input neurons, and the signal crosses three hidden layers to the output neuron",
    netFields: ["last", "first", "email", "subject", "message"],
    netIn: "input",
    netHidden: "hidden layers",
    netOut: "output",
    netReady: "ready",
    helpTitle: "Keyboard shortcuts",
    keys: [
      ["Shift + Enter", "Run the cell and move to the next one"],
      ["Ctrl / ⌘ + Enter", "Run the cell"],
      ["↑ ↓ or k j", "Move between cells"],
      ["Esc", "Leave edit mode"],
      ["?", "Show this help"],
    ],
  },
};

/* ---------- 2. Utilitaires ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const store = {
  get(k) {
    try { return localStorage.getItem(k); } catch { return null; }
  },
  set(k, v) {
    try { localStorage.setItem(k, v); } catch { /* stockage indisponible */ }
  },
};

let lang = document.documentElement.lang === "en" ? "en" : "fr";
const ui = (k) => I18N[lang][k];

/** Renvoie la valeur dans la langue courante si elle est de la forme { fr, en } */
const loc = (v) => (v && typeof v === "object" && !Array.isArray(v) && "fr" in v ? v[lang] : v);

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Coloration syntaxique minimale pour le code Python affiché */
function highlight(src) {
  return esc(src).replace(
    /(#.*$)|(&quot;.*?&quot;)|\b(from|import)\b|(\bProfil\b|\w+(?=\())|(\bprofil\b)/gm,
    (m, cm, str, kw, fn, nm) =>
      cm ? `<span class="t-cm">${m}</span>`
      : str ? `<span class="t-str">${m}</span>`
      : kw ? `<span class="t-kw">${m}</span>`
      : fn ? `<span class="t-fn">${m}</span>`
      : nm ? `<span class="t-nm">${m}</span>`
      : m,
  );
}

const skillItems = (c) => (Array.isArray(c.items) ? c.items : c.items[lang]);
const projectName = (p) => (lang === "en" && p.nameEn) || p.name;
const projectTech = (p) => (lang === "en" && p.techEn) || p.tech;

/* ---------- 3. Sorties des cellules ---------- */

function outResume() {
  return PROFILE.about[lang].map((p) => `<p>${esc(p)}</p>`).join("");
}

function outFormation() {
  const items = PROFILE.formation
    .map((f) => {
      const period = f.period ? `<span class="muted">${esc(loc(f.period))}</span>` : "";
      return `<li>
        <strong>${esc(loc(f.degree))}</strong>
        ${f.url ? `<a href="${f.url}" target="_blank" rel="noopener noreferrer">${esc(loc(f.track))}</a>` : `<span>${esc(loc(f.track))}</span>`}
        <span class="muted">${esc(loc(f.org))}</span>${period}
      </li>`;
    })
    .join("");
  return `<ol class="edu">${items}</ol>`;
}

/* Catégories dépliées dans le graphe (conservées d'un rendu à l'autre) */
const openCats = new Set(PROFILE.skills.map((c) => c.id));

function outSkills() {
  const chips = PROFILE.skills
    .map(
      (c) => `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${openCats.has(c.id)}" style="--c:${c.color}">
        <span class="sw"></span>${esc(loc(c.name))} <small>${skillItems(c).length}</small></button>`,
    )
    .join("");
  const list = PROFILE.skills
    .map((c) => `<li>${esc(loc(c.name))} : ${skillItems(c).map(esc).join(", ")}</li>`)
    .join("");
  return `<canvas class="graph" role="img" aria-label="${esc(ui("graphAria"))}"></canvas>
    <div class="legend" role="group" aria-label="${esc(ui("legendAria"))}">${chips}</div>
    <p class="hint">${esc(ui("graphHint"))}</p>
    <ul class="sr-only">${list}</ul>`;
}

function mountSkills(out) {
  const graph = new SkillGraph($(".graph", out), $(".legend", out));
  return () => graph.destroy();
}

/* Tableau des projets, façon DataFrame, avec tri par colonne */
const projSort = { key: null, dir: 1 };

function projectsTable() {
  const rows = PROFILE.projects.map((p, i) => ({ p, i }));
  if (projSort.key) {
    const val = ({ p }) => (projSort.key === "name" ? projectName(p) : loc(p.desc));
    rows.sort((a, b) => val(a).localeCompare(val(b), lang) * projSort.dir);
  }
  const th = (key, label) => {
    const sort = projSort.key === key ? (projSort.dir > 0 ? "ascending" : "descending") : "none";
    return `<th scope="col" aria-sort="${sort}"><button type="button" data-sort="${key}" title="${esc(ui("sortBy"))} ${esc(label)}">${esc(label)}</button></th>`;
  };
  const body = rows
    .map(
      ({ p, i }) => `<tr>
        <th scope="row">${i}</th>
        <td>${esc(projectName(p))}</td>
        <td>${projectTech(p).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</td>
        <td>${esc(loc(p.desc))}</td>
        <td>${p.url ? `<a class="gh" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub : ${esc(projectName(p))}">${GH_ICON}</a>` : "—"}</td>
      </tr>`,
    )
    .join("");
  return `<table>
    <thead><tr><th scope="col"><span class="sr-only">index</span></th>${th("name", ui("colName"))}<th scope="col">${esc(ui("colTech"))}</th>${th("desc", ui("colDesc"))}<th scope="col">${esc(ui("colLink"))}</th></tr></thead>
    <tbody>${body}</tbody></table>`;
}

function outProjects() {
  return `<div class="df">${projectsTable()}</div><p class="df-shape">${esc(ui("rows")(PROFILE.projects.length))}</p>`;
}

function mountProjects(out) {
  const onClick = (e) => {
    const btn = e.target.closest("[data-sort]");
    if (!btn) return;
    const key = btn.dataset.sort;
    projSort.dir = projSort.key === key ? -projSort.dir : 1;
    projSort.key = key;
    $(".df", out).innerHTML = projectsTable();
    $(`[data-sort="${key}"]`, out)?.focus();
  };
  out.addEventListener("click", onClick);
  return () => out.removeEventListener("click", onClick);
}

function contactLinks() {
  const a = (href, icon, text) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer">${icon}<span>${esc(text)}</span></a>`;
  const out = [a(GITHUB_URL, GH_ICON, GITHUB_URL.replace(/^https?:\/\//, ""))];
  if (LINKEDIN_URL) out.push(a(LINKEDIN_URL, "", "LinkedIn"));
  if (EMAIL) out.push(a("mailto:" + EMAIL, "", EMAIL));
  return out.join(" &nbsp;·&nbsp; ");
}

function outContact() {
  const field = (name, type, label, extra = "") =>
    `<label>${esc(label)}<input type="${type}" name="${name}" required ${extra}></label>`;
  return `<div class="contact-wrap">
    <form class="contact" method="POST">
      <div class="two">${field("nom", "text", ui("lastName"), 'autocomplete="family-name"')}${field("prenom", "text", ui("firstName"), 'autocomplete="given-name"')}</div>
      ${field("email", "email", ui("email"), 'autocomplete="email"')}
      ${field("objet", "text", ui("subject"))}
      <label>${esc(ui("message"))}<textarea name="message" rows="5" required></textarea></label>
      <input type="text" name="_gotcha" class="sr-only" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="_subject">
      <button type="submit" class="send">${esc(ui("send"))}</button>
      <p class="form-status" role="status"></p>
    </form>
    <figure class="net-fig">
      <canvas class="net" role="img" aria-label="${esc(ui("netAria"))}"></canvas>
    </figure>
    </div>
    <p class="contact-links">${contactLinks()}</p>`;
}

function mountContact(out) {
  const form = $("form", out);
  const status = $(".form-status", out);
  const button = $(".send", out);
  const net = new NeuralNet($(".net", out), form);
  if (FORM_URL) {
    form.action = FORM_URL;
    form.method = "POST";
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    form.elements["_subject"].value = form.elements["objet"].value;
    button.disabled = true;
    status.className = "form-status";
    status.textContent = ui("sending");
    net.pulse(); // le signal traverse le réseau pendant l'envoi
    if (!FORM_URL) {
      // Pas de Formspree configuré : ouvre la messagerie avec le message pré-rempli
      const f = form.elements;
      const body = `${f["message"].value}\n\n— ${f["prenom"].value} ${f["nom"].value} (${f["email"].value})`;
      net.flashResult(!!EMAIL);
      button.disabled = false;
      if (EMAIL) {
        location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(f["objet"].value)}&body=${encodeURIComponent(body)}`;
      } else {
        status.classList.add("err");
        status.textContent = ui("sendError");
      }
      return;
    }
    try {
      // 1re tentative : envoi sans quitter la page
      const res = await fetch(FORM_URL, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${detail.slice(0, 200)}`);
      }
      net.flashResult(true);
      form.reset(); // le réseau se remet à zéro tout seul (événement "reset")
      status.classList.add("ok");
      status.textContent = ui("sent");
    } catch (err) {
      console.warn("Envoi sans rechargement refusé :", err);
      if (navigator.onLine !== false) {
        // Repli : envoi HTML classique, exactement comme sur l'ancienne version du site
        // (Formspree gère alors lui-même son éventuel CAPTCHA et la page de confirmation)
        form.submit();
        return;
      }
      net.flashResult(false);
      status.classList.add("err");
      status.textContent = ui("sendError");
    } finally {
      button.disabled = false;
    }
  };
  form.addEventListener("submit", onSubmit);
  return () => {
    form.removeEventListener("submit", onSubmit);
    net.destroy();
  };
}

/* Le contenu du formulaire est conservé quand on change de langue */
const formSnapshot = (out) => $$("input, textarea", out).map((el) => el.value);
const formRestore = (out, values) => $$("input, textarea", out).forEach((el, i) => (el.value = values[i] ?? ""));

/* Définition du carnet : cellules Markdown ("md") et cellules de code */
const heading = (tag, id, key) =>
  `<${tag}>${esc(ui(key))}<a class="anchor" href="#${id}" aria-label="${esc(ui("permalink"))}">¶</a></${tag}>`;

const CELLS = [
  {
    kind: "md",
    id: "accueil",
    html: () => `<h1>${esc(PROFILE.name)}</h1>
      <p class="lead">${esc(PROFILE.title[lang])}</p>
      <p class="tip">${ui("tip")}</p>`,
  },
  { kind: "code", code: 'from portfolio import Profil\nprofil = Profil("Youssef Madane")' },
  { kind: "code", code: "profil.resume()", out: outResume, typed: true },
  { kind: "md", id: "formation", html: () => heading("h2", "formation", "h.edu") },
  { kind: "code", code: "profil.formation()", out: outFormation },
  { kind: "md", id: "competences", html: () => heading("h2", "competences", "h.skills") },
  { kind: "code", code: "profil.competences()", out: outSkills, mount: mountSkills },
  { kind: "md", id: "projets", html: () => heading("h2", "projets", "h.projects") },
  { kind: "code", code: "profil.projets()", out: outProjects, mount: mountProjects },
  { kind: "md", id: "contact", html: () => heading("h2", "contact", "h.contact") },
  {
    kind: "code",
    code: "profil.contact()",
    out: outContact,
    mount: mountContact,
    snapshot: formSnapshot,
    restore: formRestore,
  },
];

/* ---------- 4. Graphe de compétences ---------- */

class SkillGraph {
  constructor(canvas, legend) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d");
    this.legend = legend;
    this.nodes = [];
    this.links = [];
    this.hover = null;
    this.drag = null;
    this.running = false;
    this.visible = true;
    this.dead = false;
    this.seeded = false;
    this.raf = 0;
    this.W = 0;
    this.H = 0;
    this.scale = 1;

    this.buildTree();
    this.readColors();
    this.bind();
  }

  /** Construit l'arbre : racine "profil" → catégories → compétences */
  buildTree() {
    this.root = { kind: "root", r: 12, x: 0, y: 0, vx: 0, vy: 0, label: () => "profil" };
    this.nodes.push(this.root);
    for (const cat of PROFILE.skills) {
      const cn = {
        kind: "cat", id: cat.id, r: 9, color: cat.color, open: openCats.has(cat.id),
        x: 0, y: 0, vx: 0, vy: 0, label: () => loc(cat.name), count: cat.items.length,
      };
      this.nodes.push(cn);
      this.links.push({ a: this.root, b: cn, len: 150 });
      cn.children = skillItems(cat).map((name) => ({
        kind: "leaf", r: 5, color: cat.color, parent: cn, x: 0, y: 0, vx: 0, vy: 0, label: () => name,
      }));
      for (const leaf of cn.children) {
        this.nodes.push(leaf);
        this.links.push({ a: cn, b: leaf, len: 78 });
      }
    }
    this.refreshActive();
  }

  isActive(n) {
    return n.kind !== "leaf" || n.parent.open;
  }
  refreshActive() {
    this.active = this.nodes.filter((n) => this.isActive(n));
  }

  readColors() {
    const cs = getComputedStyle(document.documentElement);
    const get = (v) => cs.getPropertyValue(v).trim();
    this.col = { fg: get("--fg"), mut: get("--mut"), bg: get("--page"), line: get("--line") };
  }

  bind() {
    const cv = this.cv;
    this.onTheme = () => { this.readColors(); this.requestDraw(); };
    addEventListener("themechange", this.onTheme);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(cv);
    this.io = new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.wake();
    });
    this.io.observe(cv);

    cv.addEventListener("pointermove", (e) => this.onMove(e));
    cv.addEventListener("pointerdown", (e) => this.onDown(e));
    cv.addEventListener("pointerup", (e) => this.onUp(e));
    cv.addEventListener("pointercancel", () => { this.drag = null; });
    cv.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse" && !this.drag) { this.hover = null; this.requestDraw(); }
    });
    this.legend.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-cat]");
      if (chip) this.toggle(chip.dataset.cat);
    });
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.io.disconnect();
    removeEventListener("themechange", this.onTheme);
  }

  resize() {
    const r = this.cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const d = window.devicePixelRatio || 1;
    this.W = r.width;
    this.H = r.height;
    this.cv.width = Math.round(r.width * d);
    this.cv.height = Math.round(r.height * d);
    this.ctx.setTransform(d, 0, 0, d, 0, 0);
    this.scale = clamp(Math.min(this.W / 760, this.H / 460), 0.55, 1.1);
    if (!this.seeded) this.seed();
    this.wake();
    this.requestDraw();
  }

  /** Positions de départ : catégories sur une ellipse, compétences autour */
  seed() {
    this.seeded = true;
    const { W, H, scale: s } = this;
    const cx = W / 2, cy = H / 2;
    const cats = this.nodes.filter((n) => n.kind === "cat");
    this.root.x = cx;
    this.root.y = cy;
    const rx = Math.min(W * 0.3, 260), ry = H * 0.26;
    cats.forEach((c, i) => {
      const a = (i / cats.length) * 2 * Math.PI - Math.PI / 2 + 0.4;
      c.x = cx + Math.cos(a) * rx;
      c.y = cy + Math.sin(a) * ry;
      c.children.forEach((l, k) => {
        const b = (k / c.children.length) * 2 * Math.PI;
        l.x = c.x + Math.cos(b) * 50 * s;
        l.y = c.y + Math.sin(b) * 50 * s;
      });
    });
  }

  /** Replie ou déplie une catégorie */
  toggle(id) {
    const cn = this.nodes.find((n) => n.kind === "cat" && n.id === id);
    if (!cn) return;
    cn.open = !cn.open;
    cn.open ? openCats.add(id) : openCats.delete(id);
    if (cn.open) {
      cn.children.forEach((l) => {
        l.x = cn.x + (Math.random() - 0.5) * 10;
        l.y = cn.y + (Math.random() - 0.5) * 10;
        l.vx = l.vy = 0;
      });
    }
    this.refreshActive();
    if (this.hover && !this.isActive(this.hover)) this.hover = null;
    const chip = $(`[data-cat="${id}"]`, this.legend);
    if (chip) chip.setAttribute("aria-pressed", String(cn.open));
    this.wake();
    this.requestDraw();
  }

  /** Un pas de simulation : répulsion, ressorts, gravité. Renvoie l'énergie cinétique. */
  physics() {
    const A = this.active, s = this.scale, W = this.W, H = this.H;
    for (let i = 0; i < A.length; i++) {
      const a = A[i];
      for (let j = i + 1; j < A.length; j++) {
        const b = A[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy) || 0.01;
        const R = ((a.r + b.r) * 4.2 + 38) * s;
        if (d < R) {
          const f = ((R - d) / d) * 0.045;
          a.vx += dx * f; a.vy += dy * f;
          b.vx -= dx * f; b.vy -= dy * f;
        }
      }
    }
    for (const l of this.links) {
      if (!this.isActive(l.b)) continue;
      const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y;
      const d = Math.hypot(dx, dy) || 0.01;
      const f = ((d - l.len * s) / d) * 0.06;
      l.a.vx += dx * f; l.a.vy += dy * f;
      l.b.vx -= dx * f; l.b.vy -= dy * f;
    }
    let energy = 0;
    for (const n of A) {
      const isRoot = n.kind === "root";
      n.vx += (W / 2 - n.x) * (isRoot ? 0.05 : 0.0012);
      n.vy += (H / 2 - n.y) * (isRoot ? 0.05 : 0.0035);
      if (n === this.drag) { n.vx = n.vy = 0; continue; }
      n.vx *= 0.82;
      n.vy *= 0.82;
      const pad = n.r + 6;
      n.x = clamp(n.x + n.vx, pad, W - pad);
      n.y = clamp(n.y + n.vy, pad, H - pad);
      energy += n.vx * n.vx + n.vy * n.vy;
    }
    return energy;
  }

  /** Relance la simulation (elle s'endort toute seule quand le graphe est stable) */
  wake() {
    if (this.dead || !this.visible || !this.W) return;
    if (reduced()) {
      for (let i = 0; i < 150; i++) this.physics();
      this.draw();
      return;
    }
    if (this.running) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.loop);
  }

  loop = () => {
    if (this.dead || !this.visible) { this.running = false; return; }
    const energy = this.physics();
    this.draw();
    if (energy > 0.05 || this.drag) this.raf = requestAnimationFrame(this.loop);
    else this.running = false;
  };

  requestDraw() {
    if (!this.running && !this.dead && this.W) this.draw();
  }

  neighbors(n) {
    const set = new Set([n]);
    for (const l of this.links) {
      if (l.a === n && this.isActive(l.b)) set.add(l.b);
      if (l.b === n && this.isActive(l.b)) set.add(l.a);
    }
    return set;
  }

  draw() {
    const c = this.ctx, { W, H, col } = this;
    c.clearRect(0, 0, W, H);
    const hv = this.hover;
    const near = hv ? this.neighbors(hv) : null;

    c.lineWidth = 1.3;
    for (const l of this.links) {
      if (!this.isActive(l.b)) continue;
      const lit = !hv || (near.has(l.a) && near.has(l.b));
      c.globalAlpha = hv ? (lit ? 0.9 : 0.1) : 0.45;
      c.strokeStyle = l.b.color || col.mut;
      c.beginPath();
      c.moveTo(l.a.x, l.a.y);
      c.lineTo(l.b.x, l.b.y);
      c.stroke();
    }

    c.lineJoin = "round";
    c.textBaseline = "middle";
    for (const n of this.active) {
      const dim = hv && !near.has(n);
      c.globalAlpha = dim ? 0.25 : 1;
      const color = n.color || col.fg;
      c.beginPath();
      c.arc(n.x, n.y, n.r + (n === hv ? 2 : 0), 0, Math.PI * 2);
      if (n.kind === "cat" && !n.open) {
        c.fillStyle = col.bg;
        c.fill();
        c.lineWidth = 3;
        c.strokeStyle = color;
        c.stroke();
      } else {
        c.fillStyle = color;
        c.fill();
      }

      let text = n.label();
      if (n.kind === "cat" && !n.open) text += ` (${n.count})`;
      c.font = `${n.kind === "leaf" ? 400 : 600} ${n.kind === "leaf" ? 12 : n.kind === "cat" ? 13 : 14}px "IBM Plex Sans", system-ui, sans-serif`;
      const w = c.measureText(text).width;
      const right = n.x + n.r + 5 + w <= W - 2;
      c.textAlign = right ? "left" : "right";
      const tx = right ? n.x + n.r + 5 : n.x - n.r - 5;
      c.lineWidth = 3;
      c.strokeStyle = col.bg;
      c.strokeText(text, tx, n.y);
      c.fillStyle = col.fg;
      c.fillText(text, tx, n.y);
    }
    c.globalAlpha = 1;
  }

  /* ----- Souris et toucher ----- */
  pos(e) {
    const r = this.cv.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  pick(x, y, touch) {
    const slack = touch ? 14 : 8;
    for (let i = this.active.length - 1; i >= 0; i--) {
      const n = this.active[i];
      if (Math.hypot(n.x - x, n.y - y) <= n.r + slack) return n;
    }
    return null;
  }
  onMove(e) {
    const { x, y } = this.pos(e);
    if (this.drag) {
      this.drag.x = clamp(x, 8, this.W - 8);
      this.drag.y = clamp(y, 8, this.H - 8);
      this.wake();
      return;
    }
    if (e.pointerType !== "mouse") return;
    const n = this.pick(x, y, false);
    if (n !== this.hover) {
      this.hover = n;
      this.cv.style.cursor = n ? (n.kind === "cat" ? "pointer" : "grab") : "";
      this.requestDraw();
    }
  }
  onDown(e) {
    const { x, y } = this.pos(e);
    const n = this.pick(x, y, e.pointerType !== "mouse");
    this.hover = n;
    this.down = { x, y };
    if (n) {
      this.drag = n;
      this.cv.setPointerCapture(e.pointerId);
    }
    this.requestDraw();
  }
  onUp(e) {
    const { x, y } = this.pos(e);
    const n = this.drag;
    this.drag = null;
    if (n && n.kind === "cat" && Math.hypot(x - this.down.x, y - this.down.y) < 5) this.toggle(n.id);
    this.wake();
  }
}

/* ---------- 4b. Réseau de neurones du formulaire ---------- */

/* 5 champs (entrée) → 3 couches cachées → 1 neurone de sortie « prêt ».
   Les poids sont fixes (tirés d'une graine) : le réseau est illustratif, pas entraîné.
   Chaque champ est converti en un nombre entre 0 et 1, puis chaque couche calcule
   la moyenne pondérée de la précédente avant de la passer dans une sigmoïde. */
const NET_LAYERS = [5, 6, 6, 4, 1];
const NET_FIELDS = ["nom", "prenom", "email", "objet", "message"];
const NET_GAIN = 6;
const NET_STAGGER = 140; // délai entre deux couches (ms)
const NET_DUR = 260; // durée d'adaptation d'une couche (ms)

const sigmoid = (x) => 1 / (1 + Math.exp(-x));

/** Générateur pseudo-aléatoire à graine (mulberry32) : mêmes poids à chaque visite */
function seededRandom(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class NeuralNet {
  constructor(canvas, form) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d");
    this.form = form;
    this.weights = this.makeWeights();
    this.shown = NET_LAYERS.map((n) => new Array(n).fill(0)); // activations affichées
    this.from = this.shown.map((a) => [...a]);
    this.to = this.shown.map((a) => [...a]);
    this.t0 = 0;
    this.raf = 0;
    this.running = false;
    this.dead = false;
    this.focus = -1; // neurone d'entrée dont le champ a le focus
    this.hover = null;
    this.flash = null;
    this.pos = null;
    this.W = 0;
    this.H = 0;
    this.readColors();
    this.bind();
    this.update(false); // reprend les valeurs déjà saisies (ex. après un changement de langue)
  }

  /** weights[l][j][i] : poids du neurone i de la couche l vers le neurone j de la couche l+1 */
  makeWeights() {
    const rand = seededRandom(2025);
    return NET_LAYERS.slice(1).map((n, l) =>
      Array.from({ length: n }, () => Array.from({ length: NET_LAYERS[l] }, () => 0.25 + rand() * 0.75)),
    );
  }

  /** Transforme chaque champ en nombre entre 0 et 1 */
  readInputs() {
    const f = this.form.elements;
    const len = (name) => f[name].value.trim().length;
    const email = f.email;
    return [
      Math.min(len("nom") / 4, 1),
      Math.min(len("prenom") / 4, 1),
      len("email") ? (email.validity.valid ? 1 : email.value.includes("@") ? 0.5 : 0.2) : 0,
      Math.min(len("objet") / 15, 1),
      Math.min(len("message") / 80, 1),
    ];
  }

  /** Propagation avant : renvoie les activations de toutes les couches */
  forward(inputs) {
    const acts = [inputs];
    for (let l = 0; l < NET_LAYERS.length - 1; l++) {
      const prev = acts[l];
      acts.push(
        this.weights[l].map((row) => {
          let sum = 0, total = 0;
          row.forEach((w, i) => { sum += w * prev[i]; total += w; });
          // 1re couche plus exigeante (seuil 0,8) : « prêt » demande un formulaire quasi complet
          return l === 0 ? sigmoid(10 * (sum / total - 0.8)) : sigmoid(NET_GAIN * (sum / total - 0.5));
        }),
      );
    }
    return acts;
  }

  readColors() {
    const cs = getComputedStyle(document.documentElement);
    const get = (v) => cs.getPropertyValue(v).trim();
    this.col = {
      fg: get("--fg"), mut: get("--mut"), bg: get("--page"), line: get("--line"),
      acc: get("--acc"), ok: get("--ok"), err: get("--err"),
    };
  }

  bind() {
    const form = this.form;
    this.onInput = () => this.update(true);
    this.onReset = () => setTimeout(() => !this.dead && this.update(true), 0);
    this.onFocusIn = (e) => { this.focus = NET_FIELDS.indexOf(e.target.name); this.requestDraw(); };
    this.onFocusOut = () => { this.focus = -1; this.requestDraw(); };
    this.onTheme = () => { this.readColors(); this.requestDraw(); };
    form.addEventListener("input", this.onInput);
    form.addEventListener("reset", this.onReset);
    form.addEventListener("focusin", this.onFocusIn);
    form.addEventListener("focusout", this.onFocusOut);
    addEventListener("themechange", this.onTheme);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.cv);
    this.cv.addEventListener("pointermove", (e) => this.onMove(e));
    this.cv.addEventListener("pointerleave", () => { this.hover = null; this.requestDraw(); });
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.form.removeEventListener("input", this.onInput);
    this.form.removeEventListener("reset", this.onReset);
    this.form.removeEventListener("focusin", this.onFocusIn);
    this.form.removeEventListener("focusout", this.onFocusOut);
    removeEventListener("themechange", this.onTheme);
  }

  resize() {
    const r = this.cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const d = window.devicePixelRatio || 1;
    this.W = r.width;
    this.H = r.height;
    this.cv.width = Math.round(r.width * d);
    this.cv.height = Math.round(r.height * d);
    this.ctx.setTransform(d, 0, 0, d, 0, 0);
    this.layout();
    this.requestDraw();
  }

  /** Calcule la position de chaque neurone */
  layout() {
    const { W, H, ctx } = this;
    ctx.font = '11px "IBM Plex Sans", system-ui, sans-serif';
    const labelW = Math.max(...ui("netFields").map((s) => ctx.measureText(s).width));
    const top = 14, bottom = 28, right = 54;
    const x0 = labelW + 22, x1 = W - right;
    const Hc = H - top - bottom, n = NET_LAYERS.length;
    this.r = clamp(Math.min(Hc / 6, (x1 - x0) / (n - 1)) * 0.22, 4, 9);
    this.pos = NET_LAYERS.map((count, l) =>
      Array.from({ length: count }, (_, j) => ({
        x: x0 + (l * (x1 - x0)) / (n - 1),
        y: top + ((j + 1) * Hc) / (count + 1),
      })),
    );
  }

  /** Recalcule les activations ; la vague part de l'entrée et traverse chaque couche */
  update(animate = true) {
    const acts = this.forward(this.readInputs());
    if (!animate || reduced() || !this.pos) {
      this.shown = acts.map((a) => [...a]);
      this.from = acts.map((a) => [...a]);
      this.to = acts;
      this.requestDraw();
      return;
    }
    this.from = this.shown.map((a) => [...a]);
    this.to = acts;
    this.t0 = performance.now();
    this.animate();
  }

  /** Fait traverser le réseau par une impulsion (utilisé pendant l'envoi) */
  pulse() {
    if (reduced() || !this.pos) return;
    this.from = this.shown.map((a) => [...a]);
    this.to = this.shown.map((a) => [...a]);
    this.t0 = performance.now();
    this.animate();
  }

  /** Halo vert (envoyé) ou rouge (échec) autour du neurone de sortie */
  flashResult(ok) {
    this.flash = { ok, until: performance.now() + 1000 };
    if (reduced()) setTimeout(() => { this.flash = null; }, 1000);
    else this.animate();
  }

  animate() {
    if (this.running || this.dead) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.frame);
  }

  frame = (now) => {
    if (this.dead) return;
    const t = now - this.t0;
    let busy = t < (NET_LAYERS.length - 1) * NET_STAGGER + NET_DUR;
    this.shown.forEach((layer, l) => {
      const p = clamp((t - l * NET_STAGGER) / NET_DUR, 0, 1);
      const e = 1 - (1 - p) ** 3;
      layer.forEach((_, j) => (layer[j] = this.from[l][j] + (this.to[l][j] - this.from[l][j]) * e));
    });
    if (this.flash && now >= this.flash.until) this.flash = null;
    if (this.flash) busy = true;
    this.draw(t, now);
    if (busy) this.raf = requestAnimationFrame(this.frame);
    else this.running = false;
  };

  requestDraw() {
    if (!this.running && !this.dead && this.pos) this.draw();
  }

  onMove(e) {
    if (e.pointerType !== "mouse" || !this.pos) return;
    const rect = this.cv.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    let found = null;
    this.pos.forEach((layer, l) =>
      layer.forEach((p, j) => {
        if (Math.hypot(p.x - x, p.y - y) <= this.r + 5) found = { l, j };
      }),
    );
    if (JSON.stringify(found) !== JSON.stringify(this.hover)) {
      this.hover = found;
      this.requestDraw();
    }
  }

  text(str, x, y, align, weight, color, size = 11) {
    const c = this.ctx;
    c.font = `${weight} ${size}px "IBM Plex Sans", system-ui, sans-serif`;
    c.textAlign = align;
    c.textBaseline = "middle";
    c.lineJoin = "round";
    c.lineWidth = 3;
    c.strokeStyle = this.col.bg;
    c.strokeText(str, x, y);
    c.fillStyle = color;
    c.fillText(str, x, y);
  }

  draw(t, now) {
    if (!this.pos) return;
    const c = this.ctx, { W, H, col, pos, r } = this;
    const last = NET_LAYERS.length - 1;
    c.clearRect(0, 0, W, H);

    // Connexions : un trait de fond, puis le signal (épaisseur et opacité = poids × activation)
    c.lineCap = "round";
    for (let l = 0; l < last; l++) {
      this.weights[l].forEach((row, j) =>
        row.forEach((w, i) => {
          const a = pos[l][i], b = pos[l + 1][j];
          const s = w * this.shown[l][i];
          c.beginPath();
          c.moveTo(a.x, a.y);
          c.lineTo(b.x, b.y);
          c.globalAlpha = 0.5;
          c.lineWidth = 0.8;
          c.strokeStyle = col.line;
          c.stroke();
          if (s > 0.04) {
            c.globalAlpha = Math.min(0.9, s * 0.9);
            c.lineWidth = 0.6 + s * 1.6;
            c.strokeStyle = col.acc;
            c.stroke();
          }
        }),
      );
    }

    // Impulsions qui voyagent d'une couche à la suivante
    if (t !== undefined) {
      c.fillStyle = col.acc;
      for (let l = 0; l < last; l++) {
        const q = (t - l * NET_STAGGER) / (NET_STAGGER + NET_DUR * 0.6);
        if (q <= 0 || q >= 1) continue;
        this.weights[l].forEach((row, j) =>
          row.forEach((w, i) => {
            if (w * this.to[l][i] < 0.12) return;
            const a = pos[l][i], b = pos[l + 1][j];
            c.globalAlpha = 0.95;
            c.beginPath();
            c.arc(a.x + (b.x - a.x) * q, a.y + (b.y - a.y) * q, 2.2, 0, Math.PI * 2);
            c.fill();
          }),
        );
      }
    }

    // Neurones : remplissage proportionnel à l'activation
    c.globalAlpha = 1;
    pos.forEach((layer, l) =>
      layer.forEach((p, j) => {
        const a = this.shown[l][j];
        const focused = l === 0 && j === this.focus;
        c.beginPath();
        c.arc(p.x, p.y, r, 0, Math.PI * 2);
        c.fillStyle = col.bg;
        c.fill();
        c.globalAlpha = a;
        c.fillStyle = l === last && a >= 0.5 ? col.ok : col.acc;
        c.fill();
        c.globalAlpha = 1;
        c.lineWidth = 1.5;
        c.strokeStyle = focused ? col.acc : col.mut;
        c.stroke();
        if (focused) {
          c.beginPath();
          c.arc(p.x, p.y, r + 4, 0, Math.PI * 2);
          c.lineWidth = 2;
          c.stroke();
        }
      }),
    );

    // Étiquettes : champs à gauche, valeur de sortie à droite, légende en bas
    const fields = ui("netFields");
    pos[0].forEach((p, j) => {
      const on = j === this.focus;
      this.text(fields[j], p.x - r - 8, p.y, "right", on ? 600 : 400, on ? col.fg : col.mut);
    });
    const out = pos[last][0];
    this.text(`${Math.round(this.shown[last][0] * 100)} %`, out.x + r + 8, out.y - 7, "left", 600, col.fg, 14);
    this.text(ui("netReady"), out.x + r + 8, out.y + 9, "left", 400, col.mut);
    const by = H - 11;
    this.text(ui("netIn"), pos[0][0].x, by, "center", 400, col.mut);
    this.text(ui("netHidden"), (pos[1][0].x + pos[last - 1][0].x) / 2, by, "center", 400, col.mut);
    this.text(ui("netOut"), out.x, by, "center", 400, col.mut);

    if (this.hover && this.hover.l !== last) {
      const p = pos[this.hover.l][this.hover.j];
      this.text(this.shown[this.hover.l][this.hover.j].toFixed(2), p.x, p.y - r - 9, "center", 600, col.fg);
    }

    if (this.flash && now !== undefined) {
      const k = clamp(1 - (this.flash.until - now) / 1000, 0, 1);
      c.globalAlpha = 1 - k;
      c.strokeStyle = this.flash.ok ? col.ok : col.err;
      c.lineWidth = 3;
      c.beginPath();
      c.arc(out.x, out.y, r + 3 + k * 14, 0, Math.PI * 2);
      c.stroke();
      c.globalAlpha = 1;
    }
  }
}

/* ---------- 5. Le carnet ---------- */

class Notebook {
  constructor(root) {
    this.root = root;
    this.items = [];
    this.count = 0; // compteur d'exécution : In [n] / Out[n]
    this.sel = 0;
    this.activeRuns = 0;
    this.epoch = 0; // change à chaque redémarrage du noyau
    this.runningAll = false;

    CELLS.forEach((def, i) => this.items.push(this.createCell(def, i)));
    root.append(...this.items.map((it) => it.el));
    this.bindEvents();
    this.refresh();
    this.select(0, { focus: false });
  }

  createCell(def, i) {
    const el = document.createElement("section");
    el.className = `cell ${def.kind}`;
    el.tabIndex = 0;
    el.dataset.index = i;
    if (def.id) el.id = def.id;
    if (def.kind === "code") {
      el.innerHTML = `<div class="in-row"><span class="prompt in-p"></span>
        <div class="editor"><pre><code>${highlight(def.code)}</code></pre>
        <button type="button" class="run" data-i18n-label="run">▶</button></div></div>
        <div class="out-row" hidden><span class="prompt out-p"></span><div class="output"></div></div>`;
    }
    const it = { def, el, n: 0, busy: false, cleanup: null, token: null };
    if (def.kind === "code") this.setPrompts(it);
    return it;
  }

  setPrompts(it, star = false) {
    const nb = "\u00a0";
    $(".in-p", it.el).textContent = `In${nb}[${star ? "*" : it.n || nb}]:`;
    $(".out-p", it.el).textContent = it.n ? `Out[${it.n}]:` : "";
  }

  /** Redessine ce qui dépend de la langue (cellules Markdown et sorties déjà exécutées) */
  refresh() {
    for (const it of this.items) {
      if (it.def.kind === "md") it.el.innerHTML = `<div class="md-body">${it.def.html()}</div>`;
      else if (it.n && it.def.out) this.renderOutput(it, false);
    }
    this.updateStatus();
  }

  renderOutput(it, animate) {
    const row = $(".out-row", it.el), out = $(".output", it.el);
    it.cleanup?.();
    it.cleanup = null;
    const snap = it.def.snapshot ? it.def.snapshot(out) : null;
    out.innerHTML = it.def.out();
    if (snap) it.def.restore(out, snap);
    row.hidden = false;
    this.setPrompts(it);
    out.classList.toggle("reveal", animate);
    if (animate) [...out.children].forEach((child, k) => child.style.setProperty("--i", k));
    const token = (it.token = Symbol());
    if (animate && it.def.typed) this.typeText(out, () => it.token === token);
    it.cleanup = it.def.mount ? it.def.mount(out) : null;
  }

  /** Effet « machine à écrire » sur les paragraphes d'une sortie */
  async typeText(out, isCurrent) {
    const ps = $$("p", out);
    const texts = ps.map((p) => p.textContent);
    ps.forEach((p) => (p.textContent = ""));
    for (let k = 0; k < ps.length; k++) {
      for (let j = 3; j < texts[k].length; j += 3) {
        if (!isCurrent()) return;
        ps[k].textContent = texts[k].slice(0, j);
        await sleep(10);
      }
      ps[k].textContent = texts[k];
    }
  }

  setBusy(delta) {
    this.activeRuns += delta;
    const busy = this.activeRuns > 0;
    $("#kernel").classList.toggle("busy", busy);
    $("#kstate").textContent = `(${ui(busy ? "kernelBusy" : "kernelIdle")})`;
  }

  async run(i) {
    const it = this.items[i];
    if (!it || it.def.kind !== "code" || it.busy) return;
    const epoch = this.epoch;
    it.busy = true;
    this.setBusy(1);
    this.setPrompts(it, true);
    if (!reduced()) await sleep(280);
    if (epoch === this.epoch) {
      it.n = ++this.count;
      this.setPrompts(it);
      if (it.def.out) this.renderOutput(it, !reduced());
    }
    it.busy = false;
    this.setBusy(-1);
  }

  async runAll() {
    if (this.runningAll) return;
    this.runningAll = true;
    const epoch = this.epoch;
    for (let i = 0; i < this.items.length && epoch === this.epoch; i++) {
      if (this.items[i].def.kind !== "code") continue;
      await this.run(i);
      if (!reduced()) await sleep(120);
    }
    this.runningAll = false;
  }

  restart() {
    this.epoch++;
    this.count = 0;
    this.runningAll = false;
    for (const it of this.items) {
      if (it.def.kind !== "code") continue;
      it.cleanup?.();
      it.cleanup = null;
      it.token = null;
      it.n = 0;
      it.busy = false;
      $(".out-row", it.el).hidden = true;
      $(".output", it.el).innerHTML = "";
      this.setPrompts(it);
    }
    this.activeRuns = 0;
    this.setBusy(1);
    setTimeout(() => this.setBusy(-1), 400);
  }

  select(i, { scroll = false, focus = true, block = "nearest" } = {}) {
    const prev = this.items[this.sel];
    prev.el.classList.remove("sel", "editing");
    this.sel = clamp(i, 0, this.items.length - 1);
    const it = this.items[this.sel];
    it.el.classList.add("sel");
    if (focus) it.el.focus({ preventScroll: true });
    if (scroll) it.el.scrollIntoView({ block, behavior: reduced() ? "auto" : "smooth" });
    this.updateStatus();
  }

  setEdit(on) {
    this.items[this.sel].el.classList.toggle("editing", on);
    this.updateStatus();
  }

  updateStatus() {
    const editing = this.items[this.sel].el.classList.contains("editing");
    $("#stMode").textContent = ui(editing ? "modeEdit" : "modeCommand");
    $("#stCell").textContent = `${ui("cell")} ${this.sel + 1}/${this.items.length}`;
    if (!this.activeRuns) $("#kstate").textContent = `(${ui("kernelIdle")})`;
  }

  /** Met en évidence dans le menu la section visible */
  updateSpy() {
    const limit = $(".bar").offsetHeight + 24;
    let current = null;
    for (const it of this.items) {
      if (it.def.kind === "md" && it.el.getBoundingClientRect().top <= limit) current = it.def.id;
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
    $$(".menu a").forEach((a) => {
      if (a.dataset.target === current) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  goTo(id, { run = false } = {}) {
    const i = this.items.findIndex((it) => it.def.id === id);
    if (i < 0) return;
    this.select(i, { scroll: true, focus: false, block: "start" });
    if (run) this.run(i + 1);
  }

  bindEvents() {
    // Clic : sélectionne la cellule ; ▶ l'exécute
    this.root.addEventListener("click", (e) => {
      const cell = e.target.closest(".cell");
      if (!cell) return;
      const i = Number(cell.dataset.index);
      if (e.target.closest(".run")) {
        this.select(i, { focus: false });
        this.run(i);
        return;
      }
      const interactive = e.target.closest("input, textarea, select, button, a");
      this.select(i, { focus: !interactive });
    });

    // Mode édition (barre verte) quand un champ de saisie a le focus
    this.root.addEventListener("focusin", (e) => {
      const cell = e.target.closest(".cell");
      if (!cell) return;
      const i = Number(cell.dataset.index);
      if (i !== this.sel) this.select(i, { focus: false });
      if (e.target.matches("input, textarea")) this.setEdit(true);
    });
    this.root.addEventListener("focusout", () =>
      queueMicrotask(() => {
        const a = document.activeElement;
        this.setEdit(this.root.contains(a) && a.matches("input, textarea"));
      }),
    );

    // Raccourcis clavier
    document.addEventListener("keydown", (e) => {
      const target = e.target instanceof Element ? e.target : document.body;
      if (target.closest("dialog")) return;
      const typing = target.closest("input, textarea, select");
      if (e.key === "Escape") {
        if (typing) target.blur();
        return;
      }
      if (typing || e.altKey) return;
      const last = this.items.length - 1;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        this.select(Math.min(this.sel + 1, last), { scroll: true });
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        this.select(Math.max(this.sel - 1, 0), { scroll: true });
      } else if (e.key === "Enter" && (e.shiftKey || e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.run(this.sel);
        if (e.shiftKey) this.select(Math.min(this.sel + 1, last), { scroll: true });
      } else if (e.key === "?") {
        openHelp();
      }
    });

    // Menu : va à la section
    $$(".menu a, .brand").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = a.dataset.target || "accueil";
        this.goTo(id, { run: id !== "accueil" });
        history.replaceState(null, "", `#${id}`);
      }),
    );

    $("#runAll").addEventListener("click", () => this.runAll());
    $("#restart").addEventListener("click", () => this.restart());

    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { this.updateSpy(); ticking = false; });
    }, { passive: true });
  }
}

/* ---------- 6. Thème, langue, aide et démarrage ---------- */

function applyStaticI18n() {
  $$("[data-i18n]").forEach((el) => (el.textContent = ui(el.dataset.i18n)));
  $$("[data-i18n-label]").forEach((el) => {
    const v = ui(el.dataset.i18nLabel);
    el.setAttribute("aria-label", v);
    el.title = v;
  });
  document.title = ui("pageTitle");
  document.documentElement.lang = lang;

  const langBtn = $("#lang");
  langBtn.textContent = lang === "fr" ? "EN" : "FR";
  langBtn.setAttribute("aria-label", ui("langLabel"));
  langBtn.title = ui("langLabel");

  const themeBtn = $("#theme");
  themeBtn.setAttribute("aria-label", ui("theme"));
  themeBtn.title = ui("theme");
  $("#themeIcon").textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "☾";

  $("#helpTitle").textContent = ui("helpTitle");
  $("#helpList").innerHTML = ui("keys")
    .map(([k, d]) => `<dt>${k.split(" + ").map((x) => `<kbd>${esc(x)}</kbd>`).join(" + ")}</dt><dd>${esc(d)}</dd>`)
    .join("");
}

function openHelp() {
  const dlg = $("#help");
  if (!dlg.open) dlg.showModal();
}

document.addEventListener("DOMContentLoaded", async () => {
  const nb = new Notebook($("#nb"));
  applyStaticI18n();
  nb.updateStatus();
  $("#year").textContent = new Date().getFullYear();

  $("#lang").addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    store.set("lang", lang);
    applyStaticI18n();
    nb.refresh();
  });

  $("#theme").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    store.set("theme", next);
    applyStaticI18n();
    dispatchEvent(new Event("themechange"));
  });

  $("#helpBtn").addEventListener("click", openHelp);

  // Démarrage : le noyau importe le profil puis affiche le résumé.
  // Si l'adresse contient une ancre (#projets…), la section demandée est exécutée aussi.
  const target = location.hash.slice(1);
  await nb.run(1); // import du profil
  nb.run(2); // profil.resume()
  if (target && target !== "accueil") nb.goTo(target, { run: true });
  nb.updateSpy();
});