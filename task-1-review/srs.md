# Software Requirements Specification (SRS)
## Pet Name Generator Application

**Project Name:** Pet Name Generator
**Author:** Steffen Grøn Andersen
**Course:** Software Quality - KEA
**Date:** November 30, 2025
**Version:** 1.0

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) describes the functional and non-functional requirements for the Pet Name Generator application. The application is designed to generate creative pet names based on user preferences, including animal type and quantity.

### 1.2 Scope
The Pet Name Generator is a web-based application that:
- Generates random pet names using an external library (Faker.js)
- Supports animal-specific name generation for six animal types: Dog, Cat, Bird, Fish, Hamster, and Rabbit
- Allows bulk generation of 10 names at once
- Stores and displays recently generated names
- Provides a simple, intuitive user interface

The application serves as a testbed for implementing comprehensive testing practices for the Software Quality course exam project.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS:** Software Requirements Specification
- **API:** Application Programming Interface
- **REST:** Representational State Transfer
- **PostgreSQL:** Open-source relational database management system
- **Docker:** Containerization platform
- **ES Modules:** ECMAScript Modules (JavaScript module system)

### 1.4 References
- Assignment document: `assignment.md`
- Project plan: `plan.md`
- User stories: `user-stories.md`
- Faker.js documentation: https://fakerjs.dev

---

## 2. Overall Description

### 2.1 Product Perspective
The Pet Name Generator is a standalone web application built using a microservices architecture. It consists of three main components:
1. **Frontend Service:** Express.js server serving static HTML pages
2. **Backend Service:** Express.js REST API handling business logic
3. **Database Service:** PostgreSQL database for data persistence

The application is containerized using Docker and orchestrated with Docker Compose for easy deployment and development.

### 2.2 Product Functions
The main functions of the system are:
1. Generate a single random pet name
2. Generate animal-specific pet names with validation
3. Generate 10 pet names in bulk
4. Store all generated names in a database
5. Display the 10 most recent generated names
6. Validate user input for supported animal types

### 2.3 User Characteristics
The primary users are:
- **Pet owners** looking for creative names for their new pets
- **Testing stakeholders** evaluating the application's quality assurance practices

Users are expected to have basic web browsing skills. No technical expertise is required.

### 2.4 Constraints
- The application must run in Docker containers
- The application must use JavaScript (ES Modules) for both frontend and backend
- The application must integrate with an external library for name generation
- The application must use PostgreSQL for data storage
- All generated names must be persisted to the database

### 2.5 Assumptions and Dependencies
- Users have access to a modern web browser (Chrome, Firefox, Safari, Edge)
- Docker and Docker Compose are installed on the deployment environment
- PostgreSQL database is accessible and properly configured
- Internet connection is available for initial Docker image downloads
- Faker.js library (@faker-js/faker) is available via npm

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### 3.1.1 User Story 1: Generate Popular Pet Name

**ID:** FR-001
**Priority:** High
**Description:** As a user, I want to get a popular pet name, so that I can get a good name quickly.

**Acceptance Criteria:**

**Scenario 1: Generate first pet name**
- Given I am on the pet name generator page
- When I click the "Generate Name" button
- Then I should see a randomly generated pet name displayed on the page

**Scenario 2: Generate another pet name**
- Given I have already generated a pet name
- When I click the "Generate Name" button again
- Then I should see a new randomly generated pet name displayed on the page

---

#### 3.1.2 User Story 2: Choose Animal Type

**ID:** FR-002
**Priority:** High
**Description:** As a user, I want to be able to choose which animal I want names for, so that I can get animal-specific suggestions.

**Acceptance Criteria:**

**Scenario 1: Enter valid animal type and generate name**
- Given I am on the pet name generator page
- When I enter a valid animal type in the text field (Dog, Cat, Bird, Fish, Hamster, Rabbit)
- And I click the "Generate Name" button
- Then I should see a randomly generated name appropriate for that animal type

**Scenario 2: Enter invalid animal type**
- Given I am on the pet name generator page
- When I enter an unsupported animal type in the text field (e.g., "Elephant", "Dragon")
- And I click the "Generate Name" button
- Then I should see an error message "Animal type not supported. Please use: Dog, Cat, Bird, Fish, Hamster, or Rabbit"

