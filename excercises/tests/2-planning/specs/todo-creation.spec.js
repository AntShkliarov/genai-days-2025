/**
 * TodoMVC Core Creation Tests
 * Using TodoPage component object with Playwright fixtures
 * 
 * Focuses on core todo creation functionality:
 * - Adding new todo items
 * - Input field behavior 
 * - List ordering and display
 * - Counter functionality
 */
import { test, expect } from '../fixtures/fixtures.js';
import { TODO_ITEMS, COUNTER_TEXTS } from '../data/test-constants.js';

test.describe('Todo Creation', () => {
  
  test('should allow me to add todo items', async ({ todoPage }) => {
    // Add first todo item
    await todoPage.addTodo(TODO_ITEMS[0]);
    
    // Verify the todo was added and is displayed
    await todoPage.expectTodoTexts([TODO_ITEMS[0]]);
    await todoPage.expectTodoCount(1);
    
    // Verify localStorage has the todo (testing persistence)
    await todoPage.checkTodosInLocalStorage(1);
    
    // Add second todo item
    await todoPage.addTodo(TODO_ITEMS[1]);
    
    // Verify both todos are now displayed in correct order
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    await todoPage.expectTodoCount(2);
    
    // Verify localStorage has both todos
    await todoPage.checkTodosInLocalStorage(2);
  });

  test('should clear text input field when an item is added', async ({ todoPage }) => {
    // Add a todo item
    await todoPage.addTodo(TODO_ITEMS[0]);
    
    // Verify the input field is empty after adding the item
    await todoPage.expectInputEmpty();
    
    // Verify the todo was actually added
    await todoPage.expectTodoCount(1);
    await todoPage.checkTodosInLocalStorage(1);
  });

  test('should append new items to the bottom of the list', async ({ todoPage }) => {
    // Add all three default todo items
    await todoPage.addTodos(TODO_ITEMS);
    
    // Verify the counter shows correct count
    await todoPage.expectCounterText(COUNTER_TEXTS.THREE_ITEMS);
    
    // Verify all items are in the correct order (appended to bottom)
    await todoPage.expectTodoTexts(TODO_ITEMS);
    await todoPage.expectTodoCount(3);
    
    // Verify localStorage persistence
    await todoPage.checkTodosInLocalStorage(3);
  });

  test('should display correct counter for single item', async ({ todoPage }) => {
    // Add single todo item
    await todoPage.addTodo(TODO_ITEMS[0]);
    
    // Verify counter shows "1 item left" (singular)
    await todoPage.expectCounterText(COUNTER_TEXTS.ONE_ITEM);
    
    // Add second item
    await todoPage.addTodo(TODO_ITEMS[1]);
    
    // Verify counter shows "2 items left" (plural)
    await todoPage.expectCounterText(COUNTER_TEXTS.TWO_ITEMS);
  });

  test('should handle multiple rapid additions', async ({ todoPage }) => {
    // Rapidly add multiple items
    for (let i = 0; i < 3; i++) {
      await todoPage.addTodo(TODO_ITEMS[i]);
    }
    
    // Verify all items were added correctly
    await todoPage.expectTodoCount(3);
    await todoPage.expectTodoTexts(TODO_ITEMS);
    
    // Verify input remains empty after all additions
    await todoPage.expectInputEmpty();
    
    // Verify localStorage consistency
    await todoPage.checkTodosInLocalStorage(3);
  });

  test('should maintain proper order when adding items incrementally', async ({ todoPage }) => {
    // Add items one by one, verifying order after each addition
    
    // Add first item
    await todoPage.addTodo(TODO_ITEMS[0]);
    await todoPage.expectTodoTexts([TODO_ITEMS[0]]);
    
    // Add second item, verify it's appended
    await todoPage.addTodo(TODO_ITEMS[1]);
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1]]);
    
    // Add third item, verify it's appended to the end
    await todoPage.addTodo(TODO_ITEMS[2]);
    await todoPage.expectTodoTexts([TODO_ITEMS[0], TODO_ITEMS[1], TODO_ITEMS[2]]);
    
    // Final verification
    await todoPage.expectTodoCount(3);
    await todoPage.expectCounterText(COUNTER_TEXTS.THREE_ITEMS);
  });
});
