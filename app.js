const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Cita = require('./models/cita'); // Modelo mongoose

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para datos del formulario
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta pública

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.send(' Pong desde el servidor');
});

// Ruta POST para guardar la cita
app.post('/reservar', async (req, res) => {
  try {
    const { nombre, apellidos, telefono, doctor, fecha, hora } = req.body;

    if (!nombre || !apellidos || !telefono || !doctor || !fecha || !hora) {
      return res.status(400).send('⚠️ Todos los campos son obligatorios');
    }

    const nuevaCita = new Cita({ nombre, apellidos, telefono, doctor, fecha, hora });
    await nuevaCita.save();

    // Redirige a confirmacion.html si todo va bien
    res.redirect('/confirmacion.html');

  } catch (error) {
    console.error('❌ Error al guardar la cita:', error);
    res.status(500).send('❌ Error interno del servidor');
  }
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch((err) => console.error('❌ Error en conexión MongoDB:', err));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  module.exports = app;

});



