# TodoMVC React Application - Requirements Document

## Application Overview

The TodoMVC React application is a task management web application built with React 17, implementing the classic TodoMVC specification. The app runs on http://localhost:8080/ and provides a clean, minimal interface for managing todo items.

## Technical Architecture

### Technology Stack
- **Frontend Framework**: React 17.0.2
- **State Management**: useReducer hook with custom reducer
- **Routing**: React Router DOM 6.8.2
- **Styling**: TodoMVC CSS framework + custom CSS
- **Build Tool**: Webpack 5.75.0
- **Development Server**: Webpack Dev Server
- **Package Manager**: npm

## Functional Requirements

### Core Features

#### 1. Todo Creation
- **Input Field**: Main input field in header with placeholder "What needs to be done?"
- **Validation**: Minimum 2 characters required
- **Sanitization**: HTML entities are escaped for security
- **Submission**: Enter key to submit, input clears after submission
- **Auto-focus**: Input field is automatically focused

#### 2. Todo Display
- **List View**: All todos displayed in an unordered list
- **Item Structure**: Each todo shows:
  - Checkbox for completion toggle
  - Title text (double-click to edit)
  - Delete button (destroy)
- **Visual States**: Completed items have different styling

#### 3. Todo Management
- **Toggle Completion**: Click checkbox to mark complete/incomplete
- **Edit Todo**: Double-click on label to enable inline editing
- **Delete Todo**: Click destroy button to remove item
- **Bulk Actions**: 
  - Toggle All: Master checkbox to mark all todos complete/incomplete
  - Clear Completed: Remove all completed items

#### 4. Filtering & Navigation
- **Filter Views**:
  - All todos (default route: /)
  - Active todos only (/active)
  - Completed todos only (/completed)
- **Navigation**: Hash-based routing with footer navigation links
- **Counter**: Display count of remaining active items

### State Management

#### Actions Supported
- `ADD_ITEM`: Create new todo
- `UPDATE_ITEM`: Edit existing todo title
- `REMOVE_ITEM`: Delete single todo
- `TOGGLE_ITEM`: Toggle completion status
- `TOGGLE_ALL`: Toggle all todos completion status
- `REMOVE_COMPLETED_ITEMS`: Delete all completed todos
- `REMOVE_ALL_ITEMS`: Delete all todos

#### Data Structure
```javascript
Todo Item = {
  id: string (nanoid generated),
  title: string (sanitized),
  completed: boolean
}
```

## Storage Requirements

### Local Storage Implementation
- **Storage Key**: 'todo-items'
- **Data Format**: JSON object with timestamp keys and todo titles as values
- **Functionality**:
  - Save todo titles when items are created
  - Remove titles when items are deleted
  - Clear all titles when all items are removed
  - Handle storage errors gracefully with console logging

## User Interface Requirements

### Layout Structure
- **Header**: Application title "todos" and main input field
- **Main Section**: Todo list with toggle-all functionality
- **Footer**: Item counter, filter navigation, and clear completed button
- **Info Footer**: Static information about the application

### Responsive Design
- Mobile-friendly viewport meta tag
- CSS framework optimized for various screen sizes

### Accessibility Features
- Proper ARIA labels and test IDs for automated testing
- Screen reader support with visually-hidden labels
- Semantic HTML structure
- Keyboard navigation support

### Visual Features
- Clean, minimal design following TodoMVC specification
- Hover and focus states for interactive elements
- Conditional rendering (footer only shows when todos exist)
- Dynamic class names based on completion state

## Technical Specifications

### Browser Compatibility
- Modern browsers supporting ES6+ features
- Node.js >= 18.13.0 required for development

### Performance Optimizations
- React.memo for item components to prevent unnecessary re-renders
- useCallback hooks to prevent function recreation
- useMemo for filtered todo calculations

### Development Features
- Hot reload development server
- ESLint configuration
- Webpack build optimization
- Source maps for debugging

### Security Features
- Input sanitization to prevent XSS attacks
- HTML entity encoding for user-provided content

## Testing Requirements

### Test Data IDs
- `header`: Application header
- `main`: Main content area  
- `footer`: Application footer
- `footer-navigation`: Filter navigation
- `text-input`: Input fields
- `todo-item`: Individual todo items
- `todo-item-toggle`: Item checkboxes
- `todo-item-label`: Item labels
- `todo-item-button`: Delete buttons
- `todo-list`: Todo list container
- `toggle-all`: Master toggle checkbox

## Known Issues/Bugs

1. **localStorage Bug**: Only every second created todo title is saved to localStorage due to the itemCreationCounter logic
2. **No Session Storage**: Application doesn't use session storage
3. **No Network Requests**: Application is purely client-side with no backend integration

## Deployment

### Development
- `npm run dev`: Start development server with hot reload
- Default development URL: http://localhost:8080/

### Production
- `npm run build`: Create production build in dist/ directory
- `npm run serve`: Serve production build locally

## Dependencies

### Production Dependencies
- react: ^17.0.2
- react-dom: ^17.0.2  
- react-router-dom: ^6.8.2
- classnames: ^2.2.5
- todomvc-app-css: ^2.4.2
- todomvc-common: ^1.0.5

### Development Dependencies
- Webpack ecosystem for bundling
- Babel for React/ES6+ transpilation
- CSS processing tools
- http-server for static serving

This requirements document provides a comprehensive overview of the TodoMVC React application's functionality, architecture, and technical specifications based on source code analysis.
