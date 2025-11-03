const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Importamos el modelo de Reseña

// --- 1. GET /api/reseñas ---
// Obtener TODAS las reseñas
router.get('/', async (req, res) => {
  try {
    // .populate('juegoId') trae la info del juego (ej. el título)
    const reseñas = await Review.find().populate('juegoId', 'titulo imagenPortada');
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reseñas', error: err.message });
  }
});

// --- 2. GET /api/reseñas/juego/:juegoId ---
// Obtener todas las reseñas de UN juego específico
router.get('/juego/:juegoId', async (req, res) => {
  try {
    const reseñas = await Review.find({ juegoId: req.params.juegoId });
    if (reseñas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reseñas para este juego' });
    }
    res.json(reseñas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reseñas del juego', error: err.message });
  }
});

// --- 3. POST /api/reseñas ---
// Escribir una nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaReseña = new Review({
      juegoId: req.body.juegoId,
      puntuacion: req.body.puntuacion,
      textoReseña: req.body.textoReseña,
      horasJugadas: req.body.horasJugadas,
      dificultad: req.body.dificultad,
      recomendaria: req.body.recomendaria,
    });

    const reseñaGuardada = await nuevaReseña.save();
    res.status(201).json(reseñaGuardada); // 201 = Creado exitosamente
  } catch (err) {
    res.status(400).json({ message: 'Error al crear la reseña', error: err.message }); // 400 = Bad Request
  }
});

// --- 4. PUT /api/reseñas/:id ---
// Actualizar una reseña existente
router.put('/:id', async (req, res) => {
  try {
    const reseñaActualizada = await Review.findByIdAndUpdate(
      req.params.id, // ID de la reseña a actualizar
      req.body,      // La nueva información
      { new: true, runValidators: true } // {new: true} devuelve el doc actualizado
    );

    if (!reseñaActualizada) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json(reseñaActualizada);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar la reseña', error: err.message });
  }
});

// --- 5. DELETE /api/reseñas/:id ---
// Eliminar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const reseñaEliminada = await Review.findByIdAndDelete(req.params.id);

    if (!reseñaEliminada) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json({ message: 'Reseña eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error: err.message });
  }
});


module.exports = router;
