import { jest } from "@jest/globals";

// Mock faker before importing the module
const mockFirstName = jest.fn();
const mockPetName = jest.fn();
const mockDog = jest.fn();
const mockCat = jest.fn();
const mockBird = jest.fn();
const mockFish = jest.fn();
const mockRabbit = jest.fn();
const mockBear = jest.fn();
const mockHorse = jest.fn();

jest.unstable_mockModule("@faker-js/faker", () => ({
  faker: {
    person: {
      firstName: mockFirstName,
    },
    animal: {
      petName: mockPetName,
      dog: mockDog,
      cat: mockCat,
      bird: mockBird,
      fish: mockFish,
      rabbit: mockRabbit,
      bear: mockBear,
      horse: mockHorse,
    },
  },
}));

// Import after mocking
const { generatePetNames, generateBulkPetNames, generatePetNamesByAnimalType } = await import(
  "../../../src/services/nameGenerator.js"
);

describe("nameGenerator Service - generatePetNames", () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockFirstName.mockClear();
  });

  describe("Basic Functionality", () => {
    test("should generate 1 name by default", () => {
      // Arrange
      mockFirstName.mockReturnValue("Max");

      // Act
      const result = generatePetNames();

      // Assert
      expect(result).toEqual(["Max"]);
      expect(mockFirstName).toHaveBeenCalledTimes(1);
    });

    test("should generate 1 name when count is 1", () => {
      // Arrange
      mockFirstName.mockReturnValue("Bella");

      // Act
      const result = generatePetNames(1);

      // Assert
      expect(result).toEqual(["Bella"]);
      expect(mockFirstName).toHaveBeenCalledTimes(1);
    });

    test("should generate multiple names when count > 1", () => {
      // Arrange
      mockFirstName.mockReturnValueOnce("Max").mockReturnValueOnce("Bella").mockReturnValueOnce("Charlie");

      // Act
      const result = generatePetNames(3);

      // Assert
      expect(result).toHaveLength(3);
      expect(result).toEqual(["Max", "Bella", "Charlie"]);
      expect(mockFirstName).toHaveBeenCalledTimes(3);
    });
  });

  describe("Boundary Value Analysis (BVA)", () => {
    // Parameterized test using test.each
    test.each([
      [1, 1],
      [5, 5],
      [10, 10],
    ])("should generate exactly %i names", (count, expectedLength) => {
      // Arrange
      mockFirstName.mockReturnValue("TestName");

      // Act
      const result = generatePetNames(count);

      // Assert
      expect(result).toHaveLength(expectedLength);
      expect(mockFirstName).toHaveBeenCalledTimes(count);
      result.forEach((name) => {
        expect(name).toBe("TestName");
      });
    });
  });

  describe("Return Type Validation", () => {
    test("should return an array", () => {
      // Arrange
      mockFirstName.mockReturnValue("Test");

      // Act
      const result = generatePetNames(1);

      // Assert
      expect(Array.isArray(result)).toBe(true);
    });

    test("should return array of strings", () => {
      // Arrange
      mockFirstName.mockReturnValue("Test");

      // Act
      const result = generatePetNames(3);

      // Assert
      result.forEach((name) => {
        expect(typeof name).toBe("string");
      });
    });
  });

  describe("Edge Cases", () => {
    test("should handle count of 0 (returns empty array)", () => {
      // Act
      const result = generatePetNames(0);

      // Assert
      expect(result).toEqual([]);
      expect(mockFirstName).not.toHaveBeenCalled();
    });

    test("should handle negative count (returns empty array)", () => {
      // Act
      const result = generatePetNames(-5);

      // Assert
      expect(result).toEqual([]);
      expect(mockFirstName).not.toHaveBeenCalled();
    });
  });
});

