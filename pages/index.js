import React, { useEffect, useState } from 'react';
// import { signOut } from '../utils/auth';
// mport { useAuth } from '../utils/context/authContext';
import { getRecipes } from '../API/recipeData';
import RecipeCard from '../components/recipeCard';

function Home() {
  const [recipes, setRecipes] = useState([]);
  // const { user } = useAuth();
  const getAllTheRecipes = () => {
    getRecipes().then(setRecipes);
  };
  useEffect(() => {
    getAllTheRecipes();
  }, []);
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
