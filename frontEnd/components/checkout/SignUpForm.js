import React from 'react';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import fetcher from '@/utils/fetcher';
import Cookies from 'js-cookie';
import AuthContext from '@/utils/authContext';
import Button from '../Button';

const SignUpForm = ({ loginRedirectUrl, signUpRedirectUrl }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [signUpformData, setSignUpFormData] = useState({
    signUpfullname: '',
    signUpEmail: '',
    signUpPhoneNumber: '',
    signUpPassword: '',
  });
  const [loginformData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });
  const [signUploading, setSignUpLoading] = useState(false);
  const [loginloading, setLoginLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [token, setToken] = useState(null);
  const handleSignUpChange = (e) => {
    setSignUpFormData({
      ...signUpformData,
      [e.target.name]: e.target.value,
    });
    // console.log(signUpformData);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setSignUpLoading(true);
    setSignUpError('');
    setSignUpSuccess('');

    try {
      const data = await fetcher('/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: signUpformData.signUpfullname,
          username: signUpformData.signUpEmail,
          email: signUpformData.signUpEmail,
          phoneNumber: signUpformData.signUpPhoneNumber,
          password: signUpformData.signUpPassword,
        }),
      });
      // console.log(data); // data contains the newly created user object
      Cookies.set('abaToken', data.jwt);
      authContext.setUser(data.user);
      authContext.setIsAuthenticated(true);

      setSignUpFormData({
        signUpfullname: '',
        signUpEmail: '',
        signUpPhoneNumber: '',
        signUpPassword: '',
      });
      setSignUpSuccess('User Registered Successfully');
      signUpRedirectUrl && router.push(signUpRedirectUrl);
    } catch (err) {
      // console.error(err);
      setSignUpError(
        `An error occurred while registering. Please try again: ${err}`
      );
      // console.log('error: ' + err);
    }

    setSignUpLoading(false);
  };

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginformData,
      [e.target.name]: e.target.value,
    });
    // console.log(loginformData);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    setLoginSuccess('');

    try {
      const user = await fetcher(`/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: loginformData.loginEmail,
          password: loginformData.loginPassword,
        }),
      });

      // Set JWT token to cookie
      // console.log(user);
      Cookies.set('abaToken', user.jwt);
      authContext.setUser(user.user);
      authContext.setIsAuthenticated(true);

      // Fetch user data using JWT token
      //   const userData = await fetcher(
      //     `/users/me`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${user.jwt}`,
      //       },
      //     }
      //   );

      //   console.log(userData)

      //   setUser(userData);
      setLoginFormData({
        loginEmail: '',
        loginPassword: '',
      });
      setLoginSuccess('User Logged In Successfully');

      loginRedirectUrl && router.push(loginRedirectUrl);
    } catch (err) {
      // console.error(err);
      setLoginError(
        `An error occurred while Logging you in. Please try again: ${err}`
      );
      // console.log('error: ' + err);
    }
    setLoginLoading(false);
  };

  const [showLogin, setShowLogin] = useState(true); // State for showing/hiding the login form
  const [showSignUp, setShowSignUp] = useState(false); // State for showing/hiding the sign-up form
  // ... other state variables and code

  const toggleForms = () => {
    setShowLogin(!showLogin);
    setShowSignUp(!showSignUp);
  };

  return (
    <div className="grid pb-16 md:grid-cols-1 md:gap-6">
      {showLogin && (
        <div>
          <div className="flex justify-between border-b-[1px] mb-8">
            <h4 className="font-secondary">LOGIN</h4>
            <p
              className="p14 font-secondary cursor-pointer"
              onClick={toggleForms}
            >
              Sign Up
            </p>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="loginEmail"
                id="loginEmail"
                className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={loginformData.loginEmail}
                onChange={handleLoginChange}
                required
                autoComplete="off"
              />
              <label
                htmlFor="loginEmail"
                className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                EMAIL
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="loginPassword"
                className="block font-secondary py-2.5 px-0 w-full  p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="current-password"
                value={loginformData.loginPassword}
                onChange={handleLoginChange}
                required
              />
              <label
                htmlFor="loginPassword"
                className="peer-focus:font-medium font-secondary absolute p14  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                PASSWORD
              </label>
            </div>
            <p
              onClick={() => router.push('/auth/forgotPassword')}
              className="p14 pb-3 font-secondary cursor-pointer"
            >
              Forgotten password?
            </p>
            {loginloading ? (
              <p>Loading...</p>
            ) : (
              <Button
                name="LOGIN"
                btntype="submit"
                cssName="hover:bg-yellowColor"
              />
            )}
            <p style={{ color: 'red' }}>{loginError}</p>
            <p style={{ color: 'green' }}>{loginSuccess}</p>
          </form>
        </div>
      )}
      {showSignUp && (
        <div>
          <div className="flex justify-between border-b-[1px] mb-8">
            <h4 className="font-secondary">SIGN UP</h4>
            <p
              className="p14 font-secondary cursor-pointer"
              onClick={toggleForms}
            >
              Login
            </p>
          </div>

          <form onSubmit={handleSignUpSubmit}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="signUpfullname"
                id="signUpfullname"
                className="block font-secondary py-2.5 px-0 w-full  p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={signUpformData.signUpfullname}
                onChange={handleSignUpChange}
                required
                autoComplete="off"
              />

              <label
                htmlFor="fullname"
                className="peer-focus:font-medium font-secondary absolute p14  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                FULL NAME
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="signUpEmail"
                id="signUpEmail"
                className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={signUpformData.signUpEmail}
                onChange={handleSignUpChange}
                required
                autoComplete="off"
              />
              <label
                htmlFor="signUpEmail"
                className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                EMAIL
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="signUpPhoneNumber"
                id="signUpPhoneNumber"
                className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={signUpformData.signUpPhoneNumber}
                onChange={handleSignUpChange}
                autoComplete="off"
              />
              <label
                htmlFor="signUpPhoneNumber"
                className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                PHONE NUMBER
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="signUpPassword"
                className="block font-secondary py-2.5 px-0 w-full  p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={signUpformData.signUpPassword}
                onChange={handleSignUpChange}
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){6,}$"
                title="Password must be alphanumeric and have a minimum length of 6 characters."
                autoComplete="off"
              />
              <label
                htmlFor="signUpPassword"
                className="peer-focus:font-medium font-secondary absolute p14  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                PASSWORD
              </label>
            </div>
            {signUploading ? (
              <p>Loading...</p>
            ) : (
              <Button
                name="SIGN UP"
                btntype="submit"
                cssName="hover:bg-yellowColor"
              />
            )}
            <p style={{ color: 'red' }}>{signUpError}</p>
            <p style={{ color: 'green' }}>{signUpSuccess}</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
