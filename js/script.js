
const images = [
  'img/ngo4.jpg',
  'img/ngo5.jpg',
  'img/ngo6.jpg'
];

let index = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

// Set initial background
bg1.style.backgroundImage = `url('${images[0]}')`;

function swapImages() {
  const nextIndex = (index + 1) % images.length;

  // Set next image to bg2 and prepare it offscreen to the right
  bg2.style.backgroundImage = `url('${images[nextIndex]}')`;
  bg2.style.transform = 'translateX(100%)';
  bg2.style.transition = 'none';

  // Trigger layout reflow
  void bg2.offsetWidth;

  // Slide bg2 to center (over bg1)
  bg2.style.transition = 'transform 2s ease';
  bg2.style.transform = 'translateX(0)';

  // After slide completes
  setTimeout(() => {
    bg1.style.backgroundImage = bg2.style.backgroundImage;
    bg2.style.transition = 'none';
    bg2.style.transform = 'translateX(100%)';
    index = nextIndex;
  }, 2000); // match transition time
}

// First change after 5 sec, then every 5 sec
setInterval(swapImages, 5000);


// Global Variables
let allNGOs = [];
let selectedNGO = null;

//  Fetch NGO Data from npoint.io JSON API
fetch("https://api.npoint.io/17036fa7f997e9f9e28b")
  .then(res => res.json())
  .then(data => {
    allNGOs = data;
    renderNGOCards(allNGOs);
    console.log(data);
  })
  .catch((err) => {
    console.error("Failed to load NGOs:", err);
  });
  

// DOM References
const ngoContainer = document.getElementById("ngoCards");
const searchInput = document.getElementById("ngoSearch");
const modal = document.getElementById("donateModal");
const modalNgoName = document.getElementById("modalNgoName");
const donationAmount = document.getElementById("donationAmount");
const confirmDonateBtn = document.getElementById("confirmDonate");
const closeModalBtn = document.querySelector(".close-button");
const select = document.getElementById("mySelect");
const close = document.getElementById("close");

export let Contractindex = 0; // Initialize
window.getContractIndex = 0;


// Render NGO Cards
function renderNGOCards(data) {
  ngoContainer.innerHTML = "";
  data.forEach((ngo, index) => {

    const newOption = document.createElement('option');
    newOption.value = `${index}`;
    newOption.text = `${ngo.name}`;
    select.appendChild(newOption);

    const card = document.createElement("div");
    card.classList.add("ngo-col");

    card.innerHTML = `
      <div class="ngo-card">
        <h3>${ngo.name}</h3>
        <p><strong>Category:</strong> ${ngo.category}</p>
        <p><strong>Location:</strong> ${ngo.location || "N/A"}</p>
        <p><strong>Goal:</strong> ₹${ngo.goal.toLocaleString()}</p>
        <a href="${ngo.website || "#"}" target="_blank">Website</a>
        ${ngo.verified ? '<p style="color:green;">✅ Verified</p>' : ""}
        <button id="donatenowbtn" class="btn" onclick="openDonateModal(${index})">Donate Now</button>
      </div>
    `;

    ngoContainer.appendChild(card);
  });
}

//  Search Functionality
function filterNGOs() {
  const query = searchInput.value.toLowerCase();
  const filtered = allNGOs.filter((ngo) =>
    ngo.name.toLowerCase().includes(query) ||
    ngo.category.toLowerCase().includes(query) ||
    (ngo.location && ngo.location.toLowerCase().includes(query))
  );
  renderNGOCards(filtered);
}




function renderDonationCards(donations) {
  const container = document.getElementById("donationCardsContainer");
  container.innerHTML = "";

  if (!donations.length) {
    container.innerHTML = "<p>You haven't donated yet. Start supporting an NGO!</p>";
    return;
  }

  donations.forEach((donation) => {
    const card = document.createElement("div");
    card.className = "donation-card";

    card.innerHTML = `
      <h4>${donation.ngoName}</h4>
      <p class="donation-amount">₹${donation.amount}</p>
      <p><strong>Date:</strong> ${donation.date || "N/A"}</p>
      <p><strong>Method:</strong> ${donation.method || "Wallet"}</p>
    `;

    container.appendChild(card);
  });
}





