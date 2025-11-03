const mongoose = require('mongoose');

// Definimos el Schema de Reseñas
const reviewSchema = new mongoose.Schema({
  // Referencia al videojuego al que pertenece esta reseña
  // Usa el nombre del modelo que definiste para tus juegos (ej. 'Game')
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Game', // IMPORTANTE: Asegúrate que 'Game' sea el nombre de tu modelo de juegos
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1, // Puntuación mínima
    max: 5, // Puntuación máxima
  },
  textoReseña: {
    type: String,
    required: true,
    trim: true,
  },
  horasJugadas: {
    type: Number,
    default: 0,
  },
  dificultad: {
    type: String,
    enum: ["Fácil", "Normal", "Difícil", "Muy Difícil", "Personalizada"],
    default: "Normal",
  },
  recomendaria: {
    type: Boolean,
    default: true,
  }
}, {
  // Esto agrega automáticamente:
  // fechaCreacion (createdAt)
  // fechaActualizacion (updatedAt)
  timestamps: true 
});

// Exportamos el modelo
// mongoose.model('NombreDelModelo', schema)
module.exports = mongoose.model('Review', reviewSchema);
