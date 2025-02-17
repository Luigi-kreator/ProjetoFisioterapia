const express = require('express');
const router = express.Router();
const consultaController = require('../controller/consultaController');

router.get('/consulta', consultaController.listarConsulta);
 
router.get('consulta/:id', consultaController.listarConsultaId)
 
router.post('/consulta', consultaController.adicionarConsulta)
 
router.put('/consulta/:id', consultaController.atualizarConsulta)
 
router.delete('/consulta/:id', consultaController.deletarConsulta)

module.exports = router;