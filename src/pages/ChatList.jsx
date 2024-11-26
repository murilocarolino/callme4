import React, { useEffect, useState } from 'react';
import api from '../services/apiService'; // Importa o serviço de API

const Chat = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar clientes
    const fetchClients = async () => {
        try {
            const response = await api.get('/usuarios'); // Rota para obter todos os clientes
            setClients(response.data); // Armazena os clientes
        } catch (error) {
            console.error('Failed to fetch clients:', error);
            setError('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients(); // Chama a função para buscar clientes ao montar o componente
    }, []);

    return (
        <div>
            <h1>Chat</h1>
            {loading ? (
                <p>Loading clients...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>Clientes</h2>
                    <ul>
                        {clients.map(client => (
                            <li key={client.id}>{client.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Chat;