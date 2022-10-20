import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './app/store'
import { AddRecipeForm } from './features/recipes/AddRecipeForm';

import { RecipesList } from './features/recipes/RecipesList'


export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AddRecipeForm/>
        <RecipesList/>
      </Provider>
    </View>
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
