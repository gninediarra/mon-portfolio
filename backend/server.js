/* ════════════════════════════════════════════════════════════════════
   BACKEND RAG CHATBOT — Groq uniquement (embeddings + LLM)
════════════════════════════════════════════════════════════════════ */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// ⚠️ ChromaDB simple en mémoire (sans dépendance OpenAI)
const documents = new Map(); // id -> {content, source, type}
const embeddings = new Map(); // id -> vector

const app = express();
app.use(cors());
app.use(express.json());

/* ── Configuration Groq ── */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* ── Modèles Groq par langue ── */
const MODELS = {
  en: 'llama-3.3-70b-versatile',
  fr: 'llama-3.3-70b-versatile',
  bm: 'llama-3.3-70b-versatile',
  ar: 'allam-2-7b',
};

/* ── Prompts système par langue ── */
const SYSTEM_PROMPTS = {
  en: `You are Gniné Diarra's AI portfolio assistant. You are professional yet warm and friendly.
Your role is to answer questions about:
- Gniné's AI projects and technical achievements
- Her background at ESPRIT (engineering school in Tunisia)
- Her professional experience with AI/ML
- Her skills and technical expertise

IMPORTANT INSTRUCTIONS:
1. Answer ONLY with information from the provided context
2. If a question is out of scope, politely say: "I don't have information about that topic, but I'd be happy to tell you about my AI projects, my journey at ESPRIT, or my professional ambitions!"
3. Always cite your sources: "According to my portfolio..." or "In the Health Connect project..."
4. Be concise but informative (max 200 words per response)
5. Maintain conversation history when relevant`,

  fr: `Vous êtes l'assistant IA du portfolio de Gniné Diarra. Vous êtes professionnel mais chaleureux et amical.
Votre rôle est de répondre aux questions sur:
- Les projets IA et les réalisations techniques de Gniné
- Son parcours à ESPRIT (école d'ingénierie en Tunisie)
- Son expérience professionnelle en IA/ML
- Ses compétences et son expertise technique

INSTRUCTIONS IMPORTANTES:
1. Répondez UNIQUEMENT avec les informations du contexte fourni
2. Si une question est hors scope, dites poliment: "Je n'ai pas d'informations sur ce sujet, mais je serais ravi de vous parler de mes projets en IA, de mon parcours à ESPRIT, ou de mes ambitions professionnelles!"
3. Citez toujours vos sources: "Selon mon portfolio..." ou "Dans le projet Santé Connect..."
4. Soyez concis mais informatif (max 200 mots par réponse)
5. Maintenez l'historique de la conversation si pertinent`,

  bm: `I ni ce! Ni ye Gniné Diarra ka jɛginba portfolio ladon. Ni bɛ danfɛnɛ kɛ ani kuma jiri faamu la.
Ni ka baara bɛ kuma kan:
- Gniné ka jɛginba baara IA ani siyalɛw
- Gniné ka ESPRIT jɔn
- Gniné ka IA/ML baara
- Gniné ka fɛnw ani baara kan

NI KA FƐNW:
1. I ka sɔrɔ jigiya la fɔ dɔ
2. Sɔrɔ jigiya bɛ cɛ, ka kuma ni: "Baara fɔ bɛ ne ka sɔrɔ. Gniné ka baara IA wɛrɛw, ESPRIT jɔn wɛrɛw, wala baara kan kuma n nɛ!"
3. I ka gafe lajɛli: "Portfolio kan..." wɛrɛw
4. Kuma laabu de (200 fla de)
5. Kuma jiri faamu`,

  ar: `أنت مساعد ذكاء اصطناعي لمحفظة جنيه ديارا. أنت احترافي وودود.
دورك هو الإجابة على الأسئلة حول:
- مشاريع جنيه في الذكاء الاصطناعي وإنجازاتها التقنية
- خلفيتها في ESPRIT (مدرسة هندسة تونسية)
- خبرتها المهنية في الذكاء الاصطناعي والتعلم الآلي
- مهاراتها وخبرتها التقنية

تعليمات مهمة:
1. أجب فقط بالمعلومات المقدمة
2. إذا كان السؤال خارج الموضوع، قل بأدب: "ليس لدي معلومات عن هذا الموضوع!"
3. اذكر المصادر دائماً: "حسب محفظتي..."
4. كن موجزاً لكن معلوماتياً (حد أقصى 200 كلمة)`,
};

