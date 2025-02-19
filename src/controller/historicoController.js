const db  = require('../db/db');
const Joi = require('joi');

const historicoSchema = Joi.object({
    idHistorico: Joi.string().required(),
    id_Consulta: Joi.string().required(),
    formadepag: Joi.string().required(),
    dataHistorico: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
});

//Listar Histórico geral (teste)
exports.listarHistorico = async (req, res) => {
    try{
        const[result] = await db.query('SELECT * FROM historico');

        if (result.length === 0) {
            return res.status(404).json({ error: 'histórico não encontrado '});
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Listar o histórico por CPF
exports.listarHistoricoCpf = async (req, res) => {
    const { cpf } = req.params;
    try{
        const[result] = await db.query('SELECT * FROM historico WHERE CPF = ?', [cpf]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'histórico não encontrado '});
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Listar histórico por ID da consulta
exports.listarHistoricoIdConsulta = async (req, res) => {
    const { idConsulta } = req.params;

    try { 
        const [result] = await db.query('SELECT * FROM historico WHERE ID_CONSULTA = ?', [idConsulta]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'consulta não encontrada '});
        }
        res.json(result);
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
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar histórico:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Adicionar um novo histórico
exports.adicionarHistorico = async (req, res) => {
    const { idHistorico, id_Consulta, formadepag, dataHistorico, cpf } = req.body;

    const { error } = historicoSchema.validate({ idHistorico, id_Consulta, formadepag, dataHistorico, cpf });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const novoHistorico = { idHistorico, id_Consulta, formadepag, dataHistorico, cpf };

    try {
        await db.query('INSERT INTO historico SET ?', novoHistorico);
        res.json({ message: 'Histórico adicionado com sucesso' });

    } catch (err) {
        console.error('Erro ao adicionar histórico:', err);
        res.status(500).json({ error: 'Erro ao adicionar Histórico' });
    }
};

//Atualizar um histórico
exports.atualizarHistorico = async (req, res) => {
    const { idHistorico } = req.params;
    const { id_Consulta, formadepag, dataHistorico, cpf } = req.body;

    //Validação com Joi
    const { error }  = historicoSchema.validate({ idHistorico, id_Consulta, formadepag, dataHistorico, cpf });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const historicoAtualizado = { idHistorico, id_Consulta, formadepag, dataHistorico, cpf };

    try {
        const [result] = await db.query('SELECT * FROM historico WHERE idHistorico = ?', [idHistorico]);
        if (result.length === 0) {
            return res.status(404).json({error: 'Histórico não encontrado'});
        }
        await db.query('UPDATE historico SET ? WHERE idHistorico = ?', [historicoAtualizado, idHistorico]);
        res.json({ message: 'Historico atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar histórico', err);
        res.status(500).json({ error:   'Erro ao atualizar histórico' });
    }

};
   
//Deletar um histórico
exports.deletarHistorico = async (req, res) => {
    const { idHistorico } = req.params;

    try {
        const [result] = await db.query('SELECT * FROM historico WHERE idHistorico = ?', [idHistorico]);
        if (result.length === 0) {
            return res.status(404).json({error: 'Histórico não encontrado'});
        }
        await db.query('DELETE FROM historico WHERE idHistorico = ?', [idHistorico]);
        res.json({ message: 'histórico deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar histórico:', err);
        res.status(500).json({ error: 'Erro ao deletar histórico' });
    }
};