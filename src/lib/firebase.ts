import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYh8YhBEV8AjKq6rN51tRetAhA-5WkUf0",
  authDomain: "aeo-agent-581db.firebaseapp.com",
  projectId: "aeo-agent-581db",
  storageBucket: "aeo-agent-581db.firebasestorage.app",
  messagingSenderId: "902881069381",
  appId: "1:902881069381:web:adf4e8a14a2def5ead962c",
  measurementId: "G-80ES2140YF"
};

// Initialize Firebase securely for SSR frameworks like Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { app, auth, googleProvider, githubProvider };
