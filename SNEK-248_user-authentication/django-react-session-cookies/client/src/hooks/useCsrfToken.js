import { useEffect, useState } from "react";
import { cookiesClient } from "../api-client";

const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const getCookie = async () => {
      try {
        await cookiesClient.get('csrf/');
        let cookie = document.cookie;
        if (cookie) {
          cookie = cookie.split('=')[1];
          setCsrfToken(cookie);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCookie();
  }, []);
  // console.log('csrfToken?', csrfToken);
  return csrfToken;
};

export default useCsrfToken;