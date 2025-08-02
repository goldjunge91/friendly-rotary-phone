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
const { sumArray } = require('./array.js');
const { getProperty } = require('./object.js');
const { reverseString } = require('./string.js');
const { achievements, checkAchievements } = require('./achievements.js');
const { saveProgress, loadProgress } = require('./storage.js');

// Mock localStorage
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
})();
global.localStorage = localStorageMock;


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

    // Test case 5: Test sumArray function
    assert(sumArray([1, 2, 3]) === 6, "sumArray([1, 2, 3]) should return 6");
    assert(sumArray([-1, 1, 0]) === 0, "sumArray([-1, 1, 0]) should return 0");
    assert(sumArray([]) === 0, "sumArray([]) should return 0");

    // Test case 6: Test getProperty function
    const obj = { a: 1, b: { c: 2 } };
    assert(getProperty(obj, 'a') === 1, "getProperty(obj, 'a') should return 1");
    assert(getProperty(obj, 'b.c') === 2, "getProperty(obj, 'b.c') should return 2");
    assert(getProperty(obj, 'd') === undefined, "getProperty(obj, 'd') should return undefined");

    // Test case 7: Test reverseString function
    assert(reverseString('hello') === 'olleh', "reverseString('hello') should return 'olleh'");
    assert(reverseString('') === '', "reverseString('') should return ''");
    assert(reverseString('a') === 'a', "reverseString('a') should return 'a'");

    // Test case 8: Test achievements
    // Reset achievements
    for (const achievement of achievements) {
        achievement.unlocked = false;
    }
    let completedChallenges = [];
    let newlyUnlocked = checkAchievements(completedChallenges);
    assert(newlyUnlocked.length === 0, "No achievements should be unlocked initially");

    completedChallenges.push(1);
    newlyUnlocked = checkAchievements(completedChallenges);
    assert(newlyUnlocked.length === 1, "First Steps achievement should be unlocked");
    assert(newlyUnlocked[0].name === "First Steps", "First Steps achievement should be unlocked");

    completedChallenges.push(2);
    completedChallenges.push(3);
    completedChallenges.push(4);
    completedChallenges.push(5);
    newlyUnlocked = checkAchievements(completedChallenges);
    assert(newlyUnlocked.length === 2, "5 in a Row and Array Master achievements should be unlocked");

    // Test case 9: Test storage
    localStorage.clear();
    const progressToSave = {
        score: 100,
        currentChallengeIndex: 3,
        completedChallenges: [1, 2, 3],
        unlockedAchievementIds: [1, 3],
    };
    saveProgress(progressToSave);
    const loadedProgress = loadProgress();
    assert(loadedProgress.score === 100, "Score should be loaded correctly");
    assert(loadedProgress.currentChallengeIndex === 3, "currentChallengeIndex should be loaded correctly");
    assert(loadedProgress.completedChallenges.length === 3, "completedChallenges should be loaded correctly");
    assert(loadedProgress.unlockedAchievementIds.length === 2, "unlockedAchievementIds should be loaded correctly");


    console.log("All tests passed!");
} catch (error) {
    console.error("Test failed:", error.message);
}
