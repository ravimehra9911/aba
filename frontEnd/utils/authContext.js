import React, { createContext, useContext, useState, useEffect } from 'react';
import fetcher from './fetcher';
import Cookies from 'js-cookie';

let AuthContext = createContext();
// const User = createContext({user:null,isLoading:false,isAuthenticated:false});

// export const UserProvider = ({ children }) => {
//   // const {user} = value;
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const getUser = async () => {
//       const token = Cookies.get('abaToken');
//       if (token) {
//         try {
//           const response = await fetcher('/api/users/me', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           if (response.data) {
//             setUser(response.data);
//             setIsAuthenticated(true);
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       }
//       setIsLoading(false);
//     };

//     getUser();
//   }, []);

//   return (
//     <User.Provider value={{ isLoading, user, isAuthenticated }}>
//       {children}
//     </User.Provider>
//   );
// };

export default AuthContext;