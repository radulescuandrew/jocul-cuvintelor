import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../../pages/landing/Landing';
import Layout from '../containers/Layout';

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout />
          }
        >
          <Route
            index
            element={
              <Landing />
            }
          ></Route>
        </Route>

        {/* Wild Card */}
        <Route path="*" element={<Navigate to={'/'}></Navigate>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
