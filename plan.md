# Pet Name Generator - Project Plan

## Project Overview

A simple web application that generates creative pet names based on user preferences. The application demonstrates comprehensive testing practices across multiple testing methodologies for the Software Quality course.

**Project Name:** Pet Name Generator
**Purpose:** Educational project for Software Quality course - Semester Exam Project
**Team Size:** Individual project
**Deadline:** December 14, 2025

---

## Application Description

### Core Functionality
A simple pet name generator with the following features:

1. **Basic Name Generation** - Click a button to generate a random popular pet name
2. **Animal-Specific Names** - Enter an animal type (Dog, Cat, Bird, Fish, Hamster, Rabbit) in a text field to get animal-specific suggestions
3. **Multiple Suggestions** - Check a "Get 10 names" checkbox to receive 10 name suggestions instead of 1

**Supported Animal Types:** Dog, Cat, Bird, Fish, Hamster, Rabbit

The application stores generated names in a database for tracking and analytics purposes.

### User Stories
See `user-stories.md` for complete user stories with Given-When-Then acceptance criteria.

---

## Tech Stack

### Architecture
**Microservices approach with 3 separate Docker containers:**
- Frontend service (Express serving static HTML)
- Backend service (Express REST API)
- Database service (PostgreSQL)

### Frontend Service
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (serving static files)
- **Language:** TypeScript
- **UI:** Vanilla HTML with basic forms
- **Styling:** None (minimal/browser default)
- **JavaScript:** Minimal vanilla JS for API calls (fetch/axios)
- **Port:** 3000
- **Purpose:** Serves HTML pages and makes HTTP requests to backend API
- **Docker:** Separate container

### Backend Service
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Architecture:** REST API
- **Port:** 4000 (internal), exposed to frontend via Docker network
- **Purpose:** Business logic, database operations, external API integration
- **Docker:** Separate container
- **CORS:** Configured to allow requests from frontend container

### Database
- **DBMS:** PostgreSQL (v15+)
- **Client Library:** pg (node-postgres) - plain SQL queries, no ORM
- **Architecture:** Repository pattern with dedicated repository layer
- **Port:** 5432
- **Docker:** Separate container with persistent volume
- **Tables:**
  - `generated_names` (id, animal_type, name, count, created_at)

