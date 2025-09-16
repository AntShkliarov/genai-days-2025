# TodoItem Component Object Implementation Plan

## Executive Summary
This plan addresses the creation of a TodoItem component object with Playwright fixtures for enhanced test organization and reusability, based on the legacy test suite analysis and Playwright fixtures documentation.

## Current State Analysis

### Legacy Tests Coverage (450 lines)
- **Todo Creation**: Adding items, input clearing, list ordering
- **Todo Management**: Mark/unmark completion, editing, deletion
- **Bulk Operations**: Mark all, clear completed
- **Filtering**: All, Active, Completed views
- **Persistence**: LocalStorage validation
- **UI Elements**: Counter, routing, visual states

### Gaps in Current input.md
1. **Target Application**: Unclear which TodoMVC to test (demo vs local React app)
2. **Scope Definition**: "Creation functionality" too narrow vs comprehensive legacy coverage
3. **Component Design**: No fixture structure details specified
4. **Test Data**: No strategy for test data management
5. **File Organization**: Missing naming and structure conventions
6. **Browser Setup**: No configuration requirements mentioned

## Proposed Implementation Strategy

### Phase 1: Component Object Design
Following [Playwright fixtures documentation](https://playwright.dev/docs/test-fixtures#creating-a-fixture):

```javascript
// todo-page.js - Component Object
export class TodoPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
    this.todoCount = page.getByTestId('todo-count');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.clearCompleted = page.getByRole('button', { name: 'Clear completed' });
  }

  // Actions
  async addTodo(text) { /* implementation */ }
  async toggleTodo(index) { /* implementation */ }
  async editTodo(index, newText) { /* implementation */ }
  async deleteTodo(index) { /* implementation */ }
  
  // Assertions
  async expectTodoCount(count) { /* implementation */ }
  async expectTodoText(texts) { /* implementation */ }
  async expectTodoCompleted(index, completed) { /* implementation */ }
}
```

### Phase 2: Fixture Implementation
```javascript
// fixtures.js - Playwright Fixtures
import { test as base } from '@playwright/test';
import { TodoPage } from './todo-page';

export const test = base.extend({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto(); // Navigate to app
    await use(todoPage);
    // Cleanup if needed
  }
});
```

### Phase 3: Test Specification Structure
```
tests/2-planning/
├── fixtures/
│   ├── todo-page.js          # Component Object
│   └── fixtures.js           # Fixture definitions  
├── specs/
│   └── todo-creation.spec.js # Creation-focused tests
└── data/
    └── test-constants.js     # Shared test data
```

### Phase 4: Test Coverage Prioritization
Based on legacy test analysis, implement in order:
1. **Core Creation** (15 tests): Basic adding, input clearing, list ordering
2. **Item Management** (12 tests): Toggle completion, editing basics  
3. **Bulk Operations** (8 tests): Mark all, clear completed
4. **Advanced Features** (15 tests): Filtering, persistence, routing

## Missing Requirements for Complete Implementation

### 1. Target Application Specification
**Current**: Undefined
**Needed**: 
- Local React app: `http://localhost:8080/`
- Or demo app: `https://demo.playwright.dev/todomvc`
- **Recommendation**: Use local React app to test actual codebase

### 2. Expanded Scope Definition
**Current**: "Creation functionality"
**Needed**: 
- Core CRUD operations (Create, Read, Update, Delete)
- State management (completed/active filtering)
- Persistence validation (localStorage)
- UI responsiveness (counter, visual states)

### 3. Test Data Strategy
**Current**: Undefined
**Needed**:
```javascript
export const TEST_TODOS = [
  'buy some cheese',
  'feed the cat', 
  'book a doctors appointment'
];
```

### 4. Browser Configuration
**Current**: Undefined
**Needed**: Playwright config for local app testing
```javascript
// playwright.config.js update needed
use: {
  baseURL: 'http://localhost:8080',
}
```

### 5. LocalStorage Testing Requirements
**Current**: Not specified
**Needed**: Define validation requirements for:
- Todo persistence across page reloads
- Storage format validation ('react-todos' key)
- Known localStorage bugs (every second item not saved)

### 6. Performance and Reliability
**Current**: Not addressed  
**Needed**:
- Auto-waiting strategies for dynamic content
- Retry mechanisms for localStorage operations
- Test isolation between spec runs

## Implementation Timeline

### Immediate (Phase 1)
- [ ] Design TodoPage component object class
- [ ] Implement basic locators and actions
- [ ] Create fixture structure

### Short-term (Phase 2-3)  
- [ ] Implement Playwright fixtures
- [ ] Create focused creation test specification
- [ ] Add test data constants

### Medium-term (Phase 4)
- [ ] Expand to full CRUD coverage
- [ ] Add localStorage validation
- [ ] Implement filtering and routing tests

## Success Criteria
1. ✅ All tests pass consistently  
2. ✅ Component object provides clean, reusable interface
3. ✅ Fixtures enable test isolation and setup/teardown
4. ✅ Coverage matches legacy test functionality
5. ✅ Code follows Playwright best practices
6. ✅ Documentation enables team adoption

## Recommendations for input.md Enhancement

The current input.md should be updated to include:
1. **Target Application**: Specify local React app URL
2. **Expanded Scope**: Beyond just "creation" to core CRUD operations  
3. **Component Structure**: Define required methods and properties
4. **Test Data**: Specify shared constants approach
5. **File Organization**: Define naming conventions
6. **Success Metrics**: Define clear acceptance criteria

This enhanced specification will enable more precise implementation and better alignment with project goals.
