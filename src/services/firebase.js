// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDew_PRdH-OoTxcC1M27zgwBSIHxvVDJIM",
  authDomain: "callme-98980.firebaseapp.com",
  databaseURL: "https://callme-98980-default-rtdb.firebaseio.com",
  projectId: "callme-98980",
  storageBucket: "callme-98980.firebasestorage.app",
  messagingSenderId: "317869055760",
  appId: "1:317869055760:web:4babaf8d7ec5aa8fa64f95"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exportar os serviços
export { db, auth };