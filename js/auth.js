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


// document.getElementById("registerForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name = document.getElementById("registerName").value;
//   const email = document.getElementById("registerEmail").value;
//   const password = document.getElementById("registerPassword").value;
//   const ngoName = document.getElementById("ngoName")?.value || "";
//   const role = document.querySelector("input[name='role']:checked").value;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     //  Set display name on Firebase Auth profile
//     await user.updateProfile({ displayName: name });

//     // Prepare data to store in Firestore
//     const userData = {
//       name,
//       email,
//       role,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     };

//     if (role === "ngo-admin") {
//       userData.ngoName = ngoName;
//       userData.isApproved = false; // Will approve manually from Firestore
//     }

//     //  Save user data to Firestore
//     await db.collection("users").doc(user.uid).set(userData);

//     showToast("🎉 Registration successful!");
//     toggleAuth(false);
//   } catch (error) {
//     console.error(error.message);
//     showToast("⚠️ " + error.message);
//   }
// });


// document.getElementById("registerForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name = document.getElementById("registerName").value;
//   const email = document.getElementById("registerEmail").value;
//   const password = document.getElementById("registerPassword").value;
//   const ngoName = document.getElementById("ngoName")?.value || "";
//   const role = document.querySelector("input[name='role']:checked").value;

//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     const user = userCredential.user;

//     // Set display name on Firebase Auth profile
//     await user.updateProfile({ displayName: name });

//     // Determine default status
//     let defaultStatus = role === "ngo-admin" ? "pending" : "approved";

//     // Prepare data to store in Firestore
//     const userData = {
//       name,
//       email,
//       role,
//       status: defaultStatus, // ✅ new status field
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     };

//     if (role === "ngo-admin") {
//       userData.ngoName = ngoName;
//       userData.isApproved = false; // You can remove this if using only 'status'
//     }

//     // Save user data to Firestore
//     await db.collection("users").doc(user.uid).set(userData);

//     showToast("🎉 Registration successful!");
//     toggleAuth(false);
//   } catch (error) {
//     console.error(error.message);
//     showToast("⚠️ " + error.message);
//   }
// });





let tempUserId = null;
let tempNGOName = null;

// Registration
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const ngoName = document.getElementById("ngoName")?.value.trim() || "";
  const role = document.querySelector("input[name='role']:checked").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await user.updateProfile({ displayName: name });

    let defaultStatus = role === "ngo-admin" ? "pending" : "approved";

    // Save in users collection
    const userData = {
      name,
      email,
      role,
      status: defaultStatus,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (role === "ngo-admin") {
      userData.ngoName = ngoName;
      tempUserId = user.uid;
      tempNGOName = ngoName;
    }

    await db.collection("users").doc(user.uid).set(userData);

    if (role === "ngo-admin") {
      openNGOModal(); // Show second form
    } else {
      showToast("🎉 Registration successful!");
      toggleAuth(false);
    }

  } catch (error) {
    console.error(error.message);
    showToast("⚠️ " + error.message);
  }
});

// Open Modal
function openNGOModal() {
  document.getElementById("ngoDetailsModal").classList.remove("hidden");
}

// Close Modal
function closeNGOModal() {
  document.getElementById("ngoDetailsModal").classList.add("hidden");
}

// Submit NGO Details
// async function submitNGODetails() {
//   const goal = document.getElementById("ngoGoal").value.trim();
//   const cause = document.getElementById("ngoCause").value.trim();
//   const files = document.getElementById("ngoDocs").files;

//   if (!goal || !cause) {
//     showToast("⚠️ Please fill all fields.");
//     return;
//   }

//   try {
//     let uploadedDocs = [];

//     for (let file of files) {
//       const storageRef = firebase.storage().ref(`ngoDocs/${tempUserId}/${file.name}`);
//       await storageRef.put(file);
//       const url = await storageRef.getDownloadURL();
//       uploadedDocs.push(url);
//     }

