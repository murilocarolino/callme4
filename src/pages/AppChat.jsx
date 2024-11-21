import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../css/AppChat.module.css';
import Dashboard from './DashboardChat.jsx'

function AppChat() {
    return (
        <div className={styles.forms}>
            <Dashboard />
        </div>
    )
}

export default AppChat