import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '@/utils/authContext';
import Cookies from 'js-cookie';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router';

const Orders = () => {
  const [myOrders, setMyOrders] = useState(null);
  const authContext = useContext(AuthContext);
  const [token, setToken] = useState(Cookies.get('abaToken'));
  const router = useRouter();
  useEffect(() => {
    setToken(Cookies.get('abaToken'));
    authContext.setIsLoading(true);
    if (token) {
      // Make a request to your backend to verify the token and get user data
      const getUser = async () => {
        try {
          const response = await fetcher('/api/user/me/findMyOrders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.data || (response.data && response.data != null)) {
            // console.log(response.user);
            authContext.setUser(response.user);
            authContext.setIsLoading(false);
            authContext.setIsAuthenticated(true);
          }
        } catch (error) {
          authContext.setIsLoading(false);
          authContext.setIsAuthenticated(false);
        }
      };
      getUser();
    } else {
      authContext.setIsLoading(false);
      authContext.setIsAuthenticated(false);
      router.push('/login');
    }
  }, []);

  !myOrders &&
    authContext.user &&
    authContext.user.orders &&
    setMyOrders(authContext.user.orders);
  return (
    <section className="px-4">
      <h1 className="py-8 md:mb-16 p48 coursetitle text-center font-primary">
        orders
      </h1>
      <div className="p14 font-secondary grid grid-cols-[10%_20%_20%_auto_10%] overflow-auto md:overflow-hidden gap-2  border-b py-2">
        <p>ID</p>
        <p>STATUS</p>
        <p>DATE</p>
        <p className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
          COURSE NAME
        </p>
        <p className="text-right">AMOUNT</p>
      </div>

      {authContext.isLoading ? <p>loading...</p> : <p></p>}
      {token && !authContext.isLoading && !authContext.isAuthenticated ? (
        <p>Not Accessible</p>
      ) : (
        <>
          {myOrders &&
            myOrders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="p14 font-secondary grid grid-cols-[10%_20%_20%_auto_10%] overflow-auto md:overflow-hidden gap-2  border-b py-2"
                >
                  <p>{order.id}</p>
                  <p>{order.status}</p>
                  <p>{order.updatedAt.split('T')[0]}</p>
                  <p className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
                    {order.orderName}
                  </p>
                  <p className="text-right">$ {order.total / 100}</p>
                </div>
              );
            })}
        </>
      )}
    </section>
  );
};

export default Orders;
