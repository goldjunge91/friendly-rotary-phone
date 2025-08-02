import { challenges } from './challenges.js';
import { displayScore, loadChallenge, showSuccessMessage, showFailureMessage, displayAchievements, updateVisualizer } from './ui.js';
import { achievements, checkAchievements } from './achievements.js';
import { saveProgress, loadProgress } from './storage.js';
import { instrumentCode, _viz } from './visualizer.js';

let score = 0;
let currentChallengeIndex = 0;
let editor;
let completedChallenges = [];
let visualizationStep = 0;
let visualizationTrace = [];

// Make the editor instance globally accessible.
window.editor = null;

export function greet() {
    return "Hello, World!";
}

export function add(a, b) {
    return a + b;
}

export function updateScore(points) {
    score += points;
    displayScore(score);
}

export function getScore() {
    return score;
}

export function resetScore() {
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
