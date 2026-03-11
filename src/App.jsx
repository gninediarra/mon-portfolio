import { useState, useEffect, useRef } from "react";
import ChatBot from "./components/ChatBot";

/* ══════════════════════════════════════════════════════
   TRADUCTIONS — EN / FR / BM (Bambara) / AR (Arabe)
══════════════════════════════════════════════════════ */
const T = {
  en: {
    dir: "ltr",
    nav: ["About", "Skills", "Projects", "Contact"],
    available: "Available for projects",
    greeting: "Hey, There! 👋",
    heroTitle: (name) => <>I Am <span className="cn">{name}</span>,<br />Engineer In<br /><span className="cr2">AI</span>.</>,
    heroSub: "I build intelligent systems and robust ML pipelines. Passionate about applied research and AI at scale.",
    cta1: "View my projects", cta2: "Contact me",
    stats: [{ n: 10, s: "+", l: "Projects" }, { n: 5, s: "+", l: "Languages" }, { n: 2, s: "+", l: "Yrs exp." }],
    aboutLabel: "— What I do",
    aboutTitle: <>Research &<br />Innovation.</>,
    cards: [
      { t: "AI & ML Research", d: "I develop and publish research on innovative deep learning models, focusing on efficiency, robustness and interpretability of systems." },
      { t: "AI Solutions for Business", d: "I design and deploy custom AI solutions that help businesses automate processes and stay competitive in a rapidly evolving digital landscape." },
    ],
    toolsTitle: "TOOLS I LOVE AND WORK WITH",
    projLabel: "03 — Projects",
    projTitle: <>My<br />Work.</>,
    projSeeAll: "See all →",
    projDetail: "Details",
    contactLabel: "— Let's collaborate",
    contactTitle: <>Let's<br />Talk.</>,
    contactSub: "Always open to discussing new opportunities, collaborations or just chatting about AI.",
    socials: ["LinkedIn", "GitHub", "Twitter / X", "Download CV"],
    footerLeft: "© 2025 — Gniné Diarra",
    footerMid: "AI Engineer · Tunis, Tunisia",
    footerRight: "Made with ♡ & ☕",
    modalOverview: "Overview", modalDemo: "Live Demo",
    modalAbout: "— About the project", modalKeys: "— Key highlights",
    modalStack: "— Tech stack", modalMetrics: "— Metrics",
    modalYear: "Year", modalRole: "Role", modalStatus: "Status",
    modalCta: "▶ View live demo", modalLoading: "Loading demo...", modalOpen: "↗ Open",
    projects: {
      santeConnect: { nm: "HEALTH CONNECT — AI-Driven Post-Hospitalization Monitoring", dc: "AI-powered post-hospital monitoring system integrating IoT, web platforms, developed with the Ministry of Health.", desc_long: "An innovative telemedicine system developed in collaboration with the Ministry of Health (Tunisia) and ESPRIT.\n\n**Key Components:**\n- ⌚ **Connected Watch**: ESP8266 prototype with MAX30102 sensors (heart rate + SpO₂)\n- 🤖 **Medical AI Agents**: ClinicalBERT, LLM for clinical analysis and risk detection\n- 📄 **Medical OCR**: Prescription extraction and structuring\n- 💬 **Patient Assistant**: Chatbot to explain treatments\n- 📊 **Dashboards**: Doctor and patient interfaces\n\n**Technical Innovations:**\n- Complete pipeline: sensor → filtering → AI → dashboard\n- Multi-agents for medical reasoning\n- Explainable AI in medical context\n- Real-time physiological signal processing\n\n**Technologies:** ESP8266, MAX30102, FastAPI, ClinicalBERT, React, PPG-DaLiA", highlights: ["Ministry of Health Project + ESPRIT", "Sensor → AI → Dashboard Pipeline", "Multi-agent Medical Systems (ClinicalBERT)", "Explainable AI for Clinical Decisions"] },
      droneProject: { nm: "DRONE PROJECT — Agricultural Monitoring Drone", dc: "Intelligent drone system for agricultural monitoring developed with Meteorological Service, combining ESP32-CAM, YOLOv5 and embedded analysis.", desc_long: "An innovative drone system developed in partnership with the Meteorological Service for agricultural and environmental monitoring.\n\n**Problems Solved:**\n- 🌱 Agriculture: Crop estimation, hydric stress detection\n- 🌦️ Agrometeorology: Localized environmental data\n- 🗺️ Territorial Monitoring: Large-scale supervision\n\n**Technical Components:**\n- ✈️ **Quadcopter Drone**: Lightweight structure, brushless motors, GPS\n- 📸 **ESP32-CAM**: High-resolution aerial image capture\n- 🤖 **Embedded AI**: YOLOv5 for object detection, OpenCV for processing\n- 📡 **Transmission**: Ground image transmission for inference\n\n**Architecture:**\nESP32-CAM → RF/WiFi Transmission → Ground Computer → YOLOv5 Inference\n\n**Why this architecture?** The ESP32 cannot support heavy deep learning models, so images are transmitted to ground for processing.", highlights: ["Partnership with Meteorological Service", "Edge Capture + Cloud Inference Architecture", "YOLOv5 for Crop Detection & Stress", "Solution Adapted for Rural Regions"] },
      smartRecruitment: { nm: "Smart Recruitlent — Intelligent Hiring System", dc: "AI recruitment platform developed with ACTIA, integrating NLP, computer vision and multi-agent orchestration to automate the entire hiring process.", desc_long: "A complete recruitment platform developed in partnership with ACTIA, transforming how companies identify, evaluate and communicate with candidates.\n\n**Key Modules:**\n- 💬 **AI Chatbot**: Real-time interaction with semantic embeddings + LLaMA 3\n- 📄 **CV Parsing**: 5,554 CVs processed (3,258 PDF + 2,296 DOCX)\n- 🤝 **Matching**: Semantic similarity with BGE-M3 + LLaMA\n- 📊 **Shortlisting**: Automatic scoring with LLaMA 3.1\n- 📧 **Communication**: AI-generated personalized emails\n- 🎥 **Virtual Interview**: Voice analysis (Whisper) + face (VGG19) + phone detection (YOLOv8)\n- 🔍 **Explainable AI**: LIME for decision explanation\n\n**Technologies:** LLaMA 3, BGE-M3, YOLOv8, Whisper, VGG19, MediaPipe, CrewAI, Gradio\n\n**Impact:** -80% CV screening time, objective and transparent process", highlights: ["Partnership with ACTIA", "Multimodal Pipeline Text + Voice + Vision", "5,554 CVs Automatically Analyzed", "Explainable AI with LIME"] },
      aspireHealth: { nm: "Aspire — Health Inspections ML Platform", dc: "Predictive analytics platform for health inspections using 300,000+ records to predict risks and prioritize inspections.", desc_long: "An ML solution developed to transform health inspections in the United States, where 48 million people are affected annually by foodborne illnesses.\n\n**The Problem:**\n- ❌ Subjectivity in inspection scores\n- ❌ Data published with weeks delay\n- ❌ Lack of transparency for the public\n- ❌ Reactive approach (after problems)\n\n**The Data:**\n- 📊 300,000+ inspection records\n- 📊 160,000+ establishments analyzed (LA County)\n- 📊 Demographic data (population density, income)\n\n**Deployed ML Models:**\n- 📈 **Regression**: Violation severity prediction\n- 🏷️ **Classification**: At-risk establishment identification\n- ⏱️ **Time Series**: Inspection trend forecasting\n\n**KPIs Tracked:**\n- Average inspections per establishment\n- Average score per establishment\n- Frequency of severe violations\n- Inspector efficiency\n- Average years of ownership\n\n**Impact:** Proactive risk prediction, reduced delays, increased public transparency.", highlights: ["300,000+ Inspections Analyzed", "Proactive Health Risk Prediction", "Real-time KPIs for Inspectors", "Solution for 48M People Affected"] },
      healthyLiving: { nm: "Healthy Living — Predictive Health Platform", dc: "Django web application integrating AI to centralize patient data, predict readmission risks and automate emergency prioritization.", desc_long: "A complete digital solution for hospitals facing patient data management and emergency prioritization challenges.\n\n**Problems Solved:**\n- 📊 Inefficient patient data management\n- 🚑 Difficulty prioritizing emergencies\n- 📝 Excessive administrative burden\n- 🤝 Limited inter-department coordination\n\n**Technical Solution:**\n- 🔐 Multi-role authentication (admin, doctor, staff)\n- 📋 Complete patient and medical record management\n- 🤖 Appointment system with AI prioritization\n- 💬 24/7 patient chatbot (Kommunicate)\n- 📈 Readmission prediction model (NLP/Transformers)\n- 💰 Automated billing\n- 📊 Real-time dashboards and reports\n\n**Technologies:** Django, Python, SQLite, Transformers (Hugging Face), NLP, Kommunicate, Bootstrap, Figma\n\n**Impact:** -30% administrative burden, instant prioritization, better coordination, continuous patient support.", highlights: ["AI Emergency Prioritization", "NLP Readmission Prediction Model", "24/7 Patient Chatbot (Kommunicate)", "30% Administrative Burden Reduction"] },
      adventureHub: { nm: "AdventureHub — Social Travel Platform", dc: "Social platform combining traveler networking and tourism services, with e-commerce, event management and complaint system modules.", desc_long: "A full-stack platform unifying social sharing and tourism reservation worlds to create an integrated user experience.\n\n**Main Modules:**\n- 👥 **User Management**: Differentiated profiles (travelers/agencies)\n- 🛒 **E-commerce**: Product catalog with inventory management\n- 📅 **Events**: Activity publication, search and registration\n- 🎫 **Complaint System**: Ticketing for customer support\n- 📱 **Social Feed**: Post sharing and travel tips\n\n**Technical Architecture:**\n- 🏗️ Modular architecture (separation of concerns)\n- 🔌 Singleton Pattern for DB optimization\n- 🌿 Multi-branch Git for collaborative development\n\n**Technologies:** PHP OOP, MySQL (PDO), HTML5/CSS3, JavaScript, Git/GitHub", highlights: ["Modular PHP OOP Architecture", "Singleton Pattern for DB Connections", "Dual Profile Travelers/Agencies", "Multi-branch Git Workflow"] },
      beautyCenterMgmt: { nm: "Beauty Center Management System — Professional Desktop Application", dc: "Complete desktop application of 15,000+ lines in C++/Qt for managing beauty salons with 7 integrated modules.", desc_long: "A complete desktop solution transforming beauty salon and wellness center management.\n\n**The 7 Modules:**\n- 👥 **Clients**: CRUD with validation, photos, birthday alerts\n- 👩‍💼 **Employees**: Dynamic scheduling, skills matrix\n- 💆 **Services**: Catalog, pricing, monthly trends\n- 📅 **Appointments**: Interactive calendar, conflict detection, Google Calendar export\n- 📦 **Stock**: Low threshold alerts, total value\n- 💎 **Loyalty**: Bronze/Silver/Gold system, points calculation\n- 📊 **Dashboard**: Real-time graphs, PDF export\n\n**Innovations:**\n- 🔐 Facial recognition simulation with camera animation\n- 📅 Google Calendar sync via ICS\n- 📧 Automatic email notifications\n- 👥 Dual interface: Admin (full access) + Client (personal portal)\n\n**Technologies:** C++17, Qt 5.9, SQLite, MVC, QSS, Git\n\n**Key Algorithms:** Multiple date parsing, real-time conflict detection, similarity calculation, ICS generation, real-time data aggregation", highlights: ["15,000+ Lines C++/Qt", "MVC Architecture", "Google Calendar Export (ICS)", "Admin/Client Dual Interface"] },
    },
  },
  fr: {
    dir: "ltr",
    nav: ["About", "Skills", "Projets", "Contact"],
    available: "Disponible pour des projets",
    greeting: "Hey, There! 👋",
    heroTitle: (name) => <>Je Suis <span className="cn">{name}</span>,<br />Ingénieure En<br /><span className="cr2">IA</span>.</>,
    heroSub: "Je construis des systèmes intelligents et des pipelines ML robustes. Passionnée par la recherche appliquée et l'IA à grande échelle.",
    cta1: "Voir mes projets", cta2: "Me contacter",
    stats: [{ n: 15, s: "+", l: "Projets" }, { n: 5, s: "+", l: "Langages" }, { n: 3, s: "+", l: "Ans exp." }],
    aboutLabel: "— Ce que je fais",
    aboutTitle: <>Recherche &<br />Innovation.</>,
    cards: [
      { t: "Recherche en IA & ML", d: "Je développe et publie des recherches sur des modèles d'apprentissage profond innovants, en me concentrant sur l'efficacité, la robustesse et l'interprétabilité des systèmes." },
      { t: "Solutions IA pour entreprises", d: "Je conçois et déploie des solutions IA sur mesure qui aident les entreprises à automatiser leurs processus et rester compétitives dans un paysage numérique en évolution." },
    ],
    toolsTitle: "TOOLS I LOVE AND WORK WITH",
    projLabel: "03 — Projets",
    projTitle: <>Mes<br />Travaux.</>,
    projSeeAll: "Voir tout →",
    projDetail: "Détails",
    contactLabel: "— Collaborons",
    contactTitle: <>Parlons<br />Projet.</>,
    contactSub: "Toujours ouverte à discuter de nouvelles opportunités, collaborations ou simplement à échanger sur l'IA.",
    socials: ["LinkedIn", "GitHub", "Twitter / X", "CV"],
    footerLeft: "© 2025 — Gniné Diarra ",
    footerMid: "Ingénieure IA · Tunis, Tunisie",
    footerRight: "Fait avec ♡ & ☕",
    modalOverview: "Vue d'ensemble", modalDemo: "Démo live",
    modalAbout: "— À propos du projet", modalKeys: "— Points clés",
    modalStack: "— Stack technique", modalMetrics: "— Métriques",
    modalYear: "Année", modalRole: "Rôle", modalStatus: "Statut",
    modalCta: "▶ Voir la démo live", modalLoading: "Chargement démo...", modalOpen: "↗ Ouvrir",
    projects: {
      santeConnect: { nm: "SANTÉ CONNECT — Monitoring Post-Hospitalisation Piloté par l'IA", dc: "Système de monitoring post-hospitalisation intégrant IA, IoT et plateformes web, développé avec le Ministère de la Santé.", desc_long: "Un système de télésurveillance innovant développé en collaboration avec le Ministère de la Santé (Tunisie) et l'ESPRIT.\n\n**Composants clés:**\n- ⌚ **Montre connectée**: Prototype ESP8266 avec capteurs MAX30102 (rythme cardiaque + SpO₂)\n- 🤖 **Agents IA médicaux**: ClinicalBERT, LLM pour analyse clinique et détection de risques\n- 📄 **OCR médical**: Extraction et structuration des prescriptions\n- 💬 **Assistant patient**: Chatbot pour expliquer les traitements\n- 📊 **Dashboards**: Interfaces médecin et patient\n\n**Innovations techniques:**\n- Pipeline complet: capteur → filtrage → IA → dashboard\n- Multi-agents pour raisonnement médical\n- IA explicable en contexte médical\n- Traitement temps-réel des signaux physiologiques\n\n**Technologies:** ESP8266, MAX30102, FastAPI, ClinicalBERT, React, PPG-DaLiA", highlights: ["Projet Ministère de la Santé + ESPRIT", "Pipeline capteur → IA → dashboard", "Multi-agents médicaux (ClinicalBERT)", "IA explicable pour décisions cliniques"] },
      droneProject: { nm: "DRONE PROJECT — Drone de Monitoring Agricole", dc: "Système de drone intelligent pour surveillance agricole développé avec le Service Météorologique, combinant ESP32-CAM, YOLOv5 et analyse embarquée.", desc_long: "Un système de drone innovant développé en partenariat avec le Service Météorologique pour la surveillance agricole et environnementale.\n\n**Problèmes résolus:**\n- 🌱 Agriculture: Estimation des cultures, détection stress hydrique\n- 🌦️ Agrométéorologie: Données environnementales localisées\n- 🗺️ Monitoring territorial: Supervision de grandes surfaces\n\n**Composants techniques:**\n- ✈️ **Drone quadricoptère**: Structure légère, moteurs brushless, GPS\n- 📸 **ESP32-CAM**: Capture d'images aériennes haute résolution\n- 🤖 **IA embarquée**: YOLOv5 pour détection d'objets, OpenCV pour traitement\n- 📡 **Transmission**: Envoi des images au sol pour inférence\n\n**Architecture:**\nESP32-CAM → Transmission RF/WiFi → Ordinateur sol → Inférence YOLOv5\n\n**Pourquoi cette architecture?** L'ESP32 ne peut pas supporter des modèles deep learning lourds, donc les images sont transmises au sol pour traitement.", highlights: ["Partenariat Service Météorologique", "Architecture edge capture + cloud inference", "YOLOv5 pour détection cultures et stress", "Solution adaptée aux régions rurales"] },
      smartRecruitment: { nm: "Smart Recruitlent — Système de Recrutement Intelligent", dc: "Plateforme de recrutement IA développée avec ACTIA, intégrant NLP, vision par ordinateur et orchestration multi-agents pour automatiser tout le processus d'embauche.", desc_long: "Une plateforme de recrutement complète développée en partenariat avec ACTIA, transformant la façon dont les entreprises identifient, évaluent et communiquent avec les candidats.\n\n**Modules clés:**\n- 💬 **Chatbot IA**: Interaction temps réel avec embeddings sémantiques + LLaMA 3\n- 📄 **Parsing CV**: 5,554 CV traités (3,258 PDF + 2,296 DOCX)\n- 🤝 **Matching**: Similarité sémantique avec BGE-M3 + LLaMA\n- 📊 **Shortlisting**: Scoring automatique avec LLaMA 3.1\n- 📧 **Communication**: Emails personnalisés générés par IA\n- 🎥 **Interview virtuelle**: Analyse voix (Whisper) + visage (VGG19) + détection téléphone (YOLOv8)\n- 🔍 **IA Explicable**: LIME pour expliquer les décisions\n\n**Technologies:** LLaMA 3, BGE-M3, YOLOv8, Whisper, VGG19, MediaPipe, CrewAI, Gradio\n\n**Impact:** -80% de temps de screening CV, processus objectif et transparent", highlights: ["Partenariat avec ACTIA", "Pipeline multimodal texte + voix + vision", "5,554 CV analysés automatiquement", "IA explicable avec LIME"] },
      aspireHealth: { nm: "Aspire — Plateforme ML pour Inspections Sanitaires", dc: "Plateforme d'analyse prédictive pour inspections sanitaires utilisant 300,000+ enregistrements pour prédire les risques et prioriser les contrôles.", desc_long: "Une solution ML développée pour transformer les inspections sanitaires aux États-Unis, où 48 millions de personnes sont touchées chaque année par des maladies d'origine alimentaire.\n\n**Le problème:**\n- ❌ Subjectivité dans les scores d'inspection\n- ❌ Données publiées avec des semaines de retard\n- ❌ Manque de transparence pour le public\n- ❌ Approche réactive (après les problèmes)\n\n**Les données:**\n- 📊 300,000+ enregistrements d'inspections\n- 📊 160,000+ établissements analysés (Comté de LA)\n- 📊 Données démographiques (densité population, revenus)\n\n**Modèles ML déployés:**\n- 📈 **Régression**: Prédiction de sévérité des violations\n- 🏷️ **Classification**: Identification des établissements à risque\n- ⏱️ **Time Series**: Prévision des tendances d'inspection\n\n**KPIs suivis:**\n- Nombre moyen d'inspections par établissement\n- Score moyen par établissement\n- Fréquence des violations graves\n- Efficacité des inspecteurs\n- Années moyennes de propriété\n\n**Impact:** Prédiction proactive des risques, réduction des délais, transparence accrue pour le public.", highlights: ["300,000+ inspections analysées", "Prédiction proactive des risques sanitaires", "KPIs temps réel pour inspecteurs", "Solution pour 48M de personnes concernées"] },
      healthyLiving: { nm: "Healthy Living — Plateforme Santé Prédictive", dc: "Application web Django intégrant l'IA pour centraliser les données patients, prédire les risques de réadmission et automatiser la priorisation des urgences.", desc_long: "Une solution numérique complète pour les hôpitaux face aux défis de gestion des données patients et de priorisation des urgences.\n\n**Problèmes résolus:**\n- 📊 Gestion inefficace des données patients\n- 🚑 Difficulté à prioriser les urgences\n- 📝 Charge administrative excessive\n- 🤝 Coordination limitée entre services\n\n**Solution technique:**\n- 🔐 Authentification multi-rôles (admin, médecin, staff)\n- 📋 Gestion complète des patients et dossiers médicaux\n- 🤖 Système de rendez-vous avec priorisation IA\n- 💬 Chatbot patient 24/7 (Kommunicate)\n- 📈 Modèle prédictif de réadmission (NLP/Transformers)\n- 💰 Facturation automatisée\n- 📊 Tableaux de bord et rapports temps réel\n\n**Technologies:** Django, Python, SQLite, Transformers (Hugging Face), NLP, Kommunicate, Bootstrap, Figma\n\n**Impact:** -30% charge administrative, priorisation instantanée, meilleure coordination, support patient continu.", highlights: ["Priorisation IA des urgences", "Modèle prédictif NLP pour réadmission", "Chatbot patient 24/7 avec Kommunicate", "30% réduction charge administrative"] },
      adventureHub: { nm: "AdventureHub — Plateforme Sociale de Voyage", dc: "Plateforme sociale combinant networking voyageur et services touristiques, avec modules e-commerce, gestion d'événements et système de réclamations.", desc_long: "Une plateforme full-stack unifiant les mondes du partage social et de la réservation touristique pour créer une expérience utilisateur intégrée.\n\n**Modules principaux:**\n- 👥 **Gestion utilisateurs**: Profils différenciés (voyageurs/agences)\n- 🛒 **E-commerce**: Catalogue produits avec gestion de stock\n- 📅 **Événements**: Publication, recherche et inscription aux activités\n- 🎫 **Système de réclamations**: Ticketing pour support client\n- 📱 **Fil social**: Partage de posts et conseils voyage\n\n**Architecture technique:**\n- 🏗️ Architecture modulaire (séparation des préoccupations)\n- 🔌 Pattern Singleton pour optimisation BDD\n- 🌿 Multi-branches Git pour développement collaboratif\n\n**Technologies:** PHP OOP, MySQL (PDO), HTML5/CSS3, JavaScript, Git/GitHub", highlights: ["Architecture modulaire PHP OOP", "Pattern Singleton pour connexions BDD", "Double profil voyageurs/agences", "Workflow Git multi-branches"] },
      beautyCenterMgmt: { nm: "Beauty Center Management System — Application Desktop Professionnelle", dc: "Application desktop complète de 15,000+ lignes en C++/Qt pour la gestion de salons de beauté avec 7 modules intégrés.", desc_long: "Une solution desktop complète transformant la gestion des salons de beauté et centres de bien-être.\n\n**Les 7 modules:**\n- 👥 **Clients**: CRUD avec validation, photos, alertes anniversaire\n- 👩‍💼 **Employés**: Planning dynamique, matrice de compétences\n- 💆 **Services**: Catalogue, tarifs, tendances mensuelles\n- 📅 **Rendez-vous**: Calendrier interactif, détection conflits, export Google Calendar\n- 📦 **Stock**: Alertes seuil bas, valeur totale\n- 💎 **Loyauté**: Système Bronze/Silver/Gold, calcul points\n- 📊 **Dashboard**: Graphiques temps réel, export PDF\n\n**Innovations:**\n- 🔐 Simulation reconnaissance faciale avec animation caméra\n- 📅 Synchronisation Google Calendar via ICS\n- 📧 Notifications email automatiques\n- 👥 Interface double: Admin (accès complet) + Client (portail personnel)\n\n**Technologies:** C++17, Qt 5.9, SQLite, MVC, QSS, Git\n\n**Algorithmes clés:** Parsing dates multiples, détection conflits temps réel, calcul similarité, génération ICS, agrégation données temps réel", highlights: ["15,000+ lignes C++/Qt", "Architecture MVC", "Export Google Calendar (ICS)", "Interface double Admin/Client"] },
    },
  },
  bm: {
    dir: "ltr",
    nav: ["Mɔgɔ", "Fɛnw", "Baaraw", "Sɛbɛn"],
    available: "N bɛ sɔrɔ baara kɛcogo la",
    greeting: "I ni ce! 👋",
    heroTitle: (name) => <>Ne ye <span className="cn">{name}</span>,<br />IA Jɛginba<br /><span className="cr2">Latigɛla</span>.</>,
    heroSub: "Ne bɛ hakilitigiya sira fɛnw da ani ML kunnafoni kɛlɛnw. N bɛ sɔn bayɛlɛmani IA kɛ kɛrɛfɛ.",
    cta1: "N ka baaraw lajɛ", cta2: "N sɛbɛn",
    stats: [{ n: 15, s: "+", l: "Baaraw" }, { n: 5, s: "+", l: "Kan" }, { n: 3, s: "+", l: "San" }],
    aboutLabel: "— N bɛ mun kɛ",
    aboutTitle: <>Ɲɛtaa ni<br />Kunnafoni.</>,
    cards: [
      { t: "IA & ML Ɲɛtaa", d: "Ne bɛ ɲɛtaa kɛ ka deep learning jɛginbaw kura sɔrɔ, n ka miiri baara la kɔrɔbɔli, cogoyagɛlɛya ani sɛgɛsɛgɛli kan." },
      { t: "IA Dɛmɛ Baara", d: "Ne bɛ IA dɛmɛ sira daw da ani yɔrɔ kɛ minw bɛ dugu kɛlɛbaaw dɛmɛ u ka baaraw kɛ jɛ la." },
    ],
    toolsTitle: "N KA FƐNW NI BAARAKƐCOGO",
    projLabel: "03 — Baaraw",
    projTitle: <>N Ka<br />Baaraw.</>,
    projSeeAll: "Bɛɛ lajɛ →",
    projDetail: "Gafe",
    contactLabel: "— An ka baara kɛ",
    contactTitle: <>An ka<br />Kuma.</>,
    contactSub: "Ne bɛ sɔrɔ cogoya kura, baara kɛ wɛrɛw kumakan la wati bɛɛ.",
    socials: ["LinkedIn", "GitHub", "Twitter / X", "Gafe Sɔrɔ"],
    footerLeft: "© 2025 — I tɔgɔ",
    footerMid: "IA Jɛginba · Tunis",
    footerRight: "Dalen ni ♡ & ☕",
    modalOverview: "Lajɛli", modalDemo: "Yɛlɛ Live",
    modalAbout: "— Baara kan", modalKeys: "— Gɛlɛya kɔrɔw",
    modalStack: "— Fɛnw", modalMetrics: "— Jateminɛw",
    modalYear: "San", modalRole: "Baara", modalStatus: "Cogoya",
    modalCta: "▶ Live yɛlɛ", modalLoading: "Yɛlɛ bɛ sɔrɔ...", modalOpen: "↗ Yɛlɛ",
    projects: {
      santeConnect: { nm: "MƆGƆ LADON — AI Tɔgɔ Kulun Baara", dc: "Mɔgɔ ladon jɛginba bɛ AI kɛ, IoT ani sikiliso simu la, n bɛ Mɔgɔ Ladon Ministɛri kɛ kɔrɔ kan.", desc_long: "Mɔgɔ ladon yɛlɛ kunnafoni bɛ Mɔgɔ Ladon Ministɛri (Mali) ani ESPRIT kɛ kɔrɔ kan.\n\n**Baarakɛ mayala:**\n- ⌚ **Montre connectée**: ESP8266 jɛginba max30102 jateminɛ la (kɔrɔ dun + O₂)\n- 🤖 **Mɔgɔ Ladon AI**: ClinicalBERT, LLM mɔgɔ ladon jamana ani jateminɛ bukunu kan\n- 📄 **Mɔgɔ Ladon OCR**: Tasuma sira bukunu ani dɔw\n- 💬 **Mɔgɔ Ladon Kuma**: Chatbot baara kalanw ka jiri faamu kan\n- 📊 **Jateminɛ**: Dɔkitɛri ani mɔgɔ ladon baarakɛ\n\n**Fɛnw kunnafoni:**\n- Baara kɔrɔ: jateminɛ → buraya → AI → jateminɛ\n- Jɛginba minɛ mɔgɔ ladon jamana kan\n- AI jiri faamu baara mɔgɔ ladon la\n- Baara dɛnɛ tɔgɔ jateminɛ kumatɔ\n\n**Fɛnw:** ESP8266, MAX30102, FastAPI, ClinicalBERT, React, PPG-DaLiA", highlights: ["Mɔgɔ Ladon Ministɛri Baara + ESPRIT", "Jateminɛ → AI → Jateminɛ Pipeline", "Jɛginba Minɛ Mɔgɔ Ladon (ClinicalBERT)", "AI Jiri Faamu Dɔkitɛri Jamana kan"] },
      droneProject: { nm: "DRONE BAARA — Gara Sugurun Drone", dc: "Jɛginba Drone fɛnw bɛ Kɔ Ladɔ Ministɛri kɛ kɔrɔ kan, ESP32-CAM, YOLOv5 ani baara kalanw bɛ dɔw.", desc_long: "Jɛginba Drone yɛlɛ bɛ Kɔ Ladɔ Ministɛri kɛ kɔrɔ kan gara sugurun ani kɔ ka bukunu kan.\n\n**Jateminɛ kalenw:**\n- 🌱 Gara: Bɛ sugurun jamana ka kuma, kɔ kama jateminɛ bukunu\n- 🌦️ Kɔ ladɔ sira: Kɔ jamana jateminɛw\n- 🗺️ Kɔ ka bukunu: Baara kɔrɔ gara gara la\n\n**Fɛnw kalenw:**\n- ✈️ **Drone Quadricoptère**: Jɛginba kalan, moteurs brushless, GPS\n- 📸 **ESP32-CAM**: Gara jateminɛw takubakuba\n- 🤖 **AI dɔw jɔn**: YOLOv5 baarakɛ, OpenCV baara kan\n- 📡 **Sɛnɛ yala**: Gara jateminɛw kɔ sɔrɔ jateminɛ kanu kan\n\n**Baara kɔrɔ:**\nESP32-CAM → RF/WiFi → Ordinateur Sɔrɔ → YOLOv5\n\n**Mun kɔ ni?** ESP32 bɛ kunnafoni baarakɛ sɔ te, ka gara jateminɛw sɔrɔ jateminɛ kanu kan.", highlights: ["Kɔ Ladɔ Ministɛri Baara", "Edge Capture + Cloud Inference Architecture", "YOLOv5 Sugurun ani Kɔ Kama", "Baara Mali Gara Kunu kan"] },
      smartRecruitment: { nm: "Smart Recruitlent — Baara Kɛ Jɛginba Sikiliso", dc: "Baara kɛ jɛginba bɛ ACTIA kɛ kɔrɔ kan, NLP, jateminɛ jɔn ani jɛginba minɛ kɛ ka baara kɛ sikiliso jɔ gɔnin kan.", desc_long: "Baara kɛ jɛginba kɔrɔ bɛ ACTIA kɛ kɔrɛ kan, sikiliso bukunu baara ka danfo kɛ.\n\n**Baara mayala:**\n- 💬 **AI Chatbot**: Dɛnɛ tɔgɔ kuma LLaMA 3 la\n- 📄 **CV Parsing**: 5,554 CV sɛbɛn (3,258 PDF + 2,296 DOCX)\n- 🤝 **Matching**: BGE-M3 + LLaMA la kuma jiri\n- 📊 **Shortlisting**: LLaMA 3.1 scoring\n- 📧 **Kuma sɛnɛ**: AI kuma sɛnɛ\n- 🎥 **Video Interview**: Whisper + VGG19 + YOLOv8\n- 🔍 **AI Jiri Faamu**: LIME faamu kan\n\n**Fɛnw:** LLaMA 3, BGE-M3, YOLOv8, Whisper, VGG19, MediaPipe, CrewAI, Gradio\n\n**Baara:** -80% CV baara dɔnkili, baara jiri faamu", highlights: ["ACTIA kɛ Baara", "Kuma + Dɔ + Jateminɛ Pipeline", "5,554 CV Sɛbɛn", "AI Jiri Faamu LIME la"] },
      aspireHealth: { nm: "Aspire — Mɔgɔ Ladon Bukunu ML Platform", dc: "Jateminɛ bukunu fɛnw bɛ 300,000+ jateminɛ kɛ kɛ, mɔgɔ ladon jateminɛ bukunu ani kontrolu danfo kɛ.", desc_long: "ML baara bɛ Ameriki mɔgɔ ladon bukunu kɛ danfo kɛ, minɛ 48 miliyɔ ni mɔgɔ kɔnɔ baara kɛ sennen bɛɛ.\n\n**Jateminɛ:**\n- ❌ Baara kɛ jateminɛ bukunu jiri te\n- ❌ Jateminɛw sɛnɛ dɔ jɔ kɔrɔ\n- ❌ Jɛginba dɔ mɔgɔ kɔnɔ te\n- ❌ Baara jɔ na jateminɛ kɛ na\n\n**Jateminɛw:**\n- 📊 300,000+ mɔgɔ ladon bukunu\n- 📊 160,000+ gida sɛbɛn (LA Kɔ)\n- 📊 Mɔgɔ jateminɛw (mɔgɔ minɛ kɔ la, kɔnɔ)\n\n**ML Baara:**\n- 📈 **Regression**: Jateminɛ bukunu jamana\n- 🏷️ **Classification**: Jateminɛ gida bukunu\n- ⏱️ **Time Series**: Jateminɛ bukunu\n\n**KPIs:**\n- Mɔgɔ ladon bukunu gidaw la\n- Score gidaw la\n- Jateminɛ bukunu minɛ kɔ\n- Baara kɛ danfo\n- Gida jɔn sanw\n\n**Baara:** Jateminɛ bukunu danfo, baara dɔnkili, jɛginba dɔ mɔgɔ kɔnɔ.", highlights: ["300,000+ Jateminɛ Bukunu Sɛbɛn", "Jateminɛ Bukunu Danfo", "Dɛnɛ Tɔgɔ KPIs Baara Kɛ", "48M Mɔgɔ Ni Baara Kɛ"] },
      healthyLiving: { nm: "Healthy Living — Mɔgɔ Ladon Jamana Platform", dc: "Django sikiliso bɛ AI kɛ kɛ mɔgɔ jateminɛw danfo kɛ, jateminɔ jɔ jamana ani urujɛn danfo kɛ.", desc_long: "Sikiliso kɔrɔ dɔkitɛri gida minɛ mɔgɔ jateminɛ bukunu ani urujɛn danfo jamana kɛ.\n\n**Jateminɛ kalenw:**\n- 📊 Mɔgɔ jateminɛ bukunu danfo te\n- 🚑 Urujɛn danfo ko jira te\n- 📝 Baara kɛ jɔ tɛ\n- 🤝 Baara kɛ minɛ dan jɔ te\n\n**Baara sikiliso:**\n- 🔐 Baara kɛ authentication\n- 📋 Mɔgɔ jateminɛ danfo\n- 🤖 Karolow tɔgɔ AI la\n- 💬 Mɔgɔ Chatbot 24/7\n- 📈 Jateminɔ jɔ jamana baara\n- 💰 Kɔnɔ sɛnɛ dɛnɛ\n- 📊 Jateminɛ ani segin\n\n**Fɛnw:** Django, Python, SQLite, Transformers, NLP, Kommunicate, Bootstrap, Figma\n\n**Baara:** -30% baara kɛ jɔ, urujɛn danfo dɛnɛ tɔgɔ, baara kɛ minɛ dan kɔrɔ, mɔgɔ ladon ko dɛ.", highlights: ["Urujɛn Danfo AI la", "NLP Jateminɔ Jɔ Jamana", "24/7 Mɔgɔ Chatbot", "30% Baara kɛ Jɔ Dɔnkili"] },
      adventureHub: { nm: "AdventureHub — Dugu Danfo Sikiliso", dc: "Sikiliso bɛ dugu danfo mɔgɔ kuma ani turismu baara kɛ, e-commerce, karow gida ani jateminɛ sikiliso bɛ dɔw.", desc_long: "Sikiliso kɔrɔ bɛ dugu danfo kuma ani turismu baara kɛ joli kɛ.\n\n**Baara mayala:**\n- 👥 **Mɔgɔ Gida**: Danfo minɛ dan\n- 🛒 **E-commerce**: Baara jateminɛw ani stock\n- 📅 **Karo**: Karo sɛbɛn, laajɛ ani karo ja\n- 🎫 **Jateminɛ Sikiliso**: Ticketing\n- 📱 **Kuma Sikiliso**: Post sɛbɛn ani dugu goolli\n\n**Baara kɔrɔ:**\n- 🏗️ Baara sikiliso\n- 🔌 Singleton Pattern\n- 🌿 Git kɔ minɛ\n\n**Fɛnw:** PHP OOP, MySQL (PDO), HTML5/CSS3, JavaScript, Git/GitHub", highlights: ["Baara Sikiliso PHP OOP", "Singleton Pattern DB la", "Double Danfo Dugu/Turismu", "Git Kɔ Minɛ Danfo"] },
      beautyCenterMgmt: { nm: "Beauty Center Management System — Desktop Sikiliso Baara", dc: "Desktop sikiliso 15,000+ sinji bɛ C++/Qt la, gara kɔnɔ gida 7 baara bɛ dɔw.", desc_long: "Desktop sikiliso kɔrɔ bɛ gara kɔnɔ gida bukunu kɛ danfo kɛ.\n\n**Baara 7 minɛ:**\n- 👥 **Mɔgɔ**: CRUD validation, jateminɛw, jateminɛ kɔ\n- 👩‍💼 **Baara Kɛ**: Kalani, baara jamana\n- 💆 **Baara**: Jateminɛ, kɔnɔ, kalenw\n- 📅 **Karolow**: Kalani jɛginba, bukunu bukunu, Google Calendar\n- 📦 **Stock**: Jateminɛ bukunu, kɔnɔ gɔ\n- 💎 **Loyalité**: Bronze/Silver/Gold, pɔyini\n- 📊 **Jateminɛ**: Jateminɛw dɛnɛ tɔgɔ, PDF\n\n**Kunnafoni:**\n- 🔐 Facial recognition\n- 📅 Google Calendar\n- 📧 Email jateminɛ\n- 👥 Admin + Mɔgɔ danfo\n\n**Fɛnw:** C++17, Qt 5.9, SQLite, MVC, QSS, Git\n\n**Baara Gɔ:** Kalenw siyalɛ, bukunu bukunu dɛnɛ tɔgɔ, jiri jateminɛ, ICS jɔn, dɛnɛ tɔgɔ jateminɛ bukunu", highlights: ["15,000+ Sinji C++/Qt", "MVC Baara kɔrɔ", "Google Calendar (ICS)", "Admin + Mɔgɔ Danfo"] },
    },
  },
  ar: {
    dir: "rtl",
    nav: ["عني", "مهارات", "مشاريع", "تواصل"],
    available: "متاحة للمشاريع",
    greeting: "أهلاً وسهلاً! 👋",
    heroTitle: (name) => <>أنا <span className="cn">{name}</span>،<br />مهندسة في<br /><span className="cr2">الذكاء الاصطناعي</span>.</>,
    heroSub: "أبني أنظمة ذكية وخطوط أنابيب ML قوية. شغوفة بالبحث التطبيقي والذكاء الاصطناعي على نطاق واسع.",
    cta1: "عرض مشاريعي", cta2: "تواصل معي",
    stats: [{ n: 15, s: "+", l: "مشروع" }, { n: 5, s: "+", l: "لغة" }, { n: 3, s: "+", l: "سنوات" }],
    aboutLabel: "— ما أفعله",
    aboutTitle: <>بحث و<br />ابتكار.</>,
    cards: [
      { t: "بحث الذكاء الاصطناعي", d: "أطوّر وأنشر أبحاثاً حول نماذج التعلم العميق المبتكرة مع التركيز على الكفاءة والمتانة وقابلية التفسير." },
      { t: "حلول الذكاء الاصطناعي للأعمال", d: "أصمم وأنشر حلول ذكاء اصطناعي مخصصة تساعد الشركات على أتمتة عملياتها والبقاء تنافسيةً." },
    ],
    toolsTitle: "الأدوات التي أعمل بها",
    projLabel: "٠٣ — المشاريع",
    projTitle: <>أعمالي<br />ومشاريعي.</>,
    projSeeAll: "عرض الكل →",
    projDetail: "تفاصيل",
    contactLabel: "— لنتعاون",
    contactTitle: <>لنتحدث<br />عن مشروع.</>,
    contactSub: "أنا دائماً منفتحة على مناقشة الفرص الجديدة والتعاون أو مجرد التحدث عن الذكاء الاصطناعي.",
    socials: ["لينكدإن", "جيتهب", "تويتر / X", "تحميل السيرة الذاتية"],
    footerLeft: "© 2025 — اسمك",
    footerMid: "مهندسة ذكاء اصطناعي · تونس",
    footerRight: "صُنع بـ ♡ & ☕",
    modalOverview: "نظرة عامة", modalDemo: "عرض مباشر",
    modalAbout: "— عن المشروع", modalKeys: "— النقاط الرئيسية",
    modalStack: "— التقنيات", modalMetrics: "— المقاييس",
    modalYear: "السنة", modalRole: "الدور", modalStatus: "الحالة",
    modalCta: "▶ مشاهدة العرض", modalLoading: "جارٍ التحميل...", modalOpen: "↗ فتح",
    projects: {
      santeConnect: { nm: "الصحة المتصلة — نظام المراقبة بعد الاستشفاء بقيادة الذكاء الاصطناعي", dc: "نظام مراقبة ما بعد الاستشفاء يدمج الذكاء الاصطناعي وإنترنت الأشياء والمنصات الويب، تم تطويره مع وزارة الصحة.", desc_long: "نظام مراقبة عن بعد مبتكر تم تطويره بالتعاون مع وزارة الصحة (تونس) و ESPRIT.\n\n**المكونات الرئيسية:**\n- ⌚ **ساعة ذكية**: نموذج ESP8266 مع أجهزة استشعار MAX30102 (معدل ضربات القلب + SpO₂)\n- 🤖 **عملاء الذكاء الاصطناعي الطبي**: ClinicalBERT، LLM للتحليل السريري والكشف عن المخاطر\n- 📄 **OCR طبي**: استخراج وتنظيم الوصفات الطبية\n- 💬 **مساعد المريض**: روبوت دردشة لشرح العلاجات\n- 📊 **لوحات المعلومات**: واجهات الطبيب والمريض\n\n**الابتكارات التقنية:**\n- خط أنابيب كامل: المستشعر → التصفية → الذكاء الاصطناعي → لوحة المعلومات\n- وكلاء متعددون للاستدلال الطبي\n- الذكاء الاصطناعي القابل للتفسير في السياق الطبي\n- معالجة الإشارات الفسيولوجية في الوقت الفعلي\n\n**التقنيات:** ESP8266، MAX30102، FastAPI، ClinicalBERT، React، PPG-DaLiA", highlights: ["مشروع وزارة الصحة + ESPRIT", "خط أنابيب المستشعر → الذكاء الاصطناعي → لوحة المعلومات", "أنظمة طبية متعددة الوكلاء (ClinicalBERT)", "الذكاء الاصطناعي القابل للتفسير للقرارات السريرية"] },
      droneProject: { nm: "مشروع الطائن بدون طيار — طائرة بدون طيار لمراقبة الزراعة", dc: "نظام طائرة بدون طيار ذكي لمراقبة الزراعة تم تطويره مع الخدمة الأرصادية الجوية، يجمع بين ESP32-CAM و YOLOv5 والتحليل المدمج.", desc_long: "نظام طائرة بدون طيار مبتكر تم تطويره بشراكة مع الخدمة الأرصادية الجوية لمراقبة الزراعة والبيئة.\n\n**المشاكل التي تم حلها:**\n- 🌱 الزراعة: تقدير المحاصيل والكشف عن الإجهاد المائي\n- 🌦️ الأرصاد الزراعية: البيانات البيئية المحلية\n- 🗺️ مراقبة الأراضي: الإشراف على مساحات واسعة\n\n**المكونات التقنية:**\n- ✈️ **طائرة بدون طيار رباعية المحركات**: هيكل خفيف الوزن ومحركات بدون فرش و GPS\n- 📸 **ESP32-CAM**: التقط صور جوية عالية الدقة\n- 🤖 **الذكاء الاصطناعي المدمج**: YOLOv5 للكشف عن الأشياء و OpenCV للمعالجة\n- 📡 **الإرسال**: إرسال الصور الأرضية للاستدلال\n\n**الهندسة المعمارية:**\nESP32-CAM → إرسال RF/WiFi → الكمبيوتر الأرضي → استدلال YOLOv5\n\n**لماذا هذه الهندسة المعمارية؟** لا يستطيع ESP32 دعم نماذج التعلم العميق الثقيلة، لذا يتم نقل الصور إلى الأرض للمعالجة.", highlights: ["شراكة مع الخدمة الأرصادية الجوية", "هندسة معمارية التقاط الحافة + الاستدلال على السحابة", "YOLOv5 للكشف عن المحاصيل والإجهاد", "حل متكيف للمناطق الريفية"] },
      smartRecruitment: { nm: "Smart Recruitlent — نظام التوظيف الذكي", dc: "منصة توظيف بالذكاء الاصطناعي تم تطويرها مع ACTIA، تدمج معالجة اللغة الطبيعية ورؤية الحاسوب وتنسيق الوكلاء المتعددين لأتمتة عملية التوظيف بالكامل.", desc_long: "منصة توظيف شاملة تم تطويرها بشراكة مع ACTIA، حيث تحول الطريقة التي تحدد بها الشركات وتقيم وتتواصل مع المرشحين.\n\n**الوحدات الرئيسية:**\n- 💬 **روبوت الذكاء الاصطناعي**: التفاعل في الوقت الفعلي مع التضمينات الدلالية + LLaMA 3\n- 📄 **تحليل السيرة الذاتية**: معالجة 5,554 سيرة ذاتية (3,258 PDF + 2,296 DOCX)\n- 🤝 **المطابقة**: التشابه الدلالي مع BGE-M3 + LLaMA\n- 📊 **الاختيار المختصر**: التسجيل التلقائي مع LLaMA 3.1\n- 📧 **الاتصال**: رسائل بريد إلكتروني مخصصة يتم إنشاؤها بالذكاء الاصطناعي\n- 🎥 **المقابلة الافتراضية**: تحليل الصوت (Whisper) + الوجه (VGG19) + كشف الهاتف (YOLOv8)\n- 🔍 **الذكاء الاصطناعي القابل للتفسير**: LIME لشرح القرارات\n\n**التقنيات:** LLaMA 3، BGE-M3، YOLOv8، Whisper، VGG19، MediaPipe، CrewAI، Gradio\n\n**التأثير:** -80% من وقت فحص السيرة الذاتية، عملية موضوعية وشفافة", highlights: ["شراكة مع ACTIA", "خط أنابيب متعدد الأشكال نص + صوت + رؤية", "5,554 سيرة ذاتية تم تحليلها تلقائياً", "الذكاء الاصطناعي القابل للتفسير مع LIME"] },
      aspireHealth: { nm: "Aspire — منصة التفتيش الصحي ML", dc: "منصة تحليل تنبؤية للتفتيش الصحي باستخدام 300,000+ سجل للتنبؤ بالمخاطر وتحديد أولويات الفحوصات.", desc_long: "حل ML تم تطويره لتحويل الفحوصات الصحية في الولايات المتحدة، حيث يتأثر 48 مليون شخص سنوياً بالأمراض المنقولة بالغذاء.\n\n**المشكلة:**\n- ❌ الذاتية في درجات الفحص\n- ❌ البيانات المنشورة بتأخير أسابيع\n- ❌ نقص الشفافية للجمهور\n- ❌ نهج استجابي (بعد المشاكل)\n\n**البيانات:**\n- 📊 300,000+ سجل فحص\n- 📊 160,000+ منشأة تم تحليلها (مقاطعة LA)\n- 📊 البيانات الديموغرافية (كثافة السكان، الدخل)\n\n**نماذج ML المنشورة:**\n- 📈 **الانحدار**: التنبؤ بشدة المخالفات\n- 🏷️ **التصنيف**: تحديد المنشآت المعرضة للخطر\n- ⏱️ **السلاسل الزمنية**: التنبؤ باتجاهات الفحص\n\n**مؤشرات الأداء الرئيسية:**\n- متوسط الفحوصات لكل منشأة\n- متوسط الدرجة لكل منشأة\n- تكرار المخالفات الشديدة\n- كفاءة المفتشين\n- متوسط سنوات الملكية\n\n**التأثير:** التنبؤ الاستباقي بالمخاطر، تقليل التأخيرات، شفافية أكبر للجمهور.", highlights: ["300,000+ فحص تم تحليله", "التنبؤ الاستباقي بمخاطر الصحة", "مؤشرات الأداء الرئيسية في الوقت الفعلي للمفتشين", "حل لـ 48 مليون شخص متأثر"] },
      healthyLiving: { nm: "Healthy Living — منصة الصحة التنبؤية", dc: "تطبيق ويب Django يدمج الذكاء الاصطناعي لمركزة بيانات المريض والتنبؤ بمخاطر إعادة الدخول وأتمتة تحديد أولويات حالات الطوارئ.", desc_long: "حل رقمي شامل للمستشفيات التي تواجه تحديات في إدارة بيانات المريض وتحديد أولويات حالات الطوارئ.\n\n**المشاكل التي تم حلها:**\n- 📊 إدارة غير فعالة لبيانات المريض\n- 🚑 صعوبة تحديد أولويات حالات الطوارئ\n- 📝 عبء إداري مفرط\n- 🤝 تنسيق محدود بين الإدارات\n\n**الحل التقني:**\n- 🔐 المصادقة متعددة الأدوار (مسؤول، طبيب، موظف)\n- 📋 إدارة كاملة للمريض والملفات الطبية\n- 🤖 نظام المواعيد مع أولويات الذكاء الاصطناعي\n- 💬 روبوت الدردشة 24/7 للمريض (Kommunicate)\n- 📈 نموذج التنبؤ بإعادة الدخول (NLP/Transformers)\n- 💰 الفواتير المأتمتة\n- 📊 لوحات المعلومات والتقارير في الوقت الفعلي\n\n**التقنيات:** Django، Python، SQLite، Transformers (Hugging Face)، NLP، Kommunicate، Bootstrap، Figma\n\n**التأثير:** -30% عبء إداري، تحديد أولويات فوري، تنسيق أفضل، دعم مريض مستمر.", highlights: ["أولويات حالات الطوارئ بالذكاء الاصطناعي", "نموذج التنبؤ بإعادة الدخول NLP", "روبوت دردشة المريض 24/7 (Kommunicate)", "تقليل 30% من العبء الإداري"] },
      adventureHub: { nm: "AdventureHub — منصة السفر الاجتماعية", dc: "منصة اجتماعية تجمع بين الشبكات الاجتماعية للسفر والخدمات السياحية، مع وحدات التجارة الإلكترونية وإدارة الأحداث ونظام الشكاوى.", desc_long: "منصة شاملة تجمع عوالم المشاركة الاجتماعية وحجوزات السياحة لإنشاء تجربة مستخدم متكاملة.\n\n**الوحدات الرئيسية:**\n- 👥 **إدارة المستخدمين**: ملفات المستخدمين المختلفة (المسافرون/الوكالات)\n- 🛒 **التجارة الإلكترونية**: كتالوج المنتجات مع إدارة المخزون\n- 📅 **الأحداث**: نشر البحث والتسجيل في الأنشطة\n- 🎫 **نظام الشكاوى**: نظام التذاكر لدعم العملاء\n- 📱 **خلاصة الأخبار الاجتماعية**: مشاركة المنشورات ونصائح السفر\n\n**الهندسة المعمارية التقنية:**\n- 🏗️ هندسة معمارية معيارية (فصل الاهتمامات)\n- 🔌 نمط Singleton لتحسين قاعدة البيانات\n- 🌿 متعدد الفروع Git للتطوير التعاوني\n\n**التقنيات:** PHP OOP، MySQL (PDO)، HTML5/CSS3، JavaScript، Git/GitHub", highlights: ["هندسة معمارية معيارية PHP OOP", "نمط Singleton لاتصالات قاعدة البيانات", "ملف تعريف مزدوج المسافرون/الوكالات", "سير عمل Git متعدد الفروع"] },
      beautyCenterMgmt: { nm: "Beauty Center Management System — تطبيق سطح المكتب المحترف", dc: "تطبيق سطح المكتب الكامل بأكثر من 15,000 سطر في C++/Qt لإدارة صالونات التجميل مع 7 وحدات مدمجة.", desc_long: "حل سطح مكتب شامل يحول إدارة صالونات التجميل ومراكز العافية.\n\n**الوحدات السبع:**\n- 👥 **العملاء**: CRUD مع التحقق والصور وتنبيهات أعياد الميلاد\n- 👩‍💼 **الموظفون**: الجدولة الديناميكية ومصفوفة المهارات\n- 💆 **الخدمات**: الكتالوج والأسعار والاتجاهات الشهرية\n- 📅 **المواعيد**: التقويم التفاعلي واكتشاف التضارب وتصدير Google Calendar\n- 📦 **المخزون**: تنبيهات الحد الأدنى والقيمة الإجمالية\n- 💎 **الولاء**: نظام برونز/فضي/ذهبي وحساب النقاط\n- 📊 **لوحة المعلومات**: الرسوم البيانية في الوقت الفعلي وتصدير PDF\n\n**الابتكارات:**\n- 🔐 محاكاة التعرف على الوجه مع رسم متحرك للكاميرا\n- 📅 مزامنة Google Calendar عبر ICS\n- 📧 إشعارات البريد الإلكتروني التلقائية\n- 👥 واجهة مزدوجة: المسؤول (وصول كامل) + العميل (بوابة شخصية)\n\n**التقنيات:** C++17، Qt 5.9، SQLite، MVC، QSS، Git\n\n**الخوارزميات الرئيسية:** تحليل التواريخ المتعددة واكتشاف التضارب في الوقت الفعلي وحساب التشابه وإنشاء ICS وتجميع البيانات في الوقت الفعلي", highlights: ["15,000+ سطر C++/Qt", "هندسة معمارية MVC", "تصدير Google Calendar (ICS)", "واجهة مزدوجة المسؤول/العميل"] },
    },
  },
};

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "bm", label: "BM", flag: "🇲🇱" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
];

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Syne',sans-serif;transition:background .4s,color .4s;overflow-x:hidden}
    .dark{--bg:#060d1f;--bg2:#0b1530;--sf:rgba(255,255,255,.04);--sf2:rgba(255,255,255,.08);--bd:rgba(255,255,255,.08);--tx:#f0eeff;--tm:rgba(240,238,255,.45);--nb:#1e3a8a;--nb2:#60a5fa;--rs:#f9a8d4;--rd:#ec4899;--nvbg:rgba(6,13,31,.85);--cglow:rgba(59,130,246,.15);background:#060d1f;color:#f0eeff}
    .light{--bg:#f4f1ff;--bg2:#ebe5ff;--sf:rgba(30,58,138,.04);--sf2:rgba(30,58,138,.09);--bd:rgba(30,58,138,.12);--tx:#0d0a2e;--tm:rgba(13,10,46,.5);--nb:#1e3a8a;--nb2:#2563eb;--rs:#ec4899;--rd:#be185d;--nvbg:rgba(244,241,255,.88);--cglow:rgba(37,99,235,.1);background:#f4f1ff;color:#0d0a2e}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--rs);border-radius:10px}
    .cc{width:11px;height:11px;background:var(--rs);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%)}
    .cr{width:34px;height:34px;border:1.5px solid var(--rs);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);opacity:.45;transition:width .25s,height .25s,opacity .25s}
    .rx{width:52px!important;height:52px!important;opacity:.22!important}
    .nav{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:var(--nvbg);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border:1px solid var(--bd);border-radius:50px;padding:8px 16px 8px 10px;display:flex;align-items:center;gap:18px;width:min(820px,92vw);z-index:1000;box-shadow:0 8px 30px rgba(0,0,0,.18);transition:background .4s,border .4s}
    .lc{width:40px;height:40px;flex-shrink:0;border-radius:50%;background:linear-gradient(135deg,var(--nb),var(--rd));display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue';font-size:14px;color:white;letter-spacing:1px}
    .nl{display:flex;gap:20px;list-style:none;flex:1}
    .nl a{color:var(--tm);text-decoration:none;font-size:10.5px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;font-family:'DM Mono';transition:color .2s}
    .nl a:hover{color:var(--rs)}
    .tb{margin-left:auto;width:40px;height:40px;border-radius:50%;border:1.5px solid var(--bd);background:var(--sf2);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;transition:all .2s}
    .tb:hover{border-color:var(--rs);transform:rotate(22deg)}
    .hero{min-height:100vh;background:var(--bg);position:relative;display:flex;align-items:center;padding:120px 6vw 60px;overflow:hidden}
    .orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
    .o1{width:550px;height:550px;top:-120px;right:-80px;background:radial-gradient(circle,rgba(30,58,138,.4) 0%,transparent 70%);animation:flt 8s ease-in-out infinite}
    .o2{width:420px;height:420px;bottom:-60px;left:3%;background:radial-gradient(circle,rgba(236,72,153,.22) 0%,transparent 70%);animation:flt 11s ease-in-out infinite reverse}
    @keyframes flt{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-28px) scale(1.04)}}
    .hg{display:grid;grid-template-columns:1fr 320px;gap:50px;align-items:center;width:100%;max-width:1100px;margin:0 auto;position:relative;z-index:1}
    .hbdg{display:inline-flex;align-items:center;gap:8px;background:var(--sf2);border:1px solid var(--bd);border-radius:30px;padding:6px 14px;font-size:10px;letter-spacing:2px;color:var(--rs);font-family:'DM Mono';margin-bottom:18px;text-transform:uppercase}
    .pd{width:7px;height:7px;background:var(--rs);border-radius:50%;animation:plsd 2s ease-in-out infinite}
    @keyframes plsd{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}
    .ht{font-family:'Bebas Neue';font-size:clamp(52px,7vw,94px);line-height:.92;color:var(--tx);margin-bottom:4px}
    .cn{display:inline-block;border-radius:10px;padding:0 16px 4px;vertical-align:middle;position:relative;top:-4px;background:var(--nb);color:#fff}
    .cr2{display:inline-block;border-radius:10px;padding:0 16px 4px;vertical-align:middle;position:relative;top:-4px;border:3px solid var(--rd);color:var(--rd)}
    .dark .cr2{border-color:var(--rs);color:var(--rs)}
    .hs{font-size:13px;color:var(--tm);line-height:1.9;max-width:460px;font-family:'DM Mono';margin:20px 0 30px}
    .ctas{display:flex;gap:12px;flex-wrap:wrap}
    .bp{background:linear-gradient(135deg,var(--nb),var(--rd));color:#fff;border:none;padding:13px 26px;border-radius:8px;font-family:'DM Mono';font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;text-decoration:none;transition:transform .2s,box-shadow .2s;display:inline-block}
    .bp:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(236,72,153,.32)}
    .bg2{background:transparent;color:var(--tx);border:1.5px solid var(--bd);padding:13px 26px;border-radius:8px;font-family:'DM Mono';font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;text-decoration:none;transition:border-color .2s,color .2s;display:inline-block}
    .bg2:hover{border-color:var(--rs);color:var(--rs)}
    .hst{display:flex;gap:30px;margin-top:42px}
    .sn{font-family:'Bebas Neue';font-size:36px;line-height:1;background:linear-gradient(135deg,var(--nb2),var(--rs));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .sl{font-family:'DM Mono';font-size:9px;letter-spacing:2px;color:var(--tm);margin-top:3px;text-transform:uppercase}
    .pf{width:290px;height:370px;border-radius:20px 20px 0 0;background:linear-gradient(160deg,#112060,#0d1f50 40%,#1a0845);border:1px solid var(--bd);position:relative;overflow:hidden;box-shadow:0 28px 56px rgba(0,0,0,.35)}
    .pp{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:rgba(255,255,255,.3);font-family:'DM Mono';font-size:9px;letter-spacing:2px}
    .pp img{width:100%;height:100%;object-fit:cover;object-position:center top;position:absolute;inset:0}
    .pe{font-size:68px;position:relative;z-index:1}
    .pg{position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);width:180px;height:36px;background:var(--nb);filter:blur(28px);border-radius:50%}
    .pb{position:absolute;bottom:24px;right:-14px;background:var(--rd);color:white;padding:9px 14px;border-radius:10px;font-size:10px;font-family:'DM Mono';letter-spacing:1px;box-shadow:0 8px 22px rgba(236,72,153,.4);animation:bflt 3s ease-in-out infinite}
    @keyframes bflt{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    .mq{background:linear-gradient(90deg,#0f1e5a,#1a0a4a,#0f1e5a);padding:12px 0;overflow:hidden;white-space:nowrap}
    .light .mq{background:linear-gradient(90deg,var(--nb),#2d1b8a,var(--nb))}
    .mqt{display:inline-flex;animation:msc 22s linear infinite}
    @keyframes msc{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .mi{font-family:'Bebas Neue';font-size:15px;letter-spacing:4px;color:rgba(255,255,255,.65);padding:0 22px}
    .ms{color:var(--rs);padding:0 6px;font-size:13px}
    .abs{padding:90px 6vw;background:var(--bg2);position:relative;overflow:hidden}
    .abs::before{content:'ABOUT';position:absolute;top:20px;left:4vw;font-family:'Bebas Neue';font-size:clamp(80px,16vw,200px);color:var(--sf2);letter-spacing:12px;pointer-events:none;white-space:nowrap}
    .si{max-width:1100px;margin:0 auto;position:relative;z-index:1}
    .slbl{font-family:'DM Mono';font-size:10px;letter-spacing:3px;color:var(--rs);text-transform:uppercase;margin-bottom:12px}
    .sh{font-family:'Bebas Neue';font-size:clamp(36px,5vw,66px);color:var(--tx);line-height:.93;margin-bottom:46px}
    .cr3{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:18px}
    .ac{border-radius:20px;overflow:hidden;border:1px solid var(--bd);position:relative;cursor:pointer;transition:transform .3s,box-shadow .3s;min-height:270px}
    .ac:hover{transform:translateY(-7px);box-shadow:0 24px 56px var(--cglow)}
    .acbg{position:absolute;inset:0}
    .g1{background:linear-gradient(140deg,#0e2060,#180950 60%,#0b1440)}
    .g2{background:linear-gradient(140deg,#3a0820,#180950 60%,#080e38)}
    .light .g1{background:linear-gradient(140deg,#dbeafe,#ede9fe)}
    .light .g2{background:linear-gradient(140deg,#fce7f3,#ede9fe)}
    .acb{padding:30px;position:relative;z-index:2;height:100%;display:flex;flex-direction:column}
    .acp{position:absolute;top:18px;right:18px;font-size:22px;color:var(--bd)}
    .aci{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px}
    .i1{background:rgba(59,130,246,.18)}.i2{background:rgba(236,72,153,.16)}
    .light .i1{background:rgba(37,99,235,.1)}.light .i2{background:rgba(190,24,93,.09)}
    .act{font-family:'Syne';font-size:17px;font-weight:800;color:var(--tx);margin-bottom:10px}
    .light .act{color:#0d0a2e}
    .acd{font-family:'DM Mono';font-size:11.5px;color:var(--tm);line-height:1.8;flex:1}
    .acft{display:flex;gap:6px;margin-top:20px;flex-wrap:wrap}
    .apl{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);font-family:'DM Mono';font-size:9px;padding:3px 9px;border-radius:20px}
    .light .apl{background:rgba(30,58,138,.07);border-color:rgba(30,58,138,.12);color:rgba(13,10,46,.5)}
    .led{position:relative;height:190px;overflow:hidden}
    .lbg{position:absolute;inset:0;background:linear-gradient(135deg,#7a1e00,#c03500 35%,#ff5f1a 65%,#ffb040)}
    .ldts{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.2) 1px,transparent 1px);background-size:13px 13px}
    .lov{position:absolute;inset:0;background:rgba(0,0,0,.15)}
    .lct{position:absolute;inset:0;display:flex;align-items:center;padding:0 5vw}
    .lt{font-family:'Bebas Neue';font-size:clamp(48px,9vw,118px);color:rgba(255,255,255,.9);letter-spacing:10px;text-shadow:0 0 30px rgba(255,180,80,.6),0 0 60px rgba(255,120,30,.3);animation:ldp 3s ease-in-out infinite;white-space:nowrap}
    @keyframes ldp{0%,100%{text-shadow:0 0 20px rgba(255,180,80,.5),0 0 50px rgba(255,100,20,.2)}50%{text-shadow:0 0 40px rgba(255,210,100,.9),0 0 80px rgba(255,140,40,.5)}}
    .ts{position:relative;padding:80px 6vw 60px;overflow:hidden;min-height:780px}
    .tbg{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(6,13,31,.78),rgba(11,21,48,.9)),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23181008'/%3E%3Crect x='40' y='40' width='520' height='320' rx='12' fill='%23100c04' opacity='0.7'/%3E%3Crect x='80' y='80' width='180' height='220' rx='6' fill='%230c0804' opacity='0.5'/%3E%3C/svg%3E");background-size:cover;background-position:center}
    .light .tbg{background:linear-gradient(to bottom,rgba(244,241,255,.9),rgba(235,229,255,.94))}
    .tt{font-family:'Bebas Neue';font-size:clamp(24px,4vw,44px);letter-spacing:6px;text-align:center;color:var(--tx);margin-bottom:48px;position:relative;z-index:1}
    .tg{display:flex;flex-wrap:wrap;gap:15px;justify-content:center;max-width:760px;margin:0 auto;position:relative;z-index:1}
    .to{width:74px;height:74px;border-radius:50%;background:rgba(255,255,255,.93);display:flex;align-items:center;justify-content:center;font-size:25px;transition:transform .25s,box-shadow .25s;cursor:pointer;position:relative}
    .light .to{background:white;box-shadow:0 2px 12px rgba(30,58,138,.1)}
    .to:nth-child(even){margin-top:18px}
    .to:hover{transform:scale(1.13) translateY(-4px);box-shadow:0 16px 34px rgba(0,0,0,.32)}
    .tti{position:absolute;bottom:-24px;font-size:8px;letter-spacing:1px;color:var(--tm);white-space:nowrap;font-family:'DM Mono';text-transform:uppercase;opacity:0;transition:opacity .2s}
    .to:hover .tti{opacity:1}
    .ps{padding:90px 6vw;background:var(--bg)}
    .ph{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:42px;max-width:1100px;margin-left:auto;margin-right:auto}
    .pg2{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:17px;max-width:1100px;margin:0 auto}
    .pc{background:var(--sf);border:1px solid var(--bd);border-radius:18px;padding:26px;transition:all .25s;cursor:pointer;position:relative;overflow:hidden}
    .pc::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--nb2),var(--rd));transform:scaleX(0);transform-origin:left;transition:transform .35s}
    .pc:hover::after{transform:scaleX(1)}
    .pc:hover{transform:translateY(-5px);border-color:rgba(59,130,246,.22)}
    .pt{display:inline-block;font-family:'DM Mono';font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;border-radius:4px;margin-bottom:13px}
    .tb2{background:rgba(59,130,246,.11);color:var(--nb2)}
    .tr{background:rgba(236,72,153,.1);color:var(--rd)}
    .dark .tr{color:var(--rs)}
    .tm2{background:rgba(139,92,246,.11);color:#a78bfa}
    .pn{font-family:'Syne';font-size:19px;font-weight:800;color:var(--tx);margin-bottom:8px}
    .pd2{font-family:'DM Mono';font-size:11px;color:var(--tm);line-height:1.8}
    .pft{display:flex;gap:6px;flex-wrap:wrap;margin-top:18px}
    .ptc{background:var(--sf2);color:var(--tm);font-size:9px;font-family:'DM Mono';padding:3px 9px;border-radius:20px;letter-spacing:1px}
    .cs{padding:90px 6vw;background:var(--bg2);position:relative;overflow:hidden}
    .cs::before{content:'';position:absolute;top:-180px;left:50%;transform:translateX(-50%);width:650px;height:650px;background:radial-gradient(circle,rgba(236,72,153,.07),transparent 70%);pointer-events:none}
    .cg{max-width:940px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;position:relative;z-index:1}
    .ctit{font-family:'Bebas Neue';font-size:clamp(46px,7vw,96px);line-height:.9;color:var(--tx);margin-bottom:18px}
    .csu{font-family:'DM Mono';font-size:12px;color:var(--tm);line-height:1.8;margin-bottom:26px}
    .cem{font-family:'Syne';font-size:14px;font-weight:700;color:var(--nb2);text-decoration:none;border-bottom:1px solid var(--nb2);padding-bottom:2px;transition:color .2s,border-color .2s}
    .cem:hover{color:var(--rs);border-color:var(--rs)}
    .sr{display:flex;gap:9px;flex-wrap:wrap;margin-top:22px}
    .sa{border:1px solid var(--bd);color:var(--tm);padding:8px 16px;border-radius:8px;font-family:'DM Mono';font-size:9.5px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;transition:all .2s}
    .sa:hover{border-color:var(--rs);color:var(--rs)}
    .cpw{border-radius:20px;overflow:hidden;height:360px;background:linear-gradient(160deg,#112060,#1a0845);border:1px solid var(--bd);position:relative;display:flex;align-items:center;justify-content:center;font-size:72px}
    .cpw img{width:100%;height:100%;object-fit:cover;object-position:center top;position:absolute;inset:0;z-index:0}
    .cpw-emoji{position:relative;z-index:1}
    .cpov{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,20,60,.75) 0%,transparent 55%);z-index:1}
    /* contact animations */
    .cs{padding:90px 6vw;background:var(--bg2);position:relative;overflow:hidden}
    .cring{position:absolute;border-radius:50%;border:1px solid;pointer-events:none;animation:ringPulse 4s ease-in-out infinite}
    @keyframes ringPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.15}50%{transform:translate(-50%,-50%) scale(1.06);opacity:.28}}
    .cfloat{position:absolute;pointer-events:none;font-size:18px;animation:cflt 6s ease-in-out infinite}
    @keyframes cflt{0%,100%{transform:translateY(0) rotate(0deg);opacity:.35}50%{transform:translateY(-18px) rotate(8deg);opacity:.65}}
    /* lang selector */
    .lsel{position:relative;display:flex;align-items:center}
    .lsel-btn{display:flex;align-items:center;gap:5px;background:var(--sf2);border:1px solid var(--bd);border-radius:20px;padding:5px 10px;cursor:pointer;font-family:'DM Mono';font-size:9px;letter-spacing:1.5px;color:var(--tm);transition:all .2s}
    .lsel-btn:hover{border-color:var(--rs);color:var(--rs)}
    .lsel-drop{position:absolute;top:calc(100% + 8px);right:0;background:var(--nvbg);backdrop-filter:blur(20px);border:1px solid var(--bd);border-radius:12px;padding:6px;display:flex;flex-direction:column;gap:3px;z-index:200;min-width:110px;box-shadow:0 12px 40px rgba(0,0,0,.3)}
    .lsel-item{display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:8px;cursor:pointer;font-family:'DM Mono';font-size:10px;letter-spacing:1px;color:var(--tm);transition:background .15s,color .15s}
    .lsel-item:hover,.lsel-item.active{background:var(--sf2);color:var(--rs)}
    /* RTL support */
    .rtl{direction:rtl}
    .rtl .nl{flex-direction:row-reverse}
    .rtl .hg{direction:rtl}
    .rtl .cg{direction:rtl}
    footer{padding:20px 6vw;background:var(--bg);border-top:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;font-family:'DM Mono';font-size:10px;letter-spacing:1.5px;color:var(--tm)}
    .rv{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease}
    .rv.in{opacity:1;transform:translateY(0)}
    @media(max-width:768px){.hg{grid-template-columns:1fr}.cg{grid-template-columns:1fr}.ph{flex-direction:column;align-items:flex-start;gap:14px}footer{flex-direction:column;gap:6px;text-align:center}}
  `}</style>
);

const TLS = [
  // IA & ML
  { e: "🐍", l: "Python" },
  { e: "🔥", l: "PyTorch" },
  { e: "🧠", l: "TensorFlow" },
  { e: "🤗", l: "HuggingFace" },
  { e: "👁️", l: "OpenCV" },
  { e: "🎯", l: "YOLO" },
  { e: "🤖", l: "CrewAI" },
  
  // Dev & Backend
  { e: "⚡", l: "FastAPI" },
  { e: "🌐", l: "React" },
  { e: "🖥️", l: "C++" },
  { e: "🏗️", l: "Qt" },
  { e: "📱", l: "ESP8266" },
  { e: "🌐", l: "Django" },
  
  // Data & Tools
  { e: "📊", l: "Pandas" },
  { e: "🗄️", l: "SQLite" },
  { e: "📓", l: "Jupyter" },
  { e: "📊", l: "BI" },
  { e: "🐳", l: "Docker" },
  { e: "☁️", l: "AWS" },
  { e: "🔀", l: "Git" },
  { e: "🔬", l: "Sklearn" },
];
function OrbitalTools({ ho, hl }) {
  const rings = [
    { r: 110, speed: 28, items: TLS.slice(0, 6) },
    { r: 200, speed: 45, items: TLS.slice(6, 14) },
    { r: 295, speed: 65, items: TLS.slice(14, 24) },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: 680, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
      {/* Centre */}
      <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,var(--nb),var(--rd))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, zIndex: 10, boxShadow: "0 0 30px rgba(236,72,153,0.4)" }}>🤖</div>
      {rings.map((ring, ri) => (
        <div key={ri} style={{
          position: "absolute",
          width: ring.r * 2, height: ring.r * 2,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.07)",
          animation: `orbit${ri} ${ring.speed}s linear infinite`,
        }}>
          <style>{`
            @keyframes orbit${ri}{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          `}</style>
          {ring.items.map((t, i) => {
            const angle = (360 / ring.items.length) * i;
            const rad = angle * Math.PI / 180;
            const x = ring.r + ring.r * Math.cos(rad) - 37;
            const y = ring.r + ring.r * Math.sin(rad) - 37;
            return (
              <div key={i} onMouseEnter={ho} onMouseLeave={hl} title={t.l} style={{
                position: "absolute", left: x, top: y,
                width: 74, height: 74, borderRadius: "50%",
                background: "rgba(255,255,255,0.93)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, cursor: "pointer",
                animation: `counter${ri} ${ring.speed}s linear infinite`,
                transition: "transform .2s,box-shadow .2s",
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "scale(1.18)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(236,72,153,0.4)" }}
                onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)" }}
              >
                <style>{`@keyframes counter${ri}{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}`}</style>
                {t.e}
                <span style={{ position: "absolute", bottom: -22, fontSize: 8, letterSpacing: 1, color: "var(--tm)", whiteSpace: "nowrap", fontFamily: "'DM Mono'", textTransform: "uppercase" }}>{t.l}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
const PRJ = [
  {
    id: "santeConnect",
    tp: "tb2", // Style existant
    lb: "Health Tech", // Label court
    nm: "SANTÉ CONNECT — AI-Driven Post-Hospitalization Monitoring",
    dc: "Système de monitoring post-hospitalisation intégrant IA, IoT et plateformes web, développé avec le Ministère de la Santé.",
    desc_long: `Un système de télésurveillance innovant développé en collaboration avec le Ministère de la Santé (Tunisie) et l'ESPRIT.

**Composants clés :**
- ⌚ **Montre connectée** : Prototype ESP8266 avec capteurs MAX30102 (rythme cardiaque + SpO₂)
- 🤖 **Agents IA médicaux** : ClinicalBERT, LLM pour analyse clinique et détection de risques
- 📄 **OCR médical** : Extraction et structuration des prescriptions
- 💬 **Assistant patient** : Chatbot pour expliquer les traitements
- 📊 **Dashboards** : Interfaces médecin et patient

**Innovations techniques :**
- Pipeline complet : capteur → filtrage → IA → dashboard
- Multi-agents pour raisonnement médical
- IA explicable en contexte médical
- Traitement temps-réel des signaux physiologiques

**Technologies :** ESP8266, MAX30102, FastAPI, ClinicalBERT, React, PPG-DaLiA`,
    tg: ["ESP8266", "FastAPI", "ClinicalBERT", "IoT", "React"],
    year: "2025",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "Composants IA", v: "5+" },
      { k: "Capteurs", v: "3" },
      { k: "Patients", v: "50+" },
      { k: "Précision", v: "94%" }
    ],
    demo: "https://youtu.be/MJYDYnQYUc0", // À remplacer par ta vidéo
    color: "#60a5fa", // Bleu médical
    emoji: "🏥",
    highlights: [
      "Projet Ministère de la Santé + ESPRIT",
      "Pipeline capteur → IA → dashboard",
      "Multi-agents médicaux (ClinicalBERT)",
      "IA explicable pour décisions cliniques"
    ],
  },
  {
    id: "droneProject",
    tp: "tr", // Style existant (rouge/rose comme détection anomalie)
    lb: "Computer Vision",
    nm: "DRONE PROJECT — Agricultural Monitoring Drone",
    dc: "Système de drone intelligent pour surveillance agricole développé avec le Service Météorologique, combinant ESP32-CAM, YOLOv5 et analyse embarquée.",
    desc_long: `Un système de drone innovant développé en partenariat avec le Service Météorologique pour la surveillance agricole et environnementale.

**Problèmes résolus :**
- 🌱 Agriculture : Estimation des cultures, détection stress hydrique
- 🌦️ Agrométéorologie : Données environnementales localisées
- 🗺️ Monitoring territorial : Supervision de grandes surfaces

**Composants techniques :**
- ✈️ **Drone quadricoptère** : Structure légère, moteurs brushless, GPS
- 📸 **ESP32-CAM** : Capture d'images aériennes haute résolution
- 🤖 **IA embarquée** : YOLOv5 pour détection d'objets, OpenCV pour traitement
- 📡 **Transmission** : Envoi des images au sol pour inférence

**Architecture :**
ESP32-CAM → Transmission RF/WiFi → Ordinateur sol → Inférence YOLOv5

**Pourquoi cette architecture ?** L'ESP32 ne peut pas supporter des modèles deep learning lourds, donc les images sont transmises au sol pour traitement.`,
    tg: ["ESP32-CAM", "YOLOv5", "OpenCV", "Python", "IoT", "Drone"],
    year: "2025",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "Composants hardware", v: "5+" },
      { k: "Tech IA/vision", v: "2" },
      { k: "Portée", v: "1km" },
      { k: "Autonomie", v: "25min" }
    ],
    demo: "https://youtu.be/bvIQ6ZaHMio", // À remplacer par ta vidéo YouTube
    color: "#10b981", // Rose comme l'exemple
    emoji: "✈️",
    highlights: [
      "Partenariat Service Météorologique",
      "Architecture edge capture + cloud inference",
      "YOLOv5 pour détection cultures et stress",
      "Solution adaptée aux régions rurales"
    ],
  },
  {
    id: "smartRecruitment",
    tp: "tm2", // Style existant (violet comme MLOps)
    lb: "Recruitment AI",
    nm: "Smart Recruitlent — Intelligent Hiring System",
    dc: "Plateforme de recrutement IA développée avec ACTIA, intégrant NLP, vision par ordinateur et orchestration multi-agents pour automatiser tout le processus d'embauche.",
    desc_long: `Une plateforme de recrutement complète développée en partenariat avec ACTIA, transformant la façon dont les entreprises identifient, évaluent et communiquent avec les candidats.

**Modules clés :**
- 💬 **Chatbot IA** : Interaction temps réel avec embeddings sémantiques + LLaMA 3
- 📄 **Parsing CV** : 5,554 CV traités (3,258 PDF + 2,296 DOCX)
- 🤝 **Matching** : Similarité sémantique avec BGE-M3 + LLaMA
- 📊 **Shortlisting** : Scoring automatique avec LLaMA 3.1
- 📧 **Communication** : Emails personnalisés générés par IA
- 🎥 **Interview virtuelle** : Analyse voix (Whisper) + visage (VGG19) + détection téléphone (YOLOv8)
- 🔍 **IA Explicable** : LIME pour expliquer les décisions

**Technologies :** LLaMA 3, BGE-M3, YOLOv8, Whisper, VGG19, MediaPipe, CrewAI, Gradio

**Impact :** -80% de temps de screening CV, processus objectif et transparent`,
    tg: ["LLaMA 3", "YOLOv8", "Whisper", "CrewAI", "NLP", "Computer Vision"],
    year: "2025",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "CV traités", v: "5,554" },
      { k: "Modèles IA", v: "7+" },
      { k: "Modules", v: "5" },
      { k: "Gain temps", v: "-80%" }
    ],
    demo: "https://youtu.be/hCH41USDJT8", // Lien à ajouter
    color: "#a78bfa", // Violet
    emoji: "🤖",
    highlights: [
      "Partenariat avec ACTIA",
      "Pipeline multimodal texte + voix + vision",
      "5,554 CV analysés automatiquement",
      "IA explicable avec LIME"
    ],
  },
  {
    id: "aspireHealth",
    tp: "tb2", // Style bleu comme Santé Connect
    lb: "ML Analytics",
    nm: "Aspire — Health Inspections ML Platform",
    dc: "Plateforme d'analyse prédictive pour inspections sanitaires utilisant 300,000+ enregistrements pour prédire les risques et prioriser les contrôles.",
    desc_long: `Une solution ML développée pour transformer les inspections sanitaires aux États-Unis, où 48 millions de personnes sont touchées chaque année par des maladies d'origine alimentaire.

**Le problème :**
- ❌ Subjectivité dans les scores d'inspection
- ❌ Données publiées avec des semaines de retard
- ❌ Manque de transparence pour le public
- ❌ Approche réactive (après les problèmes)

**Les données :**
- 📊 300,000+ enregistrements d'inspections
- 📊 160,000+ établissements analysés (Comté de LA)
- 📊 Données démographiques (densité population, revenus)

**Modèles ML déployés :**
- 📈 **Régression** : Prédiction de sévérité des violations
- 🏷️ **Classification** : Identification des établissements à risque
- ⏱️ **Time Series** : Prévision des tendances d'inspection

**KPIs suivis :**
- Nombre moyen d'inspections par établissement
- Score moyen par établissement
- Fréquence des violations graves
- Efficacité des inspecteurs
- Années moyennes de propriété

**Impact :** Prédiction proactive des risques, réduction des délais, transparence accrue pour le public.`,
    tg: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Time Series", "BI"],
    year: "2024",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "Inspections analysées", v: "300K+" },
      { k: "Établissements", v: "160K+" },
      { k: "Modèles ML", v: "3 types" },
      { k: "KPIs suivis", v: "6" }
    ],
    demo: "https://youtu.be/jVbrtPiOvPY", // Lien YouTube à ajouter
    color: "#10b981", // Vert émeraude (pour santé/propreté)
    emoji: "🏥",
    highlights: [
      "300,000+ inspections analysées",
      "Prédiction proactive des risques sanitaires",
      "KPIs temps réel pour inspecteurs",
      "Solution pour 48M de personnes concernées"
    ],
  },
  {
    id: "healthyLiving",
    tp: "tb2", // Style bleu
    lb: "Health Platform",
    nm: "Healthy Living — Predictive Health Platform",
    dc: "Application web Django intégrant l'IA pour centraliser les données patients, prédire les risques de réadmission et automatiser la priorisation des urgences.",
    desc_long: `Une solution numérique complète pour les hôpitaux face aux défis de gestion des données patients et de priorisation des urgences.

**Problèmes résolus :**
- 📊 Gestion inefficace des données patients
- 🚑 Difficulté à prioriser les urgences
- 📝 Charge administrative excessive
- 🤝 Coordination limitée entre services

**Solution technique :**
- 🔐 Authentification multi-rôles (admin, médecin, staff)
- 📋 Gestion complète des patients et dossiers médicaux
- 🤖 Système de rendez-vous avec priorisation IA
- 💬 Chatbot patient 24/7 (Kommunicate)
- 📈 Modèle prédictif de réadmission (NLP/Transformers)
- 💰 Facturation automatisée
- 📊 Tableaux de bord et rapports temps réel

**Technologies :** Django, Python, SQLite, Transformers (Hugging Face), NLP, Kommunicate, Bootstrap, Figma

**Impact :** -30% charge administrative, priorisation instantanée, meilleure coordination, support patient continu.`,
    tg: ["Django", "Python", "Transformers", "NLP", "Bootstrap", "SQLite"],
    year: "2024",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "Réduction admin", v: "30%" },
      { k: "Rôles utilisateurs", v: "3" },
      { k: "Chatbot", v: "24/7" },
      { k: "Prédiction", v: "Réadmission" }
    ],
    demo: "https://youtu.be/lC_5GqssSNc", // Lien YouTube à ajouter
    color: "#3b82f6", // Bleu
    emoji: "🏥",
    highlights: [
      "Priorisation IA des urgences",
      "Modèle prédictif NLP pour réadmission",
      "Chatbot patient 24/7 avec Kommunicate",
      "30% réduction charge administrative"
    ],
  },
  {
    id: "adventureHub",
    tp: "tm2", // Style violet
    lb: "Social Platform",
    nm: "AdventureHub — Social Travel Platform",
    dc: "Plateforme sociale combinant networking voyageur et services touristiques, avec modules e-commerce, gestion d'événements et système de réclamations.",
    desc_long: `Une plateforme full-stack unifiant les mondes du partage social et de la réservation touristique pour créer une expérience utilisateur intégrée.

**Modules principaux :**
- 👥 **Gestion utilisateurs** : Profils différenciés (voyageurs/agences)
- 🛒 **E-commerce** : Catalogue produits avec gestion de stock
- 📅 **Événements** : Publication, recherche et inscription aux activités
- 🎫 **Système de réclamations** : Ticketing pour support client
- 📱 **Fil social** : Partage de posts et conseils voyage

**Architecture technique :**
- 🏗️ Architecture modulaire (séparation des préoccupations)
- 🔌 Pattern Singleton pour optimisation BDD
- 🌿 Multi-branches Git pour développement collaboratif

**Technologies :** PHP OOP, MySQL (PDO), HTML5/CSS3, JavaScript, Git/GitHub`,
    tg: ["PHP", "MySQL", "PDO", "OOP", "Git", "Singleton Pattern"],
    year: "2024",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "Modules", v: "5" },
      { k: "Profils", v: "2" },
      { k: "Patterns", v: "Singleton" },
      { k: "Base de données", v: "Optimisée" }
    ],
    demo: "", // Lien YouTube à ajouter
    color: "#a78bfa", // Violet comme Smart Recruitlent
    emoji: "🌍",
    highlights: [
      "Architecture modulaire PHP OOP",
      "Pattern Singleton pour connexions BDD",
      "Double profil voyageurs/agences",
      "Workflow Git multi-branches"
    ],
  },
  {
    id: "beautyCenterMgmt",
    tp: "tr", // Style rose comme Drone Project
    lb: "Desktop App",
    nm: "Beauty Center Management System — Professional Desktop Application",
    dc: "Application desktop complète de 15 000+ lignes en C++/Qt pour la gestion de salons de beauté avec 7 modules intégrés.",
    desc_long: `Une solution desktop complète transformant la gestion des salons de beauté et centres de bien-être.

**Les 7 modules :**
- 👥 **Clients** : CRUD avec validation, photos, alertes anniversaire
- 👩‍💼 **Employés** : Planning dynamique, matrice de compétences
- 💆 **Services** : Catalogue, tarifs, tendances mensuelles
- 📅 **Rendez-vous** : Calendrier interactif, détection conflits, export Google Calendar
- 📦 **Stock** : Alertes seuil bas, valeur totale
- 💎 **Loyauté** : Système Bronze/Silver/Gold, calcul points
- 📊 **Dashboard** : Graphiques temps réel, export PDF

**Innovations :**
- 🔐 Simulation reconnaissance faciale avec animation caméra
- 📅 Synchronisation Google Calendar via ICS
- 📧 Notifications email automatiques
- 👥 Interface double : Admin (accès complet) + Client (portail personnel)

**Technologies :** C++17, Qt 5.9, SQLite, MVC, QSS, Git

**Algorithmes clés :** Parsing dates multiples, détection conflits temps réel, calcul similarité, génération ICS, agrégation données temps réel`,
    tg: ["C++", "Qt", "SQLite", "MVC", "OOP", "Desktop"],
    year: "2023",
    role: "Lead AI Engineer",
    status: "Production",
    metrics: [
      { k: "Lignes de code", v: "15K+" },
      { k: "Modules", v: "7" },
      { k: "Tables SQL", v: "12" },
      { k: "Innovations", v: "4" }
    ],
    demo: "https://youtu.be/k7sG180tl9k", // Lien YouTube à ajouter
    color: "#f9a8d4", // Rose comme Drone Project
    emoji: "💅",
    highlights: [
      "15,000+ lignes C++/Qt",
      "Architecture MVC",
      "Export Google Calendar (ICS)",
      "Double interface Admin/Client"
    ],
  }
];

function AN({ to, sx = "" }) { const [v, sv] = useState(0); const r = useRef(); useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { let c = 0; const t = () => { c++; sv(c); if (c < to) setTimeout(t, 28) }; t(); o.disconnect() } }, { threshold: .5 }); if (r.current) o.observe(r.current); return () => o.disconnect() }, [to]); return <span ref={r}>{v}{sx}</span> }

