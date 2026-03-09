# 🤖 RAG Chatbot — Guía de Implementación Completa

## 📋 Resumen

He creado una solución **chatbot RAG multilingue** completa para tu portfolio que:

✅ Indexa portfolio.json + README.md en ChromaDB  
✅ Usa Groq API para generación de respuestas en IA  
✅ Soporta 4 idiomas (EN / FR / BM / AR)  
✅ Componente React integrado con tu sistema de idiomas  
✅ Historial de conversación con límite de contexto  
✅ Respuestas inteligentes con citación de fuentes  

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│              Frontend React                         │
│  ┌────────────────────────────────────────────┐   │
│  │    ChatBot Component                       │   │
│  │  - UI Multilingue (4 idiomas)             │   │
│  │  - Historial de conversación              │   │
│  │  - Detección de idioma                    │   │
│  └────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP Requests
                   ↓
┌─────────────────────────────────────────────────────┐
│        Backend Node.js + Express                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────┐   │
│  │ Groq API    │  │  ChromaDB    │  │ Memory │   │
│  │             │  │  (Vector DB) │  │Store   │   │
│  │ - LLaMA 3   │  │              │  │        │   │
│  │ - Allam 2   │  │ - Embeddings │  │- Conv  │   │
│  │ - Qwen      │  │ - Similarity │  │History │   │
│  └─────────────┘  └──────────────┘  └────────┘   │
│                                                     │
│  Endpoints:                                        │
│  POST /api/chat           - Enviar mensaje        │
│  POST /api/initialize     - Indexar documentos    │
│  POST /api/clear-session  - Limpiar historial    │
│  GET  /api/health         - Verificar estado     │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴──────────┐
         ↓                      ↓
    ┌──────────┐           ┌─────────┐
    │portfolio │           │README   │
    │.json     │           │.md      │
    └──────────┘           └─────────┘
```

---

## 🚀 PASO 1: Configurar el Backend

### 1.1 Instalar Dependencias

```bash
cd backend
npm install
```

### 1.2 Configurar Variables de Entorno

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env`:

```bash
GROQ_API_KEY=tu_groq_api_key_aqui
OPENAI_API_KEY=tu_openai_api_key_para_embeddings
PORT=5000
NODE_ENV=development
```

### 1.3 Obtener las Claves API

**Groq API:**
1. Ir a https://console.groq.com
2. Crear una cuenta
3. Generar una API key
4. Copiarla en `.env`

**OpenAI API** (para embeddings en ChromaDB):
1. Ir a https://platform.openai.com/api-keys
2. Crear una API key
3. Copiarla en `.env`

### 1.4 Iniciar el Servidor

```bash
npm run dev  # Con nodemon para auto-reload
# o
npm start    # Producción
```

Deberías ver:
```
🤖 RAG Chatbot Server running on port 5000
📚 Supported languages: en, fr, bm, ar
🔑 Groq API Key: configured
```

---

## 📚 PASO 2: Indexar Documentos en ChromaDB

### 2.1 Inicializar ChromaDB

Ejecutar el data loader:

```bash
node dataLoader.js
```

Esto:
1. Lee portfolio.json
2. Lee README.md
3. Crea documentos divididos por sección
4. Envía a ChromaDB para indexación
5. Genera embeddings

Deberías ver:
```
📚 Loading documents...
✅ Loaded 15 documents
🔄 Initializing ChromaDB...
✅ Indexed 15 documents
🎉 RAG system ready!
```

### 2.2 Verificar Estado

```bash
curl http://localhost:5000/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-03-09T10:30:00.000Z",
  "chromaStatus": "ready"
}
```

---

## 💻 PASO 3: Integrar ChatBot en React

### 3.1 Configurar Variables de Entorno React

En `frontend/.env`:

```bash
REACT_APP_CHAT_API_URL=http://localhost:5000/api
```

### 3.2 Instalación de Dependencias

```bash
npm install uuid
# Si no está instalado
```

### 3.3 Importar y Usar el ChatBot

En tu `App.jsx`:

```jsx
// 1. Importar el componente
import ChatBot from './components/ChatBot';

// 2. En el componente App, cerca del final (dentro del div principal):
<ChatBot lang={lang} isDark={dk} />

// El componente automáticamente:
// - Seguirá el idioma seleccionado (lang prop)
// - Adaptará el tema oscuro/claro (isDark prop)
// - Manejará la comunicación con el backend
// - Mantendrá el historial de conversación
```

### 3.4 Actualizar Imports en App.jsx

Descomenta la línea del ChatBot:

```jsx
{/* ChatBot RAG - Importar cuando esté listo */}
<ChatBot lang={lang} isDark={dk} />
```

---

## 🧪 Pruebas

### Prueba 1: Chat Básico en Inglés

**Frontend:**
1. Abre el portfolio
2. Haz clic en el botón 💬 (abajo a la derecha)
3. Pregunta: "What are Gniné's main projects?"

**Esperado:**
- El chatbot responde con información sobre los proyectos
- Cita la fuente: "According to my portfolio..."

### Prueba 2: Cambio de Idioma

1. Cambia a francés (FR en la navegación)
2. Pregunta: "Quels sont tes projets en IA?"

**Esperado:**
- Respuesta en francés
- El idioma se detecta automáticamente

### Prueba 3: Out of Scope

1. Pregunta: "¿Cuál es el significado de la vida?"

