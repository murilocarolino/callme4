const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/v1/callme/usuarios', (req, res) => {
    const clients = [
        { id: 1, name: 'Cliente 1' },
        { id: 2, name: 'Cliente 2' },
        // Adicione mais clientes conforme necessário
    ];
    res.json(clients);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});