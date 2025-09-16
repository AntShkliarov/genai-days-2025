// @ts-check
import { test, expect } from '@playwright/test';

const CHEESE_TODO_ITEMS = [
  'buy some cheese',
  'more cheese', 
  'even more cheese'
];

test.describe('Todo LocalStorage Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('should add 3 todo items and validate storage behavior', async ({ page }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Add the first todo item
    await newTodo.fill(CHEESE_TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Add the second todo item  
    await newTodo.fill(CHEESE_TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Add the third todo item
    await newTodo.fill(CHEESE_TODO_ITEMS[2]);
    await newTodo.press('Enter');

    // Verify all 3 items are visible in the UI
    await expect(page.getByTestId('todo-title')).toHaveText(CHEESE_TODO_ITEMS);

    // Wait for storage operations to complete
    await page.waitForTimeout(1000);

    // Get the actual local storage data using the correct key
    const localStorageData = await page.evaluate(() => {
      const data = localStorage.getItem('react-todos');
      return data ? JSON.parse(data) : [];
    });
    
    // Verify that all 3 items are stored correctly
    expect(localStorageData).toHaveLength(3);
    
    // Extract titles from the stored objects and verify they match our expected items
    const storedTitles = localStorageData.map(item => item.title);
    expect(storedTitles).toContain(CHEESE_TODO_ITEMS[0]); // "buy some cheese"
    expect(storedTitles).toContain(CHEESE_TODO_ITEMS[1]); // "more cheese" 
    expect(storedTitles).toContain(CHEESE_TODO_ITEMS[2]); // "even more cheese"
    
    // Verify that all items are initially not completed
    localStorageData.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('completed', false);
      expect(typeof item.id).toBe('string');
      expect(item.id.length).toBeGreaterThan(0);
    }); 
  });

  test('should persist completed state in localStorage', async ({ page }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Add a todo item
    await newTodo.fill('test completion');
    await newTodo.press('Enter');

    // Complete the todo item
    await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();

    // Wait for storage operations to complete
    await page.waitForTimeout(500);

    // Verify the completed state is persisted in localStorage
    const localStorageData = await page.evaluate(() => {
      const data = localStorage.getItem('react-todos');
      return data ? JSON.parse(data) : [];
    });

    expect(localStorageData).toHaveLength(1);
    expect(localStorageData[0].title).toBe('test completion');
    expect(localStorageData[0].completed).toBe(true);

    // Verify the UI reflects the completed state
    await expect(page.getByTestId('todo-item')).toHaveClass(/completed/);
  });

  test('should remove deleted items from localStorage', async ({ page }) => {
    // Create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Add two todo items
    await newTodo.fill('item to keep');
    await newTodo.press('Enter');
    
    await newTodo.fill('item to delete');
    await newTodo.press('Enter');

    // Verify both items are in localStorage
    let localStorageData = await page.evaluate(() => {
      const data = localStorage.getItem('react-todos');
      return data ? JSON.parse(data) : [];
    });
    expect(localStorageData).toHaveLength(2);

    // Delete the second item by hovering and clicking the delete button
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).hover();
    await todoItems.nth(1).getByRole('button', { name: 'Delete' }).click();

    // Wait for storage operations to complete
    await page.waitForTimeout(500);

    // Verify only one item remains in localStorage
    localStorageData = await page.evaluate(() => {
      const data = localStorage.getItem('react-todos');
      return data ? JSON.parse(data) : [];
    });
    expect(localStorageData).toHaveLength(1);
    expect(localStorageData[0].title).toBe('item to keep');

    // Verify the UI shows only one item
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-title')).toHaveText('item to keep');
  });
});

// Note: This implementation uses 'react-todos' key in localStorage with array structure
// Each todo item is an object with id, title, and completed properties
