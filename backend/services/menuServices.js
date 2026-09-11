async function getMenu() {
  const url =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch meals from TheMealDB");
  }

  const data = await response.json();

  if (!data.meals) {
    return [];
  }

  const menu = data.meals.slice(0, 10).map((meal, index) => {
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,

      category: "Vegetarian",

      description: "Vegetarian dish",

      price: Number((8.99 + index).toFixed(2)),
    };
  });

  return menu;
}

module.exports = {
  getMenu,
};