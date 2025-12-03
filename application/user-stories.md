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

## User Story 3: Get Multiple Name Suggestions (1-10)

**As a** user
**I want to** be able to specify how many name suggestions I want (between 1 and 10)
**So that** I have the flexibility to get exactly the number of options I need

### Acceptance Criteria

**Scenario 1: Generate names with valid count**
- **Given** I am on the multiple name suggestions page
- **When** I enter a number between 1 and 10 in the count field
- **And** I click the "Generate Names" button
- **Then** I should see exactly that many randomly generated pet names displayed

**Scenario 2: Generate 1 name (minimum boundary)**
- **Given** I am on the multiple name suggestions page
- **When** I enter "1" in the count field
- **And** I click the "Generate Names" button
- **Then** I should see 1 randomly generated pet name displayed

**Scenario 3: Generate 10 names (maximum boundary)**
- **Given** I am on the multiple name suggestions page
- **When** I enter "10" in the count field
- **And** I click the "Generate Names" button
- **Then** I should see 10 randomly generated pet names displayed

**Scenario 4: Attempt to generate with count below minimum (0)**
- **Given** I am on the multiple name suggestions page
- **When** I enter "0" in the count field
- **And** I click the "Generate Names" button
- **Then** I should see an error message "Count must be at least 1"

**Scenario 5: Attempt to generate with count above maximum (11)**
- **Given** I am on the multiple name suggestions page
- **When** I enter "11" in the count field
- **And** I click the "Generate Names" button
- **Then** I should see an error message "Count cannot exceed 10"

**Scenario 6: Attempt to generate with non-integer count**
- **Given** I am on the multiple name suggestions page
- **When** I enter "5.5" in the count field
- **And** I click the "Generate Names" button
- **Then** I should see an error message "Count must be a whole number"

**Scenario 7: Attempt to generate with non-numeric count**
- **Given** I am on the multiple name suggestions page
- **When** I enter "abc" in the count field
- **And** I click the "Generate Names" button
- **Then** I should see an error message "Count must be a number"

**Scenario 8: Attempt to generate without providing count**
- **Given** I am on the multiple name suggestions page
- **When** I clear the count field (leaving it empty)
- **And** I click the "Generate Names" button
- **Then** I should see an error message "Count is required"

---

## User Story 4: View Recent Generated Names

**As a** user
**I want to** see the 10 most recent pet names that have been generated
**So that** I can review previously generated names and get inspiration

### Acceptance Criteria

**Scenario 1: View recent names when history exists**
- **Given** pet names have been previously generated
- **When** I navigate to the recent names page
- **Then** I should see a list of the 10 most recent pet names that were generated
- **And** the names should be ordered from most recent to oldest

**Scenario 2: View recent names when no history exists**
- **Given** no pet names have been generated yet
- **When** I navigate to the recent names page
- **Then** I should see a message saying "No recent names found. Generate some names to see them here!"

**Scenario 3: Refresh recent names list**
- **Given** I am viewing the recent names page
- **When** I generate a new pet name using any generation method
- **And** I return to the recent names page
- **Then** the new name should appear at the top of the list
- **And** if there were already 10 names, the oldest name should be removed from the display

---

**Created:** 2025-11-26
**Author:** Steff
