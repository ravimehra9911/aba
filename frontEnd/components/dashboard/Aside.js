import React from 'react';
import Logo from '../header/Logo';

import { UserData } from '@/data/udb';
import Link from 'next/link';

const Aside = () => {
  return (
    <aside className=" bg-yellowColor z-50 md:relative">
      <input type="checkbox" className="peer hidden" id="sidebar-open" />
      <label
        className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-8 z-20 mx-4 cursor-pointer md:hidden"
        for="sidebar-open"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <nav
        aria-label="Sidebar Navigation"
        className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gray-700 text-white transition-all md:h-screen md:w-64 lg:w-72"
      >
        <div className="hidden md:block">
          <Logo />
        </div>

        <ul className="mt-8 space-y-3">
          {UserData.map((user) => {
            return (
              <React.Fragment key={user.id}>
                <Link href={user.link}>
                  <li className="relative">
                    <p className=" flex w-full space-x-2 px-10 py-4">
                      {user.icon}
                      <span className="">{user.name}</span>
                    </p>
                  </li>
                </Link>
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
