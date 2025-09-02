# 🏆 PlayTrust - Sports & Coaching Platform

## 🚀 Live Demo
- **Deployed on AWS EC2 (Nginx + PM2)**
- 🌐 [Visit Live Project](http://your-domain-or-ec2-public-ip)

---

## 📽 Demo Video
🎥 [Watch Demo](your-video-link)

---

## 📌 Project Overview
PlayTrust is a platform that connects **parents, schools, and coaches** to manage and discover sports events.  
It solves the real-world challenge of finding verified coaches, registering for events, and managing participation in a structured way.

This project demonstrates **full-stack development, authentication, role-based access, and AWS deployment**.

---

## ⚙️ Tech Stack
- **Frontend**: HTML, CSS, Bootstrap, JavaScript 
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Authentication**: JWT (JSON Web Tokens)  
- **Deployment**: AWS EC2, Nginx (reverse proxy), PM2 (process manager)

---

## ✨ Features
- 👨‍🏫 **User Roles** → Coach, Parent, School  
- 📝 **Profile Creation & Verification**  
- 🎉 **Event Creation & Registration**  
- 🔍 **Pagination & Search Functionality**   
- 🔐 **Authentication** with JWT  
- 📱 **Responsive Dashboard UI**  

---

## 📂 Folder Structure
```bash
PLAYTRUST/
 ├── controllers/          # Request handlers / business logic
 ├── middleware/           # Auth & custom middlewares
 ├── models/               # Mongoose models (User, Coach, Event, etc.)
 ├── routes/               # API route definitions
 ├── services/             # Upload the images
 ├── utils/                # Database connection
 ├── views/                # View (HTML)
 ├── public/               # Static files (CSS, JS, images)
 ├── adminSeed/            # Scripts to seed admin data
 ├── node_modules/         # Dependencies
 ├── server.js             # App entry point
 ├── package.json          # Project metadata & dependencies
 └── README.md             # Documentation

