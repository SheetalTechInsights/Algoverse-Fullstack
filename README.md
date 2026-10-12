# Algoverse

Algoverse is a full-stack DSA (Data Structures & Algorithms) learning platform built to help learners practice coding problems through curated, pattern-based problem sets, with real-time doubt resolution powered by an integrated AI chatbot.

## 🚀 Features

- **Pattern-based problem sets** – Problems organized by DSA patterns (e.g., Two Pointers, Sliding Window, Recursion) rather than random difficulty, helping learners build intuition.
- **JWT-secured authentication** – Secure user registration and login using JSON Web Tokens, keeping user sessions stateless and scalable.
- **AI-powered doubt resolution** – An integrated chatbot (built on the OpenAI API) answers learner questions in real time while they solve problems.
- **Responsive UI** – Built with React for a smooth experience across devices.
- **RESTful API design** – Clean, resource-based REST APIs connecting the frontend and backend.

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Backend        | Java, Spring Boot                   |
| Authentication | JWT (JSON Web Token)                |
| Frontend       | React.js                            |
| Database       | PostgreSQL                          |
| AI Integration | OpenAI API                          |
| API            | REST                                |
| Deployment     | Frontend – Vercel, Backend – Railway |
| Version Control| Git                                  |

## 🏗️ Architecture Overview

```
┌─────────────┐        REST API        ┌──────────────────┐        ┌──────────────┐
│   React.js   │  <─────────────────>  │  Spring Boot API  │  <───> │ PostgreSQL DB │
│  (Vercel)    │                       │    (Railway)       │        │              │
└─────────────┘                       └──────────────────┘        └──────────────┘
                                                │
                                                ▼
                                        ┌───────────────┐
                                        │  OpenAI API    │
                                        │ (AI Chatbot)   │
                                        └───────────────┘
```

- The **React frontend** communicates with the backend through REST API calls, sending the JWT token with each authenticated request.
- The **Spring Boot backend** handles business logic, authentication, problem-set data, and routes chatbot queries to the OpenAI API.
- **PostgreSQL** stores user accounts, problem sets, and progress data.
- The frontend is deployed on **Vercel**, and the backend is deployed on **Railway**.

## 📂 Project Structure (example)

```
algoverse/
├── backend/
│   ├── src/main/java/com/algoverse/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access layer
│   │   ├── model/           # Entity classes
│   │   ├── security/        # JWT & Spring Security config
│   │   └── config/          # App configuration
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page-level components
│   │   ├── services/        # API call helpers
│   │   └── App.js
│   └── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Java 21
- Node.js & npm
- PostgreSQL
- An OpenAI API key

### Backend Setup

```bash
cd backend
# Configure your database and OpenAI API key in application.properties
./mvnw spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

### Environment Variables

| Variable            | Description                          |
|---------------------|---------------------------------------|
| `DB_URL`             | PostgreSQL connection URL            |
| `DB_USERNAME`         | Database username                    |
| `DB_PASSWORD`         | Database password                    |
| `JWT_SECRET`          | Secret key used to sign JWT tokens   |
| `OPENAI_API_KEY`      | API key for the AI chatbot feature   |

## 🔑 Key API Endpoints (example)

| Method | Endpoint                | Description                     |
|--------|--------------------------|----------------------------------|
| POST   | `/api/auth/register`     | Register a new user             |
| POST   | `/api/auth/login`        | Authenticate and get JWT token  |
| GET    | `/api/problems`          | Get list of problem sets        |
| GET    | `/api/problems/{id}`     | Get a specific problem          |
| POST   | `/api/chatbot/ask`       | Ask the AI chatbot a question   |

## 🌐 Live Demo

- Frontend: *[add your Vercel link here]*
- Backend: *[add your Railway link here]*

## 📈 Future Improvements

- Add progress tracking and a personal dashboard for each user.
- Add difficulty-based filtering and a bookmarking feature.
- Add leaderboards to make practice more engaging.

## 👩‍💻 Author

**Sheetal Patidar**
- GitHub: [github.com/SheetalTechInsights](https://github.com/SheetalTechInsights)
- LinkedIn: [linkedin.com/in/sheetal-patidar-9a0000292](https://linkedin.com/in/sheetal-patidar-9a0000292)
