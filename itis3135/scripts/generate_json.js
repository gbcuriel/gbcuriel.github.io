const jsonButton = document.getElementById('generateJsonBtn');
if (!jsonButton) {
    console.error('Generate JSON button not found!');
} else {
    jsonButton.addEventListener('click', (event) => {
        event.preventDefault();

        const form = document.getElementById('intro-form');
        const header = document.getElementById('form-header');
        if (!form || !header) {
            console.error('Form or header not found!');
            return;
        }

        const formData = {};

        formData.personalInfo = {
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            nickname: document.getElementById('nickname').value,
            lastName: document.getElementById('lastName').value
        };

        const fileInput = document.getElementById('picture');
        formData.mascotAndPicture = {
            mascotAdjective: document.getElementById('mascotAdjective').value,
            mascotAnimal: document.getElementById('mascotAnimal').value,
            divider: document.getElementById('divider').value,
            pictureFile: fileInput.files.length > 0 ? fileInput.files[0].name : "No file selected",
            pictureCaption: document.getElementById('pictureCaption').value
        };

        const bullets = document.querySelectorAll('input[name="mainBullets[]"]');
        formData.details = {
            personalStatement: document.getElementById('personalStatement').value,
            mainBullets: Array.from(bullets).map((bullet) => bullet.value)
        };

        const courseInputs = document.querySelectorAll('#courses-container input');
        formData.courses = Array.from(courseInputs).map((input) => input.value);
        if (formData.courses.length === 0) {
            formData.courses.push("No courses added via script.");
        }

        formData.miscellaneous = {
            quote: document.getElementById('quote').value,
            quoteAuthor: document.getElementById('quoteAuthor').value,
            funnyThing: document.getElementById('funnyThing').value,
            anythingElse: document.getElementById('anythingElse').value
        };

        const links = document.querySelectorAll('input[name="links[]"]');
        formData.links = Array.from(links).map((link) => link.value);

        formData.acknowledgment = {
            statement: document.getElementById('acknowledgment').value,
            date: document.getElementById('ackDate').value
        };

        const jsonString = JSON.stringify(formData, null, 2);

        header.textContent = 'Introduction HTML';

        const escapedJsonString = jsonString
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const newHtmlContent = `
            <section class="json-output">
                <h3>Introduction JSON</h3>
                <p>You can select and copy the code block below.</p>
                <pre><code class="language-json">${escapedJsonString}</code></pre>
            </section>
        `;

        form.style.display = 'none';

        const outputContainer = document.getElementById('output-container');
        if (outputContainer) outputContainer.style.display = 'none';

        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) restartBtn.style.display = 'none';

        form.insertAdjacentHTML('afterend', newHtmlContent);

        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        } else {
            console.error('Highlight.js library not found.');
        }
    });
}

