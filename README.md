
/////////NUMERO 1//////////////////

# BEAUTY CENTER MANAGEMENT SYSTEM — Professional Desktop Application ✨
## PROJECT OVERVIEW

A complete desktop solution transforming how beauty salons and wellness centers manage their daily operations. Built with C++/Qt, this 15,000+ line application replaces scattered manual methods with an integrated, data-driven platform.

## THE PROBLEM

Beauty centers struggle with fragmented management:

| Challenge | Impact |
|-----------|--------|
| *Manual processes* | Paper agendas, client cards, scattered Excel files |
| *No centralization* | Client history, appointments, stock spread across systems |
| *Poor analytics* | Decisions based on intuition, not data |
| *Inefficient scheduling* | Double bookings, no reminders, manual errors |

## THE SOLUTION

A *7-module desktop application* that centralizes all operations:

| 👥 CLIENTS | 👩‍💼 EMPLOYEES | 💆 SERVICES | 📅 APPOINTMENTS |
|------------|---------------|-------------|-----------------|
| 📦 STOCK | 💎 LOYALTY | 📜 HISTORY | 📊 DASHBOARD |

## KEY FEATURES

### 👥 Client Module
- Complete CRUD with smart validation
- Photo management & birthday alerts (-20% offers)
- Statistics: age distribution, geographic repartition

### 👩‍💼 Employee Module
- Dynamic scheduling with leave management
- Skills matrix & revenue per employee tracking
- Daily occupation rate analytics

### 💆 Services Module
- Service catalog with pricing and duration
- Top services ranking & monthly revenue trends

### 📅 Appointments Module
- Interactive calendar with conflict detection
- Smart time slot suggestions
- Google Calendar export (ICS format)
- Automatic 24h reminders & confirmation links

### 📦 Stock Module
- Threshold alerts for low stock
- Total stock value calculation
- Top-selling products analytics

### 💎 Loyalty Module
- Bronze/Silver/Gold level system
- Automatic point calculation
- Expiring card alerts & top customer ranking

### 📊 Dashboard
- Real-time charts (Qt Charts)
- Performance indicators & PDF report export

### 🔐 Innovation Features
- *Facial recognition simulation* with camera animation
- *Google Calendar sync* via ICS export
- *Automated email notifications* for birthdays/reminders
- *Dual interface*: Admin (full access) + Client (personal portal)

## TECHNICAL STACK

| Layer | Technologies |
|-------|--------------|
| *Language* | C++17 |
| *Framework* | Qt 5.9 (Widgets, Charts, Multimedia, SQL) |
| *Database* | SQLite (12 tables, optimized queries) |
| *Architecture* | MVC (Model-View-Controller) |
| *Styling* | Custom QSS with light/dark themes, CSS animations |
| *Tools* | Git, Qt Creator, VS Code, MinGW |

## KEY ALGORITHMS & TECHNIQUES

| Technique | Application |
|-----------|-------------|
| *Date parsing* | Handles multiple formats (ISO, standard) |
| *Conflict detection* | Real-time availability checking |
| *Similarity calculation* | Facial recognition simulation |
| *ICS generation* | Google Calendar export |
| *Data aggregation* | Real-time statistics dashboard |
| *Regex validation* | Input control (email, phone, dates) |


////////////NUMERO 2//////////

# 🌍 AdventureHub - Social Travel Platform

## Project Context
The goal was to create a unique digital hub combining social networking with tourism services,
enabling travelers and travel agencies to interact within a single integrated ecosystem.
Traditional platforms separate social sharing from booking, creating a fragmented user experience.
AdventureHub solves this by unifying both worlds.

## Technical Solution
A robust Full-Stack application built on a modular architecture that efficiently manages data flow
between different services (users, products, events) through an organized backend structure.

## Technologies Used
🔹 *Backend:* PHP (Object-Oriented Programming), MySQL with PDO abstraction
🔹 *Frontend:* HTML5, CSS3, JavaScript
🔹 *Architecture:* Singleton Design Pattern, modular structure
🔹 *Tools & Collaboration:* Git/GitHub (multi-branch workflow)

