import React, { useEffect, useState } from 'react';
import { getRecipes } from '../API/recipeData';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const [recipes, setRecipes] = useState([]);
  // const { user } = useAuth();
  const getAllTheRecipes = () => {
    getRecipes().then(setRecipes);
  };

  useEffect(() => {
    getAllTheRecipes();
  }, [recipes]);
  // console.warn(recipes);
  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getAllTheRecipes} />
        ))}
      </div>

    </div>
  );
}

export default Home;
