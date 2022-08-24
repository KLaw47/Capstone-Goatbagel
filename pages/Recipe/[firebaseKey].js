/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewRecipeDetails from '../../API/mergedData';

export default function ViewRecipeDetail() {
  const [recipeDetail, setRecipeDetail] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewRecipeDetails(firebaseKey).then(setRecipeDetail);
  }, []);
  console.warn(recipeDetail);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={recipeDetail.image} alt={recipeDetail.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {recipeDetail.name}
        </h5>
        <p>
          {recipeDetail.directions}
        </p>
      </div>
    </div>
  );
}
