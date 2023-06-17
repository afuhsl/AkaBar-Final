const express = require('express');
const app = express();

let envio = require('../controllers/correoController');

app.post('/envio', envio.envioCorreo);
app.post('/envioCita', envio.envioCita);

module.exports = app;