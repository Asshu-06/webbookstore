# 📚 Web Bookstore

### A Modern Online Bookstore

Web Bookstore is a responsive online bookstore application built using **React.js, TypeScript, and Supabase**. It aims to provide users with a convenient digital platform to explore books and enjoy an accessible online bookstore experience.

## 🌟 Project Overview

The application uses a modern frontend architecture with Supabase integration for backend services and database management.

It is deployed on Vercel, making the application accessible online.

## ✨ Key Features

- 📚 Online bookstore interface.
- 🔍 Book discovery and browsing experience.
- 👤 User authentication integration.
- 🗄️ Supabase backend and database integration.
- 🔐 Admin setup and management configuration.
- 📱 Responsive web application design.

*Feature descriptions should be retained only if they are implemented and working in the current application.*

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| TypeScript | Type-safe development |
| Vite | Development and build tooling |
| Supabase | Backend and database services |
| React Router | Application routing |
| Lucide React | Icons |
| Vercel | Deployment |

## 🏗️ Application Architecture

```text
        User
          |
          v
    React Application
          |
          v
    React Router
          |
          v
    Supabase Client
          |
          v
       Supabase
       /      \
 Authentication Database
          |
          v
    Application Data
```

## 🚀 Live Demo

Explore the deployed application:

**[Web Bookstore – Live Website](https://webbookstore.vercel.app/)**

## ⚙️ Installation and Setup

### Prerequisites

- Node.js
- npm
- Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/Asshu-06/webbookstore.git
```

### 2. Navigate to the project

```bash
cd webbookstore
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use your own Supabase project credentials. Never expose service-role keys or other secrets in frontend code.

### 5. Run the application

```bash
npm run dev
```

Open the local development URL displayed in your terminal.

### 6. Build for production

```bash
npm run build
```

## 📁 Project Structure

```text
webbookstore/
│
├── public/
├── scripts/
├── src/
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── supabase-setup.sql
├── supabase-setup-simple.sql
└── README.md
```

## 🔒 Security Considerations

- Configure appropriate Supabase Row Level Security policies.
- Restrict administrative access to authorized users.
- Keep sensitive credentials outside the source code.
- Validate permissions for database operations.

## 🎯 Project Objective

The objective of this project is to develop a modern online bookstore while gaining practical experience in React, TypeScript, backend integration, database management, authentication, and deployment.

## 👩‍💻 Developer

**Aswani Adduri**

B.Tech Computer Science & Engineering | 2027

- GitHub: [Asshu-06](https://github.com/Asshu-06)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/aswani-adduri-442149328/)

---

⭐ If you find this project interesting, feel free to explore the repository!