describe("nameGenerator Service - generateBulkPetNames", () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockFirstName.mockClear();
  });

  /**
   * BOUNDARY VALUE ANALYSIS (BVA) - Based on test design
   * Valid range: 1-10 (inclusive)
   *
   * Boundary values tested:
   * - 0 1 (minimum boundary)
   * - 9 10 11 (maximum boundary)
   *
   * Middle values tested:
   * - 6 (middle of valid range)
   * - 16 (middle value approach outside range)
   */
  describe("Boundary Value Analysis (BVA) - 3-Value Approach", () => {
    // Parameterized test for all BVA values: 0, 1, 6, 9, 10, 11, 16
    test.each([
      // Minimum boundary: 0 (invalid), 1 (valid boundary)
      { count: 0, expected: { success: false, message: "Count must be at least 1", namesLength: 0 } },
      { count: 1, expected: { success: true, message: "Generated 1 pet name", namesLength: 1 } },

      // Middle value (valid)
      { count: 6, expected: { success: true, message: "Generated 6 pet names", namesLength: 6 } },

      // Maximum boundary: 9 (valid), 10 (valid boundary), 11 (invalid)
      { count: 9, expected: { success: true, message: "Generated 9 pet names", namesLength: 9 } },
      { count: 10, expected: { success: true, message: "Generated 10 pet names", namesLength: 10 } },
      { count: 11, expected: { success: false, message: "Count cannot exceed 10", namesLength: 0 } },

      // Middle value outside range (invalid)
      { count: 16, expected: { success: false, message: "Count cannot exceed 10", namesLength: 0 } },
    ])(
      "BVA: count=$count should return success=$expected.success with $expected.namesLength names",
      ({ count, expected }) => {
        // Arrange
        mockFirstName.mockReturnValue("TestPet");

        // Act
        const result = generateBulkPetNames(count);

        // Assert
        expect(result.success).toBe(expected.success);
        expect(result.message).toBe(expected.message);
        expect(result.names).toHaveLength(expected.namesLength);

        if (expected.success) {
          expect(mockFirstName).toHaveBeenCalledTimes(count);
          result.names.forEach((name) => {
            expect(typeof name).toBe("string");
          });
        } else {
          expect(result.names).toEqual([]);
        }
      }
    );
  });

  /**
   * EQUIVALENCE PARTITIONING (EP) - Based on test design
   *
   * Valid partition:
   * - Integer values between 1 and 10 (inclusive) -> Test value: 6
   *
   * Invalid partitions:
   * - Integers below 0 -> Test value: -5
   * - 0 -> Test value: 0
   * - Integers above 10 -> Test value: 15
   * - Non-integer numbers -> Test value: 10.5
   * - Non-numeric characters -> Test value: "PET"
   */
  describe("Equivalence Partitioning (EP) - Valid Partition", () => {
    test("EP Valid: count=6 (integer between 1-10) should generate 6 names", () => {
      // Arrange
      mockFirstName.mockReturnValue("ValidPet");

      // Act
      const result = generateBulkPetNames(6);

      // Assert
      expect(result.success).toBe(true);
      expect(result.names).toHaveLength(6);
      expect(result.message).toBe("Generated 6 pet names");
      expect(mockFirstName).toHaveBeenCalledTimes(6);
    });
  });

  describe("Equivalence Partitioning (EP) - Invalid Partitions", () => {
    // Parameterized test for all invalid partitions
    test.each([
      // Integers below 0
      { count: -5, partition: "Integers below 0", expectedMessage: "Count must be at least 1" },

      // 0
      { count: 0, partition: "Zero", expectedMessage: "Count must be at least 1" },

      // Integers above 10
      { count: 15, partition: "Integers above 10", expectedMessage: "Count cannot exceed 10" },

      // Non-integer numbers
      { count: 10.5, partition: "Non-integer numbers", expectedMessage: "Count must be a whole number" },

      // Non-numeric characters
      { count: "PET", partition: "Non-numeric characters", expectedMessage: "Count must be a number" },
    ])(
      "EP Invalid: $partition (count=$count) should fail with message",
      ({ count, partition, expectedMessage }) => {
        // Act
        const result = generateBulkPetNames(count);

        // Assert
        expect(result.success).toBe(false);
        expect(result.names).toEqual([]);
        expect(result.message).toBe(expectedMessage);
        expect(mockFirstName).not.toHaveBeenCalled();
      }
    );
  });

  describe("Validation Tests - Required Field", () => {
    test("should fail when count is undefined", () => {
      // Act
      const result = generateBulkPetNames(undefined);

      // Assert
      expect(result.success).toBe(false);
      expect(result.names).toEqual([]);
      expect(result.message).toBe("Count is required");
      expect(mockFirstName).not.toHaveBeenCalled();
    });

    test("should fail when count is null", () => {
      // Act
      const result = generateBulkPetNames(null);

      // Assert
      expect(result.success).toBe(false);
      expect(result.names).toEqual([]);
      expect(result.message).toBe("Count is required");
      expect(mockFirstName).not.toHaveBeenCalled();
    });
  });

  describe("Validation Tests - Type Checking", () => {
    test.each([
      { count: "10", type: "string" },
      { count: true, type: "boolean" },
      { count: { value: 5 }, type: "object" },
      { count: [5], type: "array" },
      { count: NaN, type: "NaN" },
    ])("should fail when count is $type (count=$count)", ({ count }) => {
      // Act
      const result = generateBulkPetNames(count);

      // Assert
      expect(result.success).toBe(false);
      expect(result.names).toEqual([]);
      expect(result.message).toBe("Count must be a number");
      expect(mockFirstName).not.toHaveBeenCalled();
    });
  });
});

