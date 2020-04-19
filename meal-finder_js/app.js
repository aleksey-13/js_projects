const searchInput = document.getElementById("search");
const submitBtn = document.getElementById("submit");
const randomBtn = document.getElementById("random");

const mealsEl = document.getElementById("meals");
const resultHeadingEl = document.getElementById("result-heading");
const singleMealEl = document.getElementById("single-meal");

function getRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then(({ meals }) => {
      resultHeadingEl.innerHTML = "";
      mealsEl.innerHTML = "";
      addMealToDOM(meals[0]);
    })
    .catch((e) => console.log(e));
}

async function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  singleMealEl.innerHTML = "";
  const term = searchInput.value;
  if (term.trim() !== "") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await response.json();

    resultHeadingEl.innerHTML = `<h2>Search results for ${term}</h2>`;

    if (data.meals === null) {
      resultHeadingEl.innerHTML = `<p>There are no search results. Try again</p>`;
    } else {
      const meals = data.meals
        .map(
          (meal) => `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>`
        )
        .join("");
      mealsEl.innerHTML = meals;

      searchInput.value = "";
    }
  } else {
    console.log("Please enter a search term");
  }
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const ingredientsList = ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join(" ");

  singleMealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>${ingredientsList}</ul>
        </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', getRandomMeal)

submitBtn.addEventListener("submit", searchMeal);
randomBtn.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) =>
    item.classList ? item.classList.contains("meal-info") : false
  );

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");

    getMealById(mealID);
  }
});
