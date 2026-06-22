# 💻 CampusHire Frontend — Smart Placement Tracker

This is the frontend application for **CampusHire**, a smart placement tracking system. Built with React and Vite, it provides separate dashboards for students and placement administrators to manage placement activities, track application progress, and receive real-time updates.

---

## 🛠️ Tech Stack & Key Libraries

* **Framework:** React
* **Build Tool:** Vite
* **Routing:** React Router
* **Styling:** Tailwind CSS
* **Form Management:** React Hook Form
* **API Communication:** Axios
* **User Notifications:** React Hot Toast

---

## 🔄 Application Flow & Functionality

The frontend delivers two role-based user experiences connected to the CampusHire backend APIs.

### 🎓 Student Portal

* View dashboard statistics such as eligible drives, applications, and selections.
* Browse placement drives filtered by branch and CGPA eligibility.
* Apply for eligible companies with a single click.
* Track application status (`Applied`, `Shortlisted`, `Selected`, `Rejected`).
* Receive placement-related notifications and updates.
* Manage profile information including contact details, CGPA, and resume links.

### 💼 Placement Administrator Portal

* View overall placement statistics and analytics.
* Create and manage recruitment drives.
* Access and review registered student records.
* Monitor application activity across all companies.
* Update recruitment status and placement rounds for applicants.

---

## 🛡️ Authentication & Route Protection

The application implements client-side role-based access control.

### Protected Routes

* Redirects unauthenticated users to the login page.
* Restricts access based on user roles.
* Prevents students from accessing admin pages and administrators from accessing student pages.
* Ensures secure navigation throughout the application.

---

## 📂 Key Modules

| Module             | Purpose                                |
| ------------------ | -------------------------------------- |
| Authentication     | Login and Registration                 |
| Student Dashboard  | Drives, Applications, Notifications    |
| Admin Dashboard    | Companies, Students, Applications      |
| Profile Management | Student information and resume updates |
| Protected Routes   | Role-based page access                 |
| API Services       | Backend communication using Axios      |

---

## 🔌 Backend Integration

The frontend communicates with backend REST APIs to:

* Authenticate users.
* Fetch dashboard statistics.
* Retrieve eligible placement drives.
* Submit job applications.
* Manage placement status updates.
* Fetch and display notifications.
* Update student profiles.

---

## 🚀 Setup & Launch

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## ✨ Key Features

* Role-based dashboards
* Secure route protection
* Eligibility-based drive filtering
* Application tracking system
* Notification center
* Profile management
* Responsive user interface
* Backend API integration