### External API
- **API:** Faker.js API (https://fakerjs.dev/api/)
- **Purpose:** Generate random pet names, words, and data
- **Integration:** Called from backend service only
- **Endpoints Used:**
  - `/api/person/firstName` - for human-like names
  - `/api/animal/type` - for animal types
  - `/api/word/adjective` - for name variations
  - `/api/number/int` - for randomization

### Docker & Orchestration
- **Docker Compose:** Orchestrates all 3 containers
- **Networking:** Custom bridge network for inter-container communication
- **Volumes:**
  - PostgreSQL data persistence
  - Optional: Node modules caching for faster builds
- **Environment Variables:** Managed via `.env` file
- **Development Mode:** Hot-reload enabled with nodemon/ts-node-dev

---

## Testing Strategy & Tools

### 1. Review (SRS & Formal Review)
- **Tool:** Manual review process
- **Deliverable:**
  - SRS document (PDF) - Software Requirements Specification
  - Review report (PDF) with roles assigned

### 2. Risk Assessment
- **Tool:** Manual risk analysis
- **Deliverable:**
  - Risk tables (initial, mid-development, final)
  - Risk matrices at different project phases

### 3. Black-Box Test Design
- **Techniques:**
  - Equivalence Partitioning (animal types: valid/invalid/empty, count: 1/10)
  - Boundary Value Analysis (count boundaries, input length)
  - Decision Tables (animal type × checkbox combinations)
- **Deliverable:** PDF with all analyses

### 4. Static Testing & White-Box Design
- **Tools:**
  - **SonarQube/SonarCloud** - Code quality, complexity, security analysis
  - **ESLint** - TypeScript linting
  - **TypeScript Compiler** - Type checking as static analysis
- **Code Coverage:** Jest (Istanbul coverage)
- **Deliverable:**
  - Static analysis reports (PDF)
  - Coverage report showing how it guided unit test design

### 5. Unit & Integration Testing
- **Framework:** Jest
- **Language:** TypeScript
- **Test Types:**
  - Unit tests for individual functions (name generation logic, validation)
  - Integration tests for API endpoints (database interactions)
- **Features:**
  - Parameterized tests for equivalence partitions
  - Data providers for boundary values
  - Comprehensive assertions
  - Mock external API calls
- **Deliverable:** Source code of tests

### 6. Continuous Testing (CI/CD)
- **Platform:** GitHub Actions
- **Pipeline:**
  - Run on every push and pull request
  - Execute linting (ESLint)
  - Run unit tests and integration tests
  - Generate code coverage report
  - Run type checking (TypeScript)
- **Deliverable:**
  - `.github/workflows/ci.yml` file
  - CI output logs (text file or screenshot)

### 7. API Testing
- **Tool:** Postman
- **Tests:**
  - Test all endpoints (GET, POST)
  - Verify HTTP status codes (200, 400, 404, 500)
  - Validate JSON response structure
  - Test response time
  - Positive testing (valid inputs)
  - Negative testing (invalid inputs, edge cases)
- **Deliverable:**
  - Postman collection (JSON)
  - Postman environment (JSON)

### 8. End-to-End UI Testing
- **Framework:** Playwright
- **Language:** TypeScript
- **Tests:**
  - Complete user flows (form submission → name generation → save favorite)
  - Multi-browser testing (Chromium, Firefox, WebKit)
  - Form validation testing
  - Navigation and page interactions
- **Deliverable:** Source code of E2E tests

### 9. Performance Testing
- **Tool:** Apache JMeter
- **Test Types:**
  - **Load Testing:** Simulate normal user load (50-100 concurrent users)
  - **Stress Testing:** Push system to breaking point (500+ concurrent users)
  - **Spike Testing:** Sudden traffic surge (0 → 300 → 0 users)
- **Metrics:**
  - Response time
  - Throughput (requests/second)
  - Error rate
  - Server resource usage
- **Deliverable:** JMeter test reports (screenshots/PDFs)

### 10. Usability Testing
- **Approach:** Design only (not conducted)
- **Deliverable:**
  - Preference measures (satisfaction, ease of use)
  - Performance measures (time to complete task, error rate)
  - Test scenarios and tasks script (PDF)

---

## API Endpoints

### Frontend Service (Port 3000)
| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| GET | `/` | Home page with generation form | HTML |

**Note:** Frontend makes HTTP requests to backend API at `http://backend:4000/api/*`

### Backend REST API (Port 4000)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/health` | Health check | - | `{status: "ok"}` |
| POST | `/api/generate` | Generate pet names | `{animalType?: string, count: number}` | `{success: boolean, names: string[], message?: string}` |

**Request Body Details:**
- `animalType` (optional): "Dog", "Cat", "Bird", "Fish", "Hamster", "Rabbit", or empty for generic
- `count`: 1 or 10 (number of names to generate)

**Response Examples:**

*Success with valid animal:*
```json
{
  "success": true,
  "names": ["Buddy", "Max", "Charlie"]
}
```

*Error with unsupported animal:*
```json
{
  "success": false,
  "names": [],
  "message": "Animal type not supported. Please use: Dog, Cat, Bird, Fish, Hamster, or Rabbit"
}
```

**CORS Configuration:**
- Backend allows requests from `http://localhost:3000` (development) and frontend container
- Credentials not required (stateless API)

---

## Database Schema

```sql
-- Generated Names Table
CREATE TABLE generated_names (
  id SERIAL PRIMARY KEY,
  animal_type VARCHAR(50),
  name VARCHAR(100) NOT NULL,
  count INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Popular Names Table (pre-populated with test data)
CREATE TABLE popular_names (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  animal_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Table Purpose:**

**generated_names:**
- Tracks all generated names for analytics

**popular_names:**
- Stores popular pet names used as the source for name generation
- Pre-populated with fake test data during database initialization
- In a real-world scenario, this would be populated from actual data sources

---

## Docker Configuration

### Docker Compose Services

#### 1. Frontend Service
```yaml
frontend:
  build: ./frontend
  container_name: pet-name-frontend
  ports:
    - "3000:3000"
  environment:
    - NODE_ENV=development
    - BACKEND_API_URL=http://backend:4000
  depends_on:
    - backend
  networks:
    - pet-name-network
  volumes:
    - ./frontend/src:/app/src  # Hot reload in development
```

#### 2. Backend Service
```yaml
backend:
  build: ./backend
  container_name: pet-name-backend
  ports:
    - "4000:4000"
  environment:
    - NODE_ENV=development
    - DB_HOST=database
    - DB_PORT=5432
    - DB_NAME=petnames
    - DB_USER=petuser
    - DB_PASSWORD=petpass
    - FAKER_API_URL=https://fakerjs.dev/api
  depends_on:
    - database
  networks:
    - pet-name-network
  volumes:
    - ./backend/src:/app/src  # Hot reload in development
```

#### 3. Database Service
```yaml
database:
  image: postgres:15-alpine
  container_name: pet-name-db
  ports:
    - "5432:5432"
  environment:
    - POSTGRES_DB=petnames
    - POSTGRES_USER=petuser
    - POSTGRES_PASSWORD=petpass
  volumes:
    - postgres-data:/var/lib/postgresql/data
    - ./database/init:/docker-entrypoint-initdb.d
  networks:
    - pet-name-network
```

### Dockerfile Examples

#### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
```

### Environment Variables

**Frontend (.env):**
```
NODE_ENV=development
PORT=3000
BACKEND_API_URL=http://backend:4000
```

**Backend (.env):**
```
NODE_ENV=development
PORT=4000
DB_HOST=database
DB_PORT=5432
DB_NAME=petnames
DB_USER=petuser
DB_PASSWORD=petpass
FAKER_API_URL=https://fakerjs.dev/api
CORS_ORIGIN=http://localhost:3000
```

### Docker Commands

**Start all services:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f
```

**Stop all services:**
```bash
docker-compose down
```

**Rebuild after code changes:**
```bash
docker-compose up --build
```

**Reset database:**
```bash
docker-compose down -v  # Remove volumes
docker-compose up -d
```

---

## Project Structure

```
pet-name-generator/
├── frontend/                      # Frontend Service (Port 3000)
│   ├── src/
│   │   ├── public/               # Static files
│   │   │   ├── index.html        # Home page with form
│   │   │   ├── favorites.html    # Favorites page
│   │   │   ├── history.html      # History page
│   │   │   └── js/
│   │   │       └── app.js        # Minimal JS for API calls
│   │   ├── app.ts                # Express setup
│   │   └── server.ts             # Server entry point
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── backend/                       # Backend Service (Port 4000)
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   └── nameController.ts
│   │   ├── services/             # Business logic
│   │   │   ├── nameGenerator.ts
│   │   │   └── fakerApiClient.ts
│   │   ├── repositories/         # Data access layer (plain SQL)
│   │   │   ├── generatedNameRepository.ts
│   │   │   └── popularNameRepository.ts
│   │   ├── models/               # TypeScript interfaces
│   │   │   ├── GeneratedName.ts
│   │   │   └── PopularName.ts
│   │   ├── routes/               # Express routes
│   │   │   └── api.ts
│   │   ├── middleware/           # Express middleware
│   │   │   ├── cors.ts
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   ├── utils/                # Utility functions
│   │   │   └── validator.ts
│   │   ├── config/               # Configuration
│   │   │   └── database.ts
│   │   ├── app.ts                # Express app setup
│   │   └── server.ts             # Server entry point
│   ├── tests/
│   │   ├── unit/                 # Unit tests
│   │   │   ├── nameGenerator.test.ts
│   │   │   ├── validator.test.ts
│   │   │   ├── fakerApiClient.test.ts
│   │   │   └── popularNameRepository.test.ts
│   │   ├── integration/          # Integration tests
│   │   │   ├── api.test.ts
│   │   │   └── database.test.ts
│   │   └── setup/                # Test configuration
│   │       └── testDb.ts
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── .eslintrc.js
│   └── .env
├── database/                      # Database files
│   ├── init/                     # Initialization scripts
│   │   ├── 01-schema.sql         # Database schema
│   │   └── 02-seed-data.sql      # Seed popular_names with fake test data
│   └── README.md
├── tests/
│   └── e2e/                      # Playwright E2E tests
│       ├── nameGeneration.spec.ts
│       ├── favorites.spec.ts
│       ├── userFlow.spec.ts
│       └── playwright.config.ts
├── postman/                      # API tests
│   ├── collection.json
│   └── environment.json
├── jmeter/                       # Performance tests
│   ├── pet-name-load-test.jmx
│   ├── stress-test.jmx
│   └── spike-test.jmx
├── docs/                         # Documentation & deliverables
│   ├── srs.pdf
│   ├── review-report.pdf
│   ├── risk-assessment.pdf
│   ├── black-box-tests.pdf
│   ├── static-testing.pdf
│   └── usability-test-plan.pdf
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions workflow
├── docker-compose.yml            # Docker orchestration
├── docker-compose.dev.yml        # Development override
├── .env.example                  # Environment variables template
├── .gitignore
└── README.md
```

---

## Assignment Requirements Checklist

### Application Requirements ✓
- [x] Frontend (HTML forms)
- [x] Backend with API (Express REST API)
- [x] Database (PostgreSQL)
- [x] External API integration (Faker.js API)

### Testing Deliverables

| # | Task | Deliverable | Status |
|---|------|-------------|--------|
| 1 | **Review** | SRS (PDF) + Review report (PDF) | Pending |
| 2 | **Risk Assessment** | Risk tables + matrices (PDF) | Pending |
| 3 | **Black-Box Design** | EP, BVA, Decision tables (PDF) | Pending |
| 4 | **Static Testing** | SonarQube reports + Coverage report (PDF) | Pending |
| 5 | **Unit & Integration Tests** | Source code | Pending |
| 6 | **CI/CD** | `.github/workflows/ci.yml` + output logs | Pending |
| 7 | **API Testing** | Postman collection + environment (JSON) | Pending |
| 8 | **E2E UI Testing** | Playwright source code | Pending |
| 9 | **Performance Testing** | JMeter reports (PDF/screenshots) | Pending |
| 10 | **Usability Testing** | Test plan with scenarios (PDF) | Pending |

---

## Development Phases

### Phase 1: Docker & Infrastructure Setup
1. Create project root directory structure
2. Set up Docker Compose configuration
3. Create Dockerfiles for frontend and backend
4. Configure PostgreSQL container with init scripts
5. Set up environment variables (.env files)
6. Test Docker network communication
7. Verify all containers start and communicate

### Phase 2: Backend Development
1. Initialize Node.js + TypeScript project in `/backend`
2. Set up Express server with CORS
3. Configure PostgreSQL connection
4. Implement database schema and migrations
5. Create API endpoints (generate, save, favorites, history)
6. Integrate Faker.js API client
7. Implement business logic (name generation)
8. Add validation middleware
9. Add error handling

### Phase 3: Frontend Development
1. Initialize Node.js + TypeScript project in `/frontend`
2. Set up Express server for static files
3. Create HTML forms (index, favorites, history pages)
4. Add minimal JavaScript for API calls
5. Configure API client to communicate with backend
6. Test form submission and response display

### Phase 4: Testing Infrastructure
1. Configure Jest for unit/integration tests in backend
2. Set up GitHub Actions CI pipeline (build and test both services)
3. Configure SonarQube/SonarCloud
4. Set up Playwright for E2E tests
5. Create Postman collection and environment
6. Install and configure Apache JMeter

### Phase 5: Test Design & Implementation
1. Write SRS document
2. Conduct formal review
3. Perform risk assessment (initial, mid, final)
4. Design black-box test cases (EP, BVA, decision tables, state diagrams)
5. Implement unit tests with parameterized tests
6. Implement integration tests for API
7. Create comprehensive API tests in Postman
8. Write E2E tests in Playwright (full user flows)
9. Design and execute performance tests in JMeter

### Phase 6: Execution & Documentation
1. Run all tests and collect results
2. Execute performance tests (load, stress, spike)
3. Generate code coverage reports
4. Generate static analysis reports from SonarQube
5. Compile all deliverables into PDFs
6. Organize final folder structure
7. Create README with setup instructions
8. Create final ZIP file for submission

---

## Testing Focus Areas

### Equivalence Partitioning
- **Animal Types:**
  - Valid: Dog, Cat, Bird, Fish, Hamster, Rabbit
  - Invalid: Elephant, Dragon, Unicorn, empty string, numbers, special characters
  - Empty: NULL or empty string (should generate generic name)
- **Name Count:**
  - Valid: 1, 10
  - Invalid: 0, -1, 11, 100, non-numeric
- **Case Sensitivity:**
  - Lowercase: "dog", "cat"
  - Uppercase: "DOG", "CAT"
  - Mixed case: "Dog", "dOg"

### Boundary Value Analysis
- **Count Field:**
  - Just below valid: 0 (invalid)
  - Lower boundary: 1 (valid)
  - Upper boundary: 10 (valid)
  - Just above valid: 11 (invalid)
- **Animal Type Field Length:**
  - Empty string (valid - should generate generic)
  - Very long string (>100 chars)
  - Single character
  - Valid animal names (3-7 chars)

### Decision Tables
Combinations to test:

| Animal Type | Checkbox "Get 10 names" | Expected Result |
|-------------|------------------------|-----------------|
| Empty | Unchecked | 1 generic name |
| Empty | Checked | 10 generic names |
| Valid (e.g., "Dog") | Unchecked | 1 dog-specific name |
| Valid (e.g., "Dog") | Checked | 10 dog-specific names |
| Invalid (e.g., "Elephant") | Unchecked | Error message |
| Invalid (e.g., "Elephant") | Checked | Error message |

### ~~State Transitions~~ (Out of Scope)
State transition testing is not included in this project.

---

## Key Testing Scenarios

### Happy Path Scenarios
1. **Basic Generation:** Empty field + button click → generates 1 generic name
2. **Animal-Specific:** Enter "Dog" + button click → generates 1 dog name
3. **Multiple Names:** Check "Get 10 names" + button click → generates 10 generic names
4. **Animal + Multiple:** Enter "Cat" + check "Get 10 names" + button click → generates 10 cat names

### Negative Test Scenarios
5. **Invalid Animal:** Enter "Elephant" + button click → error message displayed
6. **Case Sensitivity:** Enter "dog" (lowercase) + button click → generates dog name (should be case-insensitive)
7. **Invalid Animal + Multiple:** Enter "Dragon" + check "Get 10 names" + button click → error message
8. **Special Characters:** Enter "Dog@#$" → error message
9. **Very Long Input:** Enter 200-character string → error message or truncation

### Integration Test Scenarios
10. **Database Storage:** Generate name → verify stored in database with correct animal_type and count
11. **Faker API Integration:** Generate name → verify API call made → name returned
12. **Faker API Failure:** Mock API timeout/error → graceful fallback or error handling

### Performance Test Scenarios
13. **Load Test:** 100 concurrent users generating 1 name each → measure response time
14. **Stress Test:** 500 concurrent users generating 10 names each → system behavior
15. **Spike Test:** Sudden surge from 0 to 300 users → system recovery

### E2E Test Scenarios
16. **Complete Flow:** Load page → enter "Dog" → check checkbox → click button → verify 10 dog names displayed
17. **Error Recovery:** Enter "Elephant" → see error → change to "Cat" → generate successfully
18. **Multiple Generations:** Generate generic names → enter "Bird" → generate bird names → uncheck checkbox → generate 1 bird name

---

## Notes

### Architecture & Development
- **Microservices approach:** Frontend and backend are completely separate, communicating via REST API
- **Docker benefits:** Consistent environment, easy setup, production-like architecture
- **Database access:** Repository pattern with plain SQL queries using `pg` library (no ORM)
  - Repositories handle all database operations
  - Services call repositories for data access
  - Easier to test with mocks, more control over SQL
- **Data sources:**
  - `popular_names` table is pre-populated with fake test data during database initialization
  - Name generator pulls from this table instead of relying solely on external API
  - In production, this would be populated from real data sources
- Keep the UI intentionally minimal to focus testing efforts on backend logic and API
- Use TypeScript strictly to catch errors at compile time
- CORS must be properly configured for frontend-backend communication

### Testing Strategy
- Mock Faker.js API in unit tests to ensure tests are fast and reliable
- Use real API calls in integration and E2E tests
- Parameterized tests are crucial for covering equivalence partitions efficiently
- Ensure all black-box test cases are implemented as unit tests
- Test each service independently and together
- E2E tests should test the complete user flow across both services

### Best Practices
- Use environment variables for all configuration
- Never commit sensitive data or .env files
- Document API contracts clearly (for testing)
- Use Docker volumes for development hot-reload
- Keep database init scripts in version control
- Document any deviations from the plan in the final delivery

---

## Success Criteria

1. All 10 assignment deliverables completed and properly documented
2. Test coverage >80% for backend code
3. All tests passing in CI pipeline
4. Comprehensive test cases covering equivalence classes and boundaries
5. Performance tests demonstrate system behavior under load
6. Clear documentation of testing approach and results
7. Project delivered as organized ZIP file by December 14, 2025

---

**Version:** 3.0
**Last Updated:** 2025-11-26
**Author:** Steff
**Architecture:** Microservices (Frontend + Backend + Database) with Docker Compose
**User Stories:** See user-stories.md for complete Given-When-Then acceptance criteria

**Changelog:**
- v3.0: Simplified to 3 core user stories, removed state transitions (out of scope), updated testing focus
- v2.0: Added Docker microservices architecture
- v1.0: Initial complex version
