function displayScore(score) {
    const scoreEl = document.getElementById('score');
    scoreEl.textContent = score;
}

function loadChallenge(challenge, editor) {
    const promptEl = document.getElementById('challenge-prompt');
    promptEl.innerHTML = `<h3>${challenge.title}</h3><p>${challenge.prompt}</p>`;
    editor.setValue(challenge.starterCode || '');
    document.getElementById('next-btn').disabled = true;
}

function showSuccessMessage(outputEl) {
    outputEl.innerHTML += "\\n<strong style='color: green;'>Success!</strong> You've completed the challenge.";
    document.getElementById('next-btn').disabled = false;
}

function showFailureMessage(outputEl, hint) {
    outputEl.innerHTML += `\\n<strong style='color: red;'>Validation Failed.</strong> ${hint || ''}`;
}

module.exports = {
    displayScore,
    loadChallenge,
    showSuccessMessage,
    showFailureMessage,
};
