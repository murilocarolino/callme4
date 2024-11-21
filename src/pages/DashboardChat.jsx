import React from "react";
import styles from '../css/Dashboard.module.css';
import imgGallery from '../importsGallery.json';

const Dashboard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.testeUm}>
                <div className={styles.pai}>
                    <img src={imgGallery.user.src} alt={imgGallery.user.alt} className={styles.user} />
                    <div>
                        <h3>TESTEEEE</h3>
                        <p>eu</p>
                    </div>
                </div>
            </div>
            <div className={styles.testeDois}> </div>
            <div className={styles.testeTres}> </div>
        </div>
    )
}

export default Dashboard