const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  doctor: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  }
}, {
  timestamps: true // ⏱️ Agrega createdAt y updatedAt automáticamente
});

// Exportamos el modelo, MongoDB usará la colección "citas" automáticamente
module.exports = mongoose.model('Cita', citaSchema);
