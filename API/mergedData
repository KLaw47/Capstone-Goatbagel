import { getRecipeYeast, getRecipeFlour, getSingleRecipe } from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleRecipe(recipeFirebaseKey), getRecipeFlour(recipeFirebaseKey), getRecipeYeast(recipeFirebaseKey)])
    .then(([recipeObj, flourArr, yeastArr]) => {
      resolve({ ...recipeObj, flour: flourArr, yeast: yeastArr });
    }).catch((error) => reject(error));
});

export default viewRecipeDetails;
