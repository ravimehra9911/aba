import React from 'react';
import { MenuData } from '../data/db';
import Link from 'next/link';
import Image from 'next/image';

const CircleButton = () => {
  return (
    <div>
      {MenuData.map((cat) => {
        return (
          <React.Fragment key={cat.id}>
            <div className="h-32 w-32 bg-yellowColor rounded-full my-7">
              <div className="h-full w-full flex justify-center items-center group/animate relative p-2">
                <Link href={cat.link}>
                  <Image
                    className="hidden group-hover/animate:block "
                    src={cat.after}
                    alt="logo"
                    width={128}
                    height={128}
                    priority={true}
                  />
                  <Image
                    className=" group-hover/animate:hidden "
                    src={cat.image}
                    alt="logo"
                    width={128}
                    height={128}
                    priority={true}
                  />
                </Link>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CircleButton;
