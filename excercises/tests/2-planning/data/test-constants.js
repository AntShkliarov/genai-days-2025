/**
 * Shared test constants for TodoMVC testing
 * Consistent test data across all test specifications
 */

/**
 * Default todo items used across tests
 * These match the items from legacy tests for consistency
 */
export const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

/**
 * Additional test data for various scenarios
 */
export const ADDITIONAL_TODO_ITEMS = [
  'walk the dog',
  'clean the house',
  'write some code',
  'read a book',
  'call mom'
];

/**
 * Test data for edge cases
 */
export const EDGE_CASE_TODOS = [
  'a', // Single character
  'a'.repeat(100), // Long text
  '  trim me  ', // Text with spaces
  'special chars: !@#$%^&*()', // Special characters
  '   ', // Only spaces
  '' // Empty string
];

/**
 * Expected counter text patterns
 */
export const COUNTER_TEXTS = {
  ZERO_ITEMS: '0 items left',
  ONE_ITEM: '1 item left',
  TWO_ITEMS: '2 items left',
  THREE_ITEMS: '3 items left'
};
