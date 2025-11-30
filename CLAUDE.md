# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Pet Name Generator** - a Software Quality course exam project demonstrating comprehensive testing practices. The application generates creative pet names based on user preferences (animal type, quantity) and serves as a testbed for implementing 10 different testing methodologies required by the assignment.

**Deadline:** December 14, 2025

## Architecture

The project uses a **microservices architecture with Docker Compose** orchestrating 3 separate containers:

1. **Frontend Service** (Port 3000) - Express.js serving static HTML with minimal vanilla JavaScript for API calls
2. **Backend Service** (Port 4000) - Express.js REST API handling business logic and database operations
3. **Database Service** (Port 5432) - PostgreSQL with repository pattern using plain SQL (no ORM)

**Key architectural decisions:**
- Frontend and backend are completely separate, communicating via REST API
- JavaScript with ES Modules (not TypeScript) for both frontend and backend
- Database access uses repository pattern with plain SQL via `pg` library (not an ORM)
- Uses @faker-js/faker npm package (not external API) for name generation
- All services run in Docker containers with Docker Compose orchestration
- The `popular_names` table is pre-populated with 70 pet names during database initialization
- All generated names are saved to the `generated_names` table for tracking

## Development Commands

### Docker Operations

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up --build

# Reset database (removes volumes)
docker-compose down -v
docker-compose up -d
```

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server (with nodemon)
npm run dev

# Start production server
npm start
```

### End-to-End Testing

```bash
cd tests/e2e

# Install Playwright
npm install

# Run E2E tests
npx playwright test

# Run tests in UI mode
npx playwright test --ui

# Run tests for specific browser
npx playwright test --project=chromium
```

### CI/CD

GitHub Actions pipeline (to be implemented):
- Linting
- Unit and integration tests
- Code coverage report generation

## API Endpoints

### Frontend Routes (Port 3000)

| Method | Endpoint | Description | User Story |
|--------|----------|-------------|------------|
| GET | `/` | Home page with links to all features | - |
| GET | `/generate` | Generate single popular pet name | User Story 1 |
| GET | `/generate-by-animal-type` | Generate name by animal type | User Story 2 |
| GET | `/generate-bulk` | Generate 10 names at once | User Story 3 |
| GET | `/recent-names` | View 10 most recent generated names | User Story 4 |

### Backend REST API (Port 4000)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/health` | Health check | - | `{status: "ok"}` |
| POST | `/api/generate` | Generate 1 popular pet name (User Story 1) | `{count: number}` | `{success: boolean, names: string[], message: string}` |
| POST | `/api/generate-by-animal-type` | Generate name by animal type (User Story 2) | `{animalType?: string}` | `{success: boolean, names: string[], message: string}` |
| POST | `/api/generate-bulk` | Generate 10 names at once (User Story 3) | `{}` | `{success: boolean, names: string[], message: string}` |
| GET | `/api/recent-names` | Get 10 most recent generated names (User Story 4) | - | `{success: boolean, names: array, count: number}` |

**Supported animal types:** Dog, Cat, Bird, Fish, Hamster, Rabbit (case-insensitive)

**Example requests:**
```bash
# User Story 1: Generate 1 name
curl -X POST http://localhost:4000/api/generate -H "Content-Type: application/json" -d '{"count": 1}'

# User Story 2: Generate name for Dog
curl -X POST http://localhost:4000/api/generate-by-animal-type -H "Content-Type: application/json" -d '{"animalType": "Dog"}'

# User Story 3: Generate 10 names
curl -X POST http://localhost:4000/api/generate-bulk -H "Content-Type: application/json" -d '{}'

# User Story 4: Get recent names
curl http://localhost:4000/api/recent-names
```

## Database Schema

