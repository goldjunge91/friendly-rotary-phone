const { challenges } = require('./challenges.js');
const { displayScore, loadChallenge, showSuccessMessage, showFailureMessage } = require('./ui.js');

let score = 0;
let currentChallengeIndex = 0;
let editor;

function greet() {
    return "Hello, World!";
}

function add(a, b) {
    return a + b;
}

function updateScore(points) {
    score += points;
    displayScore(score);
}

function getScore() {
    return score;
}

function resetScore() {
    score = 0;
}

document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-btn');
    const outputEl = document.getElementById('output');
    const codeEditorContainer = document.getElementById('code-editor');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    editor = CodeMirror(codeEditorContainer, {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
    });

    loadChallenge(challenges[currentChallengeIndex], editor);

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const userCode = editor.getValue();
            let capturedOutput = '';
            outputEl.style.color = '';

            const oldLog = console.log;
            console.log = (...args) => {
                capturedOutput += args.map(String).join(' ') + '\\n';
            };

            try {
                eval(userCode);
                outputEl.textContent = capturedOutput || "Code executed without errors.";

                const challenge = challenges[currentChallengeIndex];
                const validationResult = challenge.validation(userCode);

                if (validationResult.success) {
                    showSuccessMessage(outputEl);
                    updateScore(10);
                } else {
                    showFailureMessage(outputEl, validationResult.hint);
                }

            } catch (e) {
                outputEl.textContent = `Error: ${e.message}`;
                outputEl.style.color = 'red';
            } finally {
                console.log = oldLog;
            }
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentChallengeIndex < challenges.length - 1) {
            currentChallengeIndex++;
            loadChallenge(challenges[currentChallengeIndex], editor);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentChallengeIndex > 0) {
            currentChallengeIndex--;
            loadChallenge(challenges[currentChallengeIndex], editor);
        }
    });
});

module.exports = {
    greet,
    add,
    updateScore,
    getScore,
    resetScore,
};
