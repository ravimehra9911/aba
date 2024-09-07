import yelloLogo from '@/public/assets/images/yellow-logo.png';
import blueLogo from '@/public/assets/images/blue-logo.png';
import greenLogo from '@/public/assets/images/green-logo.png';
import TopBar from '@/components/landing/TopBar';
import BigMenu from '@/components/landing/BigMenu';
import React, { useState } from 'react';
import Image from 'next/image';

const Index = () => {
  const [openBigMenu, setOpenBigMenu] = useState(false);
  return (
    <div className="py-5 h-screen md:bg-landingGif bg-no-repeat bg-cover bg-center relative">
      <div className="h-[calc(100vh-40px)] w-full bg-landingGif bg-no-repeat bg-contain md:bg-cover bg-center">
        <TopBar openBigMenu={openBigMenu} setOpenBigMenu={setOpenBigMenu} />

        {openBigMenu && (
          <div className="flex bg-[#fff] ">
            <div className="h-screen w-1/2 top-0 left-0 hidden md:block bg-whiteColor absolute"></div>

            <div className="h-[calc(100vh-80px)] md:h-screen md:top-0 md:right-0 md:absolute md:flex md:items-end md:justify-evenly md:flex-col md:w-1/2">
              <Image
                className="absolute w-auto h-1/2 top-1/4 right-full"
                src="/assets/images/black-logo1.png"
                alt="ABA Logo"
                width={461}
                height={460}
              />
              <BigMenu
                color="bg-blue"
                name="services"
                image={blueLogo}
                link="/"
                subname="COMING SOON!"
                bordercolor="border-blue"
              />

              <BigMenu
                color="bg-yellowColorDark"
                name="ceu's"
                image={yelloLogo}
                link="/ceu"
                subname="ACCESS"
                hoverover="border-[8px]"
                bordercolor="border-yellowColorDark"
                hovercolor="hover:border-blackColor"
              />

              <BigMenu
                color="bg-green"
                name="careers"
                image={greenLogo}
                link="/"
                subname="COMING SOON!"
                bordercolor="border-green"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