## Key Features

| Module | Description |
|--------|-------------|
|*User Management** | Complete authentication system with differentiated profiles (travelers/agencies) |
|*E-commerce Engine** | Product catalog with stock management and order processing |
|*Event Management** | Publication, search and registration for adventure activities |
|*Complaint System** | Ticketing system for customer support and dispute resolution |
|*Social Feed** | Post sharing and travel tips (News & Tips section) |

## Technical Highlights

### 🏗️ Modular Architecture
The application is built with a clear separation of concerns, making it maintainable and scalable.
Each module (users, products, events, complaints) operates independently while sharing core services.

### 🔌 Database Optimization
Implementation of the *Singleton Design Pattern* for database connections, significantly reducing
connection redundancy and improving overall application performance.

### 👥 Multi-profile System
Sophisticated user management with different roles and permissions:
- *Travelers*: Browse, book, share experiences, interact with community
- *Agencies*: Publish events, manage products, respond to inquiries

////////////NUMERO 3//////////
# 🏥 Healthy Living | Predictive Health Platform

## Contexte
Les hôpitaux font face à des défis majeurs : gestion inefficace des données patients,
difficulté à prioriser les urgences, charge administrative excessive. Ce projet
propose une solution numérique complète pour améliorer la coordination et l'efficacité
des services hospitaliers.

## Solution
Une application web Django intégrant l'IA pour :
- Centraliser les données patients
- Prédire les risques de réadmission (NLP/Transformers)
- Automatiser la priorisation des urgences
- Faciliter la communication via chatbot (Kommunicate)
- Générer des rapports et statistiques en temps réel

## Technologies
- *Backend*: Django, Python, SQLite
- *Frontend*: HTML5, CSS3, Bootstrap, JavaScript
- *IA*: Transformers (Hugging Face), NLP, Kommunicate
- *Design*: Figma (UI/UX prototyping)

## Fonctionnalités
✓ Authentification multi-rôles (admin, médecin, staff)
✓ Gestion complète des patients et dossiers médicaux
✓ Système de rendez-vous avec priorisation IA
✓ Chatbot patient 24/7 pour assistance
✓ Modèle prédictif de réadmission
✓ Facturation automatisée
✓ Tableaux de bord et rapports statistiques

## Impact
- 30% réduction charge administrative
- Priorisation instantanée des urgences
- Meilleure coordination entre services
- Support patient continu via chatbot


////////////NUMERO 4//////////
# 🏥 Aspire - Health Inspections ML Project

## The Problem
Foodborne illnesses affect *48 million Americans annually*, yet inspection processes remain inefficient:

❌ *Subjectivity in Scoring*: Inspector judgment leads to inconsistent results
❌ *Delayed Data Entry*: Results take weeks to publish, leaving customers uninformed
❌ *Lack of Transparency*: Erodes public trust in dining establishments
❌ *Reactive Approach*: Inspections happen after problems occur, not before

## The Data
📊 *300,000+ inspection records* from 160,000+ facilities (LA County)
📊 *Demographics dataset* (population density, income brackets, ownership information)
📊 Sources: Official government data + Kaggle datasets

## Solution: AI-Powered Risk Analysis

### Machine Learning Models
| Model Type | Application | Algorithms |
|------------|-------------|------------|
| *Regression* | Predict violation severity | Linear Regression, Random Forest |
| *Classification* | Identify high-risk facilities | Logistic Regression, XGBoost |
| *Time Series* | Forecast inspection trends | ARIMA, Prophet |

### Key Features
🔹 *Risk Prediction*: Prioritize inspections using predictive modeling
🔹 *BI Dashboards*: Real-time tracking of KPIs and trends
🔹 *Actionable Insights*: Data-driven recommendations for compliance
🔹 *Performance Analytics*: Inspector efficiency and facility scoring