/* ── Historial de conversación ── */
const conversationHistory = new Map();

/* ═══════════════════════════════════════════════════════════════════
   FUNCIÓN 1: Generar embeddings con Groq (simulado)
═══════════════════════════════════════════════════════════════════ */

/**
 * Generar embedding simple basado en palabras clave
 * (Groq no tiene endpoint de embeddings, así que usamos un método simple)
 */
function generateSimpleEmbedding(text) {
  // Método: Hash de palabras clave para simulación
  const words = text.toLowerCase().split(/\s+/).slice(0, 50);
  const vector = new Array(128).fill(0);
  
  words.forEach((word, idx) => {
    const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    vector[hash % 128] += 1;
  });
  
  return vector;
}

/**
 * Calcular similitud del coseno entre dos vectores
 */
function cosineSimilarity(vec1, vec2) {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  
  return mag1 && mag2 ? dotProduct / (mag1 * mag2) : 0;
}

/* ═══════════════════════════════════════════════════════════════════
   FUNCIÓN 2: Cargar documentos locales
═══════════════════════════════════════════════════════════════════ */

/**
 * Cargar portfolio.json local
 */
function loadPortfolioDocuments() {
  const portfolioPath = path.join(__dirname, '../portfolio.json');
  
  try {
    const portfolioContent = fs.readFileSync(portfolioPath, 'utf8');
    const portfolio = JSON.parse(portfolioContent);
    
    // Extraer secciones del portfolio_data
    if (portfolio.portfolio_data?.sections) {
      portfolio.portfolio_data.sections.forEach((section, idx) => {
        const docId = `portfolio_${idx}`;
        const content = `${section.title}\n\n${section.content}`;
        
        documents.set(docId, {
          id: docId,
          content: content,
          source: 'portfolio.json',
          type: 'section',
          title: section.title,
        });
        
        embeddings.set(docId, generateSimpleEmbedding(content));
      });
    }
    
    console.log(`✅ Loaded ${portfolio.portfolio_data?.sections?.length || 0} portfolio sections`);
    return portfolio.portfolio_data?.sections?.length || 0;
  } catch (error) {
    console.error('❌ Error loading portfolio.json:', error.message);
    return 0;
  }
}

/**
 * Cargar README.md local
 */
