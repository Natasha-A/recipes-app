import React from "react";
import { useSelector } from "react-redux";
import { View, Image, FlatList, Text } from "react-native";

export const RecipeChild = () => {
  const recipes = useSelector((state) => state.recipes);
  return (
    <View>
      {recipes.map((recipe) => (
        <View>
          <Text>{recipe.title}</Text>
          <Text>{recipe.time}</Text>
          <Text>{recipe.servings}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: `${recipe.image}` }}
          />
          <Text>{recipe.description}</Text>

          {
            recipe.ingredients.map((ingredient,index) => (
              <Text>{index+1}. {ingredient.raw_text}</Text>
            ))
          }

        </View>
      ))}
    </View>
  );
};

export const RecipesList = () => {
  // const renderedRecipes = recipes.map(recipe =>
  //   <View>
  //     <Text>{recipe.title}</Text>
  //     <Text>{recipe.time}</Text>
  //     <Text>{recipe.servings}</Text>
  //   <Image
  //     style={{width: 200, height: 200}}
  //     source={{uri: `${recipe.image}`,}}/>
  //     <Text>{recipe.description}</Text>

  //     {recipe.ingredients.map(ingredient => {
  //       <Text>{ingredient}</Text>
  //     })}
  //   </View>
  // )

  return (
    <View className="recipes-list">
      <Text>Recipes</Text>
      <RecipeChild />
    </View>
  );
};