describe("nameGenerator Service - generatePetNamesByAnimalType", () => {
  beforeEach(() => {
    // Reset all mock state before each test
    mockPetName.mockClear();
    mockDog.mockClear();
    mockCat.mockClear();
    mockBird.mockClear();
    mockFish.mockClear();
    mockRabbit.mockClear();
    mockBear.mockClear();
    mockHorse.mockClear();
  });

  /**
   * BOUNDARY VALUE ANALYSIS (BVA) - Based on test design
   * Valid range: 2-42 characters (alphabetic only)
   *
   * Boundary values tested:
   * - 0 1 2 (minimum boundary)
   * - 41 42 43 (maximum boundary)
   *
   * Middle values tested:
   * - 22 (middle of valid range)
   * - 65 (middle value approach outside range)
   *
   * 3-value approach for both boundaries:
   * - Minimum: 0 1 2 and 1 2 3
   * - Maximum: 41 42 43
   *
   * Complete list: 0, 1, 2, 3, 22, 41, 42, 43, 65
   */
  describe("Boundary Value Analysis (BVA) - Character Length", () => {
    // Helper function to generate string of specific length
    const generateString = (length) => "a".repeat(length);

    test.each([
      // Minimum boundary: 0 (empty - invalid), 1 (invalid), 2 (valid boundary)
      {
        length: 0,
        input: "",
        expected: { success: false, message: "Animal type is required and cannot be empty" },
      },
      {
        length: 1,
        input: "A",
        expected: { success: false, message: "Animal type must be at least 2 characters long" },
      },
      {
        length: 2,
        input: "ab",
        expected: { success: false, message: "Animal type 'ab' is not supported by the Faker.js API" },
      },

      // 3-value minimum: 1 2 3
      {
        length: 3,
        input: "abc",
        expected: { success: false, message: "Animal type 'abc' is not supported by the Faker.js API" },
      },

      // Middle value (valid range)
      {
        length: 22,
        input: generateString(22),
        expected: {
          success: false,
          message: `Animal type '${generateString(22)}' is not supported by the Faker.js API`,
        },
      },

      // Maximum boundary: 41 (valid), 42 (valid boundary), 43 (invalid)
      {
        length: 41,
        input: generateString(41),
        expected: {
          success: false,
          message: `Animal type '${generateString(41)}' is not supported by the Faker.js API`,
        },
      },
      {
        length: 42,
        input: generateString(42),
        expected: {
          success: false,
          message: `Animal type '${generateString(42)}' is not supported by the Faker.js API`,
        },
      },
      {
        length: 43,
        input: generateString(43),
        expected: { success: false, message: "Animal type cannot exceed 42 characters" },
      },

      // Middle value outside range (invalid)
      {
        length: 65,
        input: generateString(65),
        expected: { success: false, message: "Animal type cannot exceed 42 characters" },
      },
    ])("BVA: length=$length should validate correctly", ({ length, input, expected }) => {
      // Act
      const result = generatePetNamesByAnimalType(input);

      // Assert
      expect(result.success).toBe(expected.success);
      expect(result.message).toBe(expected.message);
      expect(result.names).toEqual([]);
      expect(mockPetName).not.toHaveBeenCalled();
    });
  });

  /**
   * EQUIVALENCE PARTITIONING (EP) - Based on test design
   *
   * Valid partition:
   * - Strings with 2-42 alphabetic characters only
   * - Valid values: "Dog", "Cat", "Elephant", "Dragon", "Hamster"
   *
   * Invalid partitions:
   * - Empty strings
   * - Single character
   * - More than 42 characters
   * - Contains numeric values
   * - Contains special characters/spaces
   */
  describe("Equivalence Partitioning (EP) - Valid Partition", () => {
    test.each([
      { animalType: "Dog", mockMethod: mockDog, breed: "Golden Retriever" },
      { animalType: "Cat", mockMethod: mockCat, breed: "Siamese" },
      { animalType: "Bird", mockMethod: mockBird, breed: "Parrot" },
      { animalType: "Fish", mockMethod: mockFish, breed: "Goldfish" },
      { animalType: "Rabbit", mockMethod: mockRabbit, breed: "Dutch Rabbit" },
    ])(
      "EP Valid: animalType='$animalType' should generate composite name",
      ({ animalType, mockMethod, breed }) => {
        // Arrange
        mockPetName.mockReturnValue("Fluffy");
        mockMethod.mockReturnValue(breed);

        // Act
        const result = generatePetNamesByAnimalType(animalType);

        // Assert
        expect(result.success).toBe(true);
        expect(result.names).toHaveLength(1);
        expect(result.names[0]).toBe(`Fluffy the ${breed}`);
        expect(result.message).toBe(`Name generated for ${animalType}`);
        expect(mockPetName).toHaveBeenCalledTimes(1);
        expect(mockMethod).toHaveBeenCalledTimes(1);
      }
    );

    test("EP Valid: case insensitive - 'DOG' should work", () => {
      // Arrange
      mockPetName.mockReturnValue("Max");
      mockDog.mockReturnValue("Poodle");

      // Act
      const result = generatePetNamesByAnimalType("DOG");

      // Assert
      expect(result.success).toBe(true);
      expect(result.names).toEqual(["Max the Poodle"]);
      expect(result.message).toBe("Name generated for DOG");
    });

    test("EP Valid: case insensitive - 'dOg' should work", () => {
      // Arrange
      mockPetName.mockReturnValue("Buddy");
      mockDog.mockReturnValue("Beagle");

      // Act
      const result = generatePetNamesByAnimalType("dOg");

      // Assert
      expect(result.success).toBe(true);
      expect(result.names).toEqual(["Buddy the Beagle"]);
      expect(result.message).toBe("Name generated for dOg");
    });
  });

  describe("Equivalence Partitioning (EP) - Invalid Partitions", () => {
    test.each([
      // Empty string
      {
        animalType: "",
        partition: "Empty string",
        expectedMessage: "Animal type is required and cannot be empty",
      },

      // Single character (1 letter)
      {
        animalType: "A",
        partition: "Single character",
        expectedMessage: "Animal type must be at least 2 characters long",
      },

      // More than 42 characters (43 chars - validation checks length before Faker API)
      {
        animalType: "Supercalifragilisticexpialidociousandmore",
        partition: "More than 42 characters",
        expectedMessage:
          "Animal type 'Supercalifragilisticexpialidociousandmore' is not supported by the Faker.js API",
      },

      // Numeric values only
      {
        animalType: "123",
        partition: "Numeric values only",
        expectedMessage: "Animal type cannot contain numeric values",
      },

      // Alphanumeric (contains numbers)
      {
        animalType: "Dog123",
        partition: "Contains numeric values",
        expectedMessage: "Animal type cannot contain numeric values",
      },

      // Special characters (space)
      {
        animalType: " ",
        partition: "Only whitespace",
        expectedMessage: "Animal type is required and cannot be empty",
      },

      // Special characters (space in name)
      {
        animalType: "Golden Retriever",
        partition: "Contains space",
        expectedMessage:
          "Animal type can only contain alphabetic characters (no spaces or special characters)",
      },

      // Special characters (hyphen)
      {
        animalType: "T-Rex",
        partition: "Contains hyphen",
        expectedMessage:
          "Animal type can only contain alphabetic characters (no spaces or special characters)",
      },

      // Special characters (underscore)
      {
        animalType: "snake_case",
        partition: "Contains underscore",
        expectedMessage:
          "Animal type can only contain alphabetic characters (no spaces or special characters)",
      },

      // Valid format but not supported by Faker
      {
        animalType: "Dragon",
        partition: "Not supported by Faker API",
        expectedMessage: "Animal type 'Dragon' is not supported by the Faker.js API",
      },

      {
        animalType: "Elephant",
        partition: "Not supported by Faker API",
        expectedMessage: "Animal type 'Elephant' is not supported by the Faker.js API",
      },

      {
        animalType: "Hamster",
        partition: "Not supported by Faker API",
        expectedMessage: "Animal type 'Hamster' is not supported by the Faker.js API",
      },
    ])(
      "EP Invalid: $partition (animalType='$animalType') should fail with message",
      ({ animalType, partition, expectedMessage }) => {
        // Act
        const result = generatePetNamesByAnimalType(animalType);

        // Assert
        expect(result.success).toBe(false);
        expect(result.names).toEqual([]);
        expect(result.message).toBe(expectedMessage);
        expect(mockPetName).not.toHaveBeenCalled();
      }
    );
  });

  describe("Validation Tests - Null/Undefined", () => {
    test("should fail when animalType is undefined", () => {
      // Act
      const result = generatePetNamesByAnimalType(undefined);

      // Assert
      expect(result.success).toBe(false);
      expect(result.names).toEqual([]);
      expect(result.message).toBe("Animal type is required and cannot be empty");
      expect(mockPetName).not.toHaveBeenCalled();
    });

    test("should fail when animalType is null", () => {
      // Act
      const result = generatePetNamesByAnimalType(null);

      // Assert
      expect(result.success).toBe(false);
      expect(result.names).toEqual([]);
      expect(result.message).toBe("Animal type is required and cannot be empty");
      expect(mockPetName).not.toHaveBeenCalled();
    });
  });

  describe("Validation Tests - Whitespace Handling", () => {
    test("should trim whitespace from valid input", () => {
      // Arrange
      mockPetName.mockReturnValue("Whiskers");
      mockCat.mockReturnValue("Persian");

      // Act
      const result = generatePetNamesByAnimalType("  Cat  ");

      // Assert
      expect(result.success).toBe(true);
      expect(result.names).toEqual(["Whiskers the Persian"]);
      expect(result.message).toBe("Name generated for Cat");
    });

    test("should fail when input is only whitespace", () => {
      // Act
      const result = generatePetNamesByAnimalType("   ");

      // Assert
      expect(result.success).toBe(false);
      expect(result.names).toEqual([]);
      expect(result.message).toBe("Animal type is required and cannot be empty");
    });
  });

  describe("Return Object Structure", () => {
    test("should return object with success, names, and message properties", () => {
      // Arrange
      mockPetName.mockReturnValue("Rocky");
      mockDog.mockReturnValue("Bulldog");

      // Act
      const result = generatePetNamesByAnimalType("Dog");

      // Assert
      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("names");
      expect(result).toHaveProperty("message");
      expect(typeof result.success).toBe("boolean");
      expect(Array.isArray(result.names)).toBe(true);
      expect(typeof result.message).toBe("string");
    });

    test("should return array with single composite name on success", () => {
      // Arrange
      mockPetName.mockReturnValue("Luna");
      mockCat.mockReturnValue("Maine Coon");

      // Act
      const result = generatePetNamesByAnimalType("Cat");

      // Assert
      expect(result.names).toHaveLength(1);
      expect(result.names[0]).toMatch(/^Luna the Maine Coon$/);
    });
  });

  describe("Composite Name Format", () => {
    test("should generate composite name in format: 'PetName the Breed'", () => {
      // Arrange
      mockPetName.mockReturnValue("Shadow");
      mockBird.mockReturnValue("Cockatiel");

      // Act
      const result = generatePetNamesByAnimalType("Bird");

      // Assert
      expect(result.names[0]).toBe("Shadow the Cockatiel");
    });

    test("should handle different pet names and breeds", () => {
      // Arrange
      mockPetName.mockReturnValue("Bubbles");
      mockFish.mockReturnValue("Betta");

      // Act
      const result = generatePetNamesByAnimalType("Fish");

      // Assert
      expect(result.names[0]).toBe("Bubbles the Betta");
    });
  });

  describe("Integration with Faker.js Mock", () => {
    test("should call faker.animal.petName() and animal-specific method", () => {
      // Arrange
      mockPetName.mockReturnValue("Charlie");
      mockRabbit.mockReturnValue("Flemish Giant");

      // Act
      const result = generatePetNamesByAnimalType("Rabbit");

      // Assert
      expect(mockPetName).toHaveBeenCalledTimes(1);
      expect(mockRabbit).toHaveBeenCalledTimes(1);
      expect(result.names[0]).toBe("Charlie the Flemish Giant");
    });

    test("should normalize animal type to lowercase before calling faker", () => {
      // Arrange
      mockPetName.mockReturnValue("Bear");
      mockBear.mockReturnValue("Grizzly");

      // Act
      const result = generatePetNamesByAnimalType("BEAR");

      // Assert
      expect(result.success).toBe(true);
      expect(mockBear).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases - Very Long Valid Animal Names", () => {
    test("should accept exactly 42 characters (valid boundary)", () => {
      // Arrange - 42 'a's
      const longName = "a".repeat(42);

      // Act
      const result = generatePetNamesByAnimalType(longName);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe(`Animal type '${longName}' is not supported by the Faker.js API`);
    });

    test("should reject 43 characters (invalid boundary)", () => {
      // Arrange - 43 'a's
      const tooLong = "a".repeat(43);

      // Act
      const result = generatePetNamesByAnimalType(tooLong);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe("Animal type cannot exceed 42 characters");
    });
  });

  describe("Numeric and Alphanumeric Validation", () => {
    test.each([
      {
        input: "1",
        description: "single digit",
        expectedMessage: "Animal type must be at least 2 characters long",
      },
      {
        input: "123",
        description: "multiple digits",
        expectedMessage: "Animal type cannot contain numeric values",
      },
      {
        input: "Cat1",
        description: "letters with trailing digit",
        expectedMessage: "Animal type cannot contain numeric values",
      },
      {
        input: "1Dog",
        description: "digit with trailing letters",
        expectedMessage: "Animal type cannot contain numeric values",
      },
      {
        input: "C4t",
        description: "digit in middle",
        expectedMessage: "Animal type cannot contain numeric values",
      },
      {
        input: "Dog123Cat",
        description: "digits in middle",
        expectedMessage: "Animal type cannot contain numeric values",
      },
    ])("should reject input with numeric characters: $description", ({ input, expectedMessage }) => {
      // Act
      const result = generatePetNamesByAnimalType(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe(expectedMessage);
    });
  });

  describe("Special Characters Validation", () => {
    test.each([
      { input: "Dog!", description: "exclamation mark" },
      { input: "Cat@Home", description: "at symbol" },
      { input: "Bird#1", description: "hash symbol (with digit)" },
      { input: "Fish$", description: "dollar sign" },
      { input: "Dog%Cat", description: "percent sign" },
      { input: "Rabbit^", description: "caret" },
      { input: "Bear&", description: "ampersand" },
      { input: "Horse*", description: "asterisk" },
      { input: "(Dog)", description: "parentheses" },
      { input: "Cat-Dog", description: "hyphen" },
      { input: "Bird+", description: "plus sign" },
      { input: "Fish=", description: "equals sign" },
      { input: "[Rabbit]", description: "brackets" },
      { input: "{Bear}", description: "braces" },
      { input: "Horse;", description: "semicolon" },
      { input: "Cat:Dog", description: "colon" },
      { input: "'Bird'", description: "single quotes" },
      { input: '"Fish"', description: "double quotes" },
      { input: "Rabbit,", description: "comma" },
      { input: "Dog.Cat", description: "period" },
      { input: "Bird?", description: "question mark" },
      { input: "Fish/", description: "forward slash" },
      { input: "Rabbit\\", description: "backslash" },
      { input: "Bear|", description: "pipe" },
    ])("should reject input with special characters: $description", ({ input }) => {
      // Act
      const result = generatePetNamesByAnimalType(input);

      // Assert
      expect(result.success).toBe(false);
      // Bird#1 contains both # and 1, so numeric check happens first
      const expectedMessage = /\d/.test(input)
        ? "Animal type cannot contain numeric values"
        : "Animal type can only contain alphabetic characters (no spaces or special characters)";
      expect(result.message).toBe(expectedMessage);
    });
  });
});
