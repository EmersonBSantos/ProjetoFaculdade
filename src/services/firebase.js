import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQqf-wWXOFev5eVYIZm_p3HbVM4K8Ov34",
  authDomain: "ajuda-bairro.firebaseapp.com",
  projectId: "ajuda-bairro",
  storageBucket: "ajuda-bairro.firebasestorage.app",
  messagingSenderId: "292588147828",
  appId: "1:292588147828:web:d1dd85b2c3f870f3f56d21"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);