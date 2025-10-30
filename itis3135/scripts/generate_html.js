const getVal = (id) => {
    const el = document.getElementById(id);
    if (el && typeof el.value === 'string') {
        return el.value.trim();
    }
    return '';
};

const getSelectorVal = (entry, selector) => {
    const el = entry.querySelector(selector);
    if (el && typeof el.value === 'string') {
        return el.value.trim();
    }
    return '';
};

const getVals = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]`)).map((input) => input.value.trim());

const getCourses = () => {
    const courseEntries = document.querySelectorAll('.course-entry');
    return Array.from(courseEntries).map((entry) => {
        const department = getSelectorVal(entry, 'input[name="courseDept[]"]');
        const number = getSelectorVal(entry, 'input[name="courseNum[]"]');
        const name = getSelectorVal(entry, 'input[name="courseName[]"]');
        const reason = getSelectorVal(entry, 'textarea[name="courseReason[]"]');
        return { department, number, name, reason };
    });
};

const escapeHTML = (str) => {
    if (typeof str !== 'string') {
        return '';
    }
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

const htmlBtn = document.getElementById('generate-html-btn');
if (htmlBtn) {
    htmlBtn.addEventListener('click', () => {

        const personalInfo = {
            firstName: getVal('firstName'),
            middleName: getVal('middleName'),
            nickname: getVal('nickname'),
            lastName: getVal('lastName')
        };

        const pictureInput = document.getElementById('picture');
        const pictureFileName = (pictureInput && pictureInput.files && pictureInput.files.length > 0) ? pictureInput.files[0].name : 'images/mexico_trip.jpg';

        const mascotAndPicture = {
            mascotAdjective: getVal('mascotAdjective'),
            mascotAnimal: getVal('mascotAnimal'),
            divider: getVal('divider'),
            pictureFile: pictureFileName,
            pictureCaption: getVal('pictureCaption')
        };

        const details = {
            personalStatement: getVal('personalStatement'),
            mainBullets: getVals('mainBullets[]')
        };

        const courses = getCourses();

        const miscellaneous = {
            quote: getVal('quote'),
            quoteAuthor: getVal('quoteAuthor'),
            funnyThing: getVal('funnyThing'),
            anythingElse: getVal('anythingElse')
        };

        const links = getVals('links[]');
        const acknowledgment = { date: getVal('ackDate') };

        const bulletsHTML = details.mainBullets.map((bullet) => `            <li>${escapeHTML(bullet)}</li>`).join('\n');

        const coursesHTML = courses
            .filter((course) => course.department || course.number || course.name || course.reason)
            .map((course) =>
                `        <li>
            <strong>${escapeHTML(course.department)} ${escapeHTML(course.number)} - ${escapeHTML(course.name)}</strong>
            <p>${escapeHTML(course.reason)}</p>
        </li>`
            ).join('\n') || '        <!-- No courses added -->';

        const linksHTML = links
            .filter((link) => link)
            .map((link) => {
                const safeLink = escapeHTML(link);
                return `            <li><a href="${safeLink}" target="_blank">${safeLink}</a></li>`;
            }).join('\n');

        const generatedHTML =
            `<h1>${escapeHTML(personalInfo.firstName)} ${escapeHTML(personalInfo.middleName)} ${escapeHTML(personalInfo.lastName)} (${escapeHTML(personalInfo.nickname)})</h1>
<h2>${escapeHTML(mascotAndPicture.mascotAdjective)} ${escapeHTML(mascotAndPicture.mascotAnimal)} ${escapeHTML(mascotAndPicture.divider)} ${escapeHTML(acknowledgment.date)}</h2>

<figure>
    <img src="${escapeHTML(mascotAndPicture.pictureFile)}" alt="My Picture" width="300">
    <figcaption>${escapeHTML(mascotAndPicture.pictureCaption)}</figcaption>
</figure>

<section>
    <h2>About Me</h2>
    <p>${escapeHTML(details.personalStatement)}</p>
    <ul>
${bulletsHTML}
    </ul>
</section>

<section>
    <h2>Courses</h2>
    <ul>
${coursesHTML}
    </ul>
</section>

<section>
    <h2>Links</h2>
    <ul>
${linksHTML}
    </ul>
</section>

<section>
    <h2>Quote</h2>
    <blockquote>
        <p>"${escapeHTML(miscellaneous.quote)}"</p>
        <footer>- ${escapeHTML(miscellaneous.quoteAuthor)}</footer>
    </blockquote>
</section>

${miscellaneous.funnyThing ? `
<section>
    <h2>Funny Thing</h2>
    <p>${escapeHTML(miscellaneous.funnyThing)}</p>
</section>
` : ''}

${miscellaneous.anythingElse ? `
<section>
    <h2>Anything Else</h2>
    <p>${escapeHTML(miscellaneous.anythingElse)}</p>
</section>
` : ''}
`;

        const form = document.getElementById('intro-form');
        const outputContainer = document.getElementById('output-container');
        const restartBtn = document.getElementById('restart-btn');
        const header = document.getElementById('form-header');

        if (form && outputContainer && restartBtn && header) {
            form.classList.add('hidden');

            outputContainer.innerHTML = `
                <div class="json-output">
                    <h3>Generated HTML Code</h3>
                    <p>You can copy the code block below.</p>
                    <pre><code class="language-html" id="html-code-output"></code></pre>
                </div>
            `;

            const codeOutput = document.getElementById('html-code-output');
            if (codeOutput) {
                codeOutput.textContent = generatedHTML;
                hljs.highlightElement(codeOutput);
            }

            outputContainer.classList.remove('hidden');
            restartBtn.classList.remove('hidden');

            header.textContent = 'Introduction HTML';
        } else {
            console.error("Could not find all necessary elements to display output.");
        }
    });
}

