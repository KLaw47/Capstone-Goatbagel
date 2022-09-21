import React, { useEffect, useState } from 'react';
import { getRecipes } from '../API/recipeData';
import RecipeCard from '../components/RecipeCard';
import Search from '../components/Search';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  // const { user } = useAuth();
  const getAllTheRecipes = () => {
    getRecipes().then((recArr) => {
      setRecipes(recArr);
      setFilteredRecipes(recArr);
    });
  };

  useEffect(() => {
    getAllTheRecipes();
  }, []);
  // console.warn(recipes);
  return (
    <>
      <div className="text-center my-4">
        <Search recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
        <div className="d-flex flex-wrap">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getAllTheRecipes} />
          ))}
        </div>

      </div>
    </>
  );
}

export default Home;
