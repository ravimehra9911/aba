import React from 'react';
import Link from 'next/link';
import { DashboardData } from '@/data/db.js';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import AuthContext from '@/utils/authContext';
import { useRouter } from 'next/router';

const Menu = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const logoutHandler = () => {
    Cookies.remove('abaToken')
    authContext.setUser(null);
    router.push("/")
  }

  return (
    <div className="md:overflow-y-auto md:h-[400px]">
      {DashboardData.map((item) => {
        if (item.name != 'LOGOUT') {
          return (
            <React.Fragment key={item.id}>
              <Link className="" href={item.link}>
                <div className="p14 font-secondary py-4 md:py-6 pl-[33px] border-b hover:bg-grey10">
                  {item.name}
                </div>
              </Link>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={item.id}>
                <div onClick={logoutHandler} className="p14 cursor-pointer font-secondary py-4 md:py-6 pl-[33px] border-b hover:bg-grey10">
                  {item.name}
                </div>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default Menu;
