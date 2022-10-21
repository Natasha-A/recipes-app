import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './app/store'
import { AddRecipeForm } from './features/recipes/AddRecipeForm';
import { RecipesList } from './features/recipes/RecipesList'
import { SingleRecipePage } from './features/recipes/SingleRecipePage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    {/* <NavigationContainer> */}
      <View style={styles.container}>
        {/* <Stack.Navigator>
          <Stack.Screen name="ViewPost" component={SingleRecipePage}/>
        </Stack.Navigator> */}
          <AddRecipeForm/>
          <RecipesList/>
      </View>
    {/* </NavigationContainer> */}
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
