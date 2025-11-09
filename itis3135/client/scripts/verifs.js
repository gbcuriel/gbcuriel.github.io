window.onload = () => {
    const VALID_IDS = ['KISER', 'CHARLOTTE', 'GLUTTON'];
    const inputElement = document.getElementById('search-input');
    const buttonElement = document.getElementById('search-button');
    const viewElement = document.getElementById('artifact-view');
    const messageBox = document.getElementById('message-box');

    const artifactIdDisplays = [
        document.getElementById('artifact-id-display'),
        document.getElementById('summary-id-display')
    ];
    const timestampElement = document.getElementById('timestamp');

    // --- UTILITY FUNCTION ---
    function updateArtifactContent(id) {
        artifactIdDisplays.forEach(el => el.textContent = id);
        timestampElement.textContent = new Date().toLocaleString();
    }

    // --- CORE LOGIC ---
    function handleSearch() {
        const userInput = inputElement.value.toUpperCase().trim();

        if (VALID_IDS.includes(userInput)) {
            viewElement.classList.add('viewer-unblurred');
            viewElement.setAttribute('data-overlay-text', 'ACCESS GRANTED');
            inputElement.classList.remove('border-red-500');

            updateArtifactContent(userInput);
            showMessage(`Access granted for Artifact ID: ${userInput}.`, 'success');

        } else {
            viewElement.classList.remove('viewer-unblurred');
            viewElement.setAttribute('data-overlay-text', 'ACCESS DENIED: UNAUTHORIZED');
            inputElement.classList.add('border-red-500');

            if (userInput.length > 0) {
                showMessage(`Error: ID '${userInput}' not found or invalid.`, 'error');
            } else {
                showMessage('Please enter an Artifact ID.', 'error');
            }
        }
    }

    // --- EVENT LISTENERS AND INITIALIZATION ---
    buttonElement.addEventListener('click', handleSearch);

    inputElement.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    });

    viewElement.classList.remove('viewer-unblurred');
    artifactIdDisplays.forEach(el => el.textContent = '[PENDING]');
};