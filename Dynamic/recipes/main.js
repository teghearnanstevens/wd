import { recipes } from './recipes.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.querySelector(".recipe-container");

    // Check if recipes were successfully imported
    if (!recipes || recipes.length === 0) {
        console.error("No recipes found!");
        return;
    }

    // Function to render a recipe card
    function renderRecipe(recipe) {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        // Corrected the image source reference
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

    // Loop through recipes and render them
    recipes.forEach(recipe => renderRecipe(recipe));
});
