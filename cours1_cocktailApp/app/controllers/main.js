const root = document.getElementById('root');

const createElement = (type, classes, text = '') => {
    const element = document.createElement(type);
    element.classList.add(...classes);
    if (text !== '') {
        element.textContent = text;
    }
    root.appendChild(element);
    return element;
} 

const button = createElement('button', ['btn', 'btn-primary'], 'Click me!');

const getIngredients = (drink) => {
    let ingredients = [];
    for (const key in drink) {
        if (key.includes('strIngredient') && drink[key]) {
            ingredients.push(drink[key]);
        }
    }
    // make all ingredients unique
    ingredients = [...new Set(ingredients)];
    return ingredients;
}

const createCocktailCardContent = (image, name, subtitle, description, ingredients) => {
    let ingredientsList = `<ol class="list-group list-group-numbered">`
    for (const ingredient of ingredients) {
        ingredientsList += `<li class="list-group-item">${ingredient}</li>`
    }
    ingredientsList += `</ol>`

    return `
    <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${subtitle}</h6>
            <p>${description}</p>
            ${ingredientsList}
        </div>
    </div>`;
}

const getRadomCocktailInfo = async () => {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        randomCocktail = data.drinks[0];
        console.log(randomCocktail);
        return randomCocktail;
    } catch (error) {
        throw new Error("An error occured while fetching the cocktail data");
    }
}



const createRandomCocktailCard = async () => {
    try {
        cocktailInfo = await getRadomCocktailInfo();
        cardContent = createCocktailCardContent(
            cocktailInfo.strDrinkThumb,
            cocktailInfo.strDrink,
            cocktailInfo.strCategory,
            cocktailInfo.strInstructions,
            getIngredients(cocktailInfo));
        const cocktailCard = document.querySelector('.cocktailDiv');
        if (cocktailCard) {
            cocktailCard.innerHTML = cardContent;
            return;
        }
        div = createElement('div', ['cocktailDiv']);
        div.innerHTML = cardContent;
        root.appendChild(div);
    } catch (error) {
        alert(error);
    }
}

button.addEventListener('click', createRandomCocktailCard);

