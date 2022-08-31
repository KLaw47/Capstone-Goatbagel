/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewRecipeDetails from '../API/mergedData';

export default function ConvertRecipe() {
  const [recipeConvert, setRecipeConvert] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewRecipeDetails(firebaseKey).then(setRecipeConvert);
  }, []);

  return (
    <>
      {recipeConvert.flour}
    </>
  );
}
