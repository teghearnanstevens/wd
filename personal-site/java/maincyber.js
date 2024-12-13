import { articles } from './site.js';

// JavaScript to display articles and add search functionality
document.addEventListener("DOMContentLoaded", () => {
    const articleContainer = document.querySelector(".article-container");
    const searchBar = document.querySelector("#search-bar");
    const searchButton = document.querySelector("#search-btn");

    // Function to render an article card
    function renderArticle(article) {
        const card = document.createElement("div");
        card.classList.add("article-card");

        card.innerHTML = `
            <img src="${article.image}" alt="${article.name}" class="article-img">
            <div class="article-info">
                <div class="tags">${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                <h2>${article.name}</h2>
                <p class="description">${article.description}</p>
                <p class="author"><strong>By:</strong> ${article.author}</p>
                <p class="date"><strong>Published:</strong> ${article.datePublished}</p>
            </div>
        `;

        articleContainer.appendChild(card);
    }

    // Function to display filtered articles
    function displayArticles(filteredArticles) {
        articleContainer.innerHTML = ""; // Clear existing articles
        filteredArticles.forEach(article => renderArticle(article));
    }

    // Initial rendering of all articles
    displayArticles(articles);

    // Search functionality
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.trim().toLowerCase();
        console.log("Search query:", query); // Debug log
    
        const filteredArticles = articles.filter(article =>
            article.name.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.toLowerCase().includes(query))
        );
    
        console.log("Filtered articles:", filteredArticles); // Debug log
        displayArticles(filteredArticles);
    });
    

    // Optional: Add search functionality to the button (if a button is included)
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const query = searchBar.value.trim().toLowerCase();
            const filteredArticles = articles.filter(article =>
                article.name.toLowerCase().includes(query) ||
                article.description.toLowerCase().includes(query) ||
                article.tags.some(tag => tag.toLowerCase().includes(query))
            );
            displayArticles(filteredArticles);
        });
    }
});