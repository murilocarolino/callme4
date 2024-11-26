import React, { useEffect, useRef, useState } from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        // Conectar ao servidor WebSocket
        ws.current = new WebSocket('ws://localhost:8080');

        ws.current.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        // Limpar a conexão WebSocket ao desmontar o componente
        return () => {
            ws.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (input) {
            ws.current.send(input);
            setInput('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Chat WebSocket</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
}

export default App;