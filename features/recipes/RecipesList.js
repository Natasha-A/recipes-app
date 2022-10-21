import React from "react";
import { useSelector } from "react-redux";
import { View, Image, FlatList, Text, Button} from "react-native";
import { Link } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from "react-navigation";



const RecipeChild = ( {navigation} ) => {
  const recipes = useSelector((state) => state.recipes);
  return (
    <View>
      {recipes.map((recipe) => (
        <View>
          {/* <Button title="View Post" onPress={() => navigation.navigate('ViewPost', {recipeId : `${recipe.id}`})}/> */}
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

export default withNavigation(RecipesList)