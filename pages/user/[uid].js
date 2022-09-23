/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserRecipes } from '../../API/recipeData';
import RecipeCard from '../../components/RecipeCard';
// import { useAuth } from '../../utils/context/authContext';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const { uid } = router.query;
  const getAllTheRecipes = () => {
    getUserRecipes(uid).then(setRecipes);
  };

  const titleName = recipes.find((item) => item.uid === uid);

  useEffect(() => {
    getAllTheRecipes();
  }, [uid]);
  return (
    <div className="text-center my-4">
      <h1>{titleName?.userName}</h1>
      <div className="d-flex flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getAllTheRecipes} />
        ))}
      </div>

    </div>
  );
}