## Key Performance Indicators (KPIs)
- Average Number of Inspections per Facility
- Average Score per Facility
- Frequency of High Violations
- Average Inspections per Employee
- Average Years of Ownership
- Average Salary by Region

## Technical Stack
🔹 *Languages*: Python (Pandas, NumPy, Scikit-learn)
🔹 *ML Libraries*: Scikit-learn, XGBoost, Transformers
🔹 *Visualization*: Matplotlib, Seaborn, Plotly
🔹 *Data Processing*: Pandas, NumPy, Data cleaning pipelines
🔹 *Database*: SQL for data warehousing

## Impact & Results
✅ *Risk Reduction*: Proactive identification of high-risk facilities
✅ *Efficiency Gain*: Prioritized inspections based on ML predictions
✅ *Data-Driven Decisions*: BI dashboards for real-time monitoring
✅ *Transparency*: Clear metrics for public trust
✅ *Operational Improvement*: Actionable insights for facility owners


////////////NUMERO 5//////////
# Smart Recruitlent — Intelligent Hiring System 🤖

## PROJECT OVERVIEW

An AI-driven recruitment platform developed in partnership with ACTIA that automates and optimizes the entire hiring process. Combining NLP, computer vision, and agent-based orchestration, the system transforms how companies identify, evaluate, and communicate with candidates.

## THE PROBLEM

Traditional recruitment is broken for both HR teams and candidates:

| Challenge | HR Impact | Candidate Impact |
|-----------|-----------|------------------|
| *Manual screening* | Thousands of CVs to process | No feedback received |
| *Slow processes* | Weeks to fill positions | Long response times |
| *Subjective evaluation* | Human bias in decisions | Stressful interviews |
| *Repetitive tasks* | Administrative overload | Lack of transparency |

## THE SOLUTION

A *complete AI-powered recruitment pipeline* with multiple intelligent modules:   RECRUITMENT PLATFORM │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│ 💬 Chatbot │ 📄 CV Parser │ 🤝 Matching │ 📊 Shortlisting │
├──────────────┼──────────────┼──────────────┼────────────────────┤
│ 🎥 Virtual Interview System │
│ (Speech + Facial Analysis + Answer Evaluation) │ 
---

## KEY FEATURES

### 💬 AI Chatbot Assistant
- Real-time candidate interaction using semantic embeddings
- Vector search for instant knowledge retrieval
- LLM-generated responses (LLaMA 3)

### 📄 CV Processing & Structuring
- Transforms raw CVs into structured candidate profiles
- Skill extraction, experience parsing, information normalization
- *Processed:* 5,554 CV files (3,258 PDF + 2,296 DOCX)

### 🤝 Candidate–Job Matching
- Semantic similarity between job descriptions and candidate profiles
- Automated ranking using embedding similarity
- BGE-M3 embeddings + LLaMA-based reasoning

### 📊 Automated Shortlisting
- Candidates scored based on HR evaluation criteria
- LLaMA 3.1 scoring system
- Fully automated ranking and filtering

### 📧 Automated Communication
- Interview invitations, rejection emails, follow-ups
- LLaMA-based text generation for personalized messaging

### 🎥 Virtual Interview System
| Module | Technology | Function |
|--------|------------|----------|
| *Speech Analysis* | Whisper + Wav2Vec2 | Transcription + emotion detection |
| *Facial Analysis* | VGG19 + MediaPipe | Emotion detection + landmark tracking |
| *Phone Detection* | YOLOv8s | Monitor candidate focus |
| *Answer Evaluation* | LLM reasoning | Score responses automatically |

### 🔍 Explainable AI
- *LIME* text explanations for decisions
- *LIME* facial explanations for interview analysis
- Global feature importance visualizations

## TECHNICAL STACK

AI & Machine Learning  • Transformers • SentenceTransformers • DeepFace • LIME • YOLOv8 • MediaPipe • OpenCV • VGG19 • NLP • Whisper • LLaMA 3 • LLaMA 3.1 • BERT • BGE-M3 embeddings

