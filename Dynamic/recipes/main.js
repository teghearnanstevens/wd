import { recipes } from './recipes.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.querySelector(".recipe-container");
    const searchBar = document.querySelector("#search-bar");
    const searchButton = document.querySelector("#search-btn");

    // Check if recipes were successfully imported
    if (!recipes || recipes.length === 0) {
        console.error("No recipes found!");
        return;
    }

    // Function to render a recipe card
    function renderRecipe(recipe) {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-img">
            <div class="recipe-info">
                <div class="tags">${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                <h2>${recipe.name}</h2>
                <div class="rating">${'★'.repeat(recipe.rating)}</div>
                <p class="description">${recipe.description}</p>
            </div>
        `;

        recipeContainer.appendChild(card);
    }

    // Function to display filtered recipes
    function displayRecipes(filteredRecipes) {
        recipeContainer.innerHTML = ""; // Clear existing recipes
        filteredRecipes.forEach(recipe => renderRecipe(recipe));
    }

    // Initial rendering of all recipes
    displayRecipes(recipes);

    // Search functionality
    searchBar.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchBar.value.trim();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query.toLowerCase())
        );
        displayRecipes(filteredRecipes);
    });
});

