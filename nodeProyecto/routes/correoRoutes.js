const express = require('express');
const app = express();
const router = express.Router();


let envio = require('../controllers/correoController');

router.post('/envio', envio.envioCorreo);
router.post('/envioCita', envio.envioCita);

router.get('*', (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html")
});


  module.exports = router;