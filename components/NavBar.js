/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import UserProfile from './Modal';
import { useAuth } from '../utils/context/authContext';

// import { signOut } from '../utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>GOATbagel</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Recipes</Nav.Link>
            </Link>
            <Link passHref href={`${user.uid}`}>
              <Nav.Link>My Recipes</Nav.Link>
            </Link>
            <Link passHref href="/Recipe/newRecipe">
              <Nav.Link>Create Recipe</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <UserProfile />
      </Container>
    </Navbar>
  );
}
