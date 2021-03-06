const apiAddress = 'http://www.recipepuppy.com/api/';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');
const customize = document.querySelectorAll('[type=checkbox]');

function checkIgredients() {
    let url = '?i=';
    customize.forEach(checkbox => {
        if(checkbox.checked) {
            url += checkbox.id;
            console.log(url);
        }
    });
    return url;
}

async function getRecipes(plate) {
    console.log('getRecipes');
    const ingredients = checkIgredients();
    const query = `${proxy}${apiAddress}${ingredients}&q=${plate}`;
    const rawData = await fetch(query);
    const results = await rawData.json();
    return results;
}

function displayData(recipes) {
    const html = recipes.map(recipe =>
        `<div class="recipe">
            <h2>${ recipe.title }</h2>
            <p>${ recipe.ingredients}</p>
            <a href="${ recipe.href }">See the recipe</a>
        </div>`
    );
    recipesGrid.innerHTML = html.join('');

}

async function handleQuery(event) {
    event.preventDefault();
    const q = form.query.value;
    console.log(q);
    form.submit.disabled = true;
    const data = await getRecipes(q);
    console.log(data);
    form.submit.disabled = false;
    displayData(data.results);
}

form.addEventListener('submit', handleQuery);
