function greet() {
    return "Hello, World!";
}

function add(a, b) {
    return a + b;
}

let score = 0;

function updateScore(points) {
    score += points;
}

function getScore() {
    return score;
}

function resetScore() {
    score = 0;
}

function displayScore() {
    const scoreEl = document.getElementById('score');
    scoreEl.textContent = getScore();
}

document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-btn');
    const codeEditor = document.getElementById('code-editor');
    const outputEl = document.getElementById('output');

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const userCode = codeEditor.value;
            let capturedOutput = '';
            outputEl.style.color = ''; // Reset color

            const oldLog = console.log;
            console.log = (...args) => {
                capturedOutput += args.map(String).join(' ') + '\\n';
            };

            try {
                eval(userCode);
                outputEl.textContent = capturedOutput;
            } catch (e) {
                outputEl.textContent = `Error: ${e.message}`;
                outputEl.style.color = 'red';
            } finally {
                console.log = oldLog;
            }
        });
    }
});
