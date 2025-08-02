export function displayScore(score) {
    const scoreEl = document.getElementById('score');
    scoreEl.textContent = score;
}

export function loadChallenge(challenge, editor) {
    const promptEl = document.getElementById('challenge-prompt');
    promptEl.innerHTML = `<h3>${challenge.title}</h3><p>${challenge.prompt}</p>`;
    editor.setValue(challenge.starterCode || '');
    document.getElementById('next-btn').disabled = true;
}

export function showSuccessMessage(outputEl) {
    outputEl.innerHTML += "\\n<strong style='color: green;'>Success!</strong> You've completed the challenge.";
    document.getElementById('next-btn').disabled = false;
}

export function showFailureMessage(outputEl, hint) {
    outputEl.innerHTML += `\\n<strong style='color: red;'>Validation Failed.</strong> ${hint || ''}`;
}

export function displayAchievements(unlockedAchievements) {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    for (const achievement of unlockedAchievements) {
        const li = document.createElement('li');
        li.textContent = `${achievement.name}: ${achievement.description}`;
        achievementsList.appendChild(li);
    }
}

export function displayCallStack(trace) {
    const callStackEl = document.getElementById('call-stack');
    // This is a placeholder. We will need to process the trace to build the call stack.
    callStackEl.textContent = 'Call stack will be displayed here.';
}

export function displayVariables(trace) {
    const variablesEl = document.getElementById('scope-variables');
    // This is a placeholder. We will need to process the trace to get variable values.
    variablesEl.textContent = 'Variables will be displayed here.';
}

export function highlightLine(node, editor) {
    if (editor && node) {
        const from = editor.posFromIndex(node.start);
        const to = editor.posFromIndex(node.end);
        editor.markText(from, to, { className: 'highlighted-code' });
    }
}

export function updateVisualizer(trace, step, editor) {
    if (!trace || trace.length === 0) {
        return;
    }
    const currentStep = trace[step];
    displayCallStack(trace.slice(0, step + 1));
    displayVariables(trace.slice(0, step + 1));
    highlightLine(currentStep.node, editor);
}
