const apiAddress = 'http://www.recipepuppy.com/api';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');


async function getRecipes(plate) {
    const query = `${proxy}${apiAddress}?q=${plate}`;
    const rawData = await fetch(query);
    const results = await rawData.json();
    return results;
}

function displayData(recipes) {
    const html = recipes.map(recipe =>
        `<div class="recipe">
            <h2>${ recipe.title }</h2>
            <p>${ recipe.ingredients}</p>
            ${ recipe.thumbnail &&
                `<img src="${ recipe.thumbnail }" alt="${ recipe.title }"/>`}
            <a href="${ recipe.href }">See the recipe</a>
        </div>`
    );
    recipesGrid.innerHTML = html.join('');

}

async function handleQuery(event) {
    event.preventDefault();
    const q = form.query.value;
    form.submit.disabled = true;
    const data = await getRecipes(q);
    console.log(data);
    form.submit.disabled = false;
    displayData(data.results);
}

form.addEventListener('submit', handleQuery);
