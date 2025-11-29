import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "APIKEY",
    authDomain: "AUTHDOMAIN",
    projectId: "PROJEID",
    storageBucket: "STORAGEBUCKET",
    messagingSenderId: "SENDERID",
    appId: "APPID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("verifyBtn").addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return alert("Kullanıcı bulunamadı!");

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    const girilenKod = document.getElementById("verifyInput").value;

    if (snap.exists() && snap.data().verifyCode == girilenKod) {
        await updateDoc(ref, { verified: true });
        alert("Başarıyla doğrulandı!");
        window.location.href = "index.html";
    } else {
        alert("Kod yanlış!");
    }
});
