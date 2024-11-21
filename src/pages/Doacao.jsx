import React, { useState } from "react";
import imgGallery from '../importsGallery.json'; // Ajuste o caminho conforme necessário
import Sidebar from '../components/Sidebar';
import styles from '../css/Doacao.module.css';

const Doacao = () => {
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [selectedButton, setSelectedButton] = useState(null);
    const [currentPage, setCurrentPage] = useState("home"); // Estado para alternar entre páginas

    const handleButtonClick = (amount, buttonType) => {
        setSelectedAmount(amount);
        setSelectedButton(buttonType);
    };

    const handleCustomAmountChange = (event) => {
        const amount = parseFloat(event.target.value) || 0;
        setSelectedAmount(amount);
        setSelectedButton(null);
    };

    const getProgressPercentage = () => {
        if (selectedAmount >= 20) return 100;
        return (selectedAmount / 20) * 100;
    };

    const handlePixClick = () => {
        setCurrentPage("pix"); // Muda para a página PIX
    };

    const handleBackClick = () => {
        setCurrentPage("home"); // Volta para a página inicial
    };

    return (
        <div className={styles.doacao}>
            <Sidebar />
            <h1 className={styles.h1}>Doe para o callme</h1>
            <h2 className={styles.h2}>Ajude ONG's de psicologia e pessoas necessitadas! Dê um apoio para nossa plataforma:</h2>

            <div>
                {currentPage === "home" && ( // Tela inicial
                    <div>
                        <div className={styles.donationOptions}>
                            <div className={styles.donationButtonsContainer}>
                                <button
                                    className={`${styles.donationButton} ${selectedButton === '5' ? styles.selected : ''}`}
                                    onClick={() => handleButtonClick(5, '5')}>
                                    <h3 className={styles.h3}> Doe 5 reais </h3>
                                </button>
                                <button
                                    className={`${styles.donationButton} ${selectedButton === '10' ? styles.selected : ''}`}
                                    onClick={() => handleButtonClick(10, '10')}>
                                    <h3 className={styles.h3}> Doe 10 reais </h3>
                                </button>
                                <button
                                    className={`${styles.donationButton} ${selectedButton === '15' ? styles.selected : ''}`}
                                    onClick={() => handleButtonClick(15, '15')}>
                                    <h3 className={styles.h3}> Doe 15 reais </h3>
                                </button>
                            </div>

                            <div className={styles.customAmountContainer}>
                                <div className={styles.groupInput}>
                                    <label className={styles.customAmountLabel}>
                                        <h4 className={styles.h4}> Adicione o valor que achar necessário:</h4>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="R$"
                                        onChange={handleCustomAmountChange}
                                        className={styles.customAmountInput}
                                    />
                                </div>
                                <button
                                    className={`${styles.donationButton2} ${selectedButton === '30' ? styles.selected : ''}`}
                                    onClick={() => handleButtonClick(30, '30')}>
                                    Doe uma cesta básica
                                    <p> Essa doação irá para a ONG </p>
                                </button>
                            </div>
                        </div>

                        <div className={styles.progressBarContainer}>
                            <p className={styles.selectedAmount}>Valor selecionado: R${selectedAmount.toFixed(2)}</p>
                            <div className={styles.valor}>
                                <div className="valorUm"> R$05,00 </div>
                                <div className="valorDois"> R$10,00 </div>
                                <div className="valorTres"> R$15,00 </div>
                                <div className="valorQuatro"> R$20,00 </div>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressBarFill}
                                    style={{ width: `${getProgressPercentage()}%` }}
                                ></div>
                            </div>
                            <div className={styles.imgValor}>
                                <img src={imgGallery.icon2 .src} alt="Icon" />
                                <img src={imgGallery.icon1 .src} alt="Icon" />
                                <img src={imgGallery.icon3 .src} alt="Icon" />
                                <img src={imgGallery.icon4 .src} alt="Icon" />
                            </div>
                        </div>
                        <button className={styles.pixButton} onClick={handlePixClick}>
                            <img src={imgGallery.pix.src} alt={imgGallery.pix.src} />
                            PIX
                        </button>
                    </div>
                )}
                {currentPage === "pix" && ( // Tela PIX
                    <div className={styles.pixPage}>
                        <div className={styles.qrContainer}>
                            <img
                                src={imgGallery.qrcode.png}
                                alt={imgGallery.qrcode.png}
                                className={styles.qrImage}
                            />
                            <div className={styles.codeBox}>
                                <input
                                    type="text"
                                    value="OasdxzisiswAI890 NAA..."
                                    readOnly
                                    className={styles.codeInput}
                                />
                                <button className={styles.copyButton}>Copiar código</button>
                            </div>
                        </div>
                        <button className={styles.backButton} onClick={handleBackClick}>
                            Voltar
                        </button>
                    </div>
                )}
            </div>
            <img src={imgGallery.macallmePag.src} alt={imgGallery.macallmePag.src} className={styles.macallmePag} />
        </div>
    );
};

export default Doacao;