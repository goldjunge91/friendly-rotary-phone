const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
global.window = dom.window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

// Mock CodeMirror
global.CodeMirror = function() {
    return {
        getValue: () => '',
        setValue: () => {},
    };
};

const { greet, add, getScore, resetScore, updateScore } = require('./main.js');
const { displayScore } = require('./ui.js');

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

try {
    // Test case 1: Test the greet function
    assert(greet() === "Hello, World!", "greet() should return 'Hello, World!'");

    // Test case 2: Test the add function
    assert(add(2, 3) === 5, "add(2, 3) should return 5");
    assert(add(-1, 1) === 0, "add(-1, 1) should return 0");

    // Test case 3: Test the score-keeping functionality
    resetScore();
    assert(getScore() === 0, "Initial score should be 0");
    updateScore(10);
    assert(getScore() === 10, "Score should be 10 after adding 10");
    updateScore(5);
    assert(getScore() === 15, "Score should be 15 after adding 5 more");

    // Test case 4: Test displaying the score
    resetScore();
    updateScore(100);
    displayScore(getScore());
    const scoreEl = document.getElementById('score');
    assert(scoreEl.textContent === '100', "Score should be displayed on the page");

    console.log("All tests passed!");
} catch (error) {
    console.error("Test failed:", error.message);
}
