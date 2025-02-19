const db = require('../db/db'); //Módulo de conexão com o banco de dados
const Joi = require('joi');
 
const consultaSchema = Joi.object({
    ID_CONSULTA: Joi.string().required(),
    tipo: Joi.string().required(),
    SERVIÇO: Joi.string().required(),
    valor: Joi.string().required()
});
 
            //FUNÇÃO PARA LISTAR CONSULTAS GERAIS
 
exports.listarConsulta = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM consulta');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar consultas:', err);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};
 
            //FUNÇÃO PARA LISTAR CONSULTAS POR ID
 
exports.listarConsultaId = async (req, res) => {
    const { ID_CONSULTA } = req.params;
    try {
        const [result] = await db.query(`SELECT * FROM consulta WHERE id_Consulta = ?`, [ID_CONSULTA])
        if (result.length === 0) {
            return res.status(404).json({ error: `consulta não encontrada` })
        }
        res.json(result);
    } catch (err) {
        console.error(`Erro ao buscar consulta:`, err);
        res.status(500).json({ error: `Erro interno so servidor` })
    }
};
 
            //FUNÇÃO PARA ADICIONAR CONSULTAS
 
exports.adicionarConsulta = async (req, res) => {
    const {  ID_CONSULTA, tipo, SERVIÇO, valor } = req.body;
    const { error } = consultaSchema.validate({  ID_CONSULTA, tipo,SERVIÇO, valor })
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const novaConsulta = {  ID_CONSULTA, tipo,SERVIÇO, valor };
        await db.query(`INSERT INTO consulta SET ?`, novaConsulta);
        res.json({ message: `consulta adicionada com sucesso` });
    } catch (err) {
        console.error(`erro ao adicionar consulta :`, err);
        res.status(500).json({ error: `erro ao adicionar consulta` });
    }
};
 
            //FUNÇÃO PARA ATUALIZAR CONSULTAS
 
exports.atualizarConsulta = async (req, res) => {
    const { ID_CONSULTA } = req.params;
    const { tipo, SERVIÇO, valor } = req.body
    const { error } = consultaSchema.validate({ ID_CONSULTA, tipo, SERVIÇO, valor })
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
 
    }
    try {
        const consultaAtualizada = { ID_CONSULTA, tipo, SERVIÇO, valor };
        await db.query(`UPDATE consulta SET ? WHERE ID_CONSULTA = ?`, [consultaAtualizada, ID_CONSULTA])
        res.json({ message: `consulta atualiza com sucesso` })
 
    } catch (err) {
        console.error(`erro ao atualizar consulta:`, err);
        res.status(500).json({ error: `erro ao atualizar consulta` })
    }
};
 
            //FUNÇÃO PARA DELETAR CONSULTAS
 
exports.deletarConsulta = async (req, res) => {
    const { ID_CONSULTA } = req.params;
    try {
        const [result] = await db.query(`SELECT * FROM consulta WHERE ID_CONSULTA = ?`, [ID_CONSULTA]);
        if (result.length === 0) {
            return res.status(404).json({ error: `consulta não encontrado` })
        }
        await db.query(`DELETE FROM consulta WHERE ID_CONSULTA =?`, [ID_CONSULTA]);
        res.json({ message: `consulta deletada com sucesso` })
    } catch (err) {
        console.error(`Erro ao deletar consulta:`, err);
        res.status(500).json({ erro: `Erro ao deletar consulta` })
    }
};