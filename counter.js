import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  increment, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

// আপনার বিদ্যমান ফায়ারবেস কনফিগ
const firebaseConfig = {
  apiKey: "AIzaSyDUDME-HEfvjaNmW1KCyHWe0_JrQTGi63k",
  authDomain: "hw-my-website.firebaseapp.com",
  databaseURL: "https://hw-my-website-default-rtdb.firebaseio.com",
  projectId: "hw-my-website",
  storageBucket: "hw-my-website.firebasestorage.app",
  messagingSenderId: "332933793801",
  appId: "1:332933793801:web:d18b8f9263aaaf986d90d8"
};

const app = initializeApp(firebaseConfig, "counterApp");
const db = getFirestore(app);

const visitDocRef = doc(db, "settings", "stats");

// ভিজিটর কাউন্ট বৃদ্ধি করার ফাংশন (এক সেশনে একবার কাউন্ট হবে)
async function recordVisit() {
  if (!sessionStorage.getItem("hexca_visited")) {
    try {
      await setDoc(visitDocRef, {
        visits: increment(1)
      }, { merge: true });
      sessionStorage.setItem("hexca_visited", "true");
    } catch (e) {
      console.error("Visit counter error:", e);
    }
  }
}

// ভিজিট রেকর্ড রান করা
recordVisit();

// রিয়েল-টাইমে সংখ্যা ডিসপ্লে করা
onSnapshot(visitDocRef, (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    const count = data.visits || 0;
    const el = document.getElementById("visitCount");
    if (el) {
      el.textContent = count.toLocaleString();
    }
  }
}, (error) => {
  console.error("Visit counter listener error:", error);
});
