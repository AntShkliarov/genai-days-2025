/**
 * Playwright Fixtures for TodoMVC Testing
 * Following Playwright fixtures documentation: https://playwright.dev/docs/test-fixtures#creating-a-fixture
 */
import { test as base, expect } from '@playwright/test';
import { TodoPage } from './todo-page.js';

// Extend base test with custom fixtures
export const test = base.extend({
  /**
   * TodoPage fixture - provides initialized TodoPage component object
   * Automatically navigates to the TodoMVC app before each test
   */
  todoPage: async ({ page }, use) => {
    // Setup: Create TodoPage instance and navigate to app
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    
    // Provide the fixture to the test
    await use(todoPage);
    
    // Teardown: Any cleanup can go here if needed
    // For TodoMVC, no special teardown is required as each test gets a fresh page
  }
});

// Export expect for convenience
export { expect };
