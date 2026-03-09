/* ════════════════════════════════════════════════════════════════════
   DATA LOADER — Carga datos de portfolio.json y proyectos a ChromaDB
════════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Cargar portfolio.json y convertir a documentos para ChromaDB
 */
function loadPortfolioDocuments() {
  const portfolioPath = path.join(__dirname, './data/portfolio.json');
  const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));

  const documents = [];

  // 1. Información del perfil
  documents.push({
    id: 'profile',
    content: `
Name: ${portfolio.profile.name}
Title: ${portfolio.profile.title}
Location: ${portfolio.profile.location}
Bio: ${portfolio.profile.bio}
Experience: ${portfolio.profile.experience_years} years
Education: ${portfolio.profile.education.degree} from ${portfolio.profile.education.school}
Contact: ${portfolio.profile.email}
Availability: ${portfolio.profile.availability}
    `.trim(),
    source: 'portfolio.json',
    type: 'profile',
  });

  // 2. Skills
  documents.push({
    id: 'skills',
    content: `
Technical Skills:
Languages: ${portfolio.skills.languages.join(', ')}
ML Frameworks: ${portfolio.skills.ml_frameworks.join(', ')}
Specializations: ${portfolio.skills.specializations.join(', ')}
Tools: ${portfolio.skills.tools.join(', ')}
Languages spoken: ${portfolio.languages.join(', ')}
    `.trim(),
    source: 'portfolio.json',
    type: 'skills',
  });

  // 3. Cada proyecto como documento separado
  portfolio.projects.forEach(project => {
    documents.push({
      id: `project_${project.id}`,
      content: `
Project: ${project.title}
Description: ${project.description}
Year: ${project.year}
Role: ${project.role}
Status: ${project.status}

Key Features:
${project.key_features.map(f => `- ${f}`).join('\n')}

Technologies: ${project.technologies.join(', ')}
Impact: ${project.impact}
      `.trim(),
      source: 'portfolio.json',
      type: 'project',
    });
  });

  // 4. Research Interests
  documents.push({
    id: 'research',
    content: `
Research Interests:
${portfolio.research.interests.map(i => `- ${i}`).join('\n')}

Research Focus: ${portfolio.research.publications}
    `.trim(),
    source: 'portfolio.json',
    type: 'research',
  });

  // 5. Achievements
  documents.push({
    id: 'achievements',
    content: `
Key Achievements:
${portfolio.achievements.map(a => `- ${a}`).join('\n')}
    `.trim(),
    source: 'portfolio.json',
    type: 'achievements',
  });

  return documents;
}

/**
 * Cargar README.md (si existe)
 */
function loadReadmeDocuments() {
  const readmePath = path.join(__dirname, '../README.md');
  const documents = [];

  try {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Dividir en secciones por encabezados (## o ###)
    const sections = readmeContent.split(/^#+\s+/m);
    
    sections.forEach((section, idx) => {
      if (section.trim()) {
        documents.push({
          id: `readme_section_${idx}`,
          content: section.trim(),
          source: 'README.md',
          type: 'documentation',
        });
      }
    });
  } catch (error) {
    console.log('README.md not found, skipping...');
  }

  return documents;
}

/**
 * Función principal para cargar todos los documentos
 */
function getAllDocuments() {
  const portfolioDocs = loadPortfolioDocuments();
  const readmeDocs = loadReadmeDocuments();

  return [
    ...portfolioDocs,
    ...readmeDocs,
  ];
}

/**
 * Inicializar ChromaDB con documentos
 */
async function initializeChromaDB(serverUrl = 'http://localhost:5000') {
  try {
    console.log('📚 Loading documents...');
    const documents = getAllDocuments();
    console.log(`✅ Loaded ${documents.length} documents`);

    console.log('🔄 Initializing ChromaDB...');
    const response = await axios.post(`${serverUrl}/api/initialize`, {
      documents,
    });

    console.log(`✅ ${response.data.message}`);
    console.log('🎉 RAG system ready!');
  } catch (error) {
    console.error('❌ Error initializing ChromaDB:', error.message);
  }
}

module.exports = {
  loadPortfolioDocuments,
  loadReadmeDocuments,
  getAllDocuments,
  initializeChromaDB,
};

// Si se ejecuta directamente
if (require.main === module) {
  initializeChromaDB();
}