//  Donation Modal
function openDonateModal(index) {
  window.Contractindex = index;
  selectedNGO = allNGOs[index];
  modalNgoName.textContent = selectedNGO.name;
  donationAmount.value = "";

  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
close.addEventListener("click",()=>{
  closeModal();
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
// Save donation to firebase and run ml 

// async function confirmDonation() {
//   const amount = parseFloat(donationAmount.value);
//   const user = firebase.auth().currentUser;

//   if (!user) {
//     showToast("⚠️ Please login to donate.");
//     return;
//   }

//   if (!amount || amount <= 0 || isNaN(amount)) {
//     showToast("⚠️ Please enter a valid donation amount.");
//     return;
//   }

//   const selectedMilestones = selectedNGO.milestones || [
//     { Req: selectedNGO.goal / 3, Exp: (selectedNGO.goal / 3) * 0.95, Receipts_Uploaded: selectedNGO.verified ? 1 : 0 },
//     { Req: selectedNGO.goal / 3, Exp: (selectedNGO.goal / 3) * 0.98, Receipts_Uploaded: selectedNGO.verified ? 1 : 0 },
//     { Req: selectedNGO.goal / 3, Exp: (selectedNGO.goal / 3) * 0.20, Receipts_Uploaded: selectedNGO.verified ? 1 : 0 }
//   ];

//   const payload = {
//     donation_amount: amount * 80000, // assuming 1 ETH = ₹80,000
//     milestones: selectedMilestones
//   };

//   let isFraud = false;

//   try {
//     const response = await fetch("https://ngotracking-2.onrender.com/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload)
//     });

//     const result = await response.json();

//     if (result.is_fraud === 1) {
//       showToast("⚠️ Heads up! This NGO might be suspicious based on milestone spending. Donation stopped.");
//       isFraud = true;
//     } else {
//       showToast("✅ Safe! No fraud detected for this NGO based on their milestone data.");
//     }
//   } catch (err) {
//     console.error("ML API error:", err);
//     alert("⚠️ Failed to verify NGO data. Donation is not saved.");
//     return;
//   }

//   // ⛔️ Abort donation if flagged as fraud
//   if (isFraud) return;

//   // ✅ Save donation only if not fraudulent
//   const donationData = {
//     userId: user.uid,
//     userName: user.displayName || "Anonymous",
//     ngoName: selectedNGO.name,
//     amount: amount,
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   };

//   try {
//     await db.collection("donations").add(donationData);
//     showToast(`✅ Thank you! You donated ${amount} ETH to ${selectedNGO.name}`);
//     closeModal();
//     fetchAndRenderUserDonations(); // Update donation list
//   } catch (error) {
//     console.error("Donation save failed:", error);
//     showToast("❌ Donation could not be saved.");
//   }
// }



async function confirmDonation() {
  const amount = parseFloat(donationAmount.value);
  const user = firebase.auth().currentUser;

  if (!user) {
    showToast("⚠️ Please login to donate.");
    return;
  }

  if (!amount || amount <= 0 || isNaN(amount)) {
    showToast("⚠️ Please enter a valid donation amount.");
    return;
  }

  const selectedMilestones = selectedNGO.milestones || [
    { Req: selectedNGO.goal / 3, Exp: (selectedNGO.goal / 3) * 0.95, Receipts_Uploaded: selectedNGO.verified ? 1 : 0 },
    { Req: selectedNGO.goal / 3, Exp: (selectedNGO.goal / 3) * 0.98, Receipts_Uploaded: selectedNGO.verified ? 1 : 0 },
    { Req: selectedNGO.goal / 3, Exp: (selectedNGO.goal / 3) * 0.20, Receipts_Uploaded: selectedNGO.verified ? 1 : 0 }
  ];

  const payload = {
    donation_amount: amount * 80000,
    milestones: selectedMilestones
  };

  let isFraud = false;

  try {
    const response = await fetch("https://ngotracking-2.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.is_fraud === 1) {
      showToast("⚠️ Heads up! This NGO might be suspicious based on milestone spending. Donation stopped.");
      return;
    } else {
      showToast("✅ No fraud detected for this NGO.");
    }
  } catch (err) {
    console.error("ML API error:", err);
    alert("⚠️ Failed to verify NGO data. Donation is not saved.");
    return;
  }

  // Here donation is considered safe --- blockchain transaction
  try {
    loadingScreen.style.display = "flex";
    const contract = getCurrentContract();
    const tx = await contract.Fund({ value: ethers.utils.parseEther(amount.toString()) });

    await tx.wait(); //  Here Waiting  for Ethereum confirmation
    loadingScreen.style.display = "none";
    load.innerHTML = `Transaction Successful: ${tx.hash}`;

    //  saving  to Firebase After ETH success
    const donationData = {
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      ngoName: selectedNGO.name,
      amount: amount,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("donations").add(donationData);
    showToast(`✅ Thank you! You donated ${amount} ETH to ${selectedNGO.name}`);
    closeModal();
    fetchAndRenderUserDonations();

  } catch (err) {
    loadingScreen.style.display = "none";
    console.error("Blockchain donation failed:", err);
    showToast("❌ Ethereum transaction failed. Donation not saved.");
  }
}





confirmDonateBtn.addEventListener("click", confirmDonation);



// Event Listeners
searchInput.addEventListener("input", filterNGOs);
closeModalBtn.addEventListener("click", closeModal);
// confirmDonateBtn.addEventListener("click", confirmDonation);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});


// // Expose modal function globally
 window.openDonateModal = openDonateModal;



function submitDonation() {
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const ngo = document.getElementById("donorNGO").value.trim();
  const amount = document.getElementById("donorAmount").value.trim();

  if (!name || !email || !ngo || !amount || isNaN(amount) || parseInt(amount) <= 0) {
    alert("Please fill all fields with valid data.");
    return;
  }

  const donationRecord = `${name} donated ₹${amount} to ${ngo}`;

  const li = document.createElement("li");
  li.textContent = donationRecord;
  document.getElementById("donationList").appendChild(li);

 showToast("🎉 Thank you for your donation!");

  // Optional: Clear fields
  document.getElementById("donorName").value = "";
  document.getElementById("donorEmail").value = "";
  document.getElementById("donorNGO").value = "";
  document.getElementById("donorAmount").value = "";
}









window.toggleAuth = function(show = true) {
  const authModal = document.getElementById("authModal");
  if (authModal) {
    if (show) {
      authModal.classList.remove("hidden");
      authModal.style.display = "flex";  // Centering
    } else {
      authModal.classList.add("hidden");
      authModal.style.display = "none";
    }
  }
};



function switchForm(type) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (type === "register") {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  } else {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  }
}

window.switchForm = switchForm;

window.addEventListener("click", (e) => {
  const authModal = document.getElementById("authModal");
  if (e.target === authModal) toggleAuth(false);
});




window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Admin 

async function fetchAllDonationsForAdmin() {
  const container = document.getElementById("allDonationsContainer");
  container.innerHTML = "";

  try {
    const snapshot = await db.collection("donations").orderBy("timestamp", "desc").get();

    if (snapshot.empty) {
      container.innerHTML = "<p>No donations yet.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const d = doc.data();
      const date = d.timestamp?.toDate().toLocaleString() || "Unknown";

      const card = document.createElement("div");
      card.className = "admin-donation-card";

      card.innerHTML = `
        <p><strong>User:</strong> ${d.userName}</p>
        <p><strong>NGO:</strong> ${d.ngoName}</p>
        <p><strong>Amount:</strong> ₹${d.amount}</p>
        <p><strong>Date:</strong> ${date}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching all donations:", err);
  }
}


window.showAdminPanel = function () {
  const adminPanel = document.getElementById("adminPanel");
  if (!adminPanel) return;

  // Hide other sections
  document.querySelectorAll("section").forEach((sec) => {
    if (sec.id !== "adminPanel") sec.classList.add("hidden");
  });

  // Show admin panel
  adminPanel.classList.remove("hidden");

  // Fetch donation data
  //fetchAllDonationsForAdmin();
};

async function showAdminPanel() {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const userDoc = await db.collection("users").doc(user.uid).get();
  const userData = userDoc.data();

  if (userData.role !== "admin") {
    showToast("⛔ Access denied. Not an admin.");
    return;
  }

  if (userData.status !== "approved") {
    showToast("⏳ Admin approval pending.");
    return;
  }

  document.getElementById("adminSection").style.display = "block";
  fetchAdminNGODetails(user.uid);
}

// fetch admin details

async function fetchAdminNGODetails(adminId) {
  const snapshot = await db.collection("ngos").where("adminId", "==", adminId).get();

  if (snapshot.empty) {
    document.getElementById("adminNgoContent").innerHTML = "<p>No NGO assigned yet.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const ngo = doc.data();
    renderAdminNGO(ngo);
    fetchNGODonations(ngo.name); // Show donations to this NGO
  });
}

function renderAdminNGO(ngo) {
  document.getElementById("adminNgoContent").innerHTML = `
    <h2>${ngo.name}</h2>
    <p><strong>Category:</strong> ${ngo.category}</p>
    <p><strong>Location:</strong> ${ngo.location}</p>
    <p><strong>Goal:</strong> ₹${ngo.goal.toLocaleString()}</p>
    <p><strong>Verified:</strong> ${ngo.verified ? "✅" : "❌"}</p>
  `;
}


// analytics

async function fetchNGODonations(ngoName) {
  const snapshot = await db.collection("donations")
    .where("ngoName", "==", ngoName)
    .orderBy("timestamp", "desc")
    .get();

  const chartData = [];
  const list = document.getElementById("adminDonationList");
  list.innerHTML = "";

  snapshot.forEach(doc => {
    const d = doc.data();
    chartData.push({ x: d.timestamp.toDate(), y: d.amount });

    const li = document.createElement("li");
    li.textContent = `${d.userName} donated ₹${d.amount} on ${d.timestamp.toDate().toLocaleString()}`;
    list.appendChild(li);
  });

  renderDonationChart(chartData);
}

function renderDonationChart(data) {
  const ctx = document.getElementById("donationChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{
        label: "Donations Over Time",
        data,
        borderColor: "#28a745",
        fill: false,
      }],
    },
    options: {
      scales: {
        x: { type: 'time', time: { unit: 'day' } },
        y: { beginAtZero: true }
      },
    },
  });
}
