import React from 'react';
import './Header.css';
import logo from './../../../assets/images/logo.svg';
import { MenuIcon } from '@heroicons/react/outline';
import { MENU_ROUTES } from '../../constants/Menu.constants';

const Header = ({ openSlidingMenu }: { openSlidingMenu?: any }) => {
  return (
    <header className="bg-white max-h-">
      <nav className="py-4 px-4" aria-label="Top">
        <div className="w-full flex gap-4 justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Code 4 Romania - ONG Hub" className="h-full w-full" />
          </div>
          <div className="flex gap-4">
            <div className='gap-6 hidden sm:flex'>
              {MENU_ROUTES.map(route =>
                <a key={route.id} href={route.href}>{route.name}</a>)}
            </div>
            <div className="flex sm:hidden items-center">
              <button className="flex items-center gap-4 hover:bg-green-tab py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                onClick={() => openSlidingMenu(true)}>
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
