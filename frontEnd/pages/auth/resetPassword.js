import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import fetcher from '@/utils/fetcher';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import Button from '@/components/Button';

const ResetPassword = () => {
  const router = useRouter();
  const { query } = useRouter();
  const code = query.code;
  console.log(code);
  const [resetPasswordformData, setResetPasswordFormData] = useState({
    resetPasswordNew: '',
  });
  const [resetPasswordloading, setResetPasswordLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');
  const handleResetPasswordChange = (e) => {
    setResetPasswordFormData({
      ...resetPasswordformData,
      [e.target.name]: e.target.value,
    });
    console.log(resetPasswordformData);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    setResetPasswordLoading(true);
    setResetPasswordError('');
    setResetPasswordSuccess('');

    try {
      const data = await fetcher('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code, // code contained in the reset link of step 3.
          password: resetPasswordformData.resetPasswordNew,
          passwordConfirmation: resetPasswordformData.resetPasswordNew,
        }),
      });
      console.log(data); // data contains the newly created user object

      setResetPasswordFormData({
        resetPasswordNew: '',
      });
      setResetPasswordSuccess('Password Reset Success');
      router.push('/ceu/login');
    } catch (err) {
      console.error(err);
      setResetPasswordError(
        `An error occurred while registering. Please try again: ${err}`
      );
      console.log('error: ' + err);
    }

    setResetPasswordLoading(false);
  };
  return (
    <>
      <div className="bg-yellowColor p-4 w-full h-screen md:py-20 md:px-32">
        <div>
          {/* <button onClick={() => router.push('/ceu/login')}>
            <div className="flex justify-end">
              <XMarkIcon className="h-10 w-10 stroke-[3]" />
            </div>
          </button> */}
          <div className="pb-16">
            <p className="p48 md:p96 text-center font-primary border-b-[1px] mb-8">
              forgot password
            </p>
          </div>

          <form onSubmit={handleResetPasswordSubmit}>
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  id="resetPasswordNew"
                  name="resetPasswordNew"
                  className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  onChange={handleResetPasswordChange}
                />
                <label
                  htmlFor="resetPasswordNew"
                  className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  SET NEW PASSWORD
                </label>
              </div>
              <div className="error"></div>
            </div>

            <Button
              name="SUBMIT"
              btntype="submit"
              cssName="hover:bg-whiteColor"
            />
          </form>
          {resetPasswordSuccess && <p>{resetPasswordSuccess}</p>}
          {resetPasswordError && <p>{resetPasswordError}</p>}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
