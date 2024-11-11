document.getElementById('search-btn').addEventListener('click', function () {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const recipeTitle = document.querySelector('.recipe-info h2').innerText.toLowerCase();

    if (recipeTitle.includes(searchTerm)) {
        alert('Recipe found: ' + recipeTitle);
    } else {
        alert('Recipe not found.');
    }
});