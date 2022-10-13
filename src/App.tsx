import React from 'react';
import './App.css';
import Router from './common/router/Router';
import { I18nextProvider } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import i18n from './common/configs/i18n';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          autoClose={30000}
          limit={3}
          closeOnClick
          rtl={false}
        />
        <Router />
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
