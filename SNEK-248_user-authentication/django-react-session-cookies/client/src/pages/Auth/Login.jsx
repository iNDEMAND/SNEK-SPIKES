import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { cookiesClient } from "../../api-client";
import FormInput from "../../components/FormInput/FormInput";
import useCsrfToken from "../../hooks/useCsrfToken";

import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    // username: '',
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const LOGIN_USER_INPUTS = [
    // {
    //   id: 1,
    //   name: 'username',
    //   type: 'text',
    //   placeholder: 'Username',
    //   errorMessage: 'Username should be between 3-16 characters long and should not include special characters.',
    //   label: 'Username',
    //   pattern: '^[A-Za-z0-9]{3,16}$',
    //   required: true,
    // },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Please provide a valid email addresss.',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character.",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    }
  ];

  /* Sets cookie for login */
  useCsrfToken();

  // const [cookies] = useCookies(['csrftoken']);
  // console.log('csrf cookie?', cookies);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const splitEmail = values.email.split('@');
      const username = splitEmail[0];
      const emailDomain = splitEmail[1];  // can be used to validate email domain
      const properDomain = 'cookies.com';

      if (emailDomain === properDomain) {
        /* Call api to login */
        const csrfToken = document.cookie.split('=')[1];
        const body = {
          username,
          password: values.password,
        };
        const config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
          }
        };
        const resp = await cookiesClient.post('login/', body, config);
        if (resp.data.success) {
          /* Redirect to Home page */
          // navigate('/');
          window.location.pathname = '/';
        } else if (resp.data.error) {
          setErrorMsg(resp.data.error);
        }
      } else {
        setErrorMsg('Invalid email domain given.');
      }

    } catch (error) {
      console.log('error', error);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h2>User Login</h2>
        {errorMsg && (
          <p style={{ color: 'red', marginTop: '18px' }}>{errorMsg}</p>
        )}
        {LOGIN_USER_INPUTS.map((input) => {
          return (
            <FormInput
              key={input.id}
              value={values[input.name]}
              onChange={onChange}
              {...input}
            />
          );
        })}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;