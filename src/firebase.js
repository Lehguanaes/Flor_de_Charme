// Importa os módulos do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ IMPORTANTE

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClFNdJ0X3f24Lqa3dKD7GIOvRY_IaOejw",
  authDomain: "flor-de-charme.firebaseapp.com",
  projectId: "flor-de-charme",
  storageBucket: "flor-de-charme.firebasestorage.app",
  messagingSenderId: "26835415011",
  appId: "1:26835415011:web:8046552635973d2f1ebad6"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inicializa o Firestore e exporta
const db = getFirestore(app);
export { auth, db };
