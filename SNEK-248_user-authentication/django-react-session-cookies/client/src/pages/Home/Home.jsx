import React from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import './home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  // console.log('user - <Home/>:', user);

  return (
    <section id='homeContainer'>
      <h1>Cookie Sessions</h1>
      {user && <p id="welcomeMsg">Welcome <span style={{ color: 'var(--secondary-color)' }}>{user}</span>!</p>}

      {user
        ? (
          <p id="loggedInMsg">Logged in!</p>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )
      }
    </section>
  );
};

export default Home;