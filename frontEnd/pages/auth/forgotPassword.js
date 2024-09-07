import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import fetcher from '@/utils/fetcher';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Button from '@/components/Button';

const ForgotPassword = () => {
  const router = useRouter();
  const [forgotPasswordformData, setForgotPasswordFormData] = useState({
    forgotPasswordEmail: '',
  });
  const [forgotPasswordloading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
  const handleForgotPasswordChange = (e) => {
    setForgotPasswordFormData({
      ...forgotPasswordformData,
      [e.target.name]: e.target.value,
    });
    // console.log(forgotPasswordformData);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    setForgotPasswordLoading(true);
    setForgotPasswordError('');
    setForgotPasswordSuccess('');

    try {
      const data = await fetcher('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotPasswordformData.forgotPasswordEmail,
        }),
      });
      console.log(data); // data contains the newly created user object

      setForgotPasswordFormData({
        forgotPasswordEmail: '',
      });
      if (data) {
        setForgotPasswordSuccess('Reset Link sent to your email');
        router.push('/ceu/login');
      }
    } catch (err) {
      console.error(err);
      setForgotPasswordError(
        `An error occurred while registering. Please try again: ${err}`
      );
      console.log('error: ' + err);
    }

    setForgotPasswordLoading(false);
  };

  return (
    <>
      <div className="bg-yellowColor p-4 w-full h-screen md:py-20 md:px-32">
        <div>
          <button onClick={() => router.push('/ceu/login')}>
            <div className="flex justify-end">
              <XMarkIcon className="h-10 w-10 stroke-[3]" />
            </div>
          </button>
          <div className="pb-16">
            <p className="p48 md:p96 text-center font-primary border-b-[1px] mb-8">
              forgot password
            </p>
          </div>

          <form onSubmit={handleForgotPasswordSubmit}>
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={handleForgotPasswordChange}
                />
                <label
                  htmlFor="forgotPasswordEmail"
                  className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  EMAIL
                </label>
              </div>
              <div className="error"></div>
            </div>

            <Button
              name="SEND RESET LINK"
              btntype="submit"
              cssName="hover:bg-whiteColor"
            />
          </form>
          {forgotPasswordSuccess && <p>{forgotPasswordSuccess}</p>}
          {forgotPasswordError && <p>{forgotPasswordError}</p>}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
