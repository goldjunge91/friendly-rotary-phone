document.addEventListener('DOMContentLoaded', () => {
    const tutorialView = document.getElementById('tutorial-view');
    const playgroundView = document.getElementById('playground-view');
    const tutorialTabBtn = document.getElementById('tutorial-tab-btn');
    const playgroundTabBtn = document.getElementById('playground-tab-btn');
    const playgroundRunBtn = document.getElementById('playground-run-btn');
    const playgroundOutputEl = document.getElementById('playground-output');
    const playgroundEditorContainer = document.getElementById('playground-editor-container');

    const playgroundEditor = CodeMirror(playgroundEditorContainer, {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
    });

    tutorialTabBtn.addEventListener('click', () => {
        tutorialView.style.display = 'block';
        playgroundView.style.display = 'none';
        tutorialTabBtn.classList.add('active');
        playgroundTabBtn.classList.remove('active');
    });

    playgroundTabBtn.addEventListener('click', () => {
        tutorialView.style.display = 'none';
        playgroundView.style.display = 'block';
        tutorialTabBtn.classList.remove('active');
        playgroundTabBtn.classList.add('active');
    });

    playgroundRunBtn.addEventListener('click', () => {
        const userCode = playgroundEditor.getValue();
        let capturedOutput = '';
        playgroundOutputEl.style.color = '';


        try {
            eval(userCode);
            playgroundOutputEl.textContent = capturedOutput || 'Code executed without errors.';
        } catch (e) {
            playgroundOutputEl.textContent = `Error: ${e.message}`;
            playgroundOutputEl.style.color = 'red';
        } finally {
        }
    });
});
