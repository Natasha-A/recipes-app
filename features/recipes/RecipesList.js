import React from "react";
import { useSelector } from "react-redux";
import { View, Image, FlatList, Text, Button} from "react-native";
import { Link } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from "react-navigation";

const RecipeChildren = (navigation) => {
  const recipes = useSelector((state) => state.recipes);
  return (
    <View>
      {recipes.map((recipe) => (
        <View style={{borderWidth: 1, margin: 10}}>
          <Text>{recipe.title}</Text>
          <Text>{recipe.time}</Text>
          <Text>{recipe.servings}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: `${recipe.image}` }}
          />
          <Text>{`${recipe.description.substring(0,200)}...`}</Text>

          <Button title="View Recipe" onPress={() => navigation.navigate('SingleRecipePage', {recipeId:recipe.id})}></Button>
        </View>
      ))}
    </View>
  );
};

export const RecipesList = ({ navigation }) => {
  return (
    <View className="recipes-list">
        <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')}/>
        {RecipeChildren(navigation)}
    </View>
  );
};

export default RecipesList