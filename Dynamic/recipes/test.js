import { recipes } from './recipes.mjs';

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe() {
    return recipes[random(recipes.length)];
}

function recipeTemplate(recipe) {
    return `<div class="recipe-card">
        <img id="recipe-img" src="${recipe.image}" alt="Image of ${recipe.name}">
        <div class="recipe-info">
            <div class="tags">
                ${tagsTemplate(recipe.tags)}
            </div>
            <h2>${recipe.name}</h2>
            <div class="rating">
                ${ratingTemplate(recipe.rating)}
            </div>
            <p class="description">${recipe.description}</p>
        </div>
    </div>`;
}

function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += i <= rating 
            ? `<span aria-hidden="true" class="icon-star">⭐</span>` 
            : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
    html += `</span>`;
    return html;
}

function renderRecipes(recipeList) {
    const recipeContainer = document.querySelector(".recipe-container");
    recipeContainer.innerHTML = recipeList.map(recipeTemplate).join('');
}

function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            const lowerQuery = query.toLowerCase();
            return (
                recipe.name.toLowerCase().includes(lowerQuery) ||
                recipe.description.toLowerCase().includes(lowerQuery) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}

function init() {
    const randomRecipe = getRandomRecipe();
    renderRecipes([randomRecipe]);
}

document.querySelector("#search-btn").addEventListener("click", event => {
    event.preventDefault(); // Prevent page reload
    const query = document.querySelector("#search-bar").value.trim(); // Get user input
    const filteredRecipes = filterRecipes(query); // Filter recipes
    if (filteredRecipes.length > 0) {
        renderRecipes(filteredRecipes); // Render filtered recipes
    } else {
        // Handle no results
        const recipeContainer = document.querySelector(".recipe-container");
        recipeContainer.innerHTML = `<p>No recipes found. Try searching for something else!</p>`;
    }
});

init();

