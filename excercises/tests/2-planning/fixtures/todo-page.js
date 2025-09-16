import { expect } from '@playwright/test';

/**
 * TodoPage Component Object - Following Playwright Page Object Model
 * Encapsulates todo item interactions and provides reusable methods
 */
export class TodoPage {
  constructor(page) {
    this.page = page;
    
    // Core input and list locators
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
    
    // Bulk action locators
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
    
    // Filter navigation
    this.allFilter = page.getByRole('link', { name: 'All' });
    this.activeFilter = page.getByRole('link', { name: 'Active' });
    this.completedFilter = page.getByRole('link', { name: 'Completed' });
  }

  /**
   * Navigate to the TodoMVC application
   */
  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc');
  }

  /**
   * Add a new todo item
   * @param {string} text - The todo text to add
   */
  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  /**
   * Add multiple todo items
   * @param {string[]} items - Array of todo texts to add
   */
  async addTodos(items) {
    for (const item of items) {
      await this.addTodo(item);
    }
  }

  /**
   * Get a specific todo item by index
   * @param {number} index - Zero-based index of the todo item
   */
  getTodoItem(index) {
    return this.todoItems.nth(index);
  }

  /**
   * Toggle completion status of a todo item
   * @param {number} index - Zero-based index of the todo item
   */
  async toggleTodo(index) {
    const todoItem = this.getTodoItem(index);
    await todoItem.getByRole('checkbox').click();
  }

  /**
   * Edit a todo item by double-clicking and entering new text
   * @param {number} index - Zero-based index of the todo item
   * @param {string} newText - New text for the todo
   */
  async editTodo(index, newText) {
    const todoItem = this.getTodoItem(index);
    await todoItem.dblclick();
    await todoItem.getByRole('textbox', { name: 'Edit' }).fill(newText);
    await todoItem.getByRole('textbox', { name: 'Edit' }).press('Enter');
  }

  /**
   * Delete a todo item by clicking its delete button
   * @param {number} index - Zero-based index of the todo item
   */
  async deleteTodo(index) {
    const todoItem = this.getTodoItem(index);
    await todoItem.hover();
    await todoItem.getByLabel('Delete').click();
  }

  /**
   * Mark all todos as completed or uncompleted
   */
  async toggleAllTodos() {
    await this.toggleAll.check();
  }

  /**
   * Clear all completed todos
   */
  async clearCompletedTodos() {
    await this.clearCompleted.click();
  }

  // Assertion helpers

  /**
   * Assert the number of todo items
   * @param {number} expectedCount - Expected number of items
   */
  async expectTodoCount(expectedCount) {
    await expect(this.todoItems).toHaveCount(expectedCount);
  }

  /**
   * Assert the text content of all todos
   * @param {string[]} expectedTexts - Array of expected todo texts
   */
  async expectTodoTexts(expectedTexts) {
    await expect(this.todoTitles).toHaveText(expectedTexts);
  }

  /**
   * Assert that input field is empty
   */
  async expectInputEmpty() {
    await expect(this.newTodoInput).toBeEmpty();
  }

  /**
   * Assert the todo counter text
   * @param {string} expectedText - Expected counter text (e.g., "3 items left")
   */
  async expectCounterText(expectedText) {
    await expect(this.todoCount).toHaveText(expectedText);
  }

  /**
   * Assert that a specific todo is completed
   * @param {number} index - Zero-based index of the todo item
   */
  async expectTodoCompleted(index) {
    const todoItem = this.getTodoItem(index);
    await expect(todoItem).toHaveClass('completed');
  }

  /**
   * Assert that a specific todo is not completed
   * @param {number} index - Zero-based index of the todo item
   */
  async expectTodoNotCompleted(index) {
    const todoItem = this.getTodoItem(index);
    await expect(todoItem).not.toHaveClass('completed');
  }

  // LocalStorage validation helpers

  /**
   * Check the number of todos in localStorage
   * @param {number} expected - Expected number of todos in storage
   */
  async checkTodosInLocalStorage(expected) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).length === e;
    }, expected);
  }

  /**
   * Check the number of completed todos in localStorage
   * @param {number} expected - Expected number of completed todos
   */
  async checkCompletedTodosInLocalStorage(expected) {
    return await this.page.waitForFunction(e => {
      return JSON.parse(localStorage['react-todos']).filter(i => i.completed).length === e;
    }, expected);
  }

  /**
   * Check if a specific todo title exists in localStorage
   * @param {string} title - Todo title to search for
   */
  async checkTodoTitleInLocalStorage(title) {
    return await this.page.waitForFunction(t => {
      return JSON.parse(localStorage['react-todos']).map(i => i.title).includes(t);
    }, title);
  }
}
