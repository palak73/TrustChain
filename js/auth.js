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
      authModal.style.display = "block"; 
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






//  Firebase v8 (compat)
// window.addEventListener("DOMContentLoaded", () => {
// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;

//   try {
//     // Sign in with Firebase Auth
//     const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     // Fetch user document from Firestore
//     const docRef = db.collection("users").doc(user.uid);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       showToast("⚠️ User data not found in Firestore.");
//       return;
//     }

//     const userData = doc.data();
//     const role = userData.role;

//     // Welcome message
//     showToast(`👋 Welcome back, ${userData.name} (${role})`);

//     // Hide auth modal
//     toggleAuth(false);

//     // Show logout button
//     document.getElementById("logoutBtn")?.classList.remove("hidden");

//     // Display name in navbar
//     const welcome = document.getElementById("userWelcome");
//     if (welcome) {
//       welcome.innerText = role === "admin"
//         ? `👤 Admin: ${userData.name}`
//         : `👤 ${userData.name}`;
//     }

//     // Show sections based on role
//     document.getElementById("donor")?.classList.remove("hidden");
//     document.getElementById("ngos")?.classList.remove("hidden");

//     if (role === "admin") {
//   document.getElementById("adminPanel")?.classList.remove("hidden");
//   document.getElementById("donor")?.classList.add("hidden");
//   document.getElementById("ngos")?.classList.remove("hidden");
//   document.getElementById("userWelcome").innerText = `👤 Admin: ${userData.name}`;
//     } else {
//   document.getElementById("donor")?.classList.remove("hidden");
//   document.getElementById("ngos")?.classList.remove("hidden");
//   document.getElementById("adminPanel")?.classList.add("hidden");
//   document.getElementById("userWelcome").innerText = `👤 ${userData.name}`;
//     }
    

//     // Render user donation history
//     fetchAndRenderUserDonations();

//     // (Optional) Set name in navbar (if using a different span)
//     const navName = document.getElementById("navUsername");
//     if (navName) navName.textContent = userData.name;

//   } catch (error) {
//     console.error("Login Error:", error.message);
//     showToast("⚠️ " + error.message);
//   }
// });

// });



// auth.onAuthStateChanged(async (user) => {
//   const donorEl = document.getElementById("donor");
//   const adminEl = document.getElementById("admin");

//   if (user) {
//     try {
//       const doc = await db.collection("users").doc(user.uid).get();
//       const role = doc.data()?.role;

//       if (donorEl) donorEl.style.display = role === "user" ? "block" : "none";
//       if (adminEl) adminEl.style.display = role === "admin" ? "block" : "none";

//     } catch (err) {
//       console.error("🔥 Error fetching user role:", err);
//     }

//   } else {
//     if (donorEl) donorEl.style.display = "none";
//     if (adminEl) adminEl.style.display = "none";
//   }
// });






window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      // Sign in with Firebase Auth
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Fetch user document from Firestore
      const docRef = db.collection("users").doc(user.uid);
      const doc = await docRef.get();

      if (!doc.exists) {
        showToast("⚠️ User data not found in Firestore.");
        return;
      }

      const userData = doc.data();
      const role = userData.role;

      // Welcome message
      showToast(`👋 Welcome back, ${userData.name} (${role})`);

      // Hide auth modal
      toggleAuth(false);

      // Show logout button
      document.getElementById("logoutBtn")?.classList.remove("hidden");

      // Display name in navbar
      const welcome = document.getElementById("userWelcome");
      if (welcome) {
        welcome.innerText = role === "admin"
          ? `👤 Admin: ${userData.name}`
          : `👤 ${userData.name}`;
      }

      // Show sections based on role
      document.getElementById("donor")?.classList.remove("hidden"); // Always visible anyway
      document.getElementById("ngos")?.classList.remove("hidden");

      if (role === "admin") {
        document.getElementById("adminPanel")?.classList.remove("hidden");
        document.getElementById("userWelcome").innerText = `👤 Admin: ${userData.name}`;
      } else {
        document.getElementById("adminPanel")?.classList.add("hidden");
        document.getElementById("userWelcome").innerText = `👤 ${userData.name}`;
      }

      // Render user donation history
      fetchAndRenderUserDonations();

      // Optional: Set name in navbar
      const navName = document.getElementById("navUsername");
      if (navName) navName.textContent = userData.name;

    } catch (error) {
      console.error("Login Error:", error.message);
      showToast("⚠️ " + error.message);
    }
  });
});

