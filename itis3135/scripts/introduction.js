document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('intro-form');
    const clearButton = document.getElementById('clear-btn');
    const addCourseButton = document.getElementById('add-course-btn');
    const coursesContainer = document.getElementById('courses-container');
    const outputContainer = document.getElementById('output-container');
    const restartButton = document.getElementById('restart-btn');
    const imagePreview = document.getElementById('image-preview');
    const imageInput = document.getElementById('picture');
    const ackDateInput = document.getElementById('ackDate');
    const formHeader = document.querySelector('main h3');
    const defaultImageSrc = imagePreview.src;

    function clearAllFields() {
        form.querySelectorAll('input[type="text"], input[type="url"], input[type="date"], textarea').forEach((input) => {
            input.value = '';
        });
        imageInput.value = '';
        imagePreview.style.display = 'none';
    }

    function updateImagePreview() {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    function generateOutput(data) {
        const fullName = `${data.firstName} ${data.middleName || ''} ${data.lastName}`.replace(/\s+/g, ' ');
        const nickname = data.nickname ? `(${data.nickname})` : '';
        const bulletsHtml = data.mainBullets.map((bullet) => `<li>${bullet}</li>`).join('');
        const linksHtml = data.links.map((link) => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('');
        const coursesHtml = data.courses.map((course) => `
            <li>
                <strong>${course.dept} ${course.num}: ${course.name}</strong>
                <p>${course.reason}</p>
            </li>
        `).join('');

        const outputHTML = `
            <h1>Introduction: ${fullName} ${nickname}</h1>
            <h2>${data.mascotAdjective} ${data.mascotAnimal}</h2>
            <img src="${imagePreview.src}" alt="${data.pictureCaption}" style="max-width: 250px; border-radius: 8px; margin-bottom: 10px;">
            <p class="image-caption"><em>${data.pictureCaption}</em></p>
            <p>${data.personalStatement}</p><hr>
            <ul>${bulletsHtml}</ul><hr>
            <div class="course-list">
                <h2>Courses I'm Taking</h2>
                <ul>${coursesHtml}</ul>
            </div><hr>
            <blockquote>
                <p>"${data.quote}"</p>
                <footer>— ${data.quoteAuthor}</footer>
            </blockquote>
            ${data.funnyThing ? `<h3>Funny Thing That Happened</h3><p>${data.funnyThing}</p>` : ''}
            ${data.anythingElse ? `<h3>Something I'd Like to Share</h3><p>${data.anythingElse}</p>` : ''}
            ${linksHtml ? `<h3>My Links</h3><ul>${linksHtml}</ul>` : ''}<hr>
            <p><strong>Acknowledgement:</strong> ${data.acknowledgment}</p>
            <p><em>Date: ${data.ackDate}</em></p>
        `;

        outputContainer.innerHTML = outputHTML;
        form.classList.add('hidden');
        formHeader.classList.add('hidden');
        outputContainer.classList.remove('hidden');
        restartButton.classList.remove('hidden');
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.mainBullets = formData.getAll('mainBullets[]');
        data.links = formData.getAll('links[]').filter((link) => link.trim() !== '');
        const depts = formData.getAll('courseDept[]');
        const nums = formData.getAll('courseNum[]');
        const names = formData.getAll('courseName[]');
        const reasons = formData.getAll('courseReason[]');
        data.courses = depts.map((dept, index) => ({
            dept: dept,
            num: nums[index],
            name: names[index],
            reason: reasons[index]
        }));
        generateOutput(data);
    }

    function restartForm() {
        outputContainer.classList.add('hidden');
        restartButton.classList.add('hidden');
        form.classList.remove('hidden');
        formHeader.classList.remove('hidden');
        form.reset();
        ackDateInput.valueAsDate = new Date();
        imagePreview.src = defaultImageSrc;
        imagePreview.style.display = 'block';
    }

    function addCourseBlock() {
        const courseId = Date.now();
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course-entry';
        courseDiv.innerHTML = `
            <button type="button" class="delete-course-btn" title="Delete Course">X</button>
            <label for="courseDept-${courseId}">Department *</label>
            <input type="text" id="courseDept-${courseId}" name="courseDept[]" placeholder="e.g., CSCI" required>
            <label for="courseNum-${courseId}">Number *</label>
            <input type="text" id="courseNum-${courseId}" name="courseNum[]" placeholder="e.g., 101" required>
            <label for="courseName-${courseId}">Name *</label>
            <input type="text" id="courseName-${courseId}" name="courseName[]" placeholder="e.g., Intro to Programming" required>
            <label for="courseReason-${courseId}">Reason for Taking *</label>
            <textarea id="courseReason-${courseId}" name="courseReason[]" rows="2" placeholder="e.g., It's a required course for my major." required></textarea>
        `;
        coursesContainer.appendChild(courseDiv);
    }

    function handleDeleteCourse(e) {
        if (e.target.classList.contains('delete-course-btn')) {
            e.target.closest('.course-entry').remove();
        }
    }

    form.addEventListener('submit', handleFormSubmit);
    clearButton.addEventListener('click', clearAllFields);
    addCourseButton.addEventListener('click', addCourseBlock);
    coursesContainer.addEventListener('click', handleDeleteCourse);
    restartButton.addEventListener('click', restartForm);
    imageInput.addEventListener('change', updateImagePreview);
    form.addEventListener('reset', () => {
        setTimeout(() => {
            imagePreview.src = defaultImageSrc;
            imagePreview.style.display = 'block';
        }, 0);
    });

    ackDateInput.valueAsDate = new Date();
    addCourseBlock();
    addCourseBlock();
});