function loadReadmeDocuments() {
  const readmePath = path.join(__dirname, '../README.md');
  
  try {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const sections = readmeContent.split(/^#{1,3}\s+/m);
    
    let sectionCount = 0;
    sections.forEach((section, idx) => {
      if (section.trim()) {
        const docId = `readme_${idx}`;
        const content = section.trim();
        
        documents.set(docId, {
          id: docId,
          content: content,
          source: 'README.md',
          type: 'section',
        });
        
        embeddings.set(docId, generateSimpleEmbedding(content));
        sectionCount++;
      }
    });
    
    console.log(`✅ Loaded ${sectionCount} README sections`);
    return sectionCount;
  } catch (error) {
    console.error('❌ Error loading README.md:', error.message);
    return 0;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   FUNCIÓN 3: Recuperar documentos relevantes
═══════════════════════════════════════════════════════════════════ */

/**
 * Buscar documentos relevantes por similitud
 */
function retrieveRelevantDocuments(query, topK = 3) {
  const queryVector = generateSimpleEmbedding(query);
  const results = [];
  
  embeddings.forEach((vector, docId) => {
    const similarity = cosineSimilarity(queryVector, vector);
    const doc = documents.get(docId);
    
    if (doc && similarity > 0.1) {
      results.push({
        docId,
        similarity,
        content: doc.content,
        source: doc.source,
        title: doc.title || 'Section',
      });
    }
  });
  
  // Ordenar por similitud y retornar top K
  return results
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(r => `[${r.source}]\n${r.content}`)
    .join('\n\n---\n\n');
}

/* ═══════════════════════════════════════════════════════════════════
   FUNCIÓN 4: Historial de conversación
═══════════════════════════════════════════════════════════════════ */

function updateConversationHistory(sessionId, role, content) {
  if (!conversationHistory.has(sessionId)) {
    conversationHistory.set(sessionId, []);
  }
  
  const history = conversationHistory.get(sessionId);
  history.push({ role, content });
  
  // Limitar a últimos 6 cambios (3 user + 3 assistant)
  if (history.length > 12) {
    history.splice(0, 2);
  }
  
  conversationHistory.set(sessionId, history);
  return history;
}

function getConversationContext(sessionId) {
  return conversationHistory.get(sessionId) || [];
}

/* ═══════════════════════════════════════════════════════════════════
   FUNCIÓN 5: Llamar a Groq LLM
═══════════════════════════════════════════════════════════════════ */

async function callGroq(messages, model, lang) {
  try {
    const response = await groq.chat.completions.create({
      model: model,
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });
    
    return response.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('❌ Groq API Error:', error.message);
    throw error;
  }
}

/* ═══════════════════════════════════════════════════════════════════
   ENDPOINTS
═══════════════════════════════════════════════════════════════════ */

/**
 * POST /api/chat
 * Enviar un mensaje al chatbot
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, userLang } = req.body;
    
    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId required' });
    }
    
    const lang = ['en', 'fr', 'bm', 'ar'].includes(userLang) ? userLang : 'en';
    
    // Recuperar documentos relevantes
    const relevantDocs = retrieveRelevantDocuments(message, 3);
    
    // Actualizar historial
    updateConversationHistory(sessionId, 'user', message);
    const history = getConversationContext(sessionId);
    
    // Construir mensajes para Groq
    const systemPrompt = SYSTEM_PROMPTS[lang];
    const contextPrompt = relevantDocs
      ? `CONTEXT FROM PORTFOLIO:\n${relevantDocs}\n\n`
      : 'No relevant context found in portfolio.';
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'system', content: contextPrompt },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    ];
    
    // Llamar a Groq
    const model = MODELS[lang];
    const response = await callGroq(messages, model, lang);
    
    // Actualizar historial con respuesta
    updateConversationHistory(sessionId, 'assistant', response);
    
    res.json({
      response,
      lang,
      sources: relevantDocs ? 'Portfolio' : 'General Knowledge',
      sessionId,
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/health
 * Verificar estado del servidor
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    documentsLoaded: documents.size,
    supportedLanguages: ['en', 'fr', 'bm', 'ar'],
  });
});

/**
 * POST /api/clear-session
 * Limpiar historial de sesión
 */
app.post('/api/clear-session', (req, res) => {
  const { sessionId } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId required' });
  }
  
  conversationHistory.delete(sessionId);
  res.json({ success: true, message: 'Session cleared' });
});

/* ═══════════════════════════════════════════════════════════════════
   INICIAR SERVIDOR
═══════════════════════════════════════════════════════════════════ */

const PORT = process.env.PORT || 5000;

// Cargar documentos al iniciar
console.log('📚 Loading documents...');
const portfolioCount = loadPortfolioDocuments();
const readmeCount = loadReadmeDocuments();

app.listen(PORT, () => {
  console.log(`\n🤖 RAG Chatbot Server running on port ${PORT}`);
  console.log(`📚 Supported languages: en, fr, bm, ar`);
  console.log(`📁 Documents loaded: ${portfolioCount + readmeCount} sections`);
  console.log(`🔑 Groq API Key: ${process.env.GROQ_API_KEY ? '✅ configured' : '❌ NOT SET'}`);
  console.log(`\n🌐 Frontend URL: http://localhost:${PORT}`);
  console.log(`✅ Server ready!\n`);
});

module.exports = app;