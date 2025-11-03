const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// --- 1. CONFIGURACIÓN INICIAL ---
// Cargar variables de entorno PRIMERO
dotenv.config();

// Crear la instancia de la aplicación
const app = express(); // <--- ¡AQUÍ ES DONDE DEBE ESTAR!

// --- 2. MIDDLEWARES ---
// HABILITAR CORS (antes de las rutas)
app.use(
  cors({
    origin: "http://localhost:5173", // Tu frontend de Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Permitir que Express entienda JSON
app.use(express.json());

// --- 3. RUTAS ---
// Ahora sí puedes usar 'app'
app.use('/api/juegos', gameRoutes); // Ajustado a tu doc de requisitos
app.use('/api/reseñas', reviewRoutes);

// --- 4. CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB correctamente'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// --- 5. INICIAR SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
