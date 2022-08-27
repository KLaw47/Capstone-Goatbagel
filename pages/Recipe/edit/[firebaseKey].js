import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRecipe } from '../../../API/recipeData';
import RecipeForm from '../../../components/forms/RecipeForm';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRecipe(firebaseKey).then(setEditItem);
  }, [firebaseKey]);
  return (<RecipeForm obj={editItem} />);
}
