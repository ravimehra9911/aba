// import React from 'react';
// import Certificate from '@/components/dashboard/Certificate';
// import { useState, useEffect } from 'react';
// import { useContext } from 'react';
// import AuthContext from '@/utils/authContext';
// import Cookies from 'js-cookie';
// import fetcher from '@/utils/fetcher';

// const Certificates = () => {
//   const [myCertificates, setMyCertificates] = useState(null);
//   const authContext = useContext(AuthContext);
//   const [token, setToken] = useState(Cookies.get('abaToken'));

//   useEffect(() => {
//     setToken(Cookies.get('abaToken'));
//     authContext.setIsLoading(true);
//     if (token) {
//       // Make a request to your backend to verify the token and get user data
//       const getUser = async () => {
//         try {
//           const response = await fetcher(
//             '/api/users/me?populate=certificates',
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (!response.data || (response.data && response.data != null)) {
//             authContext.setUser(response);
//             authContext.setIsLoading(false);
//             authContext.setIsAuthenticated(true);
//           }
//         } catch (error) {
//           authContext.setIsLoading(false);
//           authContext.setIsAuthenticated(false);
//         }
//       };
//       getUser();
//     } else {
//       authContext.setIsLoading(false);
//       authContext.setIsAuthenticated(false);
//       router.push('/login');
//     }
//   }, []);

//   !myCertificates &&
//     authContext.user &&
//     authContext.user.certificates &&
//     setMyCertificates(authContext.user.certificates);
//   return (
//     <section className="px-4">
//       <h1 className="py-8 md:mb-16 p48 coursetitle text-center font-primary">
//         certificates
//       </h1>
//       {authContext.isLoading ? <p>loading...</p> : <></>}
//       {token && !authContext.isLoading && !authContext.isAuthenticated ? (
//         <p>Not Accessible</p>
//       ) : (
//         <div>
//           {myCertificates &&
//             myCertificates.map((certificate) => {
//               return (
//                 <Certificate
//                   certificateName={certificate.certificateName}
//                   key={certificate.id}
//                 ></Certificate>
//               );
//             })}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Certificates;

import React from 'react';
import Course from '../../components/dashboard/Course';
import Certificate from '@/components/dashboard/Certificate';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '@/utils/authContext';
import Cookies from 'js-cookie';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router';

const Certificates = () => {
  const [myCertificates, setMyCertificates] = useState(null);
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
          const response = await fetcher('/api/user/me/findMyCourses', {
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

  !myCertificates &&
    authContext.user &&
    authContext.user.courses &&
    setMyCertificates(authContext.user.courses);
  return (
    <section className="px-4 pb-8">
      <h1 className="py-8 md:mb-16 p48 coursetitle text-center font-primary">
        certificate
      </h1>
      {authContext.isLoading ? <p>loading...</p> : <></>}
      {token && !authContext.isLoading && !authContext.isAuthenticated ? (
        <p>Not Accessible</p>
      ) : (
        <div>
          {myCertificates &&
            myCertificates.map((certificate) => {
              return (
                <Certificate
                  key={certificate.id}
                  certificateName={certificate.title}
                  id={certificate.id}
                  instructor={certificate.instructor}
                  ceu={certificate.ceu}
                ></Certificate>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default Certificates;
