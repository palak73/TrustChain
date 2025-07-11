
// document.addEventListener("DOMContentLoaded", () => {
//   const ngos = [
//     { name: "Smile Foundation", category: "Education", goal: 100000 },
//     { name: "HealthAid", category: "Health", goal: 200000 },
//     { name: "Green Earth", category: "Environment", goal: 150000 },
//     { name: "Future Coders", category: "Tech Education", goal: 120000 }
//   ];

//   const cards = ngos.map(n =>
//     `<div class='ngo-card'>
//       <h2>${n.name}</h2>
//       <p>Focus: ${n.category}</p>
//       <p>Goal: ₹${n.goal.toLocaleString()}</p>
//       <button onclick="alert('Donate via MetaMask to ${n.name}')">Donate</button>
//     </div>`
//   ).join("");

//   const target = document.getElementById("ngoCards");
//   if (target) target.innerHTML = cards;
// });




const images = [
  'img/ngo1.jpg',
  'img/ngo2.jpg',
  'img/ngo3.jpg'
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



//  Firebase Config & Initialization
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global Variables
let allNGOs = [];
let selectedNGO = null;

//  Fetch NGO Data from npoint.io JSON API
fetch("https://api.npoint.io/1b9476c90b214a9d9bc8")
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
        <button class="btn" onclick="openDonateModal(${index})">Donate Now</button>
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

function confirmDonation() {
  const amount = donationAmount.value;
  if (amount > 0) {
    alert(`Thank you! You donated ${amount}ETH to ${selectedNGO.name}`);

    // closeModal();
  } else {
    alert("Please enter a valid donation amount.");
  }
}

// Event Listeners
searchInput.addEventListener("input", filterNGOs);
closeModalBtn.addEventListener("click", closeModal);
confirmDonateBtn.addEventListener("click", confirmDonation);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});


// // Expose modal function globally
window.openDonateModal = openDonateModal;



// dark mode

const toggle = document.getElementById("modeToggle");
const themeIcon = document.getElementById("themeIcon");

// Load saved mode
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
  themeIcon.textContent = "🌙";
}

toggle.addEventListener("change", function () {
  document.body.classList.toggle("dark-mode");

  // Change icon
  themeIcon.textContent = this.checked ? "🌙" : "🌞";

  // Save user preference
  localStorage.setItem("dark-mode", this.checked);
});


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

  alert("🎉 Thank you for your donation!");

  // Optional: Clear fields
  document.getElementById("donorName").value = "";
  document.getElementById("donorEmail").value = "";
  document.getElementById("donorNGO").value = "";
  document.getElementById("donorAmount").value = "";
}

