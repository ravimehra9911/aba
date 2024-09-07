import React, { useContext, useEffect, useState } from 'react';
import SignUpFormCheckout from '@/components/checkout/SignUpFormCheckout';
import AuthContext from '@/utils/authContext';
import Cookies from 'js-cookie';
import fetcher from '@/utils/fetcher';
import { loadStripe } from '@stripe/stripe-js';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { useShoppingCart } from 'use-shopping-cart';
import { countries } from '@/data/country';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { cartDetails, cartCount, totalPrice } = useShoppingCart();
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const token = Cookies.get('abaToken');
    authContext.setIsLoading(true);
    const getUser = async () => {
      try {
        const response = await fetcher('/api/user/me/findMyOrders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (
          !authContext.user.orders &&
          (!response.data || (response.data && response.data != null))
        ) {
          authContext.setUser(response.user);
          authContext.setIsLoading(false);
          authContext.setIsAuthenticated(true);
          setProfile(response.user);
        }
      } catch (error) {
        authContext.setIsLoading(false);
        authContext.setIsAuthenticated(false);
      }
    };

    if (token && !authContext?.user?.orders) {
      getUser();
    }
  }, [authContext.user]);

  (async () => {
    const courses = await Promise.all(
      Object.values(cartDetails ?? {}).map(async (entry) => {
        // Perform any asynchronous operations here if needed
        if (entry.courseId) {
          return entry.courseId;
        }
      })
    );
    const bundles = await Promise.all(
      Object.values(cartDetails ?? {}).map(async (entry) => {
        // Perform any asynchronous operations here if needed
        if (entry.bundleName) {
          return entry.bundleId;
        }
      })
    );
  })();

  const handlePayment = async () => {
    const stripe = await stripePromise;
    // Get form input values
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    let subscribeNewsletter = true;
    if (document.getElementById('newsletter')) {
      subscribeNewsletter = document.getElementById('newsletter').checked;
    }

    if (!fullName || !email || !address || !zipcode || !city || !country) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Create an object with the form data
    const formData = {
      fullName,
      email,
      address,
      zipcode,
      city,
      country,
      subscribeNewsletter,
    };

    const courses = await Promise.all(
      Object.values(cartDetails ?? {}).map(async (entry) => {
        // Perform any asynchronous operations here if needed
        if (entry.courseId) {
          return entry.courseId;
        }
      })
    );
    const bundles = await Promise.all(
      Object.values(cartDetails ?? {}).map(async (entry) => {
        // Perform any asynchronous operations here if needed
        if (entry.bundleName) {
          return entry.bundleId;
        }
      })
    );

    const response = await fetcher('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        courses: courses.filter(Boolean),
        bundles: bundles.filter(Boolean),
        formData,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('abaToken')}`,
      },
    });
    const paymentResult = await stripe.redirectToCheckout({
      sessionId: response.stripeSession.id,
    });
  };

  useEffect(() => {
    if (!profile && authContext.user) {
      setProfile(authContext.user);
    }
  }, [authContext.user]);

  !profile && authContext.user && setProfile(authContext.user);

  if (cartCount <= 0) {
    return (
      <div className="bg-yellowColor p-4 w-full md:py-20 md:px-32">
        <p className="p48 md:p96 text-center font-primary border-b-[1px] mb-8">
          No items in cart
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellowColor p-4 w-full md:py-20 md:px-32">
      <div>
        <button onClick={() => router.push('/ceu')}>
          <div className="flex justify-end">
            <XMarkIcon className="h-10 w-10 stroke-[3]" />
          </div>
        </button>
        <div className="pb-8">
          <p className="p48 md:p96 text-center font-primary border-b-[1px] mb-8">
            checkout
          </p>
        </div>
        <h4 className="font-secondary mb-10">
          {!profile && <SignUpFormCheckout></SignUpFormCheckout>}
          {profile && <p>{`Hi! ${authContext.user.fullName}`}</p>}
        </h4>
        <div className="pb-16">
          <h4 className="font-secondary border-b-[1px] mb-8">
            ORDER INFORMATION
          </h4>
          <form>
            <div className="grid md:grid-cols-2 md:gap-24">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="block font-secondary py-2.5 px-0 w-full  p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={
                    authContext?.user?.orders?.slice(-1)[0]?.fullName
                      ? authContext.user.orders.slice(-1)[0].fullName
                      : ''
                  }
                  required
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
                  name="email"
                  id="email"
                  className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={
                    authContext?.user?.orders?.slice(-1)[0]?.email
                      ? authContext.user.orders.slice(-1)[0].email
                      : ''
                  }
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  EMAIL
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-24">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={
                    authContext?.user?.orders?.slice(-1)[0]?.address
                      ? authContext.user.orders.slice(-1)[0].address
                      : ''
                  }
                  required
                />
                <label
                  htmlFor="address"
                  className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ADDRESS
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={
                    authContext?.user?.orders?.slice(-1)[0]?.zipcode
                      ? authContext.user.orders.slice(-1)[0].zipcode
                      : ''
                  }
                  required
                />
                <label
                  htmlFor="zipcode"
                  className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  ZIPCODE
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-24">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  defaultValue={
                    authContext?.user?.orders?.slice(-1)[0]?.city
                      ? authContext.user.orders.slice(-1)[0].city
                      : ''
                  }
                  required
                />
                <label
                  htmlFor="city"
                  className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  CITY
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group flex items-center gap-2 mt-2">
                <select
                  defaultValue={
                    authContext?.user?.orders?.slice(-1)[0]?.country
                      ? authContext.user.orders.slice(-1)[0].country
                      : ''
                  }
                  name="country"
                  id="country"
                  className="text-gray-900 focus:ring-blue-500 font-secondary p14 font-medium focus:border-blue-500 grow block p-2.5 pl-0 bg-yellowColor border-b-[1px] peer"
                >
                  <option value="">Choose a country</option>
                  {countries.map((country) => {
                    return (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {authContext?.user?.orders?.slice(-1)[0]?.subscribeNewsletter ? (
              <></>
            ) : (
              <>
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  placeholder="Zip Code"
                />
                <label htmlFor="newsletter" className="font-secondary p14 pl-4">
                  SUBSCRIBE TO OUR NEWSLETTER
                </label>
              </>
            )}
          </form>
          {error && <p className="text-red">{error}</p>}
        </div>

        <div className="pb-16">
          <h4 className="font-secondary border-b-[1px] mb-8">
            REVIEW ORDER AND PAY
          </h4>
          {cartCount && cartCount > 0 ? (
            <div className="overflow-auto">
              {Object.values(cartDetails ?? {}).map((entry) => (
                <div
                  className="flex justify-between pb-16 relative font-secondary"
                  key={entry.id}
                >
                  <p className="p14 overflow-hidden text-ellipsis w-full whitespace-nowrap">
                    {entry.title ? entry.title : entry.bundleName}
                    <span className="absolute left-0 top-6 text-sm text-gray-200">
                      {entry.ceu}
                    </span>
                  </p>
                  <p className="p14">$ {entry.price}.00</p>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}

          <div className="text-right  font-secondary">
            <p className="p14">
              TOTAL <span className="pl-10">$ {totalPrice}.00</span>
            </p>
          </div>
        </div>
        <Button
          cssName="hover:bg-whiteColor uppercase"
          name="Proceed to payment"
          click={() => handlePayment()}
        />
      </div>
    </div>
  );
};

export default Checkout;
