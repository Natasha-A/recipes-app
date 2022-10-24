import React, { useState } from "react";
import { recipeAdded } from "./recipeSlice";
import { nanoid } from '@reduxjs/toolkit';
import  { useDispatch } from 'react-redux'

export const AddRecipeForm = () => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("1 hour");
  const [servings, setServings] = useState("4 people");
  const [image, setImage] = useState(
    "https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
  );
  const [description, setDescription] = useState(
    "This is a recipe description."
  );
  const [ingredient, setIngredient] = useState(''); // store individual ingredient
  const [ingredients, setIngredients] = useState([]); // store all ingredients as array 

  const [instruction, setInstruction] = useState('')
  const [instructions, setInstructions] = useState([]); 

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTimeChanged = (e) => setTime(e.target.value);
  const onServingsChanged = (e) => setServings(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  // update ingredient form value 
  const onIngredientChanged = (e) => setIngredient(e.target.value);
    
  const onSubmitIngredient = function(e) {
    e.preventDefault();

    const ingredientObj = {raw_text: ingredient}

    setIngredients(ingredients.concat(ingredientObj))

    console.log(ingredients)
    setIngredient('')
  }

  const onSubmitInstruction = function(e) {
    e.preventDefault();

    const instructionObj = {display_text: instruction}

    setInstructions(instructions.concat(instructionObj))

    console.log(instructions)
    setInstruction('')
  }

  const onInstructionChanged = (e) => setInstruction(e.target.value);

  const onSaveRecipeClicked = () => {
      dispatch(
        recipeAdded({
          id:nanoid(),
          title, 
          time, 
          servings, 
          image,
          description,
          ingredients,
          instructions
        })
      )
      setTitle('');
      setTime('');
      setServings('');
      setDescription('');
      setIngredients([]);
      setInstructions([]);
  }

  return (
    <section>
      <form>
        <h2>Add a New Recipe</h2>
        <label htmlFor="recipeTitle">Recipe Title:</label>
        <input
          type="text"
          id="recipeTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>

        <label htmlFor="timeInfo">Time:</label>
        <input
          type="text"
          id="timeInfo"
          value={time}
          onChange={onTimeChanged}
        ></input>

        <label htmlFor="servingsInfo">Servings:</label>
        <input
          type="text"
          id="servingsInfo"
          value={servings}
          onChange={onServingsChanged}
        ></input>

        <label htmlFor="descriptionInfo">Description:</label>
        <input
          type="text"
          id="descriptionInfo"
          value={description}
          onChange={onDescriptionChanged}
        ></input>

        <label htmlFor="ingredientsInfo">Add Ingredient:</label>
        <input
          type="text"
          id="ingredientsInfo"
          value={ingredient}
          onChange={onIngredientChanged}
        ></input>
        <button type="button" onClick={onSubmitIngredient}>Add ingredient</button>

        <label htmlFor="stepsInfo">Add Step:</label>
        <input 
          type="text"
          id="stepsInfo"
          value={instruction}
          onChange={onInstructionChanged}
          >
        </input>
        <button type="button" onClick={onSubmitInstruction}>Add Step</button>

   
        <button type="button" onClick={onSaveRecipeClicked}>Save Post</button>
      </form>
    </section>
  );
};
