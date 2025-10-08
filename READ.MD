# ✈️ Airline Management Microservices

<div align="center">

![Airline Management](https://img.shields.io/badge/Project-Airline%20Management-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Deployment-Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

### 🚀 A Cloud-Native Microservices Architecture for Modern Airline Operations

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Documentation](#-api-endpoints) • [Kubernetes Deployment](#-kubernetes-deployment)

</div>

---

## 📖 Overview

The **Airline Management System** is a production-ready, cloud-native microservices application built to handle airline operations at scale. Designed with **Kubernetes-first architecture**, this system manages user authentication, flight operations, and ticket bookings with enterprise-grade scalability and resilience.

### 🎯 Key Highlights

- 🏗️ **Microservices Architecture** - Independently deployable services
- ☸️ **Kubernetes Native** - Built for container orchestration from the ground up
- 🔐 **JWT Authentication** - Secure, token-based authentication
- 🗄️ **Database Per Service** - True microservices isolation
- 📦 **Containerized** - Docker images ready for any cloud platform
- 🔄 **RESTful APIs** - Clean, well-documented endpoints

---

## ✨ Features

### 👤 User Service
- ✅ User registration with email validation
- 🔑 JWT-based authentication & authorization
- 👥 Role-based access control (Admin & Customer)
- 🔒 Secure password reset with OTP verification
- 📧 Email notifications for account activities

### ✈️ Flight Service
- 📝 Complete CRUD operations for flight management (Admin)
- 🔍 Advanced flight search and filtering
- 📊 Real-time flight availability tracking
- 🌍 Multi-route support
- 📅 Schedule management

### 🎫 Booking Service
- 💺 Intelligent seat allocation system
- 📖 Comprehensive booking history
- ✏️ Booking modifications and updates
- ❌ Easy cancellation with refund processing
- 🎟️ Ticket generation and management

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

**Backend**
- Node.js & Express.js
- Sequelize ORM
- JWT & bcrypt

</td>
<td>

**Database**
- PostgreSQL
- Database per Service
- Connection Pooling

</td>
</tr>
<tr>
<td>

**DevOps**
- Docker & Docker Compose
- Kubernetes (K8s)
- kubectl CLI

</td>
<td>

**Tools**
- dotenv
- Postman / Swagger
- Git & GitHub

</td>
</tr>
</table>

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│                                                               │
│  ┌───────────────┐      ┌───────────────┐                   │
│  │  User Service │◄────►│Flight Service │                   │
│  │   (Node.js)   │      │   (Node.js)   │                   │
│  └───────┬───────┘      └───────┬───────┘                   │
│          │                      │                            │
│          │     ┌────────────────┘                            │
│          │     │                                             │
│          ▼     ▼                                             │
│  ┌───────────────────┐                                       │
│  │  Booking Service  │                                       │
│  │    (Node.js)      │                                       │
│  └─────────┬─────────┘                                       │
│            │                                                 │
│  ┌─────────┴──────────────────────┐                         │
│  │                                 │                         │
│  ▼                ▼                ▼                         │
│ ┌──────┐      ┌──────┐      ┌──────┐                        │
│ │ PG-1 │      │ PG-2 │      │ PG-3 │                        │
│ └──────┘      └──────┘      └──────┘                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v18 or higher)
- ✅ **PostgreSQL** (v13 or higher)
- ✅ **Docker** & Docker Compose
- ✅ **Kubernetes** cluster (Minikube, K3s, EKS, GKE, or AKS)
- ✅ **kubectl** CLI configured

### 📥 Clone the Repository

```bash
git clone https://github.com/Vamshi-amudala/airline-management-microservices.git
cd airline-management-microservices
```

### ⚙️ Environment Configuration

Create `.env` files for each service:

**user-service/.env**
```env
PORT=5000
DB_HOST=postgres-user-service
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=airline_users
JWT_SECRET=your_super_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**flight-service/.env**
```env
PORT=5001
DB_HOST=postgres-flight-service
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=airline_flights
```

**booking-service/.env**
```env
PORT=5002
DB_HOST=postgres-booking-service
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=airline_bookings
USER_SERVICE_URL=http://user-service:5000
FLIGHT_SERVICE_URL=http://flight-service:5001
```

### 📦 Install Dependencies

```bash
# Install dependencies for all services
cd user-service && npm install
cd ../flight-service && npm install
cd ../booking-service && npm install
```

### 🐳 Run with Docker Compose (Local Development)

```bash
docker-compose up --build
```

Access the services:
- 👤 User Service: `http://localhost:5000`
- ✈️ Flight Service: `http://localhost:5001`
- 🎫 Booking Service: `http://localhost:5002`

---

