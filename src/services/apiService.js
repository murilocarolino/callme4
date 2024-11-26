
const API_BASE_URL = 'http://localhost:3000/v1/callme'; 

export const fetchChats = async () => {
    const response = await fetch(`${API_BASE_URL}/chats`);
    if (!response.ok) {
        throw new Error('Erro ao buscar chats');
    }
    return await response.json();
};

export const fetchChatById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/chat/${id}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar chat');
    }
    return await response.json();
};

export const createChat = async (chatData) => {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
    });
    if (!response.ok) {
        throw new Error('Erro ao criar chat');
    }
    return await response.json();
};

