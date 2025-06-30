# GymPass Style API

A Node.js API that simulates a GymPass-like system for managing gym check-ins and user access. This project was built using modern technologies and best practices for backend development.

## 🚀 Technologies

- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- [TypeScript](https://www.typescriptlang.org/) - For type safety and better development experience
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Prisma](https://www.prisma.io/) - Modern database ORM
- [Docker](https://www.docker.com/) - For containerization
- [Vitest](https://vitest.dev/) - Unit and E2E testing
- [JWT](https://jwt.io/) - For authentication
- [Zod](https://zod.dev/) - For data validation

## 📋 Requirements

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL
- Yarn or npm

## 🛠️ Setup

1. Clone the repository
```bash
git clone <repository-url>
cd API-Gym-Pass
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
# Create a .env file based on .env.example
cp .env.example .env
```

4. Start the database using Docker
```bash
docker-compose up -d
```

5. Run database migrations
```bash
yarn migration
```

6. Start the development server
```bash
yarn dev
```

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run end-to-end tests
- `yarn test:coverage` - Generate test coverage report
- `yarn migration` - Run database migrations
- `yarn studio` - Open Prisma Studio
- `yarn generate` - Generate Prisma client

## 🎯 Features

### Functional Requirements
- [x] User registration
- [x] Authentication
- [x] User profile retrieval
- [x] Check-in count tracking
- [x] Check-in history
- [x] Nearby gym search (within 10km)
- [x] Gym search by name
- [x] Check-in functionality
- [x] Check-in validation
- [x] Gym registration

### Business Rules
- [x] No duplicate email registrations
- [x] One check-in per day limit
- [x] Proximity check for check-ins (within 100m)
- [x] 20-minute window for check-in validation
- [x] Admin-only check-in validation
- [x] Admin-only gym registration

### Non-functional Requirements
- [x] Password encryption
- [x] PostgreSQL data persistence
- [x] Paginated data lists (20 items per page)
- [x] JWT authentication

## 🏗️ Project Structure

```
src/
├── http/          # HTTP routes and controllers
├── use-cases/     # Business logic
├── repositories/  # Data access layer
└── utils/         # Helper functions and utilities
```

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

This project was developed as a personal study and portfolio piece.
