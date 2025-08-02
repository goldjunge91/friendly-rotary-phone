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
    }
];