/* ── Hook personnalisé pour les traductions des projets ── */
const useProjectTranslation = (projectId, lang) => {
  const projectTranslations = T[lang]?.projects?.[projectId] || {};
  return projectTranslations;
};

/* ── Bitmap 5×7 pour chaque lettre ── */
const F = { " ": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]], "A": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]], "B": [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]], "C": [[0, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 1]], "D": [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]], "E": [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]], "F": [[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]], "G": [[0, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 1]], "H": [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]], "I": [[0, 1, 1, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 1, 1, 0]], "J": [[0, 0, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [1, 0, 0, 1, 0], [1, 0, 0, 1, 0], [0, 1, 1, 0, 0]], "K": [[1, 0, 0, 0, 1], [1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]], "L": [[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]], "M": [[1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]], "N": [[1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]], "O": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]], "P": [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]], "Q": [[0, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 1, 0], [0, 1, 1, 0, 1]], "R": [[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]], "S": [[0, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [1, 1, 1, 1, 0]], "T": [[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]], "U": [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 1, 1, 0]], "V": [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]], "W": [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 1, 0, 1, 1], [1, 0, 0, 0, 1]], "X": [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [1, 0, 0, 0, 1]], "Y": [[1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]], "Z": [[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]], ":": [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0]], "!": [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]] };

