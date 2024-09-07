import React from 'react';
import Wrapper from './Wrapper';
import Header from '../header/Header';
import CartLogin from '../header/CartLogin';
import ContactUs from '../header/ContactUs';

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <div className="w-full md:w-1/4 md:h-screen md:overflow-y-scroll">
        <Header />
      </div>
      <div className="w-full md:w-3/4 md:h-screen md:overflow-y-scroll md:px-20 ">
        <div className="md:px-2">
          <div className="fixed w-full px-10 top-0 md:fixed h-10 md:w-[63vw] z-10">
            <CartLogin />
          </div>
          {children}
        </div>
        <div className="md:hidden">
          <ContactUs />
        </div>
      </div>
    </Wrapper>
  );
};

export default Layout;
