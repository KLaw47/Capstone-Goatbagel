import { getRecipeYeast, getRecipeFlour, getSingleRecipe } from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey, yeastId, flourId) => new Promise((resolve, reject) => {
  Promise.all([getSingleRecipe(recipeFirebaseKey), getRecipeFlour(flourId), getRecipeYeast(yeastId)])
    .then(([recipeObj, flourArr, yeastArr]) => {
      resolve({ ...recipeObj, flour: flourArr, yeast: yeastArr });
    }).catch((error) => reject(error));
});

export default viewRecipeDetails;