**Scenario 3: Generate without entering animal type**
- Given I am on the pet name generator page
- And The animal type field is empty
- When I click the "Generate Name" button
- Then I should see a generic pet name

**Scenario 4: Change animal type and generate new name**
- Given I have generated a name for one animal type
- When I enter a different valid animal type in the text field
- And I click the "Generate Name" button again
- Then I should see a new name appropriate for the newly entered animal type

---

#### 3.1.3 User Story 3: Get Multiple Name Suggestions

**ID:** FR-003
**Priority:** Medium
**Description:** As a user, I want to be able to get 10 name suggestions at once, so that I have more options to choose from.

**Acceptance Criteria:**

**Scenario 1: Generate single name (default)**
- Given I am on the pet name generator page
- And The "Get 10 names" checkbox is not checked
- When I click the "Generate Name" button
- Then I should see 1 randomly generated pet name displayed

**Scenario 2: Generate 10 names**
- Given I am on the pet name generator page
- When I check the "Get 10 names" checkbox
- And I click the "Generate Name" button
- Then I should see 10 randomly generated pet names displayed

**Scenario 3: Generate 10 names for specific animal type**
- Given I am on the pet name generator page
- When I enter a valid animal type in the text field (e.g., "Dog")
- And I check the "Get 10 names" checkbox
- And I click the "Generate Name" button
- Then I should see 10 randomly generated names appropriate for that animal type

**Scenario 4: Switch from 10 names to 1 name**
- Given I have generated 10 names with the checkbox checked
- When I uncheck the "Get 10 names" checkbox
- And I click the "Generate Name" button
- Then I should see only 1 randomly generated pet name displayed

---

#### 3.1.4 User Story 4: View Recent Generated Names

**ID:** FR-004
**Priority:** Medium
**Description:** As a user, I want to see the 10 most recent pet names that have been generated, so that I can review previously generated names and get inspiration.

**Acceptance Criteria:**

**Scenario 1: View recent names when history exists**
- Given pet names have been previously generated
- When I navigate to the recent names page
- Then I should see a list of the 10 most recent pet names that were generated
- And the names should be ordered from most recent to oldest

**Scenario 2: View recent names when no history exists**
- Given no pet names have been generated yet
- When I navigate to the recent names page
- Then I should see a message saying "No recent names found. Generate some names to see them here!"

**Scenario 3: Refresh recent names list**
- Given I am viewing the recent names page
- When I generate a new pet name using any generation method
- And I return to the recent names page
- Then the new name should appear at the top of the list
- And if there were already 10 names, the oldest name should be removed from the display

---

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance Requirements

**ID:** NFR-001
**Description:** The system shall respond to name generation requests within 2 seconds under normal load conditions.

**ID:** NFR-002
**Description:** The system shall support at least 100 concurrent users without degradation in performance.

**ID:** NFR-003
**Description:** Database queries for recent names shall execute in less than 500ms.

#### 3.2.2 Security Requirements

**ID:** NFR-004
**Description:** The system shall validate all user inputs to prevent SQL injection attacks.

**ID:** NFR-005
**Description:** The system shall sanitize all user inputs to prevent XSS (Cross-Site Scripting) attacks.

**ID:** NFR-006
**Description:** Database credentials shall be stored as environment variables and never committed to version control.

#### 3.2.3 Reliability Requirements

**ID:** NFR-007
**Description:** The system shall have 99% uptime during testing and demonstration periods.

**ID:** NFR-008
**Description:** The system shall gracefully handle database connection failures with appropriate error messages.

**ID:** NFR-009
**Description:** The system shall persist generated names to ensure data is not lost on server restart.

#### 3.2.4 Usability Requirements

**ID:** NFR-010
**Description:** The user interface shall be intuitive and require no training for basic operations.

**ID:** NFR-011
**Description:** Error messages shall be clear and guide users toward correct usage.

**ID:** NFR-012
**Description:** The application shall work on modern web browsers (Chrome, Firefox, Safari, Edge).

#### 3.2.5 Maintainability Requirements

**ID:** NFR-013
**Description:** The codebase shall use ES Modules for better code organization and reusability.

