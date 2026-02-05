# 🤖 AI Resume Analyzer & Job Match Platform (MERN Stack)

A full‑stack **AI‑powered Resume Analyzer and Job Matching platform** built using the **MERN stack**, focused on **secure authentication, AI integration, and clean backend architecture**.
This project is designed to demonstrate **real‑world full‑stack development practices** suitable for a **fresher‑level product company role**.

---

## 📌 Project Overview

**AI Resume Analyzer** allows users to upload their resumes and match them with job descriptions to understand how well their profile fits a specific role. The system analyzes skills, calculates a match score, and provides **AI‑generated suggestions** to improve the resume.

Users can:

* Register and verify their email using OTP
* Login and logout securely
* Upload resumes (PDF / DOC / DOCX)
* Match resumes with job descriptions
* View skill match score and missing skills
* Receive AI‑based resume improvement suggestions
* Track their job match history
* Access only their own data (strict ownership)

The main focus of this project is **secure authentication**, **AI‑based analysis**, and **production‑ready backend architecture**, not just UI.

---

## 🚀 Features

### 🔑 Authentication & Security

* User registration with **email OTP verification**
* Secure login using **JWT Access Token + Refresh Token**
* Refresh token rotation for better session security
* **HTTP‑only cookies** for token storage
* Protected routes using authentication middleware
* Logout clears tokens and invalidates refresh token
* Password hashing using **bcrypt**
* Secrets managed using **.env environment variables**

### 📄 Resume Upload & Management

* Upload resumes in **PDF, DOC, or DOCX** format
* File validation using MIME type and size limits
* Resume text extraction for analysis
* Secure cloud storage using **Cloudinary**
* Users can view and delete only their own resumes

### 🧠 AI Resume & Job Matching

* Job role detection from job description
* Skill extraction using NLP techniques
* Resume vs job description skill comparison
* Match score calculation
* Detection of missing and matched skills
* AI‑generated suggestions for resume improvement using **Google GenAI**

### 📊 Job Match History

* Store every resume–job analysis result
* View past job matches with score and suggestions
* Resume‑linked job match records
* Sorted history for better tracking

### 🧠 Backend Architecture

* Clean **MVC structure** (Models, Controllers, Routes)
* Centralized error handling with custom error classes
* Async request handling using wrappers
* Reusable middleware for authentication and validation
* RESTful API design following best practices
* Secure file handling with **Multer**
* Image storage using **Cloudinary**
 

### 🎨 Frontend

* Responsive UI built with **React + Tailwind CSS**
* Modern build setup using **Vite**
* Global state management using **Redux Toolkit**
* Session persistence using **Redux Persist**
* API communication using **Axios**
* Charts and analytics using **Recharts**
* Toast notifications for user feedback

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Redux Persist
* Tailwind CSS
* Axios
* React Router DOM
* React Hook Form
* Recharts
* React Markdown
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Google GenAI
* Multer
* Cloudinary
* bcrypt
* Nodemailer
* Cookie‑Parser
* CORS
* Helmet
* dotenv
* @google/genai
* pdf2json
* mammoth
* NLP Libraries

---

## 📂 Project Structure

### Backend

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── db/
 ├── app.js
 └── index.js
```

### Frontend

```
src/
 ├── components/
 ├── pages/
 ├── redux/
 ├── services/
 ├── utils/
 └── main.jsx
```

---

## 🔐 Authentication Flow (High Level)

1. User registers → OTP sent to email
2. User verifies email using OTP
3. User logs in → Access & Refresh tokens generated
4. Tokens stored securely in **HTTP‑only cookies**
5. Access token protects API routes
6. If access token expires → refresh token issues new access token
7. User logs out → Tokens cleared and refresh token invalidated

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

```
PORT=5000
MONGODB_URI=mongodb_connection_string
ACCESS_TOKEN_SECRET=access_secret
REFRESH_TOKEN_SECRET=refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
CLOUDINARY_NAME=cloudinary_name
CLOUDINARY_API_KEY=cloudinary_key
CLOUDINARY_API_SECRET=cloudinary_secret
EMAIL_USER=email
EMAIL_PASS=email_password
ALLOWED_FILE_TYPES=application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
MAX_FILE_SIZE=5242880
```

---

## ▶️ How to Run the Project

### Backend

```bash
npm install
npm run start
```

### Frontend

```bash
npm install
npm run satar
```

---

## 🎯 Learning Outcomes (As a Fresher)

Through this project, I learned:

* How real‑world authentication works using JWT & refresh tokens
* How to securely handle file uploads and cloud storage
* How to integrate AI services into backend workflows
* How to design clean and scalable backend architecture
* How frontend and backend communicate securely
* How to manage global state and sessions in React
* How production‑level apps handle security and errors

---

## 📌 Why This Project Matters

This project is not just a CRUD application. It focuses on:

* Secure authentication & authorization
* AI‑driven resume analysis
* Clean backend architecture
* Real‑world file handling and session management
* Production‑ready development practices

It represents my understanding of **full‑stack MERN development** as a fresher and my readiness to work on real product‑based applications.

---

## 👤 Author

**Gaurav Rawat**
MERN Stack Developer (Fresher)

---

⭐ If you find this project useful, feel free to explore the code and suggest improvements!
