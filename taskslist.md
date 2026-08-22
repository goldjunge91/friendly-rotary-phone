Task 1: Implement the First Programming Challenge Objective: Create the first interactive challenge for you to solve. This task will make the tutorial "interactive" by providing a clear goal and a mechanism to check for correctness.

Detailed Steps:

Define the Challenge: Create a simple first challenge. For example: "Write a function called isPositive that takes a number as an argument and returns true if the number is positive (greater than 0) and false otherwise." Display the Challenge: Update index.html to add a dedicated area for the challenge description (e.g., a div with id="challenge-prompt"). In app.js, create a function to load and display the challenge text in this new area. Create a Validation Test for the Challenge: In app.js, write a "private" test function that will be used to validate your code for this specific challenge. This is different from the main test suite. This validation function should check if your code defines a function named isPositive and if it behaves correctly (e.g., isPositive(10) is true, isPositive(-5) is false, isPositive(0) is false). Update the "Run Code" Logic: Modify the event listener for the "Run Code" button. After your code is executed with eval(), the validation test for the current challenge should be run. If the validation passes, update the UI to show a "Success!" message, award points using the updateScore() function, and update the score display using displayScore(). If the validation fails, show a helpful hint in the output area (e.g., "Your function failed for negative numbers.").

Task 2: Integrate a Professional Code Editor Objective: Replace the basic

Feature 1: Live Code-Along Mode
Create a "teacher" mode that allows an instructor to guide one or more "students" through a challenge in real-time.

Description: A teacher could start a session and invite students with a unique code. As the teacher types in the editor, their code would appear in the students' editors, but grayed out. The student would then need to type the same code to proceed. The teacher could also set breakpoints, and when the code is run, execution would pause at those points, allowing the teacher to explain the state of the variables.
Benefits:
Creates a highly interactive and collaborative learning experience.
Perfect for live workshops, tutoring, or classroom settings.
Allows for real-time feedback and guidance from an instructor.

Feature Idea 2: "Code, Watch, and Learn" with a Visual Debugger
Instead of just running the code and seeing the output, this feature would allow you to visualize the execution of your code step-by-step.
Description: Add a "Visualize" button next to the "Run" button. When clicked, the code would execute line by line, with the current line being highlighted. A separate panel would show the call stack and the values of all variables at each step. You could control the execution speed, step forward and backward, and see exactly how your code is behaving.
Benefits:
Makes abstract concepts like scope, closures, and the call stack much more concrete.
Helps you develop a mental model of how your code executes.
Provides a powerful tool for debugging and understanding complex logic.

Feature Idea 3: Interactive Code "Playgrounds"
Create a sandboxed environment where you can freely experiment with the concepts from the challenges without the pressure of validation.

Description: Add a "Playground" tab. This would be a blank code editor where you can write and run any JavaScript they want. To make it more educational, you could pre-populate the playground with the functions or variables from the last completed challenge, allowing you to tinker with them. You could also add a library of code snippets that you can insert to try out different things (e.g., creating an array, defining an object, making an API call).
Benefits:
Encourages exploration and experimentation, which are key to learning.
Provides a low-stakes environment for you to practice your skills.
Can be a useful tool for teachers to demonstrate concepts.
