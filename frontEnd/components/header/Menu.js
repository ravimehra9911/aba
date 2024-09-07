import React from 'react';
import Link from 'next/link';

const Menu = ({ category }) => {
  return (
    <div className="md:overflow-y-auto md:h-[400px]">
      {category?.map(({ attributes: c, id }) => {
        return (
          <React.Fragment key={id}>
            <Link href={`/ceu/${c.slug}`}>
              <div className="p14 font-secondary py-4 md:py-8 pl-[32px] border-b hover:bg-yellowColor ">
                {c.displayName}
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Menu;
