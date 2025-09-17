function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    updateDynamicContent();
}

function updateDynamicContent() {
    const titlePlaceholder = document.getElementById("page-title-placeholder");

    if (titlePlaceholder && document.title) {
        const fullTitle = document.title;
        const titleParts = fullTitle.split(' | ');
        const pageSpecificTitle = titleParts[titleParts.length - 1];
        titlePlaceholder.textContent = pageSpecificTitle;
    }
}