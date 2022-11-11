
const APP_ID = "e9121c76";
const API_KEY = "56b9fc8ce334b4a7a762c9a5d815ab88";
const baseUrl = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}`


function loadRecipes(type = "paneer"){
    const url = baseUrl + `&q=${type}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data.hits))
        .catch((error) => console.log(error));
}

loadRecipes();

const renderRecipes = (recipeList)