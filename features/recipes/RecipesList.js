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
          <Text>{`${recipe.description.substring(0,200)}...`}</Text>
          <Text>Ingredients:</Text>
           {
            recipe.ingredients.map((ingredient,index) => (
              <Text>{index+1}. {ingredient.raw_text}</Text>
            ))
          }
          {/* <Text>Steps:</Text>
          {
            recipe.instructions.map((text) => (
              <Text>{text.position}. {text.display_text}</Text>
            ))
          }  */}
        </View>
      ))}
    </View>
  );
};

export const RecipesList = () => {
  return (
    <View className="recipes-list">
      <Text>Recipes</Text>
      <RecipeChild />
    </View>
  );
};
