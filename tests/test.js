function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

function runTests() {
    const testResultsContainer = document.getElementById('test-results');
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
        displayScore();
        const scoreEl = document.getElementById('score');
        assert(scoreEl.textContent === '100', "Score should be displayed on the page");

        // Test case 5: Test code execution functionality
        const codeEditor = document.getElementById('code-editor');
        const runBtn = document.getElementById('run-btn');
        const outputEl = document.getElementById('output');
        outputEl.textContent = ''; // Reset output
        codeEditor.value = 'console.log("hello from test")';
        runBtn.click();
        assert(outputEl.textContent.trim() === 'hello from test', 'Code execution should capture console.log');
        outputEl.textContent = ''; // Reset output
        codeEditor.value = 'throw new Error("a test error")';
        runBtn.click();
        assert(outputEl.textContent.includes('Error: a test error'), 'Code execution should handle errors');


        testResultsContainer.textContent = "All tests passed!";
        testResultsContainer.style.color = "green";
        console.log("All tests passed!");
    } catch (error) {
        testResultsContainer.textContent = `Test failed: ${error.message}`;
        testResultsContainer.style.color = "red";
        console.error("Test failed:", error.message);
    }
}

// Run the tests when the page loads
runTests();
