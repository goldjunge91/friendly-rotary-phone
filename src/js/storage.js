export function saveProgress(progress) {
    try {
        localStorage.setItem('progress', JSON.stringify(progress));
    } catch (e) {
        console.error("Failed to save progress:", e);
    }
}

export function loadProgress() {
    try {
        const progress = localStorage.getItem('progress');
        return progress ? JSON.parse(progress) : null;
    } catch (e) {
        console.error("Failed to load progress:", e);
        return null;
    }
}
