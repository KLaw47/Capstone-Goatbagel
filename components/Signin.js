import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>GOATbagel</h1>
      <h3>A unit conversion app</h3>
      <button type="button" className="nameLink" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
