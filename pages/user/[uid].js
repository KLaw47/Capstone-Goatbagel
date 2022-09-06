import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserRecipes } from '../../API/recipeData';
import RecipeCard from '../../components/RecipeCard';
// import { useAuth } from '../../utils/context/authContext';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    getUserRecipes(uid).then(setRecipes);
  }, [uid]);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.firebaseKey} recipeObj={recipe} onUpdate={getUserRecipes} />
        ))}
      </div>

    </div>
  );
}