**ID:** NFR-014
**Description:** The application shall follow the repository pattern for database access to ensure separation of concerns.

**ID:** NFR-015
**Description:** All services shall be containerized for consistent deployment across environments.

---

## 4. System Features

### 4.1 Name Generation Service

**Description:** Generates random pet names using the Faker.js library.

**Input:**
- Count: Number of names to generate (1 or 10)
- Animal type (optional): Dog, Cat, Bird, Fish, Hamster, or Rabbit

**Processing:**
- Validates animal type against supported list
- Calls Faker.js to generate random names
- Stores generated names in the database

**Output:**
- Array of generated pet names
- Success/error status
- Error message (if applicable)

### 4.2 Database Storage Service

**Description:** Persists all generated names to PostgreSQL database.

**Input:**
- Pet name
- Animal type (nullable)
- Count of names in the generation request
- Timestamp (automatically generated)

**Processing:**
- Inserts record into `generated_names` table
- Maintains creation timestamp for ordering

**Output:**
- Confirmation of successful storage
- Database record ID

### 4.3 Recent Names Retrieval Service

**Description:** Retrieves the 10 most recent generated names from the database.

**Input:**
- None (GET request)

**Processing:**
- Queries `generated_names` table
- Orders by `created_at` descending
- Limits results to 10 records

**Output:**
- Array of recent name objects containing:
  - Name
  - Animal type
  - Timestamp
  - Count

---

## 5. External Interface Requirements

### 5.1 User Interfaces

**UI-001:** Home page displaying links to all features
- Path: `/`
- Elements: Navigation links to all 4 user story pages

**UI-002:** Generate popular pet name page
- Path: `/generate`
- Elements: "Generate Name" button, result display area

**UI-003:** Generate by animal type page
- Path: `/generate-by-animal-type`
- Elements: Text input for animal type, "Generate Name" button, result display area, supported animals list

**UI-004:** Generate bulk names page
- Path: `/generate-bulk`
- Elements: "Generate 10 Names" button, numbered list display area

**UI-005:** Recent names page
- Path: `/recent-names`
- Elements: "Refresh List" button, ordered list with timestamps

### 5.2 Software Interfaces

**SI-001:** Frontend to Backend API
- Protocol: HTTP/HTTPS
- Format: JSON
- Endpoints: `/api/generate`, `/api/generate-by-animal-type`, `/api/generate-bulk`, `/api/recent-names`

**SI-002:** Backend to Database
- Database: PostgreSQL 15
- Client Library: pg (node-postgres)
- Connection: TCP/IP on port 5432

**SI-003:** Backend to Faker.js Library
- Package: @faker-js/faker v8.3.1
- Integration: npm package import
- Method: `faker.person.firstName()`

### 5.3 Communication Interfaces

**CI-001:** REST API
- All communication between frontend and backend uses RESTful principles
- JSON format for request and response bodies
- CORS enabled for cross-origin requests

---

## 6. Database Requirements

### 6.1 Database Schema

**Table: generated_names**
- id: SERIAL PRIMARY KEY
- name: VARCHAR(100) NOT NULL
- animal_type: VARCHAR(50) (nullable)
- count: INTEGER NOT NULL
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

**Table: popular_names**
- id: SERIAL PRIMARY KEY
- name: VARCHAR(100) NOT NULL
- animal_type: VARCHAR(50) (nullable)
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### 6.2 Data Requirements

- The `popular_names` table shall be pre-populated with at least 60 pet names (10 per animal type)
- The `generated_names` table shall maintain a complete history of all generated names
- Timestamps shall be stored in UTC format
- Database shall maintain referential integrity

---

## 7. Appendices

### 7.1 Supported Animal Types
1. Dog
2. Cat
3. Bird
4. Fish
5. Hamster
6. Rabbit

### 7.2 Technology Stack
- **Frontend:** Node.js 18, Express.js, JavaScript ES Modules
- **Backend:** Node.js 18, Express.js, JavaScript ES Modules
- **Database:** PostgreSQL 15
- **Name Generation:** @faker-js/faker
- **Containerization:** Docker, Docker Compose
- **Version Control:** Git

---

**Document End**
