import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import "./Main.css";
import { async } from "q";

/** ABOUT:
 *
 *  Main will handle the business logic for this app
 *
 */
const Main = () => {
  const APP_ID = "eaa040f4";
  const APP_KEY = "c12debfb9fc629ffeb28001b15eec1f4";

  const [_recipes, setRecipes] = useState([]);
  const [_search, setSearch] = useState("");
  const [_query, setQuery] = useState("chicken");

  /** this will render when page opens,
   *  then render again when _query is updated from setSearch(),
   *  --check getSearch() for reference--
   */
  useEffect(() => {
    fetchRecipes();
  }, [_query]);

  /** fetch api with the given _query, APP_ID, and APP_KEY */
  const fetchRecipes = async () => {
    fetch(
      `https://api.edamam.com/search?q=${_query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.hits);
        setRecipes(data.hits);
      });
  };

  /** update _search value from input-value */
  const updateSearch = e => {
    const { value } = e.target;
    setSearch(value);
    console.log(_search);
  };

  /** set/update _query from setSearch(),
   *  once updated, useEffect() will re-render the page
   */
  const getSearch = e => {
    e.preventDefault(); //stop page refresh
    setQuery(_search);
    setSearch(""); // reset _search
  };

  return (
    <div className="Main">
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={_search}
          onChange={updateSearch}
        />
        <button className="search-button" type="sumbit">
          Search
        </button>
      </form>
      <div className="recipes">
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
    </div>
  );
};

export default Main;
