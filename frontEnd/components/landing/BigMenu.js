import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BigMenu = ({
  color,
  image,
  name,
  link,
  subname,
  bordercolor,
  hovercolor,
}) => {
  return (
    <Link
      href={link}
      className={`${color} h-1/3 w-full flex justify-start items-center md:pl-32 border-[8px] ${bordercolor} ${hovercolor} group/image  `}
    >
      <Image
        className="absolute top-1/4 right-full hidden group-hover/image:block w-auto h-1/2"
        src={image}
        alt="ABA Logo"
      />
      <div className="relative w-screen">
        <p className="pl-5 p14 font-secondaryLight absolute top-[-5%] hidden group-hover/image:block">
          {subname}
        </p>
        <div className="p48 pl-4 coursetitle font-primary">{name}</div>
      </div>
    </Link>
  );
};

export default BigMenu;
