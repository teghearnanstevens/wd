document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const menu = document.querySelector(".menu");

    // Toggle Menu
    function toggleMenu() {
        menu.classList.toggle("hide");
    }

    menuButton.addEventListener("click", toggleMenu);

    function handleResize() {
        if (window.innerWidth > 1000) {
            menu.classList.remove("hide");
        } else {
            menu.classList.add("hide");
        }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    // Template for Viewer
    function viewerTemplate(src, alt) {
        return `
            <div class="viewer">
                <button class="close-viewer">X</button>
                <img src="${src}" alt="${alt}">
            </div>
        `;
    }

    // Handle click on an image to show in viewer
    function viewHandler(event) {
        const target = event.target;

        if (target.tagName === 'IMG') { // Only proceed if an image is clicked
            const existingViewer = document.querySelector(".viewer");
            if (existingViewer) {
                existingViewer.remove();
            }

            // Get the full image src if available, otherwise use the clicked image's src
            const fullSrc = target.getAttribute("data-full-src") || target.src;
            const altText = target.alt;

            const viewerHTML = viewerTemplate(fullSrc, altText);
            document.body.insertAdjacentHTML("afterbegin", viewerHTML);

            const closeButton = document.querySelector(".close-viewer");
            closeButton.addEventListener("click", closeViewer);
        }
    }

    // Attach the click event to the gallery
    const gallery = document.querySelector(".container"); // Assuming your images are in a div with class 'container'
    if (gallery) {
        gallery.addEventListener("click", viewHandler);
    }

    // Close the viewer
    function closeViewer() {
        const viewer = document.querySelector(".viewer");
        if (viewer) {
            viewer.remove();
        }
    }
});