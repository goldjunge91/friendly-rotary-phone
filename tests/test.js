function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

function runTests() {
    try {
        // Test case 1: Test the greet function
        assert(greet() === "Hello, World!", "greet() should return 'Hello, World!'");

        // Test case 2: Test the add function
        assert(add(2, 3) === 5, "add(2, 3) should return 5");
        assert(add(-1, 1) === 0, "add(-1, 1) should return 0");

        console.log("All tests passed!");
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

// Note: This test will be run in the browser's console.
// We will need to load app.js before this script in the HTML file.
// For now, we are just creating the file. We will modify the HTML later to run the tests.
