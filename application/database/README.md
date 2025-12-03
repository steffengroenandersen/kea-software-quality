# Database Setup

This folder contains the PostgreSQL database configuration for the Pet Name Generator application.

## Structure

```
database/
├── init/
│   ├── 01-schema.sql      # Database schema (tables, indexes)
│   └── 02-seed-data.sql   # Seed data (popular pet names)
└── README.md
```

## Tables

### generated_names
Tracks all generated names for analytics and history.

| Column       | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | SERIAL       | Primary key                          |
| animal_type  | VARCHAR(50)  | Type of animal (nullable)            |
| name         | VARCHAR(100) | The generated pet name               |
| count        | INTEGER      | Number of names generated            |
| created_at   | TIMESTAMP    | When the name was generated          |

### popular_names
Pre-populated with popular pet names used as source for generation.

| Column       | Type         | Description                          |
|--------------|--------------|--------------------------------------|
| id           | SERIAL       | Primary key                          |
| name         | VARCHAR(100) | The pet name                         |
| animal_type  | VARCHAR(50)  | Type of animal (nullable for generic)|
| created_at   | TIMESTAMP    | When the record was created          |

## Initialization

The SQL scripts in the `init/` folder are automatically executed when the PostgreSQL container starts for the first time, in alphabetical order:

1. **01-schema.sql** - Creates tables and indexes
2. **02-seed-data.sql** - Inserts test data (60+ popular pet names)

## Connection Details

When running with Docker Compose:

- **Host:** `database` (from other containers) or `localhost` (from host machine)
- **Port:** `5432`
- **Database:** `petnames`
- **User:** `petuser`
- **Password:** `petpass`

## Data Persistence

Database data is persisted in a Docker volume named `postgres-data`, so data survives container restarts.

To reset the database:
```bash
docker-compose down -v
docker-compose up -d
```
