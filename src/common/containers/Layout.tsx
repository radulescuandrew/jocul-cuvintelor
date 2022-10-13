import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SlidingMenu from '../components/sliding-menu/SlidingMenu';

// Compoment that serves as the layout for the app. Everything will be rendered with a header and a side menu.
const Layout = () => {
  const [isSlidingMenuOpen, setSlidingMenuOpen] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen max-w-full">
      <Header openSlidingMenu={setSlidingMenuOpen} />
      <SlidingMenu isOpen={isSlidingMenuOpen} setSlidingMenuOpen={setSlidingMenuOpen} />
      <div className="flex sm:p-6 p-4">
        <div className="content overflow-scroll w-full sm:pl-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
