# 🚀 Dockerized DevSecOps Demo – Node.js + PostgreSQL + Nginx

A fully Dockerized Node.js CRUD API connected to PostgreSQL, reverse-proxied with Nginx.  
Built for demonstrating DevSecOps fundamentals, security testing, and production-grade architecture.  
Includes ready-to-use CI/CD pipelines with SAST (Semgrep) and DAST (OWASP ZAP) security automation.

---

## 🧱 Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Proxy:** Nginx
- **Containers:** Docker & Docker Compose
- **Security:** Semgrep (SAST), OWASP ZAP (DAST), GitHub Actions CI/CD

---

## ✨ Features
- ✅ Node.js REST API with Express
- ✅ PostgreSQL database with Docker
- ✅ Nginx reverse proxy for routing
- ✅ Docker Compose for multi-container setup
- ✅ Semgrep for static code analysis
- ✅ OWASP ZAP for dynamic security testing
- ✅ GitHub Actions for CI/CD pipeline
- ✅ Basic Tailwind CSS frontend
- ✅ CRUD API (`/users`) using PostgreSQL
- ✅ RESTful endpoints (Create, Read, Update, Delete)
- ✅ Nginx reverse proxy for routing
- ✅ Multi-service `docker-compose` setup
- ✅ Environment variable-based config
- ✅ gitignore for sensitive files

---

## 📦 Folder Structure

```
project-root/
├── .github/workflows/
│   ├── security.yml
├── public/
│   ├── index.html
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── index.js
├── package.json
├── nginx.conf
└── README.md
```

---

## ⚙️ How to Run

> Make sure Docker & Docker Compose are installed.

```bash
# Build and start all services
docker-compose up --build
```

Once running:

- App: http://localhost:3000
- DB: http://localhost:5432 (PostgreSQL)
- Nginx: http://localhost (reverse proxy)  
- API: http://localhost/users  
---

## 📮 API Endpoints

| Method | Route           | Description           |
|--------|------------------|-----------------------|
| GET    | `/users`         | Get all users         |
| POST   | `/users`         | Add new user          |
| PUT    | `/users/:id`     | Update user by ID     |
| DELETE | `/users/:id`     | Delete user by ID     |
| GET    | `/search?q=term` | Search users by term  |
| GET    | `/debug`         | Debug info            |
| GET    | `/health` | Local File Inclusion test |

---

## 🛠 Environment Variables

Set inside `docker-compose.yml`:

```yaml
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mydb
```

---
## 🛡️ Security Testing
- **SAST:** Uses Semgrep to analyze code for vulnerabilities.
- **DAST:** Uses OWASP ZAP to perform dynamic security testing on the running application.
- **GitHub Actions:** Automates security scans on every push and pull request.
- **ZAP Scan Report:** Generated in JSON format and uploaded as an artifact.
- **Semgrep Report:** Generated in JSON format and uploaded as an artifact.

---


## 🧑‍💻 Author

Built with ❤️ by Moaaz
