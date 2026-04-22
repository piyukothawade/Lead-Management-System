# 🏡 Lead Management System (Mini CRM)

A full-stack Lead Management System built for a real estate use case.
This application allows users to manage leads, track status, add notes, and visualize data through a dashboard.

---

## 🚀 Features

### 🔹 Lead Management

* Add new leads
* Edit and delete leads
* View all leads in a table
* Search by name or phone
* Filter by source and status
* Sort by date or budget

### 🔹 Lead Details

* View complete lead information
* Update lead status (New, Contacted, Site Visit, Closed)
* Add notes/comments

### 🔹 Dashboard

* Total leads count
* Leads by source
* Status distribution
* Conversion rate
* Lead trends (charts)



## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Recharts (Charts)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📁 Project Structure

```
lead-management-system/
│
├── frontend/
│   └── src/
│       └── app/
│           └── features/
│               └── leads/
│                   ├── pages/
│                   ├── components/
│                   └── services/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       └── config/
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone <your-repo-url>
cd lead-management-system
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints



### 📌 Leads

* GET `/api/leads`
* GET `/api/leads/:id`
* POST `/api/leads`
* PUT `/api/leads/:id`
* DELETE `/api/leads/:id`

### 📝 Notes

* POST `/api/leads/:id/notes`

---



## 📊 Dashboard Metrics

* Total Leads
* Closed Leads
* Conversion Rate
* Leads by Source
* Status Distribution
* Lead Trends

---

## ❗ Error Handling

* Backend validation for required fields
* Proper HTTP status codes
* Frontend toast notifications for user feedback

---


---

## 👨‍💻 Author

**PiyuSha Kothawade**

---

## ⭐ Notes

This project is designed for learning and interview preparation for full-stack roles.
It demonstrates real-world concepts like CRUD operations, authentication, state management, and API integration.

---
