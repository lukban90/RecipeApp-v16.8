import React from "react";
import style from "./recipe.module.css";

const Recipe = ({ title, ingredients, image, calories }) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <o1>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </o1>
      <p>{`Cal: ${Math.floor(calories)}`}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default Recipe;
