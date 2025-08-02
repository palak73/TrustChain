// Initialize Firebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqWrMwOcWrlsk-NbGPaR6mvj9n0TeolPw",
  authDomain: "trustchain-e19c9.firebaseapp.com",
  projectId: "trustchain-e19c9",
  storageBucket: "trustchain-e19c9.firebasestorage.app",
  messagingSenderId: "604662210904",
  appId: "1:604662210904:web:f0558ef56be87db5c6452d"
};

// Initialize Firebase


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();



//  Ensure these are defined and not null before accessing their properties

// Make sure the DOM is loaded before accessing elements
window.addEventListener("DOMContentLoaded", () => {
  // Check if the auth modal exists before using .style
  const authModal = document.getElementById("authModal");

  if (!authModal) {
    console.error("❌ authModal element not found in the DOM.");
    return;
  }

  // Firebase auth state change handler
  auth.onAuthStateChanged((user) => {
    const authModal = document.getElementById("authModal");
    if (user) {
      // User is signed in

      const authModal = document.getElementById("authModal");
if (authModal) {
  authModal.style.display = "none";
} else {
  console.warn("⚠️ authModal not found when trying to hide it.");
}


      // Fetch user data from Firestore
      db.collection("users").doc(user.uid).get().then((doc) => {
        if (!doc.exists) {
          console.warn("⚠️ User document not found in Firestore.");
          return;
        }

        const userData = doc.data();
        const userWelcomeEl = document.getElementById("userWelcome");

        if (userWelcomeEl && userData?.name) {
          userWelcomeEl.innerText = `Hi, ${userData.name}`;
        } else {
          console.warn("⚠️ Could not update welcome message — element or name missing.");
        }
      }).catch((error) => {
        console.error("🔥 Error fetching user document:", error);
      });

    } else {
      console.log("🔔 No user is currently signed in.");
      authModal.style.display = "block"; // Optional: Show modal if not signed in
    }
  });
});




function showToast(message) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");
  toastText.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const role = document.querySelector("input[name='role']:checked").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      name,
      email,
      role,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast("🎉 Registration successful!");
    toggleAuth(false);
  } catch (error) {
    console.error(error.message);
    showToast("⚠️ " + error.message);
  }
});






// Assuming you're using Firebase v8 (compat)
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const docRef = db.collection("users").doc(user.uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      showToast("⚠️ User data not found in Firestore.");
      return;
    }

    const userData = doc.data();

    showToast(`👋 Welcome back, ${userData.name} (${userData.role})`);
    toggleAuth(false);

    // OPTIONAL: Store name in navbar
    const navName = document.getElementById("navUsername");
    if (navName) navName.textContent = userData.name;

    // OPTIONAL: Redirect
    // if (userData.role === "admin") {
    //   window.location.href = "/admin-dashboard.html";
    // }
  } catch (error) {
    console.error(error.message);
    showToast("⚠️ " + error.message);
  }
});




// auth.onAuthStateChanged(async (user) => {
//   if (user) {
//     const doc = await db.collection("users").doc(user.uid).get();
//     const role = doc.data().role;

//     document.getElementById("donor").style.display = role === "user" ? "block" : "none";
//     document.getElementById("admin").style.display = role === "admin" ? "block" : "none";
//   } else {
//     document.getElementById("donor").style.display = "none";
//     document.getElementById("admin").style.display = "none";
//   }
// });


auth.onAuthStateChanged(async (user) => {
  const donorEl = document.getElementById("donor");
  const adminEl = document.getElementById("admin");

  if (user) {
    try {
      const doc = await db.collection("users").doc(user.uid).get();
      const role = doc.data()?.role;

      if (donorEl) donorEl.style.display = role === "user" ? "block" : "none";
      if (adminEl) adminEl.style.display = role === "admin" ? "block" : "none";

    } catch (err) {
      console.error("🔥 Error fetching user role:", err);
    }

  } else {
    if (donorEl) donorEl.style.display = "none";
    if (adminEl) adminEl.style.display = "none";
  }
});




// After Firebase login success
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const displayName = user.displayName || user.email.split('@')[0];
    document.getElementById("userDisplay").textContent = `👤 ${displayName}`;
  } else {
    document.getElementById("userDisplay").textContent = "";
  }
});




function submitDonation() {
  const user = firebase.auth().currentUser;
  if (!user) {
    alert("You must be logged in to donate.");
    return;
  }

  const uid = user.uid;
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const ngo = document.getElementById("donorNGO").value.trim();
  const amount = document.getElementById("donorAmount").value.trim();

  if (!name || !email || !ngo || !amount || isNaN(amount) || parseInt(amount) <= 0) {
    alert("Please fill all fields with valid data.");
    return;
  }

  const donation = {
    name,
    email,
    ngo,
    amount: parseFloat(amount),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection("users").doc(uid).collection("donations").add(donation)
    .then(() => {
      showToast("🎉 Thank you for your donation!");
      document.getElementById("donorName").value = "";
      document.getElementById("donorEmail").value = "";
      document.getElementById("donorNGO").value = "";
      document.getElementById("donorAmount").value = "";
    })
    .catch((error) => {
      showToast("Error saving donation: " + error.message);
    });
}