auth.onAuthStateChanged(async (user) => {
  const adminEl = document.getElementById("adminPanel"); 

  if (user) {
    try {
      const doc = await db.collection("users").doc(user.uid).get();
      const role = doc.data()?.role;

      // Show admin panel only for admin
      if (adminEl) adminEl.style.display = role === "admin" ? "block" : "none";

    } catch (err) {
      console.error("🔥 Error fetching user role:", err);
    }

  } else {
    // Hide admin panel on logout
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


window.db = db;
window.auth = auth;




window.logout = async function () {
  try {
    await firebase.auth().signOut();

    showToast("👋 You have been logged out.");
    document.getElementById("logoutBtn").classList.add("hidden");
    document.getElementById("userWelcome").innerText = "";

    // Optionally reload or redirect to home
    window.location.href = "#home"; // or just: window.location.reload();
  } catch (error) {
    console.error("Logout failed:", error);
    showToast("❌ Logout failed");
  }
};






































// // Firebase Configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCqWrMwOcWrlsk-NbGPaR6mvj9n0TeolPw",
//   authDomain: "trustchain-e19c9.firebaseapp.com",
//   projectId: "trustchain-e19c9",
//   storageBucket: "trustchain-e19c9.appspot.com",
//   messagingSenderId: "604662210904",
//   appId: "1:604662210904:web:f0558ef56be87db5c6452d"
// };

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();

// DOM Loaded Event
// window.addEventListener("DOMContentLoaded", () => {
//   const authModal = document.getElementById("authModal");

//   if (!authModal) return console.error("authModal not found");

//   auth.onAuthStateChanged(async (user) => {
//     if (user) {
//       authModal.style.display = "none";

//       try {
//         const doc = await db.collection("users").doc(user.uid).get();
//         const userData = doc.data();

//         if (!userData) return console.warn("User data not found");

//         const welcomeEl = document.getElementById("userWelcome");
//         if (welcomeEl) welcomeEl.innerText = `👤 ${userData.role === "admin" ? "Admin: " : ""}${userData.name}`;

//         toggleRoleSections(userData.role);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     } else {
//       authModal.style.display = "block";
//     }
//   });
// });

// // Toggle UI based on role
// function toggleRoleSections(role) {
//   document.getElementById("adminPanel")?.classList.toggle("hidden", role !== "admin");
//   document.getElementById("donor")?.classList.toggle("hidden", role === "admin");
//   document.getElementById("ngos")?.classList.remove("hidden");
// }

// // Toast
// function showToast(message) {
//   const toast = document.getElementById("toast");
//   const toastText = document.getElementById("toast-text");
//   toastText.textContent = message;
//   toast.classList.add("show");
//   setTimeout(() => toast.classList.remove("show"), 3000);
// }

// // Register
// const registerForm = document.getElementById("registerForm");
// if (registerForm) {
//   registerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("registerName").value;
//     const email = document.getElementById("registerEmail").value;
//     const password = document.getElementById("registerPassword").value;
//     const role = document.querySelector("input[name='role']:checked").value;
//     const ngoName = role === "admin" ? document.getElementById("registerNGOName").value : null;

//     try {
//       const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//       const user = userCredential.user;

//       const userDoc = {
//         name,
//         email,
//         role,
//         ngoName: ngoName || "",
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       };

//       await db.collection("users").doc(user.uid).set(userDoc);
//       showToast("🎉 Registration successful!");
//       toggleAuth(false);
//     } catch (error) {
//       console.error("Registration Error:", error);
//       showToast("⚠️ " + error.message);
//     }
//   });
// }

// // Login
// const loginForm = document.getElementById("loginForm");
// if (loginForm) {
//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;

//     try {
//       const userCredential = await auth.signInWithEmailAndPassword(email, password);
//       const user = userCredential.user;

//       const doc = await db.collection("users").doc(user.uid).get();
//       const userData = doc.data();

//       showToast(`👋 Welcome back, ${userData.name}`);

//       toggleAuth(false);
//       document.getElementById("logoutBtn")?.classList.remove("hidden");

//       const welcome = document.getElementById("userWelcome");
//       if (welcome) welcome.innerText = `👤 ${userData.role === "admin" ? "Admin: " : ""}${userData.name}`;

//       toggleRoleSections(userData.role);
//       fetchAndRenderUserDonations();

//     } catch (error) {
//       console.error("Login Error:", error);
//       showToast("⚠️ " + error.message);
//     }
//   });
// }

// // Donation Submission
// function submitDonation() {
//   const user = firebase.auth().currentUser;
//   if (!user) return alert("You must be logged in to donate.");

//   const uid = user.uid;
//   const name = document.getElementById("donorName").value.trim();
//   const email = document.getElementById("donorEmail").value.trim();
//   const ngo = document.getElementById("donorNGO").value.trim();
//   const amount = document.getElementById("donorAmount").value.trim();

//   if (!name || !email || !ngo || !amount || isNaN(amount) || parseInt(amount) <= 0) {
//     return alert("Please fill all fields with valid data.");
//   }

//   const donation = {
//     name,
//     email,
//     ngo,
//     amount: parseFloat(amount),
//     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   };

//   db.collection("users").doc(uid).collection("donations").add(donation)
//     .then(() => {
//       showToast("🎉 Thank you for your donation!");
//       ["donorName", "donorEmail", "donorNGO", "donorAmount"].forEach(id => document.getElementById(id).value = "");
//     })
//     .catch((error) => {
//       showToast("Error saving donation: " + error.message);
//     });
// }

// // Logout
// window.logout = async function () {
//   try {
//     await auth.signOut();
//     showToast("👋 You have been logged out.");
//     document.getElementById("logoutBtn").classList.add("hidden");
//     document.getElementById("userWelcome").innerText = "";
//     window.location.href = "#home";
//   } catch (error) {
//     console.error("Logout failed:", error);
//     showToast("❌ Logout failed");
//   }
// };
