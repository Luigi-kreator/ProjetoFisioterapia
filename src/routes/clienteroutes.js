const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clientecontroller');

//Rota para listar Clientes
router.get('/Clientes', clienteController.listarClientes);

//Rota para listar Clientes por Nome
router.get('/Clientes/:nome', clienteController.ListarClientesNome);

//Rota para listar Clientes por CPF
router.get('/Cliente/:cpf', clienteController.ListarClientesCPF);

//Rota para adicionar um novo Cliente
router.post('/Clientes/', clienteController.adicionarCliente);

//Rota para Atualizar um Cliente
router.put('/Clientes/:cpf', clienteController.atualizarCliente);

//Rota para deletar um Cliente
router.delete('/Clientes/:cpf', clienteController.deletarCliente);
module.exports = router;