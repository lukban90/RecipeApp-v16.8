import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import { async } from "q";

/** Main will handle the business logic for this app */
const Main = () => {
  const APP_ID = "eaa040f4";
  const APP_KEY = "c12debfb9fc629ffeb28001b15eec1f4";

  const [_recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.hits);
        setRecipes(data.hits);
      });
  };

  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" />
        <button className="search-button" type="sumbit">
          Search
        </button>
      </form>
      {_recipes.map(food => (
        <Recipe
          key={food.recipe.uri}
          title={food.recipe.label}
          ingredients={food.recipe.ingredients}
          calories={food.recipe.calories}
          image={food.recipe.image}
        />
      ))}
    </div>
  );
};

export default Main;