```sql
-- Stores all generated names for analytics
CREATE TABLE generated_names (
  id SERIAL PRIMARY KEY,
  animal_type VARCHAR(50),
  name VARCHAR(100) NOT NULL,
  count INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populated with fake test data (source for name generation)
CREATE TABLE popular_names (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  animal_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Database initialization scripts are in `database/init/` and run automatically when the PostgreSQL container starts.

## Testing Architecture

This project implements 10 different testing methodologies as required by the assignment:

### 1. Review (SRS & Formal Review)
- Location: `docs/srs.pdf` and `docs/review-report.pdf`
- User stories defined in `user-stories.md`

### 2. Risk Assessment
- Location: `docs/risk-assessment.pdf`
- Includes risk tables and matrices at different project phases

### 3. Black-Box Test Design
- Location: `docs/black-box-tests.pdf`
- Techniques used:
  - **Equivalence Partitioning:** Animal types (valid/invalid/empty), count values (1/10)
  - **Boundary Value Analysis:** Count boundaries (0, 1, 10, 11), input length limits
  - **Decision Tables:** Animal type × checkbox combinations

### 4. Static Testing & White-Box Design
- Tools: SonarQube/SonarCloud, ESLint, TypeScript compiler
- Code coverage: Jest with Istanbul
- Location: `docs/static-testing.pdf`

### 5. Unit & Integration Testing
- Framework: Jest with TypeScript
- Location: `backend/tests/`
  - `unit/` - Unit tests for individual functions
  - `integration/` - API endpoint tests with database interactions
- **Critical requirement:** All black-box test cases must be implemented as parameterized unit tests
- Mock external Faker.js API calls in unit tests

### 6. Continuous Testing (CI/CD)
- Platform: GitHub Actions
- Location: `.github/workflows/ci.yml`
- Runs on every push: linting, type checking, tests, coverage

### 7. API Testing
- Tool: Postman
- Location: `postman/collection.json` and `postman/environment.json`
- Tests HTTP status codes, JSON structure, response times, positive/negative cases

### 8. End-to-End UI Testing
- Framework: Playwright with TypeScript
- Location: `tests/e2e/`
- Tests complete user flows across frontend and backend services
- Multi-browser testing (Chromium, Firefox, WebKit)

### 9. Performance Testing
- Tool: Apache JMeter
- Location: `jmeter/`
- Test types: Load testing, stress testing, spike testing
- Metrics: Response time, throughput, error rate

### 10. Usability Testing
- Location: `docs/usability-test-plan.pdf`
- Design only (not conducted)
- Includes preference/performance measures and test scenarios

## Key Implementation Notes

### Repository Pattern
The backend uses a repository pattern for database access:
- **Repositories** (`backend/src/repositories/`) - Handle all SQL queries using `pg` library
- **Services** (`backend/src/services/`) - Contain business logic, call repositories
- **Controllers** (`backend/src/controllers/`) - Handle HTTP requests, call services

This pattern makes testing easier by allowing repository mocking.

### Test Data Strategy
- The `popular_names` table is pre-populated with fake test data during database initialization
- Name generator pulls from this table instead of relying solely on external API
- This approach ensures tests can run reliably without external API dependencies

### CORS Configuration
- Backend allows requests from `http://localhost:3000` (development)
- Frontend container communicates with backend via Docker network at `http://backend:4000`
- Stateless API (no credentials required)

### Environment Variables
All services use environment variables for configuration:
- Frontend: `BACKEND_API_URL`, `NODE_ENV`, `PORT`
- Backend: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `FAKER_API_URL`, `CORS_ORIGIN`
- Example files should be provided as `.env.example`

## Testing Best Practices for This Project

1. **Parameterized tests are crucial** - Use them to cover all equivalence partitions efficiently
2. **Mock external APIs in unit tests** - Use real API calls only in integration and E2E tests
3. **Ensure black-box test cases are in unit tests** - All test cases from the black-box design phase must be implemented
4. **Test each service independently and together** - Unit tests for isolation, integration tests for service interaction
5. **Aim for >80% code coverage** on backend code
6. **Keep UI intentionally minimal** - Focus testing efforts on backend logic and API

## Assignment Deliverables Checklist

The final submission must include 10 deliverables organized in folders:

1. ✓ SRS (PDF) + Review report (PDF)
2. ✓ Risk assessment (PDF) with tables and matrices
3. ✓ Black-box test design (PDF) with EP, BVA, decision tables
4. ✓ Static testing reports (PDF) + coverage report
5. ✓ Source code of unit and integration tests
6. ✓ CI/CD workflow file (`.github/workflows/ci.yml`) + output logs
7. ✓ Postman collection and environment (JSON)
8. ✓ E2E test source code (Playwright)
9. ✓ Performance testing reports (JMeter screenshots/PDFs)
10. ✓ Usability test plan (PDF)

**Delivery format:** Single ZIP file submitted to Itslearning by December 14, 2025, 23:59

## Important Constraints

- **Do not include links** (e.g., to GitHub repositories) in the final submission
- **E2E tests must be in code** - Scripting tools like Selenium IDE are forbidden
- **All tests must pass in CI** before final submission
- **Comprehensive assertions expected** - Each test should validate multiple aspects
- **Use parameterized tests/data providers** for equivalence classes
