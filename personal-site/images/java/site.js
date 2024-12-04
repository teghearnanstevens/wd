// Filter articles based on search input
function filterArticles() {
    const searchInput = document.getElementById("searchBar").value.toLowerCase();
    const articles = document.querySelectorAll(".news-article");

    articles.forEach(article => {
        const title = article.querySelector("h3").innerText.toLowerCase();
        if (title.includes(searchInput)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

// Toggle article expansion
function toggleArticle(article) {
    const content = article.querySelector(".news-content");
    const isExpanded = article.classList.contains("expanded");

    if (isExpanded) {
        article.classList.remove("expanded");
        content.style.display = "none";
    } else {
        article.classList.add("expanded");
        content.style.display = "block";
    }
}

// Article Modal Zoom

const articles = [
    {
        title: "Cyber security of a power grid: State-of-the-art",
        link: "https://www.sciencedirect.com/science/article/pii/S0142061517328946",
    },
    {
        title: "The recent trends in cyber security: A review",
        link: "https://www.sciencedirect.com/science/article/pii/S1319157821000203",
    },
    {
        title: "An Investigation on Cyber Security Threats and Security Models",
        link: "https://ieeexplore.ieee.org/abstract/document/7371499",
    },
];

// Show modal with article
function showArticle(index) {
    const modal = document.getElementById("articleModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalIframe = document.getElementById("modalIframe");

    modalTitle.textContent = articles[index].title;
    modalIframe.src = articles[index].link;
    modal.style.display = "block";
}

// Close modal
function closeModal() {
    const modal = document.getElementById("articleModal");
    modal.style.display = "none";
}
