const express = require('express');
const router = express.Router();
const historicoController  = require('../controller/historicoController');

router.get('historico', historicoController.listarHistorico);

router.get('historico/:cpf', historicoController.listarHistoricoCpf);

router.get('historico/:IdConsulta', historicoController.listarHistoricoIdConsulta);

router.get('historico/:historicoData', historicoController.listarHistoricoData);

router.post('historico', historicoController.adicionarHistorico);

router.delete('historico/:idHistorico', historicoController.deletarHistorico);

router.put('historico/:idHistorico', historicoController.atualizarHistorico);

module.exports = router;