const db = require('../db/db'); //Módulo de conexão com o banco de dados
const Joi = require('joi'); //Biblioteca de validação de dados

const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    idade: Joi.string().required(),
    telefone: Joi.string().required(),
    nome: Joi.string().required(),
    email: Joi.string().required(),
    senha: Joi.string().min(6).required()
});
 
exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
} 
 
exports.ListarClientesNome = async (req, res) => {
    const { nome } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE NOME = ?', [nome]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado'})
        };
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar nome do cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
}
 
exports.ListarClientesCPF = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'cliente não encontrado'})
        };
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
}
 
exports.adicionarCliente = async (req, res) => {
    const { cpf, idade, telefone, nome, email, senha } = req.body;
    const { error } = clienteSchema.validate ({ cpf, idade, telefone, nome, email, senha});
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    const novoCliente = {cpf, idade, telefone, nome, email, senha};
    try {
        await db.query('INSERT INTO cliente SET ?', novoCliente);
        res.json({ message: 'Cliente adicionado com sucesso!' });
    } catch (err) {
        console.error('Erro ao adicionar Cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
};
 
exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params;
    const { idade, telefone, nome, email, senha } = req.body;

    //Validação de dados
    const { error } = clienteSchema.validate({ cpf, idade, telefone, nome, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }

    try {

        const clienteAtualizado = { idade, telefone, nome, email, senha };
        await db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf]);

        res.json({ message: 'Cliente atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};
 
exports.deletarCliente = async (req, res) => {
    const  { cpf }  = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({error: 'Cliente não encontrado'});
        }
        await db.query('DELETE FROM cliente WHERE CPF = ?', [cpf]);
        res.json({ message: 'cliente deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};

//APURAR ERRO CLIENTE --> PARA DELETAR E PARA ATUALIZAR