import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import store from './app/store'
import { AddRecipeForm } from './features/recipes/AddRecipeForm';
import { RecipesList } from './features/recipes/RecipesList'
import { SingleRecipePage } from './features/recipes/SingleRecipePage';
import { EditRecipeForm } from './features/recipes/EditRecipeForm';
import { composeWithDevTools } from "redux-devtools-extension";

const Stack  = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
     <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={RecipesList}
            options={
              {title: "My Recipes"}
            }
            />
          <Stack.Screen 
            name="AddRecipe"
            component={AddRecipeForm}
            options={
              {title: "Add Recipe"}
            }
          />
           <Stack.Screen 
            name="SingleRecipePage"
            component={SingleRecipePage}
            options={
              {title: "View Recipe"}
            }
          />
          <Stack.Screen
            name="EditRecipe"
            component={EditRecipeForm}
            options={
              {title: "Edit Recipe"}
            }
          />
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
