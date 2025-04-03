const express = require('express');
const router = express.Router();
const registroController = require('../controller/registroController');

//Rota para listar um registro de agenda pelo CPF do paciente
router.get('/registro/:cpf', registroController.listarRegistroCpf);

//Rota para listar um registro de agenda pela DATA
router.get('/registro/data/:data', registroController.listarRegistrodata);

//Rota para adicionar um registro de agenda
router.post('/registroadd', registroController.adicionarRegistro);

//Rota para atualizar um registro de agenda
router.put('/registroatt/id_agendamento', registroController.atualizarRegistro);

//Rota para deletar um registro de agenda
router.delete('registrodel/:id_agendamento', registroController.deletarRegistro);

module.exports = router;