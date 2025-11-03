const express = require('express');
const router = express.Router();
const Game = require('../models/gameModel');

// ✅ Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    console.error("❌ Error al obtener juegos:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Crear un nuevo juego
router.post('/', async (req, res) => {
  try {
    console.log("📩 Datos recibidos del frontend:", req.body); // 🔍 Ver qué llega desde React

    const newGame = new Game(req.body);
    await newGame.save();

    console.log("✅ Juego guardado correctamente:", newGame);
    res.json(newGame);
  } catch (error) {
    console.error("❌ Error al crear juego:", error.message); // 🔍 Mostrar error exacto
    res.status(400).json({ message: error.message });
  }
});

// ✅ Eliminar un juego
router.delete('/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    console.log(`🗑️ Juego eliminado con ID: ${req.params.id}`);
    res.json({ message: 'Juego eliminado correctamente' });
  } catch (err) {
    console.error("❌ Error al eliminar juego:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