//     await db.collection("ngoRequests").add({
//       name: tempNGOName,
//       goal: parseInt(goal),
//       cause,
//       docs: uploadedDocs,
//       createdBy: tempUserId,
//       status: "pending",
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     });

//     closeNGOModal();
//     showToast("✅ NGO request submitted. Wait for verification.");
//     toggleAuth(false);

//   } catch (error) {
//     console.error(error.message);
//     showToast("⚠️ " + error.message);
//   }
// }



// NGO Details Submit
// async function submitNGODetails() {
//   const goal = document.getElementById("ngoGoal").value.trim();
//   const cause = document.getElementById("ngoCause").value.trim();
//   const files = document.getElementById("ngoDocs").files;

//   if (!goal || !cause) {
//     showToast("⚠️ Please fill all fields.");
//     return;
//   }

//   try {
//     // Uploading docs
//     let uploadedDocs = [];
//     for (let file of files) {
//       const storageRef = firebase.storage().ref(`ngoDocs/${tempUserId}/${file.name}`);
//       await storageRef.put(file);
//       const url = await storageRef.getDownloadURL();
//       uploadedDocs.push(url);
//     }

//     // NGO Admin Wallet Address (Metamask)
//     let walletAddress = null;
//     if (window.ethereum) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       walletAddress = await signer.getAddress();
//     } else {
//       showToast("⚠️ Please connect MetaMask first.");
//       return;
//     }

//     // Deploy Smart Contract
  
//     // const contractAddress = await deployContract(goal, cause);
//     const contractAddress = await deployContract(goal, cause); 

//     // Save in Firestore (ngoRequests)
//     await db.collection("ngoRequests").add({
//       name: tempNGOName,
//       goal: parseInt(goal),
//       cause,
//       docs: uploadedDocs,
//       createdBy: tempUserId,
//       walletAddress: walletAddress,   // NGO wallet
//       contractAddress: contractAddress, // Unique contract
//       status: "pending",
//       createdAt: firebase.firestore.FieldValue.serverTimestamp()
//     });

//     closeNGOModal();
//     showToast("✅ NGO request submitted. Wait for verification.");
//     toggleAuth(false);

//   } catch (error) {
//     console.error(error.message);
//     showToast("⚠️ " + error.message);
//   }
// }



