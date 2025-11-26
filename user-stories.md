# Pet Name Generator - User Stories

## User Story 1: Generate Popular Pet Name

**As a** user
**I want to** get a popular pet name
**So that** I can get a good name quickly

### Acceptance Criteria

**Scenario 1: Generate first pet name**
- **Given** I am on the pet name generator page
- **When** I click the "Generate Name" button
- **Then** I should see a randomly generated pet name displayed on the page

**Scenario 2: Generate another pet name**
- **Given** I have already generated a pet name
- **When** I click the "Generate Name" button again
- **Then** I should see a new randomly generated pet name displayed on the page

---

## User Story 2: Choose Animal Type

**As a** user
**I want to** be able to choose which animal I want names for
**So that** I can get animal-specific suggestions

### Acceptance Criteria

**Scenario 1: Enter valid animal type and generate name**
- **Given** I am on the pet name generator page
- **When** I enter a valid animal type in the text field (Dog, Cat, Bird, Fish, Hamster, Rabbit)
- **And** I click the "Generate Name" button
- **Then** I should see a randomly generated name appropriate for that animal type

**Scenario 2: Enter invalid animal type**
- **Given** I am on the pet name generator page
- **When** I enter an unsupported animal type in the text field (e.g., "Elephant", "Dragon")
- **And** I click the "Generate Name" button
- **Then** I should see an error message "Animal type not supported. Please use: Dog, Cat, Bird, Fish, Hamster, or Rabbit"

**Scenario 3: Generate without entering animal type**
- **Given** I am on the pet name generator page
- **And** The animal type field is empty
- **When** I click the "Generate Name" button
- **Then** I should see a generic pet name

**Scenario 4: Change animal type and generate new name**
- **Given** I have generated a name for one animal type
- **When** I enter a different valid animal type in the text field
- **And** I click the "Generate Name" button again
- **Then** I should see a new name appropriate for the newly entered animal type

---

## User Story 3: Get Multiple Name Suggestions

**As a** user
**I want to** be able to get 10 name suggestions at once
**So that** I have more options to choose from

### Acceptance Criteria

**Scenario 1: Generate single name (default)**
- **Given** I am on the pet name generator page
- **And** The "Get 10 names" checkbox is not checked
- **When** I click the "Generate Name" button
- **Then** I should see 1 randomly generated pet name displayed

**Scenario 2: Generate 10 names**
- **Given** I am on the pet name generator page
- **When** I check the "Get 10 names" checkbox
- **And** I click the "Generate Name" button
- **Then** I should see 10 randomly generated pet names displayed

**Scenario 3: Generate 10 names for specific animal type**
- **Given** I am on the pet name generator page
- **When** I enter a valid animal type in the text field (e.g., "Dog")
- **And** I check the "Get 10 names" checkbox
- **And** I click the "Generate Name" button
- **Then** I should see 10 randomly generated names appropriate for that animal type

**Scenario 4: Switch from 10 names to 1 name**
- **Given** I have generated 10 names with the checkbox checked
- **When** I uncheck the "Get 10 names" checkbox
- **And** I click the "Generate Name" button
- **Then** I should see only 1 randomly generated pet name displayed

---

**Created:** 2025-11-26
**Author:** Steff
