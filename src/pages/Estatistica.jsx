import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import styles from "../css/Estatisticas.module.css";

const Estatistica = () => {
    return (
        <div className={styles.mainContent}>
            <h3 className={styles.title}>Plano de atividades</h3>
            <Sidebar />
            <div className={styles.activitiesPlan}>
                <ul className={styles.checkbox}>
                    <li className={styles.paiCheck}>
                        <input type="checkbox" className={styles.text} /> Aplicar e interpretar testes psicológicos.
                    </li>
                    <li className={styles.paiCheck}>
                        <input type="checkbox" className={styles.text} /> Avaliações iniciais e planos de tratamento.
                    </li>
                    <li className={styles.paiCheck}>
                        <input type="checkbox" className={styles.text} /> Preparar estudos de caso com base nos atendimentos realizados.
                    </li>
                </ul>
            </div>

            <h3 className={styles.titles}>Relatório de atividades</h3>
            <div className={styles.activitiesReport}>
                <button className={styles.AddAnot} >Manter um diário de observações e reflexões sobre práticas observadas
                    <div className={styles.buttonAdd}>Adicionar anotação +</div>
                </button>
                <button className={styles.not} >Ver anotações anteriores</button>
            </div>

        </div>
    );

};

export default Estatistica;
