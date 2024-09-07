import React, { useState } from 'react';
import SocialLinks from '@/components/landing/SocialLinks';
import { SiMinutemailer } from 'react-icons/si';
import Link from 'next/link';

const TopBar = ({ openBigMenu, setOpenBigMenu }) => {
  return (
    <div className="px-5 md:px-10 md:flex md:justify-between">
      {/*<div className="md:w-1/2 md:flex md:justify-between z-[2] border-b-2 py-1 md:border-none md:py-0">*/}
      <div className="md:w-1/2 z-[2] flex justify-between md:h-[95vh] md:flex md:flex-col md:justify-between border-b-2 py-2 md:border-none md:py-0">
        <div className="p14 font-secondary pr-10">
          {/* <Link target="blank" href="mailto:contact@accessbehavioranalysis.net"> */}
          <Link href="/contact">CONTACT US</Link>
        </div>
        <SocialLinks />
      </div>
      <div className="md:w-1/2 md:flex md:justify-end border-b-2 py-1 md:border-none md:py-0 flex justify-end">
        <button
          onClick={() => setOpenBigMenu(!openBigMenu)}
          className="flex justify-end p14 font-secondary z-[2]"
        >
          {!openBigMenu ? 'MENU' : 'CLOSE'}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
