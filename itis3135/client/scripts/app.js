document.addEventListener('DOMContentLoaded', function () {

    const loadComponent = (url, placeholderId) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = html;
                }

                if (placeholderId === 'header-placeholder') {
                    initializeMobileMenu();
                }

            })
            .catch(error => {
                console.error(error);
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = `<p style="color: red; text-align: center;">Error: Could not load ${placeholderId.split('-')[0]}.</p>`;
                }
            });
    };

    loadComponent('components/nav.html', 'header-placeholder');

    loadComponent('components/footer.html', 'footer-placeholder');


    const initializeMobileMenu = () => {
        const toggleButton = document.getElementById('nav-toggle-btn');
        const linksContainer = document.getElementById('nav-links-container');

        if (toggleButton && linksContainer) {
            toggleButton.addEventListener('click', () => {
                linksContainer.classList.toggle('mobile-menu-open');
            });
        } else {
            console.error('Mobile menu elements (toggle button or links container) not found.');
        }
    };
});