import { useState, useEffect } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";
import { cookiesClient } from "../api-client";


export const AuthContext = createContext();

const checkAuthentication = async () => {
  /* Checks when app first renders and throws an initial error. Handle this. */
  try {
    const resp = await cookiesClient.get('authenticated/');
    // console.log('authenticated response:', resp);
    if (resp.data.isAuthenticated === 'success') {
      // console.log('is authenticated success?', resp.data.isAuthenticated);
      return resp;
    }
  } catch (error) {
    console.log(error);
  }
};

export const AuthProvider = ({ children }) => {
  const { data, isLoading, isError, error } = useQuery('authProvider', checkAuthentication);

  const user = data?.data.user || null;
  const isAuthenticated = data?.data.isAuthenticated;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};