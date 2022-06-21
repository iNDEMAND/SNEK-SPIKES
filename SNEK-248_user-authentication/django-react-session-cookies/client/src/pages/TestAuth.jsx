import React from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const TestAuth = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  // console.log(isAuthenticated, user);
  return (
    <div>
      <h2>TestAuth Context Page</h2>
      {isAuthenticated === 'success'
        ? (
          <p>
            User: {user} is authenticated.
          </p>

        ) : (
          <>
            <p>You are not authenticated, please log in.</p>
            <Link to='/login'>Login</Link>
          </>
        )
      }

    </div>
  );
};

export default TestAuth;