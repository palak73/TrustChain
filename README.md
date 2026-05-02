TrustChain 🤝🔗
"Transparency is the foundation of trust — let's build it together."

TrustChain is a decentralized platform designed to bring complete transparency to charitable donations. By leveraging blockchain technology (Web3) and machine learning, TrustChain ensures that funds given to Non-Governmental Organizations (NGOs) are tracked, verified, and utilized effectively, minimizing the risk of fraud.

🌟 Key Features
Decentralized Donations: Connect your Ethereum wallet and donate directly to verified NGOs using cryptocurrency.
Fraud Detection AI: An integrated Machine Learning model (Random Forest) analyzes NGO spending behavior, milestone requests, and receipt uploads to flag potentially fraudulent activities.
Role-Based Dashboards:
Donors: Track donation history, view supported NGOs, and monitor fund utilization.
NGO Admins: Manage funding goals, view donation analytics, and upload expenditure proofs/receipts.
Secure Authentication: User registration and login powered by Firebase Authentication.
Real-Time Analytics: Admin dashboards feature real-time charts to track incoming donations.
💻 Tech Stack
Frontend:

HTML5, CSS3, JavaScript (Vanilla)
Ethers.js (Web3 / Blockchain Integration)
Chart.js (Data Visualization)
Firebase (Authentication & Firestore Database)
Backend / AI:

Python 3
Flask (RESTful API for Fraud Detection)
Scikit-Learn / Pandas (Machine Learning & Data Processing)
Joblib (Model Serialization)
📁 Project Structure
text
TrustChain/
├── Assets/                 # Image and graphic assets
├── Img/                    # Additional UI images
├── js/                     # Frontend JavaScript (auth, web3, main logic)
├── fraud_api.py            # Flask API serving the ML model
├── fraud_rf_model.pkl      # Pre-trained Random Forest ML model
├── ngoinno.ipynb           # Jupyter Notebook for ML model training
├── index.html              # Main landing page & application interface
├── dashboard.html          # Donor history dashboard
├── style.css               # Main stylesheet
├── requirements.txt        # Python dependencies
└── Procfile.txt            # Deployment configuration
🚀 Installation & Setup
Prerequisites
Python 3.8+
A modern web browser
MetaMask (or another Web3 wallet extension) installed in your browser
1. Clone the Repository
bash
git clone https://github.com/palak73/TrustChain.git
cd TrustChain
2. Backend Setup (Fraud Detection API)
Install the required Python packages and run the Flask server:

bash
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run the Flask API
python fraud_api.py
The API will start running locally at http://127.0.0.1:5000/.

3. Frontend Setup
TrustChain's frontend is built with pure HTML/CSS/JS, so you can serve it using any simple local server.

bash
# Using Python's built-in HTTP server
python -m http.server 8000
Open your browser and navigate to http://localhost:8000/index.html.

🧠 How the Fraud Detection Works
The platform requires NGOs to break down their funding goals into milestones. When an NGO requests funds for a milestone and submits their expenditures, the system checks:

Deviations between requested funds and actual expenditures.
Whether valid receipts were uploaded.
Unusual spending patterns compared to baseline data.
The ML model (fraud_api.py) processes these inputs and returns a risk assessment, flagging suspicious NGOs to protect donors.

📜 License
© 2025 TrustChain. All Rights Reserved. Developed and maintained by the Neuronators.
