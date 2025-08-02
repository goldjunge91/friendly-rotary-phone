const { sumArray } = require('./array.js');
const { getProperty } = require('./object.js');
const { reverseString } = require('./string.js');

module.exports.challenges = [
    {
        id: 1,
        title: "Challenge 1: Is Positive?",
        prompt: "Write a function called `isPositive` that takes a number and returns `true` if it's positive, otherwise `false`.",
        starterCode: "function isPositive(num) {\n  // Your code here\n}",
        validation: (userCode) => {
            try {
                const context = {};
                const fullCode = `${userCode}; context.isPositive = isPositive;`;
                eval(fullCode);

                if (typeof context.isPositive !== 'function') {
                    return { success: false, hint: "You need to define a function named `isPositive`." };
                }
                if (context.isPositive(10) !== true) return { success: false, hint: "Check positive numbers." };
                if (context.isPositive(-5) !== false) return { success: false, hint: "Check negative numbers." };
                if (context.isPositive(0) !== false) return { success: false, hint: "Check zero." };

                return { success: true };
            } catch (e) {
                return { success: false, hint: `Execution Error: ${e.message}` };
            }
        }
    },
    {
        id: 2,
        title: "Challenge 2: Is Even?",
        prompt: "Write a function called `isEven` that takes a number and returns `true` if it's even, otherwise `false`.",
        starterCode: "function isEven(num) {\n  // Your code here\n}",
        validation: (userCode) => {
            try {
                const context = {};
                const fullCode = `${userCode}; context.isEven = isEven;`;
                eval(fullCode);

                if (typeof context.isEven !== 'function') {
                    return { success: false, hint: "You need to define a function named `isEven`." };
                }
                if (context.isEven(4) !== true) return { success: false, hint: "Check even numbers." };
                if (context.isEven(7) !== false) return { success: false, hint: "Check odd numbers." };
                if (context.isEven(0) !== true) return { success: false, hint: "Check zero." };

                return { success: true };
            } catch (e) {
                return { success: false, hint: `Execution Error: ${e.message}` };
            }
        }
    },
    {
        id: 3,
        title: "Challenge 3: Sum Array",
        prompt: "Write a function called `sumArray` that takes an array of numbers and returns their sum.",
        starterCode: "function sumArray(arr) {\n  // Your code here\n}",
        validation: (userCode) => {
            try {
                const context = {};
                const fullCode = `${userCode}; context.sumArray = sumArray;`;
                eval(fullCode);

                if (typeof context.sumArray !== 'function') {
                    return { success: false, hint: "You need to define a function named `sumArray`." };
                }
                if (context.sumArray([1, 2, 3]) !== 6) return { success: false, hint: "Check an array of positive numbers." };
                if (context.sumArray([-1, 1, 0]) !== 0) return { success: false, hint: "Check an array with negative numbers and zero." };
                if (context.sumArray([]) !== 0) return { success: false, hint: "Check an empty array." };

                return { success: true };
            } catch (e) {
                return { success: false, hint: `Execution Error: ${e.message}` };
            }
        }
    },
    {
        id: 4,
        title: "Challenge 4: Get Property",
        prompt: "Write a function called `getProperty` that takes an object and a key (string) and returns the property's value. The key can be a nested path, e.g., 'a.b.c'.",
        starterCode: "function getProperty(obj, key) {\n  // Your code here\n}",
        validation: (userCode) => {
            try {
                const context = {};
                const fullCode = `${userCode}; context.getProperty = getProperty;`;
                eval(fullCode);

                if (typeof context.getProperty !== 'function') {
                    return { success: false, hint: "You need to define a function named `getProperty`." };
                }
                const obj = { a: 1, b: { c: 2 } };
                if (context.getProperty(obj, 'a') !== 1) return { success: false, hint: "Check a simple property." };
                if (context.getProperty(obj, 'b.c') !== 2) return { success: false, hint: "Check a nested property." };
                if (context.getProperty(obj, 'd') !== undefined) return { success: false, hint: "Check a non-existent property." };

                return { success: true };
            } catch (e) {
                return { success: false, hint: `Execution Error: ${e.message}` };
            }
        }
    },
    {
        id: 5,
        title: "Challenge 5: Reverse String",
        prompt: "Write a function called `reverseString` that takes a string and returns it reversed.",
        starterCode: "function reverseString(str) {\n  // Your code here\n}",
        validation: (userCode) => {
            try {
                const context = {};
                const fullCode = `${userCode}; context.reverseString = reverseString;`;
                eval(fullCode);

                if (typeof context.reverseString !== 'function') {
                    return { success: false, hint: "You need to define a function named `reverseString`." };
                }
                if (context.reverseString('hello') !== 'olleh') return { success: false, hint: "Check a simple string." };
                if (context.reverseString('') !== '') return { success: false, hint: "Check an empty string." };
                if (context.reverseString('a') !== 'a') return { success: false, hint: "Check a single character string." };

                return { success: true };
            } catch (e) {
                return { success: false, hint: `Execution Error: ${e.message}` };
            }
        }
    }
];