function DotMatrix({ dk }) {
  const cvs = useRef();
  const st = useRef({ wi: 0, phase: "type", char: 0, pause: 0 });
  const WORDS = ["INTELLIGENCE", "ARTIFICIELLE", "AI:ENGINEER", "DEEP:LEARNING", "NEURAL:NET"];
  const DOT = 10, GAP = 3, STEP = DOT + GAP, ROWS = 7, CGAP = 2;

  useEffect(() => {
    const c = cvs.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf, last = 0;
    // Image désert comme dans le portfolio original
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=85";
    let imgReady = false;
    img.onload = () => { imgReady = true };

    function resize() {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    window.addEventListener("resize", resize);

    function cols(text, nch) {
      const cs = [];
      for (const ch of text.slice(0, nch)) {
        const g = F[ch] || F[" "];
        for (let col = 0; col < 5; col++) { cs.push(g.map(r => r[col])) }
        for (let s = 0; s < CGAP; s++)cs.push([0, 0, 0, 0, 0, 0, 0]);
      }
      return cs;
    }

    function frame(ts) {
      const W = c.offsetWidth, H = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Image désert en fond couvrant tout le cadre
      if (imgReady) {
        ctx.drawImage(img, 0, 0, W, H);
        ctx.fillStyle = "rgba(0,0,0,0.42)";
        ctx.fillRect(0, 0, W, H);
      } else {
        const bg = ctx.createLinearGradient(0, 0, W, 0);
        bg.addColorStop(0, "#7a1e00"); bg.addColorStop(.5, "#c03500"); bg.addColorStop(1, "#8b2000");
        ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      }

      // Grille de carreaux couvrant TOUT le cadre (pas juste le texte)
      const totalCols = Math.ceil(W / STEP) + 2;
      const totalRows = Math.ceil(H / STEP) + 2;
      for (let ri = 0; ri < totalRows; ri++) {
        for (let ci = 0; ci < totalCols; ci++) {
          ctx.beginPath(); ctx.roundRect(ci * STEP - 1, ri * STEP - 1, DOT, DOT, 2.5);
          ctx.fillStyle = "rgba(255,255,255,0.14)"; ctx.fill();
        }
      }

      const word = WORDS[st.current.wi];
      const full = cols(word, word.length);
      const visible = cols(word, st.current.char);
      const startX = Math.max(30, (W - full.length * STEP) / 2);
      const startY = (H - ROWS * STEP) / 2;

      // Carreaux allumés lettre par lettre avec glow
      visible.forEach((col, ci) => {
        col.forEach((on, ri) => {
          if (!on) return;
          const x = startX + ci * STEP, y = startY + ri * STEP;
          ctx.shadowBlur = 12; ctx.shadowColor = "rgba(255,240,200,0.9)";
          ctx.beginPath(); ctx.roundRect(x, y, DOT, DOT, 2.5);
          ctx.fillStyle = "#ffffff"; ctx.fill();
          ctx.shadowBlur = 0;
        });
      });

      // Curseur clignotant
      if (st.current.phase === "type" && st.current.char < word.length) {
        const ci = visible.length;
        const blink = Math.floor(ts / 380) % 2 === 0;
        if (blink) {
          for (let ri = 0; ri < ROWS; ri++) {
            const x = startX + ci * STEP, y = startY + ri * STEP;
            ctx.beginPath(); ctx.roundRect(x, y, DOT, DOT, 2.5);
            ctx.fillStyle = "rgba(255,210,120,0.9)"; ctx.fill();
          }
        }
      }

      // Machine à états
      const dt = ts - last;
      if (st.current.phase === "type") {
        if (dt > 75) {
          last = ts;
          if (st.current.char < word.length) st.current.char++;
          else { st.current.phase = "pause"; last = ts; }
        }
      } else if (st.current.phase === "pause") {
        if (dt > 2400) { st.current.phase = "erase"; last = ts; }
      } else if (st.current.phase === "erase") {
        if (dt > 38) {
          last = ts;
          if (st.current.char > 0) st.current.char--;
          else { st.current.wi = (st.current.wi + 1) % WORDS.length; st.current.phase = "type"; last = ts; }
        }
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) };
  }, [dk]);

  return (
    <div style={{
      position: "relative", height: 220, overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }}>
      <canvas ref={cvs} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROJECT MODAL — vue détail plein écran
══════════════════════════════════════════════ */
function ProjectModal({ p, onClose, dk, t, lang }) {
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [tab, setTab] = useState("overview"); // overview | demo
  
  // Récupérer les traductions du projet selon la langue
  const projTrans = useProjectTranslation(p.id, lang);
  
  // Utiliser les traductions si disponibles, sinon utiliser les valeurs par défaut (français)
  const displayProject = {
    ...p,
    nm: projTrans.nm || p.nm,
    dc: projTrans.dc || p.dc,
    desc_long: projTrans.desc_long || p.desc_long,
    highlights: projTrans.highlights || p.highlights,
  };

  // Fermer avec Escape
  useEffect(() => {
    const fn = e => { if (e.key === "Escape") onClose() };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = "" };
  }, [onClose]);

  const accent = displayProject.color;

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;

    // Pour youtu.be/XXXXX
    let match = url.match(/youtu\.be\/([^?&]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    // Pour youtube.com/watch?v=XXXXX
    match = url.match(/[?&]v=([^?&]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;

    // Si c'est déjà un embed
    match = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (match) return url;

    // Fallback : utiliser l'URL originale (pour autres sites)
    return url;
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,0.82)",
      backdropFilter: "blur(14px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
      animation: "fadeIn .25s ease",
    }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        .modal-tab{padding:10px 22px;border-radius:30px;font-family:'DM Mono';font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:none;transition:all .2s}
        .modal-tab.active{color:#fff}
        .modal-tab.inactive{background:transparent;color:rgba(255,255,255,0.35);border:1px solid rgba(255,255,255,0.1)}
        .modal-tab.inactive:hover{color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.25)}
        .hl-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;font-family:'DM Mono';font-size:11px;line-height:1.7;color:rgba(255,255,255,0.6)}
        .light .hl-item{color:rgba(13,10,46,0.6)}
        .metric-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 18px;text-align:center}
        .light .metric-card{background:rgba(30,58,138,0.05);border-color:rgba(30,58,138,0.1)}
      `}</style>

      {/* Panneau modal — stoppe la propagation pour ne pas fermer */}
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 1100, maxHeight: "92vh",
        background: dk ? "#0b1530" : "#fff",
        borderRadius: 24,
        border: `1px solid ${accent}33`,
        boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22`,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        animation: "slideUp .3s ease",
      }}>

        {/* ── Header ── */}
        <div style={{
          padding: "24px 32px",
          borderBottom: `1px solid ${dk ? "rgba(255,255,255,0.07)" : "rgba(30,58,138,0.1)"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: `linear-gradient(90deg,${accent}11,transparent)`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 14,
              background: `${accent}22`, border: `1px solid ${accent}44`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            }}>{p.emoji}</div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: 2, color: accent, textTransform: "uppercase" }}>{p.lb}</span>
                <span style={{
                  background: `${accent}22`, color: accent,
                  fontSize: 9, padding: "2px 8px", borderRadius: 20,
                  fontFamily: "'DM Mono'", letterSpacing: 1,
                }}>{p.status}</span>
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(22px,3vw,34px)", color: dk ? "#fff" : "#0d0a2e", lineHeight: 1 }}>{displayProject.nm}</h2>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 6, background: dk ? "rgba(255,255,255,0.05)" : "rgba(30,58,138,0.05)", padding: 4, borderRadius: 30 }}>
              {[["overview", t.modalOverview], ["demo", t.modalDemo]].map(([id, label]) => (
                <button key={id} className={`modal-tab ${tab === id ? "active" : "inactive"}`}
                  style={tab === id ? { background: accent } : {}}
                  onClick={() => setTab(id)}>{label}</button>
              ))}
            </div>
            {/* Close */}
            <button onClick={onClose} style={{
              width: 38, height: 38, borderRadius: "50%", border: `1px solid ${dk ? "rgba(255,255,255,0.15)" : "rgba(30,58,138,0.15)"}`,
              background: "transparent", color: dk ? "rgba(255,255,255,0.5)" : "rgba(13,10,46,0.5)",
              fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s",
            }}
              onMouseOver={e => { e.currentTarget.style.background = accent; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = accent }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = dk ? "rgba(255,255,255,0.5)" : "rgba(13,10,46,0.5)"; e.currentTarget.style.borderColor = dk ? "rgba(255,255,255,0.15)" : "rgba(30,58,138,0.15)" }}
            >✕</button>
          </div>
        </div>

        {/* ── Corps scrollable ── */}
        <div style={{ overflowY: "auto", flex: 1 }}>

          {tab === "overview" && (
            <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>

              {/* Colonne gauche */}
              <div>
                {/* Description longue */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: 3, color: accent, textTransform: "uppercase", marginBottom: 12 }}>{t.modalAbout}</div>
                  <p style={{ fontFamily: "'DM Mono'", fontSize: 12.5, color: dk ? "rgba(255,255,255,0.65)" : "rgba(13,10,46,0.65)", lineHeight: 1.9 }}>{displayProject.desc_long}</p>
                </div>

                {/* Points forts */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: 3, color: accent, textTransform: "uppercase", marginBottom: 14 }}>{t.modalKeys}</div>
                  {displayProject.highlights.map((h, i) => (
                    <div key={i} className="hl-item">
                      <span style={{ color: accent, flexShrink: 0, marginTop: 1 }}>▸</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Stack tech */}
                <div>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: 3, color: accent, textTransform: "uppercase", marginBottom: 14 }}>{t.modalStack}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tg.map(tg => (
                      <span key={tg} style={{
                        background: `${accent}15`, border: `1px solid ${accent}33`,
                        color: accent, fontFamily: "'DM Mono'", fontSize: 11,
                        padding: "6px 14px", borderRadius: 6, letterSpacing: 1,
                      }}>{tg}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite — métriques + infos */}
              <div>
                {/* Métriques */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: 3, color: accent, textTransform: "uppercase", marginBottom: 14 }}>{t.modalMetrics}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {p.metrics.map(m => (
                      <div key={m.k} className="metric-card">
                        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, color: accent, lineHeight: 1 }}>{m.v}</div>
                        <div style={{ fontFamily: "'DM Mono'", fontSize: 9, color: dk ? "rgba(255,255,255,0.4)" : "rgba(13,10,46,0.4)", letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{m.k}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Infos projet */}
                <div style={{ background: dk ? "rgba(255,255,255,0.03)" : "rgba(30,58,138,0.04)", border: `1px solid ${dk ? "rgba(255,255,255,0.07)" : "rgba(30,58,138,0.08)"}`, borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
                  {[[t.modalYear, p.year], [t.modalRole, p.role], [t.modalStatus, p.status]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${dk ? "rgba(255,255,255,0.05)" : "rgba(30,58,138,0.07)"}` }}>
                      <span style={{ fontFamily: "'DM Mono'", fontSize: 10, color: dk ? "rgba(255,255,255,0.35)" : "rgba(13,10,46,0.4)", letterSpacing: 1, textTransform: "uppercase" }}>{k}</span>
                      <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: dk ? "rgba(255,255,255,0.8)" : "rgba(13,10,46,0.8)", fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* CTA démo */}
                <button onClick={() => setTab("demo")} style={{
                  width: "100%", padding: "14px", borderRadius: 10,
                  background: `linear-gradient(135deg,${accent},${accent}aa)`,
                  border: "none", color: "#fff",
                  fontFamily: "'DM Mono'", fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
                  cursor: "pointer", transition: "opacity .2s,transform .2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                  onMouseOver={e => { e.currentTarget.style.opacity = ".85"; e.currentTarget.style.transform = "translateY(-1px)" }}
                  onMouseOut={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  {t.modalCta}
                </button>
              </div>
            </div>
          )}

          {tab === "demo" && (
            <div style={{ height: "calc(92vh - 85px)", display: "flex", flexDirection: "column" }}>
              {/* Barre navigateur fictive */}
              <div style={{
                padding: "10px 16px",
                background: dk ? "rgba(255,255,255,0.04)" : "rgba(30,58,138,0.04)",
                borderBottom: `1px solid ${dk ? "rgba(255,255,255,0.07)" : "rgba(30,58,138,0.08)"}`,
                display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, background: dk ? "rgba(255,255,255,0.06)" : "rgba(30,58,138,0.06)",
                  borderRadius: 6, padding: "5px 12px",
                  fontFamily: "'DM Mono'", fontSize: 10, color: dk ? "rgba(255,255,255,0.4)" : "rgba(13,10,46,0.4)",
                  letterSpacing: .5,
                }}>{p.demo}</div>
                <a href={p.demo} target="_blank" rel="noreferrer" style={{
                  fontFamily: "'DM Mono'", fontSize: 9, letterSpacing: 2,
                  color: accent, textDecoration: "none", textTransform: "uppercase",
                  border: `1px solid ${accent}44`, padding: "4px 10px", borderRadius: 6,
                }}>↗ Ouvrir</a>
              </div>
              {/* iFrame démo */}
              <div style={{ position: "relative", flex: 1 }}>
                {!demoLoaded && (
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 16,
                    background: dk ? "#060d1f" : "#f4f1ff",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      border: `3px solid ${accent}`, borderTopColor: "transparent",
                      animation: "spin 0.8s linear infinite",
                    }} />
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    <span style={{ fontFamily: "'DM Mono'", fontSize: 11, color: dk ? "rgba(255,255,255,0.4)" : "rgba(13,10,46,0.4)", letterSpacing: 2 }}>{t.modalLoading}</span>
                  </div>
                )}
                <iframe
                  src={getYoutubeEmbedUrl(p.demo)}
                  title={p.nm}
                  onLoad={() => setDemoLoaded(true)}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Language Selector ── */
function LangSelector({ lang, setLang, ho, hl }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);
  const cur = LANGS.find(l => l.code === lang);
  return (
    <div className="lsel" ref={ref}>
      <button className="lsel-btn" onClick={() => setOpen(o => !o)} onMouseEnter={ho} onMouseLeave={hl}>
        <span>{cur.flag}</span><span>{cur.label}</span><span style={{ opacity: .5, fontSize: 8 }}>▾</span>
      </button>
      {open && (
        <div className="lsel-drop">
          {LANGS.map(l => (
            <div key={l.code} className={`lsel-item${lang === l.code ? " active" : ""}`}
              onClick={() => { setLang(l.code); setOpen(false) }}
              onMouseEnter={ho} onMouseLeave={hl}>
              <span>{l.flag}</span><span>{l.label}</span>
              {lang === l.code && <span style={{ marginLeft: "auto", color: "var(--rs)" }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [dk, sdk] = useState(true);
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const [selProj, setSelProj] = useState(null);
  const cc = useRef(), cr = useRef();

  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in") }), { threshold: .1 });
    els.forEach(el => o.observe(el));
    setTimeout(() => document.querySelectorAll(".hero .rv").forEach(el => el.classList.add("in")), 80);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, af;
    const mv = e => { mx = e.clientX; my = e.clientY };
    document.addEventListener("mousemove", mv);
    const lp = () => {
      if (cc.current) { cc.current.style.left = mx + "px"; cc.current.style.top = my + "px" }
      if (cr.current) { rx += (mx - rx) * .12; ry += (my - ry) * .12; cr.current.style.left = rx + "px"; cr.current.style.top = ry + "px" }
      af = requestAnimationFrame(lp)
    }; lp();
    return () => { document.removeEventListener("mousemove", mv); cancelAnimationFrame(af) };
  }, []);

  const cv = useRef();
  useEffect(() => {
    const c = cv.current; if (!c) return;
    const ctx = c.getContext("2d"); c.width = c.offsetWidth; c.height = c.offsetHeight;
    const st = Array.from({ length: 70 }, () => ({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.4 + .3, a: Math.random(), sp: Math.random() * .005 + .002 }));
    let af;
    const dr = () => { ctx.clearRect(0, 0, c.width, c.height); st.forEach(s => { s.a += s.sp; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,210,255,${Math.abs(Math.sin(s.a)) * .65})`; ctx.fill() }); af = requestAnimationFrame(dr) }; dr();
    return () => cancelAnimationFrame(af);
  }, []);

  const ho = () => { if (cr.current) cr.current.classList.add("rx") };
  const hl = () => { if (cr.current) cr.current.classList.remove("rx") };

  return (
    <div className={`${dk ? "dark" : "light"}${t.dir === "rtl" ? " rtl" : ""}`} style={{ minHeight: "100vh" }}>
      <G />
      <div className="cc" ref={cc} />
      <div className="cr" ref={cr} />

      <nav className="nav">
        <div className="lc">IA</div>
        <ul className="nl">
          {t.nav.map((l, i) => (
            <li key={i}><a href={["#about", "#skills", "#projects", "#contact"][i]} onMouseEnter={ho} onMouseLeave={hl}>{l}</a></li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          <LangSelector lang={lang} setLang={setLang} ho={ho} hl={hl} />
          <button className="tb" onClick={() => sdk(!dk)} onMouseEnter={ho} onMouseLeave={hl}>{dk ? "☀️" : "🌙"}</button>
        </div>
      </nav>

      <section className="hero" id="about">
        <canvas ref={cv} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .4 }} />
        <div className="orb o1" /><div className="orb o2" />
        <div className="hg">
          <div>
            <div className="hbdg rv"><span className="pd" />{t.available}</div>
            <h1 className="ht rv" style={{ transitionDelay: ".1s" }}>{t.heroTitle("Gniné Diarra ")}</h1>
            <p className="hs rv" style={{ transitionDelay: ".2s" }}>{t.heroSub}</p>
            <div className="ctas rv" style={{ transitionDelay: ".3s" }}>
              <a href="#projects" className="bp" onMouseEnter={ho} onMouseLeave={hl}>{t.cta1}</a>
              <a href="#contact" className="bg2" onMouseEnter={ho} onMouseLeave={hl}>{t.cta2}</a>
            </div>
            <div className="hst rv" style={{ transitionDelay: ".4s" }}>
              {t.stats.map(st => (
                <div key={st.l}><div className="sn"><AN to={st.n} sx={st.s} /></div><div className="sl">{st.l}</div></div>
              ))}
            </div>
          </div>
          <div className="rv" style={{ transitionDelay: ".15s" }}>
            <div style={{ position: "relative" }}>
              <div className="pf">
                <div
                  className="pp"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src="/pp_linkedin.jpg"
                    alt="Votre Photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>
              </div>
              <div className="pb">✨ Open to work</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mq">
        <div className="mqt">
          {["MACHINE LEARNING", "DEEP LEARNING", "NLP", "COMPUTER VISION", "DATA ENGINEERING", "MLOps", "PYTORCH", "TRANSFORMERS", "MACHINE LEARNING", "DEEP LEARNING", "NLP", "COMPUTER VISION", "DATA ENGINEERING", "MLOps", "PYTORCH", "TRANSFORMERS"].map((t, i) => (
            <span key={i}><span className="mi">{t}</span><span className="ms">✦</span></span>
          ))}
        </div>
      </div>

      <section className="abs">
        <div className="si">
          <div className="slbl rv">
            {t.aboutLabel}
          </div>
          <h2 className="sh rv" style={{ transitionDelay: ".1s" }}>{t.aboutTitle}</h2>
          <div className="cr3">
            {t.cards.map((c, i) => (
              <div key={i} className="ac rv" style={{ transitionDelay: `${.1 + i * .12}s` }} onMouseEnter={ho} onMouseLeave={hl}>
                <div className={`acbg ${i === 0 ? "g1" : "g2"}`} />
                <div className="acb">
                  <span className="acp">+</span>
                  <div className={`aci ${i === 0 ? "i1" : "i2"}`}>{i === 0 ? "🔬" : "⚡"}</div>
                  <div className="act">{c.t}</div>
                  <div className="acd">{c.d}</div>
                  <div className="acft">{["Deep Learning", "NLP", "Research", "MLOps", "Scalability", "Production"].slice(i * 3, i * 3 + 3).map(p => <span key={p} className="apl">{p}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DotMatrix dk={dk} />

      <section className="ts" id="skills">
        <div className="tbg" />
        <h2 className="tt rv">{t.toolsTitle}</h2>
        <OrbitalTools ho={ho} hl={hl} />
      </section>

      {selProj && <ProjectModal p={selProj} onClose={() => setSelProj(null)} dk={dk} t={t} lang={lang} />}

      <section className="ps" id="projects">
        <div className="ph rv">
          <div>
            <div className="slbl">{t.projLabel}</div>
            <h2 style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(36px,5vw,70px)", lineHeight: ".92", color: "var(--tx)" }}>{t.projTitle}</h2>
          </div>
          <a href="#contact" className="bg2" onMouseEnter={ho} onMouseLeave={hl}>{t.projSeeAll}</a>
        </div>
        <div className="pg2">
          {PRJ.map((p, i) => {
            // Récupérer les traductions du projet
            const projTrans = useProjectTranslation(p.id, lang);
            const displayProject = {
              ...p,
              nm: projTrans.nm || p.nm,
              dc: projTrans.dc || p.dc,
            };
            return (
            <div key={i} className="pc rv" style={{ transitionDelay: `${i * .12}s`, cursor: "pointer" }}
              onMouseEnter={ho} onMouseLeave={hl}
              onClick={() => setSelProj(p)}>
              <span className={`pt ${p.tp}`}>{p.lb}</span>
              <div style={{ position: "absolute", top: 16, right: 16, fontFamily: "'DM Mono'", fontSize: 9, letterSpacing: 1.5, color: p.color, textTransform: "uppercase", opacity: .7, display: "flex", alignItems: "center", gap: 4 }}>
                <span>↗</span> {t.projDetail}
              </div>
              <div className="pn">{displayProject.nm}</div>
              <div className="pd2">{displayProject.dc}</div>
              <div className="pft">{p.tg.map(tag => <span key={tag} className="ptc">{tag}</span>)}</div>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16 }}>
                {p.metrics.slice(0, 2).map(m => (
                  <div key={m.k}>
                    <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, color: p.color, lineHeight: 1 }}>{m.v}</div>
                    <div style={{ fontFamily: "'DM Mono'", fontSize: 8, letterSpacing: 1, color: "var(--tm)", textTransform: "uppercase", marginTop: 2 }}>{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </section>

      <section className="cs" id="contact">
        {/* Animated rings */}
        {[320, 480, 640].map((r, i) => (
          <div key={i} className="cring" style={{
            width: r, height: r,
            left: "75%", top: "50%",
            borderColor: i === 0 ? "rgba(236,72,153,0.2)" : i === 1 ? "rgba(99,179,237,0.12)" : "rgba(236,72,153,0.07)",
            animationDelay: `${i * 1.3}s`, animationDuration: `${4 + i * 1.5}s`,
          }} />
        ))}
        {/* Floating tech icons */}
        {["🧠", "⚡", "🔬", "🤖", "📊", "🚀"].map((ic, i) => (
          <div key={i} className="cfloat" style={{
            left: `${[8, 14, 82, 88, 6, 90][i]}%`,
            top: `${[20, 70, 15, 65, 45, 40][i]}%`,
            animationDelay: `${i * 0.9}s`,
            animationDuration: `${5 + i * 0.7}s`,
            fontSize: 22,
          }}>{ic}</div>
        ))}
        {/* Radial glow */}
        <div style={{ position: "absolute", top: -180, left: "50%", transform: "translateX(-50%)", width: 650, height: 650, background: "radial-gradient(circle,rgba(236,72,153,.07),transparent 70%)", pointerEvents: "none" }} />

        <div className="cg" style={{ position: "relative", zIndex: 1 }}>
          <div className="rv">
            <div className="slbl">{t.contactLabel}</div>
            <h2 className="ctit" style={{ animation: "ctitleIn .8s ease both" }}>{t.contactTitle}</h2>
            <style>{`@keyframes ctitleIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <p className="csu">{t.contactSub}</p>
            <a href="mailto:gnine.diarra@esprit.tn" className="cem" onMouseEnter={ho} onMouseLeave={hl}>gnine.diarra@esprit.tn</a>
            <div className="sr">
              <a
                href="https://www.linkedin.com/in/gnine-diarra/"
                target="_blank"
                rel="noreferrer"
                className="sa"
                onMouseEnter={ho}
                onMouseLeave={hl}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/gninediarra"
                target="_blank"
                rel="noreferrer"
                className="sa"
                onMouseEnter={ho}
                onMouseLeave={hl}
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/chula_zemer/"
                target="_blank"
                rel="noreferrer"
                className="sa"
                onMouseEnter={ho}
                onMouseLeave={hl}
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/gnine.mane.diarra"
                target="_blank"
                rel="noreferrer"
                className="sa"
                onMouseEnter={ho}
                onMouseLeave={hl}
              >
                Facebook
              </a>
            </div>
            {/* Availability badge animée */}
            <div style={{
              marginTop: 28, display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 30, padding: "8px 16px",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "plsd 2s ease-in-out infinite", display: "block" }} />
              <span style={{ fontFamily: "'DM Mono'", fontSize: 10, letterSpacing: 2, color: "#22c55e", textTransform: "uppercase" }}>{t.available}</span>
            </div>
          </div>
          <div
            className="cpw"
            style={{
              width: "200px",   // taille du cadre
              height: "200px",
              borderRadius: "12px", // carré arrondi
              overflow: "hidden",
              position: "relative"
            }}
          >
            <img
              src="/pp_linkedin.jpg"
              alt="Votre Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            <div className="cpov" />

            {/* Overlay info card */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
              padding: "18px 20px",
              background: "linear-gradient(to top,rgba(6,13,31,.95) 0%,transparent 100%)",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontFamily: "'Syne'", fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 2 }}>
                  Gniné Diarra
                </div>
                <div style={{ fontFamily: "'DM Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                  AI Engineer
                </div>
              </div>
              <div style={{
                background: "var(--rd)", color: "#fff",
                borderRadius: 8, padding: "6px 12px",
                fontFamily: "'DM Mono'", fontSize: 9, letterSpacing: 1,
                animation: "bflt 3s ease-in-out infinite",
              }}>
                ✨ Open
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>{t.footerLeft}</span>
        <span>{t.footerMid}</span>
        <span>{t.footerRight}</span>
      </footer>

      {/* ChatBot RAG - Importar cuando esté listo */}
      <ChatBot lang={lang} isDark={dk} />
    </div>
  );
}