### Backend & Architecture

• Python • Gradio • CrewAI multi-agent system
• Vector embeddings • Semantic search pipelines

## SYSTEM ARCHITECTURE

┌─────────────────────────────────────────────────────────────┐
│ RECRUITMENT PLATFORM │
├─────────────────────────────────────────────────────────────┤
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Chatbot │───▶│ CV Parsing │───▶│ Matching │ │
│ │ (LLaMA 3) │ │(LLaMA/BGE-M3)│ │(BGE-M3/LLaMA)│ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ Shortlisting │ │ Automated │ │ Virtual │ │
│ │(LLaMA 3.1) │ │Communication │ │ Interview │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

## PROJECT STATISTICS

📊 5,554 CV files processed (3,258 PDF + 2,296 DOCX)
📊 7+ AI models integrated (LLaMA, BERT, YOLO, Whisper, VGG19, Wav2Vec2)
📊 5 core recruitment modules
📊 3 explainability techniques (LIME text, LIME facial, feature importance)
📊 Complete multimodal pipeline (text + speech + vision)

## IMPACT & RESULTS

### For HR Teams
- ✅ *80% reduction* in CV screening time
- ✅ Faster identification of qualified candidates
- ✅ Automated communication workflows
- ✅ Objective, bias-reduced evaluations

### For Candidates
- ✅ Real-time responses via chatbot
- ✅ Interactive virtual interview experience
- ✅ Detailed AI-generated feedback
- ✅ Transparent hiring process

### Technical Achievements
- ✅ Complete multimodal AI pipeline
- ✅ Integration of NLP, vision, and audio models
- ✅ Explainable AI integrated into decision-making
- ✅ Agent-based orchestration with CrewAI


////////////NUMERO 6//////////

# DRONE PROJECT — Agricultural Monitoring Drone 🌾✈️

## PROJECT OVERVIEW

An intelligent drone system developed in partnership with the Meteorological Service for agricultural and environmental monitoring. Combining drone technology, computer vision, and data analysis, this solution enables affordable aerial observation and intelligent crop analysis in rural regions, particularly in Africa.

## THE PROBLEM

Agricultural stakeholders lack reliable tools to monitor large areas:

| Challenge | Impact |
|-----------|--------|
| *Slow methods* | Manual observation takes days for large territories |
| *Expensive* | Traditional aerial surveys are cost-prohibitive |
| *Difficult to scale* | Cannot monitor vast rural regions effectively |
| *Outdated data* | Decisions based on incomplete or old information |

## PROBLEMS ADDRESSED

### 🌱 Agriculture
- Poor estimation of crop conditions
- Late detection of water stress or plant diseases
- Lack of accurate land mapping

### 🌦️ Agrometeorology
- No localized environmental data
- Difficulty monitoring isolated regions
- Limited observation tools

### 🗺️ Territorial Monitoring
- Large areas difficult to supervise
- Limited access to usable aerial imagery

## IDENTIFIED NEEDS
✅ Automated visual data collection
✅ Affordable aerial observation systems
✅ Intelligent image analysis (computer vision)
✅ Decision-support systems for agriculture
✅ Reduced operational monitoring costs
✅ Adaptable solutions for local contexts          

## PROPOSED SOLUTION

An *intelligent drone system* capable of:
- Capturing aerial images of targeted zones
- Collecting exploitable environmental data
- Enabling AI-based analysis through computer vision

The system integrates into a broader technological platform including:
- Data dashboards
- Computer vision pipelines
- Analytical applications

## HARDWARE COMPONENTS

### Drone Structure
| Component | Function |
|-----------|----------|
| *Quadcopter frame* | Lightweight flight platform |
| *Propellers* | Lift and propulsion |
| *Brushless motors* | Efficient power delivery |
| *ESC controllers* | Motor speed regulation |
| *Li-Po battery* | Flight power source |
| *Flight controller* | Stabilization and navigation |
| *GPS module* | Positioning and route planning |
| *Communication module* | Data transmission |
| *Onboard camera* | ESP32-CAM for image capture |

