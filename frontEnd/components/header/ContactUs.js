import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const ContactUs = () => {
  const router = useRouter();
  if (router.pathname.startsWith('/ceu/contact')) {
    return (
      <div className="hidden md:block">
        <div className=" flex justify-center items-center flex-col py-8">
          <span className="font-secondaryLight p14 pb-2 text-center">
            NEED MORE INFORMATION?
          </span>
          <Link href="/ceu/contact">
            <button className="font-secondaryLight p14 c-btn border-2">
              CONTACT US
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center flex-col py-8">
        <span className="font-secondaryLight p14 pb-2 text-center">
          NEED MORE INFORMATION?
        </span>
        <Link href="/ceu/contact">
          <button className="font-secondaryLight p14 c-btn border-2">
            CONTACT US
          </button>
        </Link>
      </div>
    );
  }
};
export default ContactUs;
