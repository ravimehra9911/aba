import React from 'react';
import Logo from '../header/Logo';
import Ceus from './Ceus';
import Menu from './Menu';
import ContactUs from '../header/ContactUs';

const Header = () => {
  return (
    <header className="max-w-[478px] md:w-1/4 md:fixed md:border-x md:border-black md:h-screen md:flex md:justify-between md:flex-col md:overflow-y-auto">
      <div>
        <Logo />
        <Ceus />
        <Menu />
      </div>
      <div className="hidden md:block">
        <ContactUs />
      </div>
    </header>
  );
};

export default Header;
