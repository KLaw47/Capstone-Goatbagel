/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRecipe } from '../../API/recipeData';
import viewRecipeDetails from '../../API/mergedData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewRecipeDetail() {
  const [recipeDetail, setRecipeDetail] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeDetail.name}?`)) {
      deleteRecipe(recipeDetail.firebaseKey).then(router.push('/'));
    }
  };

  useEffect(() => {
    viewRecipeDetails(firebaseKey).then(setRecipeDetail);
  }, []);
  // console.warn(recipeDetail);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={recipeDetail.image} alt={recipeDetail.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {recipeDetail.name}
        </h5>
        <p>Salt: {recipeDetail.saltAmount} Grams</p>
        <p>Water: {recipeDetail.water} Grams</p>
        <p>Flour: {recipeDetail.flourAmount} Grams</p>
        <p>Yeast: {recipeDetail.yeastAmount} Grams</p>
      </div>
      <div>
        {recipeDetail.directions}
        <>
          <Link href={`/user/${recipeDetail.uid}`} passHref>
            <Button variant="info">{recipeDetail.userName}</Button>
          </Link>
        </>
        {recipeDetail.uid === user.uid ? (
          <>
            <Link href={`/Recipe/edit/${recipeDetail.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisRecipe} className="m-2">
              DELETE
            </Button>
          </>
        ) : ''}
      </div>
    </div>
  );
}
