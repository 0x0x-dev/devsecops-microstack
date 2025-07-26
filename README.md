# 🚀 Dockerized DevSecOps Demo – Node.js + PostgreSQL + Nginx

A fully Dockerized Node.js CRUD API connected to PostgreSQL, reverse-proxied with Nginx.  
Designed to demonstrate DevSecOps fundamentals, security testing, and production-grade architecture.  
Includes ready-to-use CI/CD pipelines with SAST (Semgrep) and DAST (OWASP ZAP) security automation.

---

## 🧱 Tech Stack

- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Proxy:** Nginx
- **Containers:** Docker & Docker Compose
- **Security:** Semgrep (SAST), OWASP ZAP (DAST)
- **CI/CD:** GitHub Actions

---

## ✨ Features

- CRUD API (`/users`) with PostgreSQL
- RESTful endpoints (Create, Read, Update, Delete)
- Nginx reverse proxy for secure routing
- Multi-service orchestration with Docker Compose
- Environment variable-based configuration
- Basic Tailwind CSS frontend
- Automated SAST & DAST in CI/CD pipeline
- Security reports as downloadable artifacts

---

## 📦 Folder Structure

```
project-root/
├── .github/workflows/      # CI/CD workflows
│   └── security.yml
├── public/                 # Frontend files
│   └── index.html
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── index.js                # Express app
├── package.json
├── nginx.conf
└── README.md
```

---

## ⚙️ Getting Started

> Prerequisites: [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

```bash
# Build and start all services
docker-compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)
- Nginx (reverse proxy): [http://localhost](http://localhost)
- API: [http://localhost/users](http://localhost/users)

---

## 📮 API Endpoints

| Method | Route               | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/users`            | Get all users                |
| POST   | `/users`            | Add new user                 |
| PUT    | `/users/:id`        | Update user by ID            |
| DELETE | `/users/:id`        | Delete user by ID            |
| GET    | `/search?q=term`    | Search users by name (XSS)   |
| GET    | `/debug`            | Debug info (Sensitive data)  |
| GET    | `/health`           | Health check endpoint        |

---

## 🛠 Environment Variables

Configured in `docker-compose.yml`:

```yaml
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mydb
```

---

## 🛡️ Security & DevSecOps

- **SAST:** Semgrep scans source code for vulnerabilities in CI.
- **DAST:** OWASP ZAP scans the running app for web vulnerabilities in CI.
- **CI/CD:** Automated with GitHub Actions on every push and PR.
- **Reports:** ZAP and Semgrep reports are generated and uploaded as artifacts.
