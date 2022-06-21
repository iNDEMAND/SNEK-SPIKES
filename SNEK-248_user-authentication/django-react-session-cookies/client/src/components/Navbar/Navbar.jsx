import React, { useContext } from 'react';
// import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { cookiesClient } from "../../api-client";
import { AuthContext } from "../../context/AuthProvider";
// import { useAuth } from "../../hooks/useAuth";
// import useCsrfToken from "../../hooks/useCsrfToken";
import './navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  // console.log('auth user in <Navbar/>?', auth);

  const handleLogout = async () => {
    const csrfToken = document.cookie.split('=')[1];
    // console.log('cookie in <Navbar/>?', csrfToken);
    const body = {
      withCredentials: true
    };

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    };

    await cookiesClient.post('logout/', body, config);
    // console.log('logout response:', resp);
    window.location.pathname = '/login';
  };

  return (
    <nav>
      <section>
        <Link to='/'>
          <h2 id="navTitle">
            Cookie Auth
          </h2>
        </Link>
        <Link to='/testAuth'>
          <h3>
            Test Auth
          </h3>
        </Link>
      </section>
      <section>

        {user
          ? (
            <ul>
              <li id='loggedInUser'>{user}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </ul>
          )

        }
      </section>
    </nav>
  );
};

export default Navbar;