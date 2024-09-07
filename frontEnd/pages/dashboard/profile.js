import React from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '@/utils/authContext';
import Cookies from 'js-cookie';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

const Profile = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [myOrders, setMyOrders] = useState(null);
  const [profile, setProfile] = useState(authContext.user);
  const [token, setToken] = useState(Cookies.get('abaToken'));
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [isUpdatingPhoneNumber, setIsUpdatingPhoneNumber] = useState(false);
  const [updatingPhoneNumberError, setUpdatingPhoneNumberError] = useState('');
  const [updatingPhoneNumberSuccess, setUpdatingPhoneNumberSuccess] =
    useState('');
  const [updatingNewAddressError, setUpdatingNewAddressError] = useState('');
  const [updatingNewAddressSuccess, setUpdatingNewAddressSuccess] =
    useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newZipcode, setNewZipcode] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');

  useEffect(() => {
    setToken(Cookies.get('abaToken'));
    authContext.setIsLoading(true);
    if (token) {
      // Make a request to your backend to verify the token and get user data
      const getUser = async () => {
        try {
          const response = await fetcher('/api/user/me/findMyOrders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.data || (response.data && response.data != null)) {
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
  }, [profile]);

  const handleUpdateAddress = () => {
    setIsUpdatingAddress(true);
    setIsUpdatingPhoneNumber(false);
  };

  const handleUpdatePhoneNumber = () => {
    setIsUpdatingPhoneNumber(true);
    setIsUpdatingAddress(false);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation: check if the phone number contains only digits and has a minimum length
    const phoneNumberRegex = /^\d+$/;
    return phoneNumberRegex.test(phoneNumber) && phoneNumber.length >= 10;
  };
  const isValidAddress = (newAddress, newCity, newCountry, newZipcode) => {
    // Basic phone number validation: check if the phone number contains only digits and has a minimum length
    if (!newAddress || !newZipcode || !newCity || !newCountry) {
      return false;
    } else return true;
  };

  const handleAddressSubmit = async (event) => {
    event.preventDefault();
    if (!isValidAddress(newAddress, newCity, newCountry, newZipcode)) {
      setUpdatingNewAddressSuccess('');
      setUpdatingNewAddressError('Fill all fields or Enter a valid Address');
      return;
    }
    try {
      setUpdatingNewAddressError('');
      setUpdatingNewAddressSuccess('');
      const data = await fetcher('/api/user/me/updateAddress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newAddress,
          newCity,
          newCountry,
          newZipcode,
        }),
      });
      // console.log(data); // data contains the newly created user object
      setIsUpdatingAddress(false);
      setProfile({
        ...profile,
        address: newAddress,
        city: newCity,
        country: newCountry,
        zipcode: newZipcode,
      });
      setNewAddress('');
      setNewCity('');
      setNewCountry('');
      setNewZipcode('');
      setUpdatingNewAddressSuccess('Address Changed Successfully');
    } catch (err) {
      console.error(err);
      setUpdatingNewAddressError(
        `An error occurred while Updating Phone Number. Please try again: ${err}`
      );
      // console.log('error: ' + err);
      setIsUpdatingAddress(false);
    }
    // Perform the update operation for address using the newAddress
    // You can send this data to the backend to update the user's address
    // After successful update, you can set isUpdatingAddress to false
    // and update the profile state if needed
  };

  const handlePhoneNumberSubmit = async (event) => {
    event.preventDefault();
    if (!isValidPhoneNumber(newPhoneNumber)) {
      setUpdatingPhoneNumberSuccess('');
      setUpdatingPhoneNumberError('Enter a valid phone Number');
      return;
    }
    try {
      setUpdatingPhoneNumberError('');
      setUpdatingPhoneNumberSuccess('');
      const data = await fetcher('/api/user/me/updatePhoneNumber', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber: newPhoneNumber,
        }),
      });
      //console.log(data); // data contains the newly created user object
      setIsUpdatingPhoneNumber(false);
      setProfile({
        ...profile,
        phoneNumber: newPhoneNumber,
      });
      setNewPhoneNumber('');
      setUpdatingPhoneNumberSuccess('Phone Number Changed Successfully');
    } catch (err) {
      console.error(err);
      setUpdatingPhoneNumberError(
        `An error occurred while Updating Phone Number. Please try again: ${err}`
      );
      // console.log('error: ' + err);
      setIsUpdatingPhoneNumber(false);
    }

    // Perform the update operation for phone number using the newPhoneNumber
    // You can send this data to the backend to update the user's phone number
    // After successful update, you can set isUpdatingPhoneNumber to false
    // and update the profile state if needed
  };

  !myOrders &&
    authContext.user &&
    authContext.user.orders &&
    setMyOrders(authContext.user.orders);
  !profile && authContext.user && setProfile(authContext.user);
  return (
    <section className="px-4">
      <h1 className="py-8 md:mb-16 p48 coursetitle text-center font-primary">
        profile
      </h1>
      {authContext.isLoading ? <p>loading...</p> : <></>}
      {token && !authContext.isLoading && !authContext.isAuthenticated ? (
        <p>Not Accessible</p>
      ) : (
        <>
          {profile && (
            <div className="md:mb-8">
              <div className="p14 font-secondary grid grid-cols-[30%_auto_] gap-2  border-b py-2">
                <p>
                  NAME<span className="text-red">*</span>
                </p>
                <p className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
                  {profile.fullName}
                </p>
              </div>

              <div className="p14 font-secondary grid grid-cols-[30%_auto_] gap-2  border-b py-2">
                <p>
                  EMAIL<span className="text-red">*</span>
                </p>
                <p className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
                  {profile.email}
                </p>
              </div>

              <div className="p14 font-secondary grid grid-cols-[30%_auto_] gap-2  border-b py-2">
                <p>PHONE</p>
                <p className="overflow-hidden text-ellipsis w-full whitespace-nowrap">
                  {profile.phoneNumber}
                </p>
              </div>

              <div className="p14 font-secondary grid grid-cols-[30%_auto_] gap-2  border-b py-2">
                <p>ADDRESS</p>
                <p className="overflow-hidden text-ellipsis w-full">
                  {profile.address ? (
                    <>
                      {`${profile?.address}, ${profile?.city}, ${profile?.country}, ${profile?.zipcode}`}{' '}
                    </>
                  ) : (
                    <>
                      {myOrders?.length > 0 ? (
                        `${myOrders[0]?.address}, ${myOrders[0]?.city}, ${myOrders[0]?.country}, ${myOrders[0]?.zipcode}`
                      ) : (
                        <>Address Not Set</>
                      )}
                    </>
                  )}
                  {/* {(!(profile?.address)&&!(myOrders[0]?.address))&& 'Address Not Set'} */}
                </p>
              </div>
            </div>
          )}
          {/* Update Address Button */}

          <div className="p14 py-8 md:py-0 font-secondary md:grid md:grid-cols-[auto_50%_] md:gap-2">
            <div className="pb-4 md:pb-0">
              <button onClick={handleUpdateAddress}>UPDATE ADDRESS</button>

              {/* Address Update Form */}
              {isUpdatingAddress && (
                <form onSubmit={handleAddressSubmit}>
                  <div className="grid md:grid-cols-2 md:gap-24">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        name="address"
                        id="address"
                        placeholder=" "
                        className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                        value={newZipcode}
                        onChange={(e) => setNewZipcode(e.target.value)}
                        name="zipcode"
                        id="zipcode"
                        placeholder=" "
                        className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        name="city"
                        id="city"
                        className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="city"
                        className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        CITY
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        value={newCountry}
                        onChange={(e) => setNewCountry(e.target.value)}
                        name="country"
                        id="country"
                        className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="country"
                        className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        COUNTRY
                      </label>
                    </div>
                  </div>

                  <Button btntype="submit" name="UPDATE" />
                </form>
              )}
              {updatingNewAddressSuccess && (
                <p style={{ color: 'green' }}>{updatingNewAddressSuccess}</p>
              )}
              {updatingNewAddressError && (
                <p style={{ color: 'red' }}>{updatingNewAddressError}</p>
              )}
            </div>
            <div>
              {/* Update Phone Number Button */}
              <button onClick={handleUpdatePhoneNumber}>
                UPDATE PHONE NUMBER
              </button>
              {/* Phone Number Update Form */}
              {isUpdatingPhoneNumber && (
                <form onSubmit={handlePhoneNumberSubmit}>
                  <div className="grid md:grid-cols-1 md:gap-24">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="tel"
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                        name="phone"
                        id="phone"
                        placeholder=" "
                        className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      />
                      <label
                        htmlFor="phone"
                        className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        NEW PHONE NO.
                      </label>
                    </div>
                  </div>

                  <Button btntype="submit" name="UPDATE" />
                </form>
              )}
              {updatingPhoneNumberSuccess && (
                <p style={{ color: 'green' }}>{updatingPhoneNumberSuccess}</p>
              )}
              {updatingPhoneNumberError && (
                <p style={{ color: 'red' }}>{updatingPhoneNumberError}</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
