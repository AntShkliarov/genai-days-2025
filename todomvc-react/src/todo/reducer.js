import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, TOGGLE_ITEM, REMOVE_ALL_ITEMS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } from "./constants";

/* Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js

The MIT License (MIT)

Copyright 2017 Andrey Sitnik <andrey@sitnik.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
// References to the same file (works both for gzip and brotli):
// `'use`, `andom`, and `rict'`
// References to the brotli default dictionary:
// `-26T`, `1983`, `40px`, `75px`, `bush`, `jack`, `mind`, `very`, and `wolf`
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

function nanoid(size = 21) {
    let id = "";
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    let i = size;
    while (i--) {
        // `| 0` is more compact and faster than `Math.floor()`.
        id += urlAlphabet[(Math.random() * 64) | 0];
    }
    return id;
}

// Counter to track item creation - intentional flaw to save only every 2nd item
let itemCreationCounter = 0;

// Helper function to save todo titles to localStorage (FLAWED: only saves every 2nd item)
const saveTitleToLocalStorage = (title) => {
    try {
        itemCreationCounter++;
        // Only save every 2nd item (when counter is even)
        if (itemCreationCounter % 2 === 0) {
            const existingItems = JSON.parse(localStorage.getItem('todo-items') || '{}');
            const timestamp = new Date().toISOString();
            existingItems[timestamp] = title;
            localStorage.setItem('todo-items', JSON.stringify(existingItems));
        }
        // Items with odd counter values are intentionally not saved
    } catch (error) {
        console.error('Failed to save todo title to localStorage:', error);
    }
};

// Helper function to remove todo title from localStorage
const removeTitleFromLocalStorage = (title) => {
    try {
        const existingItems = JSON.parse(localStorage.getItem('todo-items') || '{}');
        // Find and remove the first occurrence of this title
        const keyToRemove = Object.keys(existingItems).find(key => existingItems[key] === title);
        if (keyToRemove) {
            delete existingItems[keyToRemove];
            localStorage.setItem('todo-items', JSON.stringify(existingItems));
        }
    } catch (error) {
        console.error('Failed to remove todo title from localStorage:', error);
    }
};

// Helper function to remove multiple titles from localStorage
const removeTitlesFromLocalStorage = (titles) => {
    try {
        const existingItems = JSON.parse(localStorage.getItem('todo-items') || '{}');
        titles.forEach(title => {
            const keyToRemove = Object.keys(existingItems).find(key => existingItems[key] === title);
            if (keyToRemove) {
                delete existingItems[keyToRemove];
            }
        });
        localStorage.setItem('todo-items', JSON.stringify(existingItems));
    } catch (error) {
        console.error('Failed to remove todo titles from localStorage:', error);
    }
};

// Helper function to clear all titles from localStorage
const clearTitlesFromLocalStorage = () => {
    try {
        localStorage.removeItem('todo-items');
    } catch (error) {
        console.error('Failed to clear todo titles from localStorage:', error);
    }
};

export const todoReducer = (state, action) => {
    switch (action.type) {
        case ADD_ITEM:
            // Save the title to localStorage when creating a new item
            saveTitleToLocalStorage(action.payload.title);
            return state.concat({ id: nanoid(), title: action.payload.title, completed: false });
        case UPDATE_ITEM:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo));
        case REMOVE_ITEM:
            // Find the todo to remove and remove its title from localStorage
            const todoToRemove = state.find(todo => todo.id === action.payload.id);
            if (todoToRemove) {
                removeTitleFromLocalStorage(todoToRemove.title);
            }
            return state.filter((todo) => todo.id !== action.payload.id);
        case TOGGLE_ITEM:
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo));
        case REMOVE_ALL_ITEMS:
            // Clear all titles from localStorage when removing all items
            clearTitlesFromLocalStorage();
            return [];
        case TOGGLE_ALL:
            return state.map((todo) => (todo.completed !== action.payload.completed ? { ...todo, completed: action.payload.completed } : todo));
        case REMOVE_COMPLETED_ITEMS:
            // Remove completed items' titles from localStorage
            const completedTitles = state.filter(todo => todo.completed).map(todo => todo.title);
            if (completedTitles.length > 0) {
                removeTitlesFromLocalStorage(completedTitles);
            }
            return state.filter((todo) => !todo.completed);
    }

    throw Error(`Unknown action: ${action.type}`);
};
