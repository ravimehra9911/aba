import React from 'react';
import useUser from '@/utils/authContext';
import { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import AuthContext from '@/utils/authContext';
import fetcher from '@/utils/fetcher';

const User = () => {
  const authContext = useContext(AuthContext);
  console.log(authContext.user)
  useEffect(() => {
    const token = Cookies.get('abaToken');
    authContext.setIsLoading(true)
    if (token) {
      // Make a request to your backend to verify the token and get user data
      const getUser = async () => {
        try {
          const response = await fetcher('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.data || (response.data && response.data != null) ) {
            authContext.setUser(response);
            authContext.setIsLoading(false)
            authContext.setIsAuthenticated(true)
          }
        } catch (error) {
          console.error(error);
          authContext.setIsLoading(false)
          authContext.setIsAuthenticated(false)
        }
      };
      getUser();
    }
  }, []);
  if (authContext.isLoading && !authContext.isAuthenticated) {
    return <div>Not Accessible</div>
  }
  if (authContext.isLoading) {
    return <div>Loading...</div>
  }
  if (authContext.user) return (
    <div>
      <h1 className="text-2xl font-black">Good Morning { authContext.user.fullName}</h1>
      <p className="mb-6">Heres an overview of your monthly transactions.</p>
    </div>
  );
  if (authContext.isAuthenticated) {
    return <div>Authenticated</div>
  }
  return (
    <div>
      <h1 className="text-2xl font-black">Good Morning</h1>
      <p className="mb-6">Heres an overview of your monthly transactions.</p>
    </div>
  );
};

export default User;