### Camera System
The *ESP32-CAM* captures high-resolution aerial images and transmits them to a ground station for processing.

## AI & SOFTWARE TECHNOLOGIES

### Computer Vision
| Technology | Application |
|------------|-------------|
| *YOLOv5* | Object detection (crops, plants, stress indicators) |
| *OpenCV* | Image processing and analysis |

### Programming   • Python for AI model development
• Image processing pipelines ### System Architecture

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ │ │ │ │ │
│ ESP32-CAM │────▶│ Transmission │────▶│ Computer │
│ (Drone) │ │ (RF/WiFi) │ │ (Ground) │
│ │ │ │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘
│
▼
┌─────────────────┐
│ AI Inference │
│ (YOLOv5) │
└─────────────────┘ 
*Why this architecture?* The ESP32 hardware cannot support heavy deep learning models, so images are transmitted to a ground computer for inference.

## SKILLS DEMONSTRATED  ✅ Applied AI system design
✅ Computer vision implementation (YOLOv5, OpenCV)
✅ IoT integration (ESP32-CAM)
✅ Hardware-software interaction
✅ Real-world problem solving
✅ Multidisciplinary engineering
✅ Python development
✅ Embedded systems  

## POTENTIAL IMPACT

### 🌍 Future Applications
- *Smart agriculture monitoring* — Real-time crop health assessment
- *Environmental observation* — Track changes in remote ecosystems
- *Automated land analysis* — Mapping and classification
- *Scalable monitoring* — Cover vast territories affordably

### 🌱 Benefits
- Early detection of crop stress and disease
- Reduced need for manual field inspections
- Data-driven agricultural decisions
- Accessible technology for developing regions

## TECHNICAL STACK SUMMARY

| Domain | Technologies |
|--------|--------------|
| *Hardware* | ESP32-CAM, Quadcopter components, GPS |
| *Computer Vision* | YOLOv5, OpenCV |
| *Programming* | Python |
| *Communication* | RF/WiFi transmission |
| *Architecture* | Edge capture + Cloud/Computer inference |

## PROJECT STATISTICS
5+ hardware components integrated
2 core AI/vision technologies (YOLOv5, OpenCV)
Complete end-to-end pipeline from capture to analysis
Real-world deployment capability for agriculture


/////////////
# SANTÉ CONNECT — AI-Driven Post-Hospitalization Monitoring System 🏥⌚

## PROJECT OVERVIEW

An AI-powered remote monitoring system developed in collaboration with the *Ministry of Health (Tunisia)* and *ESPRIT Engineering School*. Santé Connect integrates AI, IoT, and web platforms to improve post-hospitalization care through continuous patient monitoring, intelligent medical analysis, and automated clinical support.

## THE PROBLEM

### Patient Challenges
| Challenge | Impact |
|-----------|--------|
| *Prescription understanding* | Patients struggle with complex medical instructions |
| *No continuous monitoring* | Vital signs unchecked after discharge |
| *Limited support access* | No assistance when complications arise |

### Medical Staff Challenges
| Challenge | Impact |
|-----------|--------|
| *Manual document processing* | Heavy administrative workload |
| *Delayed risk identification* | Critical cases missed |
| *Fragmented patient data* | No unified view of patient health |

### Technical Challenges
- Heterogeneous medical data formats
- Noisy physiological signals from wearables
- Embedded system constraints
- Need for explainable AI in medical contexts

## PROPOSED SOLUTION

