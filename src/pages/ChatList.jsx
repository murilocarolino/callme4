// import React, { useState, useEffect } from 'react';
// import { getDatabase, ref, push, onValue } from 'firebase/database';
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyBP1Spabyka90r29lNGavIZUbG0CmGf7ik",
//     authDomain: "callme-chat-9277c.firebaseapp.com",
//     databaseURL: "https://callme-chat-9277c-default-rtdb.firebaseio.com",
//     projectId: "callme-chat-9277c",
//     storageBucket: "callme-chat-9277c.firebasestorage.app",
//     messagingSenderId: "948644736433",
//     appId: "1:948644736433:web:ada741a16a9bbbb8e1e190"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const Chat = ({ chatId }) => {
//     const [novaMensagem, setNovaMensagem] = useState('');
//     const [mensagens, setMensagens] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [usuario, setUsuario] = useState({ nome: '', foto: '' });
    
//     const id_cliente = localStorage.getItem('id_cliente');

//     // Verifique se id_cliente e chatId estão definidos
//     if (!id_cliente || !chatId) {
//         return <div>Erro: ID do cliente ou Chat ID não estão definidos.</div>;
//     }

//     const chatIdUnico = `C${id_cliente}_U${chatId}`;

//     useEffect(() => {
//         const chatRef = ref(database, `chats/${chatIdUnico}/conversa`);
//         const mensagensListener = onValue(chatRef, (snapshot) => {
//             if (snapshot.exists()) {
//                 const data = snapshot.val();
//                 const mensagensArray = Object.values(data);
//                 const mensagensFiltradas = mensagensArray.filter(msg =>
//                     msg.id_cliente === id_cliente || msg.id_usuario === chatId
//                 );
//                 setMensagens(mensagensFiltradas);
//             }
//             setLoading(false);
//         });

//         return () => {
//             mensagensListener();
//         };
//     }, [chatIdUnico, id_cliente, chatId]);

//     const enviarMensagem = () => {
//         if (novaMensagem.trim() === '') return; // Verifique se a mensagem não está vazia

//         const mensagem = {
//             id_cliente,
//             id_usuario: chatId,
//             texto: novaMensagem,
//             timestamp: Date.now(),
//         };

//         const chatRef = ref(database, `chats/${chatIdUnico}/conversa`);
//         push(chatRef, mensagem)
//             .then(() => {
//                 setNovaMensagem(''); // Limpa o campo de entrada após o envio
//             })
//             .catch((error) => {
//                 console.error('Erro ao enviar mensagem:', error);
//             });
//     };

//     if (loading) {
//         return <div>Carregando mensagens...</div>;
//     }

//     return (
//         <div>
//             <h2>Chat com {usuario.nome}</h2>
//             <img src={usuario.foto} alt={usuario.nome} />
//             <div>
//                 {mensagens.map((msg, index) => (
//                     <div key={index} className={msg.id_cliente === id_cliente ? 'minha-mensagem' : 'mensagem-recebida'}>
//                         <p>{msg.texto}</p>
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={novaMensagem}
//                 onChange={(e) => setNovaMensagem(e.target.value)}
//                 placeholder="Digite sua mensagem..."
//             />
//             <button onClick={enviarMensagem}>Enviar</button>
//         </div>
//     );
// };

// export default Chat;

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