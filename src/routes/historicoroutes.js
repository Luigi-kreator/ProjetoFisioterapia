const express = require('express');
const router = express.Router();
const historicoController  = require('../controller/historicoController');

router.get('/historico', historicoController.listarHistorico);

router.get('/historico/:cpf', historicoController.listarHistoricoCpf);

router.get('/historico/consulta/:idConsulta', historicoController.listarHistoricoIdConsulta);

router.get('/historico/data/:dataHistorico', historicoController.listarHistoricoData);

router.post('/historico', historicoController.adicionarHistorico);

router.put('/historico/:idHistorico', historicoController.atualizarHistorico);

router.delete('/historico/:idHistorico', historicoController.deletarHistorico);

module.exports = router;