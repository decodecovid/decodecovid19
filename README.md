# 🧬 DecodeCOVID - Identifying Key SARS-CoV-2 Proteins Through Sequence Analysis  

🚀 **Project Status**: *Work in Progress*  

## 📌 Overview  
DecodeCOVID is a **machine learning-powered bioinformatics project** designed to analyze protein sequences and identify key proteins involved in the **pathogenesis of SARS-CoV-2**. By leveraging **protein sequence data from UniProt**, feature extraction techniques, and various **ML models**, this project aims to assist in the development of better therapeutic strategies for COVID-19.  

Currently, the system **accurately classifies proteins associated with COVID-19** but is **hosted locally**. Future enhancements, including **deep learning integration and public deployment**, will refine and finalize the project.  

### 👥 Developed By  
- **Jishu Sengupta** 
- **Ashutosh Dubey**   
- **Prateek Raj Gupta**  
- **Sandipan Dhar**  

Mentored by: **(Prof.) Dr. Sovan Saha**  

---

## 🔬 Project Workflow  
### 1️⃣ **Data Collection & Preprocessing**  
- Collected protein sequence data from **UniProt** in **FASTA format**  
- **Labeled datasets**:  
  - ✅ **Positive Data** - Proteins associated with SARS-CoV-2  
  - ❌ **Negative Data** - Proteins not related to COVID-19  
  - ⚪ **Neutral Data** - Proteins unrelated to pathogenic processes  
- Cleaned, normalized, and extracted essential protein features using **pFeature**  

### 2️⃣ **Feature Extraction & Engineering**  
- Used **pFeature (by IIIT-Delhi)** to extract **physicochemical and amino acid properties**  
- Applied **Feature Selection Techniques**:  
  - **Correlation Analysis** 🧩 (Removed redundant features)  
  - **PCA (Principal Component Analysis)** 📉 (Dimensionality reduction)  
  - **RFECV (Recursive Feature Elimination with Cross-Validation)** 🔍 (Selected the most impactful features)  

### 3️⃣ **Model Training & Evaluation**  
- Trained multiple **machine learning models** on the extracted features, including:  
  - ✅ **Random Forest (Best Performing - 75% Accuracy)** 🌳  
  - 🚀 **XGBoost (68% Accuracy)**  
  - 🏹 **Support Vector Machine (63% Accuracy)**  
  - 🔢 **Logistic Regression (62% Accuracy)**  
- **Why Random Forest?**  
  - Handles complex and high-dimensional data well  
  - Reduces overfitting through ensemble learning  
  - Provides **feature importance insights** for better interpretability  

### 4️⃣ **Application Development**  
- Developed a **web-based prediction platform** 🌐  
  - **Frontend**: React + TypeScript ⚛️  
  - **Backend**: Flask (REST API) 🐍  
  - **Machine Learning**: scikit-learn 🤖  
  - **Feature Extraction & Data Handling**: NumPy, Pandas 📊  
- **How it works?**  
  1. User inputs a **protein sequence or name** on the web interface  
  2. The request is sent to the backend for **feature extraction & preprocessing**  
  3. The **trained Random Forest model** predicts whether the protein is linked to SARS-CoV-2  
  4. Results are displayed with **graphs and summaries** 📈  

---

## 🚀 Future Enhancements (8th Semester Goals)  
🔹 **Deep Learning Integration** - Implement **neural networks** to improve classification accuracy  
🔹 **Dataset Expansion** - Introduce **centrality features** for better feature representation  
🔹 **Cloud Deployment** - Deploy the web application for **public access (Vercel/AWS)** ☁️  
🔹 **Drug Analysis Module** - Analyze potential **therapeutic targets** based on identified proteins  

Once these enhancements are completed, **DecodeCOVID will be finalized** as a **comprehensive bioinformatics tool** for COVID-19 research.  

---

## 🔧 Tech Stack  
| Component   | Technology Used |
|-------------|----------------|
| **Frontend** | React ⚛️, TypeScript 📝, Vite 🚀 |
| **Backend** | Flask 🐍, REST API 🌐 |
| **Machine Learning** | Random Forest 🌳, XGBoost 🚀, SVM 🏹, scikit-learn 🤖 |
| **Feature Extraction** | pFeature 🧬, NumPy 🔢, Pandas 📊 |
| **Dataset Source** | UniProt 🏛️ (Protein Sequences in FASTA format) |

---

## 🎯 Why This Matters  
COVID-19 continues to evolve, and **drug discovery remains a challenge**. By identifying key **SARS-CoV-2 proteins**, our project contributes to ongoing research in **vaccine & antiviral drug development**. With **machine learning and bioinformatics**, we are taking a **data-driven approach to fight pandemics**.  

---

## 📌 Current Status: **Prototype Working (Locally Hosted) 🚧**  
✅ **Successfully classifies COVID-19-related proteins**  
✅ **Machine Learning models trained & evaluated**  
✅ **Web application built & functional**  
⚠️ **Not publicly available yet (Under Development)**  

---

## 📢 Get Involved  
💡 **Suggestions & collaborations** are welcome! If you're interested in **bioinformatics, ML, or web development**, feel free to contribute or share feedback.  

📌 *Stay tuned for upcoming updates as we refine and deploy DecodeCOVID!* 🚀