**Esperado:**
- Respuesta amable redirectionando al usuario
- "I don't have information about that topic, but I'd be happy to tell you about my AI projects..."

### Prueba 4: Historial de Conversación

1. Pregunta 1: "Tell me about Gniné"
2. Pregunta 2: "What technologies were used in Santé Connect?"

**Esperado:**
- El chatbot recuerda la conversación anterior
- Responde en contexto

---

## 🔧 Configuración Avanzada

### Cambiar Modelo Groq

En `backend/server.js`, modifica `MODELS`:

```javascript
const MODELS = {
  en: 'llama-3.3-70b-versatile',  // Cambiar de llama-3.1-8b-instant
  fr: 'llama-3.3-70b-versatile',
  bm: 'llama-3.3-70b-versatile',
  ar: 'allam-2-7b', // Especializado en árabe
};
```

**Modelos disponibles en Groq:**
- `llama-3.1-8b-instant` (rápido, económico)
- `llama-3.3-70b-versatile` (poderoso, más lento)
- `allam-2-7b` (especializado en árabe)
- `qwen/qwen3-32b` (multilingüe)

### Ajustar Número de Documentos Recuperados

En `backend/server.js`, función `retrieveRelevantDocuments`:

```javascript
async function retrieveRelevantDocuments(query, lang, topK = 5) { // Cambiar de 3
  // ...
}
```

### Cambiar Límite de Historial de Conversación

En `backend/server.js`, función `updateConversationHistory`:

```javascript
if (history.length > 16) { // Cambiar de 12 (8 cambios = 4 user + 4 assistant)
  history.splice(0, 2);
}
```

---

## 🌐 Despliegue en Producción

### Backend (Node.js)

**Opción 1: Render.com**
```bash
# 1. Push a GitHub
# 2. Conectar a Render.com
# 3. Configurar environment variables
# 4. Deploy automático
```

**Opción 2: Railway.app**
```bash
# 1. npm install -g @railway/cli
# 2. railway up
# 3. Configurar GROQ_API_KEY
```

**Opción 3: Heroku**
```bash
# 1. heroku create nombre-app
# 2. heroku config:set GROQ_API_KEY=tu_key
# 3. git push heroku main
```

### Frontend (React)

Actualizar `REACT_APP_CHAT_API_URL`:

```bash
# .env.production
REACT_APP_CHAT_API_URL=https://tu-backend.com/api
```

Desplegar con Vercel/Netlify:
```bash
npm run build
# Subir a tu plataforma de hosting
```

---

## 🐛 Resolución de Problemas

### Error: "GROQ_API_KEY not configured"

**Solución:**
```bash
1. Verificar que .env tiene GROQ_API_KEY
2. Reiniciar el servidor: npm run dev
3. Verificar que la API key es válida
```

### Error: "ChromaDB not initialized"

**Solución:**
```bash
1. Ejecutar: node dataLoader.js
2. Esperar a que se indexen los documentos
3. Verificar con: curl http://localhost:5000/api/health
```

### ChatBot no responde

**Solución:**
```bash
1. Verificar que el backend está corriendo: lsof -i :5000
2. Verificar CORS en backend (debe permitir tu frontend URL)
3. Revisar Network tab en DevTools
4. Ver logs en backend console
```

### Respuestas lentas

**Solución:**
```bash
1. Cambiar a modelo más rápido (llama-3.1-8b-instant)
2. Reducir topK en retrieveRelevantDocuments
3. Usar Groq CDN (automático)
```

---

## 📊 Monitoreo y Analytics

### Ver Logs del Servidor

```bash
# En desarrollo
npm run dev  # Muestra logs automáticamente

# En producción
heroku logs --tail
# o
railway logs
```

### Monitorear Consumo de API

**Groq Dashboard:**
- https://console.groq.com/account/billing

**Alertas sugeridas:**
- Más de 100 requests/minuto
- Token usage > presupuesto
- Response time > 5 segundos

---

## 🎯 Proximas Mejoras

1. **Persistencia de Conversaciones:**
   - Guardar en base de datos
   - Permitir continuar después de recargar

2. **Análisis de Sentimiento:**
   - Detectar si el usuario está satisfecho
   - Ajustar respuestas según ánimo

3. **Recomendaciones:**
   - Sugerir preguntas automáticamente
   - "You might also want to know..."

4. **Multilingual Search:**
   - Buscar en documentos en otros idiomas
   - Mejorar retrieval accuracy

5. **Feedback Loop:**
   - Usuarios califican respuestas
   - Mejorar training data

6. **Export Conversation:**
   - Descargar historial en PDF
   - Compartir conversación

---

## 📞 Support

**Problemas comunes:**
- https://github.com/groq/groq-python/issues
- https://discord.gg/groq

**Documentación:**
- Groq: https://console.groq.com/docs
- ChromaDB: https://docs.trychroma.com
- React: https://react.dev

---

## 📝 Archivos Creados

```
backend/
├── server.js              # Servidor principal Express + Groq
├── dataLoader.js          # Script para cargar documentos
├── package.json          # Dependencias
├── .env.example          # Variables de entorno template
└── data/
    └── portfolio.json    # Datos del portfolio

src/
├── components/
│   ├── ChatBot.jsx       # Componente React del chatbot
│   └── ChatBot.css       # Estilos CSS
└── App.jsx               # (Modificado) Integración del chatbot
```

---

¡Tu chatbot RAG está listo! 🚀
