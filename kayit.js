import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "APIKEYİNİ BURAYA YAZ",
    authDomain: "AUTHDOMAIN BURAYA",
    projectId: "PROJE ID",
    storageBucket: "STORAGE BUCKET",
    messagingSenderId: "SENDER ID",
    appId: "APP ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

document.getElementById("googleLoginBtn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // 6 Haneli doğrulama kodu
        let verifyCode = Math.floor(100000 + Math.random() * 900000);

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            ad: user.displayName,
            verified: false,
            verifyCode: verifyCode
        });

        alert("Doğrulama Kodunuz: " + verifyCode + "\nLütfen doğrula ekranına girin.");

        window.location.href = "dogrula.html";

    } catch (err) {
        alert("HATA: " + err.message);
    }
});
