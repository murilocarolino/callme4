import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import styles from '../css/MenuScreen.module.css';
import NotasComponent from "../components/NotasComponent";
import { AuthContext } from "../../Contexts/AuthContext";

const MenuScreen = ({ navigateToChat }) => {
    const [showPopSquare, setShowPopSquare] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [response, setResponse] = useState('');
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const [showWriteSlide, setShowWriteSlide] = useState(false);
    const [showRedSquare, setShowRedSquare] = useState(false);
    const [moveWriteSlide, setMoveWriteSlide] = useState(false); 
    const { auth, setAuth } = useContext(AuthContext);
    const infoUser  = auth.user;
    const [inputResponder, setInputResponder] = useState(''); // Novo estado para o inputResponder


    


  const handleResponderClick = (id) => {
    setCurrentNoteId(id); // Atualiza o ID da nota atual
    setMoveWriteSlide(true); 
    setShowRedSquare(true); 
    setShowInput(false);
};
    const handleWriteClick = () => {
        setMoveWriteSlide(false); 
        setShowWriteSlide(true);
        setShowInput(true); 
        setResponse(''); 
        setCurrentNoteId(null); 
        setShowRedSquare(false); 
    };

    const handleIconClick = async () => {
        setShowPopSquare(true);
        setShowInput(false);

        const conteudo = response;
        const idNota = currentNoteId;


     

        const json = {
            conteudo,
            idNota,
            idUsuario: infoUser .id
        };

        console.log('Dados enviados para a API:', json);
       

        try {
            if (currentNoteId) {
                const result = await postResposta(json);
                console.log('Resultado da resposta:', result);

                if (result.status && result.status === true) {
                    console.log('Resposta enviada com sucesso!');
                    setShowPopSquare(false); 
                } else {
                    console.log('Erro ao enviar resposta:', result.message || result.error || result.data);
                }
            } else {
                const result = await postNovaNota(json);
                console.log('Resultado da criação da nova nota:', result);

                if (result.status && result.status === true) {
                    console.log('Nova nota criada com sucesso!');
                    setShowPopSquare(false);  

                    setResponse(''); 
                    setShowWriteSlide(false); 
                    setShowRedSquare(false);  
                } else {
                    console.log('Erro ao criar nova nota:', result.message || result.error || result.data);
                }
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const postResposta = async (json) => {
        try {
            const response = await fetch('http://localhost:3000/v1/callme/notaresposta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json),
            });

            const data = await response.json();
            console.log('Resposta da API (resposta):', data); 
            return data;
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
            return { success: false, error: error.message };
        }
    };

    const postNovaNota = async (json) => {
        try {
            const response = await fetch('http://localhost:3000/v1/callme/nota', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(json),
            });
    
            const data = await response.json();
            console.log('Resposta da API (nova nota):', data); 
            return data;
        } catch (error) { // Corrigido aqui
            console.error('Erro na criação da nova nota:', error);
            return { success: false, error: error.message };
        }
    };

    const handleInputResponderChange = (e) => {
        setInputResponder(e.target.value); // Atualiza o estado com o valor do input
    };

    const handleSendResponder = async () => {
        const json = {
            conteudo: inputResponder,
            idNota: currentNoteId || 0, // Use um valor padrão se currentNoteId for null
            idUsuario: infoUser .id
        };
    
        console.log('Dados enviados para a API (responder):', json);
    
        try {
            const result = await postResposta(json);
            console.log('Resultado do envio da resposta:', result);
    
            if (result.status && result.status === true) {
                console.log('Resposta enviada com sucesso!');
                setInputResponder(''); // Limpa o input após o envio
                setShowRedSquare(false); // Oculta o quadrado vermelho
            } else {
                console.log('Erro ao enviar resposta:', result.message || result.error || result.data);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };
    useEffect(() => {
        let timer;
        if (showPopSquare) {
            timer = setTimeout(() => {
                setShowPopSquare(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [showPopSquare]);

    return (
        <div className={styles.menuContainer}>
            <Sidebar selectedPageIndex={1} navigateToChat={navigateToChat} />

            {!showWriteSlide && (
                <NotasComponent onRespond={handleResponderClick} />
            )}

            <div className={styles.botoes}>
                <div className={styles.botaoContainer}>
                    <button className={styles.postar} onClick={handleWriteClick}><p>Escrever Nota</p></button>
                    <button className={styles.responder} onClick={handleResponderClick}><p>Responder Nota</p></button>
                </div>

                <div className={`${styles.popSquare} ${showPopSquare ? styles.fadeIn : styles.fadeOut}`}>
                    <p className={styles.popUp}>Ver sua resposta!</p>
                </div>
            </div>

            <div className={styles.fundoSlide}></div>
            <div className={styles.meioSlide}></div>

            {showWriteSlide && (
                <div className={`${styles.writeSlide} ${moveWriteSlide ? styles.moveLeft : ''}`}>
                    <textarea
                        className={styles.writeInput}
                        type="text"
                        placeholder="Escreva sua nota..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className={styles.iconEnviar}
                        onClick={handleIconClick}
                    />
                </div>
            )}

            {showRedSquare && (
                <div className={styles.redSquare}>
                    <input
                        type="text"
                        className={styles.inputResponder}
                        value={inputResponder}
                        onChange={handleInputResponderChange} // Atualiza o estado ao digitar
                    />
                    <button onClick={handleSendResponder}>Enviar</button> {/* Botão para enviar a resposta */}
                </div>
            )}
        </div>
    );
};

export default MenuScreen;