## ☸️ Kubernetes Deployment

### 1️⃣ Create Secrets and ConfigMaps

```bash
# Create secrets for database credentials
kubectl create secret generic db-credentials \
  --from-literal=DB_USER=postgres \
  --from-literal=DB_PASSWORD=yourpassword

# Create secrets for JWT
kubectl create secret generic jwt-secret \
  --from-literal=JWT_SECRET=your_super_secret_key
```

### 2️⃣ Deploy PostgreSQL Instances

```bash
kubectl apply -f k8s/postgres-deployments.yaml
```

### 3️⃣ Deploy Microservices

```bash
kubectl apply -f k8s/user-service-deployment.yaml
kubectl apply -f k8s/flight-service-deployment.yaml
kubectl apply -f k8s/booking-service-deployment.yaml
```

### 4️⃣ Verify Deployment

```bash
# Check pods status
kubectl get pods

# Check services
kubectl get svc

# View logs
kubectl logs -f deployment/user-service
```

### 5️⃣ Access Services

```bash
# Port forward to access locally
kubectl port-forward service/user-service 5000:5000
kubectl port-forward service/flight-service 5001:5001
kubectl port-forward service/booking-service 5002:5002
```

---

## 📡 API Endpoints

### 👤 User Service (`/api/v1/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | User login | ❌ |
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update profile | ✅ |
| POST | `/reset-password` | Request password reset | ❌ |
| PUT | `/reset-password/verify` | Verify OTP & reset | ❌ |

### ✈️ Flight Service (`/api/v1/flights`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all flights | ❌ |
| GET | `/search` | Search flights | ❌ |
| GET | `/:id` | Get flight details | ❌ |
| POST | `/` | Create flight | ✅ (Admin) |
| PUT | `/:id` | Update flight | ✅ (Admin) |
| DELETE | `/:id` | Delete flight | ✅ (Admin) |

### 🎫 Booking Service (`/api/v1/bookings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create booking | ✅ |
| GET | `/user/:userId` | Get user bookings | ✅ |
| GET | `/:id` | Get booking details | ✅ |
| PUT | `/:id` | Update booking | ✅ |
| DELETE | `/:id` | Cancel booking | ✅ |

---

## 📁 Project Structure

```
airline-management-microservices/
│
├── 📂 user-service/
│   ├── 📂 src/
│   │   ├── 📂 controllers/
│   │   ├── 📂 models/
│   │   ├── 📂 routes/
│   │   ├── 📂 middleware/
│   │   └── 📄 app.js
│   ├── 📄 Dockerfile
│   └── 📄 package.json
│
├── 📂 flight-service/
│   ├── 📂 src/
│   │   ├── 📂 controllers/
│   │   ├── 📂 models/
│   │   ├── 📂 routes/
│   │   └── 📄 app.js
│   ├── 📄 Dockerfile
│   └── 📄 package.json
│
├── 📂 booking-service/
│   ├── 📂 src/
│   │   ├── 📂 controllers/
│   │   ├── 📂 models/
│   │   ├── 📂 routes/
│   │   └── 📄 app.js
│   ├── 📄 Dockerfile
│   └── 📄 package.json
│
├── 📂 k8s/
│   ├── 📄 user-service-deployment.yaml
│   ├── 📄 flight-service-deployment.yaml
│   ├── 📄 booking-service-deployment.yaml
│   ├── 📄 postgres-deployments.yaml
│   ├── 📄 secrets.yaml
│   └── 📄 configmaps.yaml
│
├── 📄 docker-compose.yml
├── 📄 README.md
└── 📄 .gitignore
```

---

## 🔮 Future Enhancements

- [ ] 🔴 Real-time seat selection with WebSockets
- [ ] ⚡ Redis caching for improved performance
- [ ] 📧 Advanced email/SMS notification system
- [ ] 📊 Monitoring with Prometheus & Grafana
- [ ] 🎨 Admin dashboard with React
- [ ] 📱 Mobile app integration
- [ ] 🌐 Multi-language support
- [ ] 💳 Payment gateway integration
- [ ] 📈 Analytics and reporting module
- [ ] 🔄 CI/CD pipeline with GitHub Actions
- [ ] 📦 Helm charts for easier K8s deployment
- [ ] 📚 API documentation with Swagger/OpenAPI

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vamshi Amudala**

- GitHub: [@Vamshi-amudala](https://github.com/Vamshi-amudala)
- LinkedIn: [Connect with me](https://linkedin.com/in/vamshi-amudala)

---

## 🌟 Show Your Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

---

<div align="center">

### Built with ❤️ using Node.js, Kubernetes, and PostgreSQL

**Happy Coding!** ✈️☁️

</div>