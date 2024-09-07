import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { CartProvider } from 'use-shopping-cart';
import AuthContext from '@/utils/authContext';
import { useState } from 'react';


export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter();

  if (router.pathname.startsWith('/dashboard')) {
    return (
      <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated }}>
        <CartProvider
        mode="payment"
        cartMode="client-only"
        // Connects to your Stripe account
        //stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        // Redirected here after successful payments
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
        // Redirected here when you click back on Stripe Checkout
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
        //currency="GBP"
        // Only customers from UK will be able to purchase
        // Having this setting means that we will capture shipping address
        //allowedCountries={['GB']}
        // Enables local storage
        shouldPersist={true}
      >
      <DashboardLayout>
        <Component {...pageProps} />
          </DashboardLayout>
          </CartProvider>
      </AuthContext.Provider>
    );
  } else if (router.pathname.startsWith('/ceu')) {
    return (
      <AuthContext.Provider value={{user, setUser, isLoading, setIsLoading,isAuthenticated,setIsAuthenticated}}>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        // Connects to your Stripe account
        //stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        // Redirected here after successful payments
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
        // Redirected here when you click back on Stripe Checkout
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
        //currency="GBP"
        // Only customers from UK will be able to purchase
        // Having this setting means that we will capture shipping address
        //allowedCountries={['GB']}
        // Enables local storage
        shouldPersist={true}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </CartProvider>
        </AuthContext.Provider>
    );
  } else return <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated }}>
    <CartProvider
        mode="payment"
        cartMode="client-only"
        // Connects to your Stripe account
        //stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        // Redirected here after successful payments
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
        // Redirected here when you click back on Stripe Checkout
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/?success=false`}
        //currency="GBP"
        // Only customers from UK will be able to purchase
        // Having this setting means that we will capture shipping address
        //allowedCountries={['GB']}
        // Enables local storage
        shouldPersist={true}
      ><Component {...pageProps} /></CartProvider>
  </AuthContext.Provider>;
}
