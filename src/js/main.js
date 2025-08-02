const { challenges } = require('./challenges.js');
const { displayScore, loadChallenge, showSuccessMessage, showFailureMessage, displayAchievements, updateVisualizer } = require('./ui.js');
const { achievements, checkAchievements } = require('./achievements.js');
const { saveProgress, loadProgress } = require('./storage.js');
const { instrumentCode, _viz } = require('./visualizer.js');

let score = 0;
let currentChallengeIndex = 0;
let editor;
let completedChallenges = [];
let visualizationStep = 0;
let visualizationTrace = [];

// Make the editor instance globally accessible.
window.editor = null;

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
    const visualizeBtn = document.getElementById('visualize-btn');
    const visualizerContainer = document.getElementById('visualizer-container');
    const outputEl = document.getElementById('output');
    const codeEditorContainer = document.getElementById('code-editor');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    const loadedProgress = loadProgress();
    if (loadedProgress) {
        score = loadedProgress.score;
        currentChallengeIndex = loadedProgress.currentChallengeIndex;
        completedChallenges = loadedProgress.completedChallenges;
        for (const achievement of achievements) {
            if (loadedProgress.unlockedAchievementIds.includes(achievement.id)) {
                achievement.unlocked = true;
            }
        }
        displayScore(score);
        displayAchievements(achievements.filter(a => a.unlocked));
    }

    window.editor = CodeMirror(codeEditorContainer, {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
    });
    editor = window.editor;

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

                    if (!completedChallenges.includes(challenge.id)) {
                        completedChallenges.push(challenge.id);
                        const newlyUnlocked = checkAchievements(completedChallenges);
                        if (newlyUnlocked.length > 0) {
                            displayAchievements(achievements.filter(a => a.unlocked));
                        }
                    }
                    saveProgress({
                        score,
                        currentChallengeIndex,
                        completedChallenges,
                        unlockedAchievementIds: achievements.filter(a => a.unlocked).map(a => a.id),
                    });
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

    if (visualizeBtn) {
        visualizeBtn.addEventListener('click', () => {
            const userCode = editor.getValue();
            _viz.trace = []; // Clear previous trace
            visualizationStep = 0;

            try {
                const instrumentedCode = instrumentCode(userCode);
                eval(instrumentedCode);
                visualizationTrace = _viz.trace;
                console.log('Visualization trace:', visualizationTrace);
                visualizerContainer.style.display = 'block';
                updateVisualizer(visualizationTrace, visualizationStep, editor);
            } catch (e) {
                outputEl.textContent = `Error: ${e.message}`;
                outputEl.style.color = 'red';
            }
        });
    }

    const visPlayPauseBtn = document.getElementById('vis-play-pause-btn');
    visPlayPauseBtn.addEventListener('click', () => {
        console.log('Play/Pause clicked');
    });

    const visStepBtn = document.getElementById('vis-step-btn');
    visStepBtn.addEventListener('click', () => {
        if (visualizationStep < visualizationTrace.length - 1) {
            visualizationStep++;
            updateVisualizer(visualizationTrace, visualizationStep, editor);
        }
    });

    const visResetBtn = document.getElementById('vis-reset-btn');
    visResetBtn.addEventListener('click', () => {
        visualizationStep = 0;
        updateVisualizer(visualizationTrace, visualizationStep, editor);
    });

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
