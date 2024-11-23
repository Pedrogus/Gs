const express = require('express');
const router = express.Router();
const viagemController = require('../../controllers/viagemController');

router.post('/iniciar-viagem', viagemController.iniciarViagem);

module.exports = router;
