import React, { useState, useEffect } from 'react';
import { getNotas } from '../../funcoes';
import styles from '../css/NotasComponent.module.css';

const NotasComponent = ({ onNotasLoad, onRespond }) => {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const loadNotas = async () => {
            try {
                const data = await getNotas(false, 10);
                setNotas(data || []);
            } catch (error) {
                console.error("Erro ao buscar notas:", error);
            } finally {
                setLoading(false);
            }
        };
        loadNotas();
    }, [onNotasLoad]);

    useEffect(() => {
        if (notas.length > 0) {
            onRespond(notas[currentIndex].id);
        }
    }, [currentIndex, notas, onRespond]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % notas.length;
            console.log('ID da nota atual (próximo):', notas[newIndex]?.id);
            return newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex === 0 ? notas.length - 1 : prevIndex - 1;
            console.log('ID da nota atual (anterior):', notas[newIndex]?.id);
            return newIndex;
        });
    };

    const handleResponse = () => {
        if (notas.length > 0) {
            onRespond(notas[currentIndex].id); 
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div className={styles.carrossel}>
            <button className={styles.prev} onClick={prevSlide}>
                ❮
            </button>
            <div className={styles.fundo}></div>
            <div className={styles.meio}></div>
            <div className={styles.carrosselContent}>
                {notas.length > 0 ? (
                    <div className={styles.slide}>
                        <p><span className="usuario-nota">{notas[currentIndex].conteudo}</span></p>
                    </div>
                ) : (
                    <div className="nenhumaNota">
                        <p>Nenhuma nota encontrada</p>
                    </div>
                )}
            </div>
            <button className={styles.next} onClick={nextSlide}>
                ❯
            </button>
        </div>
    );
};

export default NotasComponent;