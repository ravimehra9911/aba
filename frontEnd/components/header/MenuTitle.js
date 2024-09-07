import Link from 'next/link';
import React from 'react';

const MenuTitle = () => {
  return (
    <div>
      <Link href="/ceu">
        <div className="py-2 md:py-4 border-b bg-yellowColor ">
          <p className="p48 font-primary pl-[32px] relative mt-3">
            <span className="absolute font-secondaryLight p14 top-[-10px]">
              access our
            </span>
            CEUs
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MenuTitle;
