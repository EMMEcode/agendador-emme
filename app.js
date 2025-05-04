const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
console.log('🧪 MONGO_URI cargado:', process.env.MONGO_URI);


const Cita = require('./models/cita');
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
    console.log('📥 Datos recibidos en /reservar:', req.body);

    const { nombre, apellidos, telefono, doctor, fecha, hora } = req.body;

    if (!nombre || !apellidos || !telefono || !doctor || !fecha || !hora) {
      console.warn('⚠️ Faltan campos obligatorios en el formulario');
      return res.status(400).send('⚠️ Todos los campos son obligatorios.');
    }

    const nuevaCita = new Cita({ nombre, apellidos, telefono, doctor, fecha, hora });
    await nuevaCita.save();

    console.log('✅ Cita guardada con éxito en la base de datos');
    res.redirect('/confirmacion.html');
  } catch (error) {
    console.error('❌ Error al guardar la cita:', error);
    res.status(500).send('❌ Error interno del servidor.');
  }
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err.message);
    process.exit(1); // Detener app si no hay conexión
  });
// Ruta para consultar todas las citas (API)
app.get('/citas', async (req, res) => {
    try {
      const citas = await Cita.find().sort({ createdAt: -1 });
      res.json(citas);
    } catch (error) {
      console.error('❌ Error al obtener citas:', error);
      res.status(500).send('Error al obtener citas');
    }
  });
  
module.exports = app;
