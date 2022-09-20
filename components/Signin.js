/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column align-content-center"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <img className="signinLogo" src="/./images/goat.png" alt="goatbagel" />
      <h1>GOATbagel</h1>
      <h3>A unit conversion app</h3>
      <button type="button" className="nameLink" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
