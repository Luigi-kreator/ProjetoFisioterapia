const db  = require('../db/db');
const Joi = require('joi');

const historicoSchema = Joi.object({
    idHistorico: Joi.string().required(),
    ID_CONSULTA: Joi.string().required(),
    formadepag: Joi.string().required(),
    dataHistorico: Joi.string().required(),
    CPF: Joi.string().length(11).required(),
})

//Listar Histórico geral (teste)
exports.listarHistorico = async (req, res) => {
    try{
        const[result] = await db.query('SELECT * FROM historico');

        if (result.length === 0) {
            return res.status(404).json({ error: 'histórico não encontrado '});
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Listar o histórico por CPF
exports.listarHistoricoCpf = async (req, res) => {
    const { CPF } = req.params;
    try{
        const[result] = await db.query('SELECT * FROM historico WHERE CPF = ?', [CPF]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'histórico não encontrado '});
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Listar histórico por ID da consulta
exports.listarHistoricoIdConsulta = async (req, res) => {
    const { ID_CONSULTA } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM historico WHERE ID_CONSULTA = ?', [ID_CONSULTA]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'consulta não encontrada '});
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar consulta:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Listar histórico por data
exports.listarHistoricoData = async (req, res) => {
    const { dataHistorico } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM historico WHERE dataHistorico = ?', [dataHistorico]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'histórico não encontrado'});
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Adicionar um novo histórico
exports.adicionarHistorico = async (req, res) => {
    const { idHistorico, ID_CONSULTA, formadepag, dataHistorico, CPF } = req.body;

    const { error } = historicoSchema.validate({ idHistorico, ID_CONSULTA, formadepag, dataHistorico, CPF });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const novoHistorico = { idHistorico, ID_CONSULTA, formadepag, dataHistorico, CPF };

    try {
        await db.query('INSERT INTO historico SET ?', novoHistorico);
        res.json({ message: 'Histórico adicionado com sucesso' });

    } catch (err) {
        console.error('Erro ao adicionar histórico:', err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
};

//Deletar um histórico
exports.deletarHistorico = async (req, res) => {
    const { idHistorico } = req.params;

    try {
        await db.query('DELETE FROM historico WHERE idHistorico = ?', [idHistorico]);
        res.json({ message: 'histórico deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar histórico:', err);
        res.status(500).json({ error: 'Erro ao deletar histórico' });
    }
};

//Atualizar um histórico
exports.atualizarHistorico = async (req, res) => {
    const { idHistorico, ID_CONSULTA, formadepag, dataHistorico, CPF } = req.body;


    //Validação com Joi
    const {error }  = historicoSchema.validate({ idHistorico, ID_CONSULTA, formadepag, dataHistorico, CPF });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const historicoAtualizado = { idHistorico, ID_CONSULTA, formadepag, dataHistorico, CPF };

    try {
        await db.query('UPDATE historico SET ? WHERE idHistorico = ?', [historicoAtualizado, idHistorico]);
        res.json({ message: 'Historico atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar histórico', err);
        res.status(500).json({ error:   'Erro ao atualizar histórico' });
    }

};
   