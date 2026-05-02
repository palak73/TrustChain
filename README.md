[README.md](https://github.com/user-attachments/files/27302369/README.md)

<div align="center">
  <h1>🤝🔗 TrustChain</h1>
  <p><strong>Decentralized, Transparent & AI-Driven Charitable Donations</strong></p>

  <!-- Badges -->
  <a href="https://github.com/palak73/TrustChain"><img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" alt="Status" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Blockchain-Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white" alt="Ethereum" /></a>
  <a href="#"><img src="https://img.shields.io/badge/AI_Model-Random_Forest-orange?style=for-the-badge&logo=scikit-learn" alt="AI" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Frontend-HTML/JS-yellow?style=for-the-badge&logo=javascript" alt="Frontend" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Backend-Flask-black?style=for-the-badge&logo=flask" alt="Flask" /></a>
  
  <br />
  <i>"Transparency is the foundation of trust — let's build it together."</i>
</div>

<br />

## 🎯 The Problem & Our Solution

* **The Problem**: Donors often hesitate to contribute to NGOs due to a lack of transparency regarding how their funds are utilized. Financial mismanagement and fraud are real concerns.
* **Our Solution**: TrustChain bridges this gap by combining the immutability of **Blockchain (Web3)** with the predictive power of **Machine Learning**. Funds are tracked on-chain, and an AI model actively monitors NGO spending behavior to flag suspicious activities in real-time.

---

## ⚡ Why This Stands Out (For Recruiters)
- **Full-Stack Implementation**: Bridges a Web3 frontend (Ethers.js) with a Python/Flask Machine Learning backend.
- **Applied Machine Learning**: Solves a real-world problem by analyzing NGO milestone deviations using a trained Random Forest model.
- **Modern Authentication**: Secure user roles and state management using Firebase.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| 🛡️ **Fraud Detection AI** | An integrated ML model analyzes spending behaviors, receipt uploads, and milestone deviations. |
| 💸 **Decentralized Donations** | Secure, direct cryptocurrency (ETH) donations to verified NGOs via MetaMask. |
| 📊 **Role-Based Dashboards** | Distinct interfaces for **Donors** (history/tracking) and **NGOs** (analytics/goal management). |
| 🔐 **Secure Authentication** | Seamless Firebase integration for user registration and role assignment. |

---

## 🛠️ Tech Stack

<details>
<summary><b>💻 View the complete Tech Stack (Click to expand)</b></summary>
<br>

### Frontend
* **HTML5 / CSS3 / Vanilla JS**
* **Ethers.js** (Web3 & Ethereum integration)
* **Chart.js** (Dashboard analytics visualization)
* **Firebase** (Auth & Firestore Database)

### Backend & AI
* **Python 3**
* **Flask** (RESTful API serving the ML model)
* **Scikit-Learn & Pandas** (Model training & data processing)
* **Joblib** (Model serialization)

</details>

---

## ⚙️ How the Fraud Detection AI Works

The platform enforces strict accountability for NGOs through a **milestone-based** funding approach:

1. **Request Phase**: NGOs split their funding goals into milestones.
2. **Execution & Proof**: NGOs upload receipts and report expenditures for each milestone.
3. **AI Assessment**: The ML model evaluates:
   - Deviations between requested vs. actual expenditures.
   - Missing or invalid receipt proofs.
   - Irregular spending patterns against historical baseline data.
4. **Outcome**: The system returns a real-time risk assessment, flagging suspicious entities to protect donors.

---

## 💻 Quick Setup & Local Deployment

<details>
<summary><b>🛠️ Step-by-Step Installation Instructions (Click to expand)</b></summary>
<br>

### Prerequisites
* Python 3.8+
* Web Browser with the **MetaMask** extension installed

### 1. Clone & Navigate
```bash
git clone https://github.com/palak73/TrustChain.git
cd TrustChain
```

### 2. Start the Backend (Flask + ML Model)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python fraud_api.py
```
*(Runs locally on port 5000)*

### 3. Start the Frontend
Since it's built with Vanilla JS, any local HTTP server will work:
```bash
python -m http.server 8000
```
*(Navigate to `http://localhost:8000/index.html` in your browser)*

</details>

---

<div align="center">
  <p>Developed with ❤️ by the <b>Neuronators</b></p>
</div>
