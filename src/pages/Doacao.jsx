import React, { useState } from "react";
import imgGallery from '../importsGallery.json'; // Ajuste o caminho conforme necessário
import Sidebar from '../components/Sidebar';
import styles from '../css/Doacao.module.css';

const Doacao = () => {
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [selectedButton, setSelectedButton] = useState(null);
    const [currentPage, setCurrentPage] = useState("home");

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
        if (selectedAmount >= 30) return 100;
        return (selectedAmount / 30) * 100;
    };

    const handleCartaoClick = () => setCurrentPage("cartao");
    const handlePixClick = () => setCurrentPage("pix");
    const handleBackClick = () => setCurrentPage("home");

    return (
        <div className={styles.doacao}>
            <Sidebar />
            <h1 className={styles.title}>Doe para o callme</h1>
            <h2 className={styles.subtitle}>
                Ajude ONG's de psicologia e pessoas necessitadas! <br /> Dê um apoio para nossa plataforma:
            </h2>

            {currentPage === "home" && (
                <div className={styles.homeContent}>
                    <div className={styles.donationOptions}>
                        <div className={styles.donationButtons}>
                            <button
                                className={`${styles.donationButton} ${selectedButton === '5' ? styles.selected : ''}`}
                                onClick={() => handleButtonClick(5, '5')}>
                                Doe 5 reais
                            </button>
                            <button
                                className={`${styles.donationButton} ${selectedButton === '15' ? styles.selected : ''}`}
                                onClick={() => handleButtonClick(15, '15')}>
                                Doe 15 reais
                            </button>
                            <button
                                className={`${styles.donationButton} ${selectedButton === '30' ? styles.selected : ''}`}
                                onClick={() => handleButtonClick(30, '30')}>
                                Doe 30 reais
                            </button>
                        </div>

                        <div className={styles.customDonation}>
                            <div className={styles.customDiv}>
                                <label className={styles.customLabel}>Adicione o valor que achar necessário:</label>
                                <input
                                    type="number"
                                    placeholder="R$"
                                    onChange={handleCustomAmountChange}
                                    className={styles.customInput}
                                />
                            </div>
                            <button
                                className={`${styles.donationDoacao} ${selectedButton === '50' ? styles.selected : ''}`}
                                onClick={() => handleButtonClick(50, '50')}>
                                Doe uma cesta básica
                                <p>Essa doação irá para a ONG</p>
                            </button>
                        </div>
                    </div>

                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressBarFill}
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                        <p className={styles.amountLabel}>Valor selecionado: R${selectedAmount.toFixed(2)}</p>
                        <div className={styles.iconContainer}>
                            <img src={imgGallery.icon1.src} alt="Icon 1" />
                            <img src={imgGallery.icon2.src} alt="Icon 2" />
                            <img src={imgGallery.icon3.src} alt="Icon 3" />
                            <img src={imgGallery.icon4.src} alt="Icon 4" />
                        </div>
                    </div>

                    <button className={styles.pixButton} onClick={handlePixClick}>
                        PIX
                    </button>
                    <button className={styles.cartaoButton} onClick={handleCartaoClick}>
                        Cartão
                    </button>
                </div>
            )}

            {currentPage === "pix" && (
                <div className={styles.pixPage}>

                    <div className={styles.qrContainer}>
                        <img src={imgGallery.qrcode.src} alt="QR Code" className={styles.qrcode} />
                        <div className={styles.codeBox}>
                            <input
                                type="text"
                                value="OasdxziswIAI890 NAahajxopq00192-092nsjam"
                                readOnly
                                className={styles.codeInput}
                            />
                            <button className={styles.copyButton}>Copiar código</button>
                        </div>
                    </div>

                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressBarFill}
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                        <p className={styles.amountLabel}>Valor selecionado: R${selectedAmount.toFixed(2)}</p>
                        <div className={styles.iconContainer}>
                            <img src={imgGallery.icon1.src} alt="Icon 1" />
                            <img src={imgGallery.icon2.src} alt="Icon 2" />
                            <img src={imgGallery.icon3.src} alt="Icon 3" />
                            <img src={imgGallery.icon4.src} alt="Icon 4" />
                        </div>
                    </div>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Voltar
                    </button>
                    <button className={styles.cartaoPixButton} onClick={handleCartaoClick}>
                        Cartão
                    </button>
                </div>
            )}

            {currentPage === "cartão" && (
                <div className={styles.CartaoPage}>
                    

                    <div className={styles.progressBarContainer}>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressBarFill}
                                style={{ width: `${getProgressPercentage()}%` }}
                            ></div>
                        </div>
                        <p className={styles.amountLabel}>Valor selecionado: R${selectedAmount.toFixed(2)}</p>
                        <div className={styles.iconContainer}>
                            <img src={imgGallery.icon1.src} alt="Icon 1" />
                            <img src={imgGallery.icon2.src} alt="Icon 2" />
                            <img src={imgGallery.icon3.src} alt="Icon 3" />
                            <img src={imgGallery.icon4.src} alt="Icon 4" />
                        </div>
                    </div>
                    <button className={styles.backButton} onClick={handleBackClick}>
                        Voltar
                    </button>
                    <button className={styles.cartaoPixButton} onClick={handlePixClick}>
                        Pix
                    </button>
                </div>
            )}
        </div>
    );
};

export default Doacao;
