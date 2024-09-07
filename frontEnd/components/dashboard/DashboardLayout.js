import React from 'react';

import Header from './Header';
import Wrapper from '../layout/Wrapper';

const DashboardLayout = ({ children }) => {
  return (
    <Wrapper>
      <div className="w-full md:w-1/4 md:h-screen md:overflow-y-scroll">
        <Header />
      </div>
      <div className="w-full md:w-3/4 md:h-screen md:overflow-y-scroll md:px-20 ">
        {/* <main className="md:ml-[192px] lg:ml-[240px] xl:ml-[285px] xxl:ml-[360px] xxxl:ml-[470px] md:px-16 xxl:border-r xxl:border-black md:h-screen"> */}
        {/* <main className=" md:ml-[190px] lg:ml-[254px] xl:ml-[358px] xxl:ml-[478px] md:px-16  xxl:border-r xxl:border-black md:h-screen"> */}
        <div className="md:px-14">{children}</div>
      </div>
    </Wrapper>
  );
};

export default DashboardLayout;
