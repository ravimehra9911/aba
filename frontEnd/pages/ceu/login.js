import React from 'react';
import SignUpForm from '@/components/checkout/SignUpForm';

const LogInForm = () => {
  return (
    <div className="px-8 py-4 w-full md:p-20">
      <div>
        <div className="pb-16">
          <p className="p48 md:p96 text-center font-primary border-b-[1px] mb-8">
            Login / Sign Up
          </p>
        </div>
        <SignUpForm
          signUpRedirectUrl="/ceu"
          loginRedirectUrl="/dashboard/orders"
        ></SignUpForm>
      </div>
    </div>
  );
};

export default LogInForm;