A *unified healthcare monitoring system* integrating:
─────────────────────────────────────────────────────────────┐
│ SANTÉ CONNECT │
├──────────────┬──────────────┬──────────────┬────────────────┤
│ ⌚ Smart │ 🤖 AI │ 📄 OCR & │ 💬 Patient │
│ Watch │ Medical │ Vision │ Assistant │
│ │ Agents │ │ Chatbot │
├──────────────┴──────────────┴──────────────┴────────────────┤
│ Web & Mobile Platforms │
│ (Doctors + Patients Dashboards) │
└─────────────────────────────────────────────────────────────┘

## KEY COMPONENTS

### ⌚ Smart Health Watch (Wearable Monitoring)

A custom smartwatch prototype for real-time patient monitoring:

| Component | Specification |
|-----------|---------------|
| *Microcontroller* | ESP8266 |
| *Sensors* | MAX30102 (PPG) for heart rate + SpO₂ |
| *Display* | OLED 128×64 I2C |
| *Power* | LiPo battery + TP4056 charging module |
| *Communication* | Wi-Fi transmission to backend |

Signal Processing Pipeline   PPG Sensor → Noise Filtering → Feature Extraction → Temporal Modeling
↓ ↓ ↓
Clean signal HR/SpO₂/HRV Continuous monitoring  
## AI COMPONENTS

### 🤖 Medical AI Agents
| Agent Function | Description |
|----------------|-------------|
| *Clinical Document Analysis* | Extract and structure medical information |
| *Prescription Interpretation* | Translate prescriptions into patient-friendly format |
| *Risk Detection* | Identify potential complications |
| *Readmission Probability* | Estimate patient rehospitalization risk |
| *Clinical Summaries* | Generate automated medical reports |

### 📄 Medical NLP
- *ClinicalBERT* for medical language understanding
- *LLMs* for clinical summarization and reasoning

### 🔍 OCR & Vision
- OCR pipelines for prescription extraction
- Multimodal vision models for medical document processing

## TECHNICAL STACK

| Layer | Technologies |
|-------|--------------|
| *Frontend* | React Web Application |
| *Backend* | FastAPI |
| *AI / Data* | LLM agents, ClinicalBERT, OCR pipelines, time-series models |
| *Embedded / IoT* | ESP8266, MAX30102, OLED display, LiPo system |

## DATASETS  📊 PPG-DaLiA dataset — Physiological signal modeling
📊 Public clinical text datasets — Medical NLP training
📊 Sample medical prescriptions — OCR model training
## SYSTEM ARCHITECTURE  
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ │ │ │ │ │
│ Smart Watch │────▶│ Backend API │────▶│ AI Agents │
│ (ESP8266) │ │ (FastAPI) │ │ (ClinicalBERT)│
│ │ │ │ │ │
└─────────────────┘ └─────────────────┘ └─────────────────┘
│ │ │
│ ▼ │
│ ┌─────────────────┐ │
└─────────────▶│ Databases │◀──────────────┘
│ (Patient data)│
└─────────────────┘
│
▼
┌─────────────────────────┐
│ Web/Mobile Dashboards │
│ (Doctors + Patients) │
└─────────────────────────┘
## KEY CONTRIBUTIONS

✅ Integration of AI into healthcare monitoring
✅ Real-time physiological analysis via wearable devices
✅ Multi-agent medical reasoning systems
✅ Explainable AI in medical context
✅ Full-stack deployment (hardware sensor → web interface)   

## IMPACT

### 👤 Patients
- Better understanding of medical prescriptions
- Continuous vital sign monitoring
- Remote assistance after hospitalization
- Reduced anxiety through constant support

### 👨‍⚕️ Doctors
- Automated document processing
- Faster identification of critical patients
- Simplified clinical decision support
- Reduced administrative burden

### 🏥 Healthcare Systems
- Improved continuity of care
- Scalable remote patient monitoring
- Reduced readmission rates
- Lower healthcare costs


## PROJECT STATISTICS
5+ AI components (agents, NLP, OCR, vision, time-series)
3+ hardware components integrated (ESP8266, MAX30102, OLED)
Complete pipeline: sensor → processing → AI → dashboard
Multiple datasets for training (PPG-DaLiA, clinical texts)