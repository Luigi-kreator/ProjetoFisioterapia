const db = require('../db/db'); //Módulo de conexão com o banco de dados
const Joi = require('joi'); //Biblioteca de validação de dados

const registroSchema = Joi.object({
    id_agendamento: Joi.string().required(),
    statusRegistro: Joi.string().required(),
    dataRegistro: Joi.date().required(),
    id_consulta: Joi.string().required(),
    cpf: Joi.string().length(11).required()
});

exports.listarRegistroCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM registro WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return  res.status(404).json({ error: 'Registro de agenda não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar registro de agenda:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.listarRegistrodata = async (req, res) => {
    const { data } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM registro WHERE cpf = ?', [data]);
        if (result.length === 0) {
            return  res.status(404).json({ error: 'Data do Registro de agenda não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar data do registro de agenda:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.adicionarRegistro = async (req, res) => {
    const { id_agendamento, statusRegistro, dataRegistro, id_consulta, cpf } = req.body;

    // Validação de dados
    const { error } = registroSchema.validate({ id_agendamento, statusRegistro, dataRegistro, id_consulta, cpf });
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    
    try {
        

        const novoRegistro = { id_agendamento, statusRegistro, dataRegistro, id_consulta, cpf };
        await db.query ('INSERT INTO registro SET ?', novoRegistro);
        
        res.json({message: 'Registro de agenda adicionado com sucesso'});
    } catch (err) {
        console.error('Erro ao adicionar registro de Agendamento:', err);
        res.status(500).json({ error: 'Erro ao adicionar registro de Agendamento' });
    }
};

exports.atualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { id_agendamento, statusRegistro, dataRegistro, id_consulta, cpf } = req.body;

    //Validação de dados
    const { error } = clienteSchema.validate({  id_agendamento, statusRegistro, dataRegistro, id_consulta, cpf });
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }

    try {

        const registroAtualizado = {  id_agendamento, statusRegistro, dataRegistro, id_consulta, cpf };
        await db.query('UPDATE registro SET ? WHERE id_agendamento = ?', [registroAtualizado, id]);

        res.json({ message: 'Registro de agenda atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar Registro de agenda:', err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

exports.deletarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM registro WHERE id_agendamento = ?', [id]);
        res.json({ message: 'Registro de agenda deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar registro', err);
        res.status(500).json({ error: 'Erro ao deletar registro de agenda'});
    }
};