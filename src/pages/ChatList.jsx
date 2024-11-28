import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const ChatList = () => {
    const { roomId } = useParams();
    const chatRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    let zc;

    useEffect(() => {
        if (!roomId) {
            console.error("roomId is empty");
            return;
        }

        const appId = 163716781;
        const serverSecret = "6f8f726c3beac6d31e36e72023e9cbbc";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            Date.now().toString(),
            "Murilo Carolino"
        );

        zc = ZegoUIKitPrebuilt.create(kitToken);

        if (zc && typeof zc.joinRoom === 'function') {
            zc.joinRoom({
                container: chatRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.Chat,
                },
                onMessageReceived: (msg) => {
                    setMessages((prevMessages) => [...prevMessages, msg]);
                },
            });
        } else {
            console.error("Erro ao criar a instância do ZegoUIKitPrebuilt.");
        }

        return () => {
            if (zc && typeof zc.leaveRoom === 'function') {
                zc.leaveRoom();
            }
        };
    }, [roomId]); // Dependência para garantir que o efeito seja executado quando o roomId mudar

    const sendMessage = () => {
        if (message.trim() && zc && typeof zc.sendMessage === 'function') {
            zc.sendMessage({
                content: message,
                sender: "User  ", // Nome do usuário
            });
            setMessage(""); // Limpa o campo de entrada após enviar
        }
    };

    return (
        <div>
            <div ref={chatRef} style={{ height: '400px', overflowY: 'scroll' }} />
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.sender}: {msg.content}</li>
                ))}
            </ul>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

export default ChatList;