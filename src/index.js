require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./db/db');

const clienteRoutes = require('./routes/clienteroutes');
const consultaRoutes = require('./routes/consultaroutes');
const historicoRoutes = require('./routes/historicoroutes');
const regristroRoutes = require('./routes/registroroutes');
const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
};

const app = express();
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.get(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

app.use('/', clienteRoutes);
app.use('/', consultaRoutes);
app.use('/', historicoRoutes);
app.use('/', regristroRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu Errado!');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});