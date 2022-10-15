import React from 'react';
import { Outlet } from 'react-router-dom';

// Compoment that serves as the layout for the app. Everything will be rendered with a header and a side menu.
const Layout = () => {
  return (
    <div className="w-screen h-screen max-w-full">
      <div className="flex sm:p-6 p-4">
        <div className="content overflow-scroll w-full sm:pl-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
