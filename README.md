# 🏆 PlayTrust - Sports & Coaching Platform

## 🚀 Live Demo
- **Deployed on AWS EC2 (Nginx + PM2)**
- 🌐 [Visit Live Project](http://15.207.89.22/signup)

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

--

Process
1.Clone the repo
git clone  → https://github.com/Poornima3787-developer/PlayTrust.git
cd playtrust

2.Install dependencies
npm install

3.setup environment variables(nano .env)
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=3000
EMAIL_API_KEY=your_api_key(it is for reset the password)
AWS_SECRETKEY(from s3 bucket)

4.Run the app
npm start

5.Access the app
http://<ec2-ip-address>/3000


---

API END POINTS

🔐 Authentication
POST   /signup       #signup with JWT
POST   /register     # User registration(based on category)
POST   /login        # Login with JWT

👤 Profile
GET    /profile/             # Get logged-in profile based on the category(coach,parent,school)
PUT    /profile/update       # Update user profile

🎉 Events
POST   /events               # Create event (Coach/School/Parent)
GET    /events?page=1        # Get paginated events
GET    /events/:id           # Get single event details
DELETE /events/:id           # Delete event (Admin/Creator only)

⭐ Coches
GET    /coaches               # Get coaches
GET    /coches/verificationStatus   # Get based on verification status

👤 Admin
PUT   /coaches/rejected       # Get status
PUT   /coches/approved        # Get approved


## ✨ Author
-  **Linkedin** → https://www.linkedin.com/in/poornima-aragala-link/    
-  **Github** → https://github.com/Poornima3787-developer
