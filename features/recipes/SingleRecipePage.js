import React from "react";
import { useSelector } from "react-redux";

export const SingleRecipePage = ({ route }) => {
  const { recipeId } = "hi"; // route.params

  // check if IDs match and returns the value
  const recipe = useSelector((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  if (!recipe) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{recipe.title}</h2>
        <p className="post-content">{recipe.description}</p>
      </article>
    </section>
  );
};
