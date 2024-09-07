import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '@/utils/authContext';
import Cookies from 'js-cookie';
import fetcher from '@/utils/fetcher';
import { useShoppingCart } from 'use-shopping-cart';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PaymentResult = () => {
  const { clearCart } = useShoppingCart();
  const router = useRouter();
  const stripe = require('stripe')(
    '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'
  );
  const getSession = async (sessionId) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  };
  const [sessionLoading, setSessionLoading] = useState(true);
  const [queryMessage, setQueryMessage] = useState('Fetching Data...');
  const [countdownSeconds, setCountdownSeconds] = useState(10);
  const updatePaymentStatus = async (successBool, sessionId) => {
    if (successBool) {
      const response = await fetcher(`/api/orders/updatePaymentStatus`, {
        method: 'POST',
        body: JSON.stringify({
          successBool,
          session_id: sessionId,
        }),
        headers: {
          Authorization: `Bearer ${Cookies.get('abaToken')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);
      if (response.code === 200) {
        console.log('successful run');
        clearCart();
        setSessionLoading(false);
        setQueryMessage(
          'Payment Successful. You will be redirected to your Courses in'
        );
        const countdownInterval = setInterval(() => {
          setCountdownSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          // setQueryMessage("Redirected")
          router.push('/dashboard/courses'); // Redirect to /userDashboard after countdown
        }, 5000);
      } else if (response.status === 404) {
        setSessionLoading(false);
        setQueryMessage('Order Not Found');
      } else if (response.status === 500) {
        setSessionLoading(false);
        setQueryMessage('Internal Server Error');
      }
    } else {
      const response = await fetcher(`/api/orders/updatePaymentStatus`, {
        method: 'POST',
        body: JSON.stringify({
          successBool,
          session_id: sessionId,
        }),
        headers: {
          Authorization: `Bearer ${Cookies.get('abaToken')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);
      if (response.code === 200) {
        console.log('unsuccessful run');
        setSessionLoading(false);
        setQueryMessage('Payment Failed.');
        const countdownInterval = setInterval(() => {
          setCountdownSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          // setQueryMessage("Redirected")
          router.push('/checkout'); // Redirect to /userDashboard after countdown
        }, 5000);
      } else if (response.status === 404) {
        setSessionLoading(false);
        setQueryMessage('Order Not Found');
      } else if (response.status === 500) {
        setSessionLoading(false);
        setQueryMessage('Internal Server Error');
      }
    }
  };
  const authContext = useContext(AuthContext);
  useEffect(() => {
    setSessionLoading(true);
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      // Then, retrieve the Checkout Session object from Stripe
      const sessionId = query.get('session_id');
      getSession(sessionId)
        .then((session) => {
          console.log(session);
          if (session.payment_status == 'paid') {
            updatePaymentStatus(true, sessionId);
          }
        })
        .catch((error) => {
          console.error(error);
          setQueryMessage('Could not get payment info', error);
        });
    } else if (query.get('cancel')) {
      const sessionId = query.get('session_id');
      getSession(sessionId)
        .then((session) => {
          console.log(session);
          if (session.payment_status == 'unpaid') {
            updatePaymentStatus(false, sessionId);
          }
        })
        .catch((error) => {
          console.error(error);
          setQueryMessage('Could not get payment info', error);
        });
    }
    const token = Cookies.get('abaToken');
    authContext.setIsLoading(true);
    if (token) {
      // Make a request to your backend to verify the token and get user data
      const getUser = async () => {
        try {
          const response = await fetcher('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (
            !authContext.user &&
            (!response.data || (response.data && response.data != null))
          ) {
            authContext.setUser(response);
            authContext.setIsLoading(false);
            authContext.setIsAuthenticated(true);
            console.log(authContext.user);
          }
        } catch (error) {
          authContext.setIsLoading(false);
          authContext.setIsAuthenticated(false);
        }
      };
      getUser();
    }
  }, []);

  return (
    <>
      <div className="bg-yellowColor h-screen">
        <div className="flex items-center justify-center h-[96vh]">
          {queryMessage} {!sessionLoading && countdownSeconds} seconds.
          {/* <Image
            className=""
            src="/assets/images/payment.png"
            alt="ABA Logo"
            width={461}
            height={460}
          /> */}
        </div>
      </div>
    </>
  );
};

export default PaymentResult;
