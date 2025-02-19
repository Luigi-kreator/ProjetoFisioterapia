const express = require('express');
const router = express.Router();
const consultaController = require('../controller/consultaController');

router.get('/consulta', consultaController.listarConsulta);
 
router.get('/consulta/:idConsulta', consultaController.listarConsultaId)
 
router.post('/consulta', consultaController.adicionarConsulta)
 
router.put('/consulta/:ID_CONSULTA', consultaController.atualizarConsulta)
 
router.delete('/consulta/:ID_CONSULTA', consultaController.deletarConsulta)

module.exports = router;