async function submitNGODetails() {
  const goal = document.getElementById("ngoGoal").value.trim();
  const cause = document.getElementById("ngoCause").value.trim();
  const files = document.getElementById("ngoDocs").files;

  if (!goal || !cause) {
    showToast("⚠️ Please fill all fields.");
    return;
  }

  try {
    let uploadedDocs = [];
    for (let file of files) {
      const storageRef = firebase.storage().ref(`ngoDocs/${tempUserId}/${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      uploadedDocs.push(url);
    }

    // contract address from blockchain
    const contractAddress = await ;

    //  Get wallet address from user document
    const userDoc = await db.collection("users").doc(tempUserId).get();
    const walletAddress = userDoc.exists ? userDoc.data().walletAddress : null;

    await db.collection("ngoRequests").add({
      name: tempNGOName,
      goal: parseInt(goal),
      cause,
      docs: uploadedDocs,
      createdBy: tempUserId,
      walletAddress: walletAddress || "Not connected",
      contractAddress: contractAddress,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    closeNGOModal();
    showToast("✅ NGO request submitted! Wait for verification.");
    toggleAuth(false);

  } catch (error) {
    console.error(error.message);
    showToast("⚠️ " + error.message);
  }
}





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






// window.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("loginForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("loginEmail").value;
//     const password = document.getElementById("loginPassword").value;

//     try {
//       // Sign in with Firebase Auth
//       const userCredential = await auth.signInWithEmailAndPassword(email, password);
//       const user = userCredential.user;

//       // Fetch user document from Firestore
//       const docRef = db.collection("users").doc(user.uid);
//       const doc = await docRef.get();

//       if (!doc.exists) {
//         //showToast("⚠️ User data not found in Firestore.");
//         return;
//       }

//       const userData = doc.data();
//       const role = userData.role;

//       // Welcome message
//       showToast(`👋 Welcome back, ${userData.name} (${role})`);

//       // Hide auth modal
//       toggleAuth(false);

//       // Show logout button
//       document.getElementById("logoutBtn")?.classList.remove("hidden");

//       // Display name in navbar
//       const welcome = document.getElementById("userWelcome");
//       if (welcome) {
//         welcome.innerText = role === "admin"
//           ? `👤 Admin: ${userData.name}`
//           : `👤 ${userData.name}`;
//       }

//       // Show sections based on role
//       document.getElementById("donor")?.classList.remove("hidden"); // Always visible anyway
//       document.getElementById("ngos")?.classList.remove("hidden");

//       if (role === "ngo-admin") {
//         document.getElementById("adminPanel")?.classList.remove("hidden");
//         document.getElementById("userWelcome").innerText = `👤 Admin: ${userData.name}`;
//       } else {
//         document.getElementById("adminPanel")?.classList.add("hidden");
//         document.getElementById("userWelcome").innerText = `👤 ${userData.name}`;
//       }

//       // Render user donation history
//       fetchAndRenderUserDonations();

//       // Optional: Set name in navbar
//       const navName = document.getElementById("navUsername");
//       if (navName) navName.textContent = userData.name;

//     } catch (error) {
//       console.error("Login Error:", error.message);
//       //showToast("⚠️ " + error.message);
//     }
//   });
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

      // ✅ Check status for NGO admins
      if (role === "ngo-admin" && userData.status === "pending") {
        showToast("⏳ Admin approval pending. Please wait.");
        // Hide admin panel if visible
        document.getElementById("adminPanel")?.classList.add("hidden");
      } else if (role === "ngo-admin" && userData.status === "approved") {
        document.getElementById("adminPanel")?.classList.remove("hidden");
      }

      // Welcome message
      showToast(`👋 Welcome back, ${userData.name} (${role})`);

      // Hide auth modal
      toggleAuth(false);

      // Show logout button
      document.getElementById("logoutBtn")?.classList.remove("hidden");

      // Display name in navbar
      const welcome = document.getElementById("userWelcome");
      if (welcome) {
        welcome.innerText = role === "ngo-admin"
          ? `👤 Admin: ${userData.name}`
          : `👤 ${userData.name}`;
      }

      // Show sections based on role
      document.getElementById("donor")?.classList.remove("hidden");
      document.getElementById("ngos")?.classList.remove("hidden");

      // Render user donation history
      fetchAndRenderUserDonations();

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
      if (adminEl) adminEl.style.display = (role === "ngo-admin" && doc.data()?.status === "approved") ? "block" : "none";

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
      //showToast("Error saving donation: " + error.message);
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





































// Listen for changes in ngoRequests
db.collection("ngoRequests").onSnapshot(async (snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    if (change.type === "modified") {
      const ngoRequest = change.doc.data();
      const ngoRequestId = change.doc.id;

      // If status updated to approved → move it to ngos collection
      if (ngoRequest.status === "approved") {
        try {
          // Add to ngos collection
          await db.collection("ngos").doc(ngoRequestId).set({
            name: ngoRequest.name,
            goal: ngoRequest.goal,
            cause: ngoRequest.cause,
            docs: ngoRequest.docs,
            createdBy: ngoRequest.createdBy,
            verified: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          console.log(`✅ NGO approved & moved to ngos: ${ngoRequest.name}`);
        } catch (err) {
          console.error("Error moving NGO:", err);
        }
      }
    }
  });
});



function loadNGOs() {
  db.collection("ngos").where("verified", "==", true).onSnapshot(snapshot => {
    let ngos = [];
    snapshot.forEach(doc => ngos.push({ id: doc.id, ...doc.data() }));
    renderNGOCards(ngos);
  });
}

// Call on page load
loadNGOs();
