const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Cita = require('./models/cita'); // Modelo de Mongoose

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de prueba
app.get('/ping', (req, res) => {
  res.send('📡 Pong desde el servidor');
});

// Ruta POST para guardar la cita
app.post('/reservar', async (req, res) => {
    try {
      const { nombre, apellidos, telefono, doctor, fecha, hora } = req.body;
  
      if (!nombre || !apellidos || !telefono || !doctor || !fecha || !hora) {
        return res.status(400).send('⚠️ Todos los campos son obligatorios.');
      }
  
      const nuevaCita = new Cita({ nombre, apellidos, telefono, doctor, fecha, hora });
      await nuevaCita.save();
  
      res.redirect('/confirmacion.html'); // ✅ Esto sí debe estar dentro del try
    } catch (error) {
      console.error('❌ Error al guardar la cita:', error);
      res.status(500).send('❌ Error interno del servidor.');
    }
  });
  
// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Exportar la app para usarla en server.js
module.exports = app; // ✅ Correcto
