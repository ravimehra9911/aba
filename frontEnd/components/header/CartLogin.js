import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Cart from '../Cart';
import { useShoppingCart } from 'use-shopping-cart';
import fetcher from '@/utils/fetcher';
import AuthContext from '@/utils/authContext';

const CartLogin = () => {
  const authContext = useContext(AuthContext);
  const [openCart, setOpenCart] = useState(false);
  const { cartCount } = useShoppingCart();
  // const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('abaToken');
    authContext.setIsLoading(true);
    if (token) {
      // Make a request to your backend to verify the token and get user data
      const getUser = async () => {
        try {
          const response = await fetcher('/api/users/me?populate=*', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.data || (response.data && response.data != null)) {
            authContext.setUser(response);
            authContext.setIsLoading(false);
            authContext.setIsAuthenticated(true);
          }
        } catch (error) {
          console.error(error);
          authContext.setIsLoading(false);
          authContext.setIsAuthenticated(false);
        }
      };
      getUser();
    }
  }, []);

  const logoutHandler = () => {
    Cookies.remove('abaToken');
    authContext.setUser(null);
    router.push(window.location.pathname);
  };

  return (
    // <div className="absolute top-0 w-full px-8 md:static">
    <div className="bg-[#ffffff]">
      <div className="p14 font-secondary w-full flex justify-between h-12 md:h-16 items-center md:justify-between">
        <div>
          <button onClick={() => setOpenCart(true)}>
            <p className="">CART ({cartCount})</p>
          </button>
        </div>

        <div>
          {authContext.user ? (
            <div className="flex gap-2 md:gap-4">
              <Link href="/dashboard/orders">
                <p className=" md:block">
                  {authContext.user.fullName.toUpperCase()}
                </p>
              </Link>
              <p onClick={logoutHandler} className="cursor-pointer">
                LOGOUT
              </p>
            </div>
          ) : (
            <Link href="/ceu/login">
              <p>LOGIN</p>
            </Link>
          )}
        </div>
      </div>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
    </div>
  );
};

export default CartLogin;
