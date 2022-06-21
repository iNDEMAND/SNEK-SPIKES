import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { cookiesClient } from "../../api-client";
import useCsrfToken from "../../hooks/useCsrfToken";
import FormInput from "../../components/FormInput/FormInput";
import './auth.css';

const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const REGISTER_USER_INPUTS = [
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
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character.",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match.",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  /* Sets cookie for registering a user */
  useCsrfToken();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submitted form', values);

    const splitEmail = values.email.split('@');

    const userObj = {
      email: values.email,
      username: splitEmail[0],
      password: values.password,
      confirm_password: values.confirmPassword
    };

    // console.log('userObj?', userObj);

    if (splitEmail[1] !== 'cookies.com') {
      console.error('Registered with an incorrect email.');
    } else {
      const csrfToken = document.cookie.split('=')[1];

      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        }
      };

      const resp = await cookiesClient.post('register/', userObj, config);
      if (resp.data.success) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h2>Register New User</h2>
        {REGISTER_USER_INPUTS.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          );
        })}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;