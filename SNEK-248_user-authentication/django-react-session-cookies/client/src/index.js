import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </CookiesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode >
);

