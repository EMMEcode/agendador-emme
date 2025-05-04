// server.js
const app = require('./app');

// Railway asigna automáticamente el puerto en la variable de entorno PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
