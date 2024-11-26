// src/components/ChatList.jsx

import React, { useEffect, useState } from 'react';
import { fetchChats } from '../services/apiService'; // Verifique se o caminho está correto

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadChats = async () => {
            try {
                const data = await fetchChats();
                setChats(data.data); // Ajuste conforme a estrutura do seu JSON
            } catch (err) {
                setError(err.message);
            }
        };

        loadChats();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Chats</h1>
            <ul>
                {chats.map(chat => (
                    <li key={chat.id}>
                        {chat.title} {/* Ajuste conforme a estrutura do seu chat */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;