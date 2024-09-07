import Button from '@/components/Button';
import fetcher from '@/utils/fetcher';
import React, { useState } from 'react';

const Contact = () => {
  const [isAgreed, setIsAgreed] = useState(true);
  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    preferredContact: '',
    message: '',
    agree: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    let isValid = true;

    // Perform validations
    if (!event.target.firstname.value.trim()) {
      errors.firstname = 'First name is required';
      isValid = false;
    }
    if (!event.target.lastname.value.trim()) {
      errors.lastname = 'Last name is required';
      isValid = false;
    }
    // if (!event.target.phone.value.trim()) {
    //   errors.phone = 'Phone number is required';
    //   isValid = false;
    // } else if (!/^[\d\s()+-]+$/.test(event.target.phone.value.trim())) {
    //   errors.phone = 'Invalid phone number';
    //   isValid = false;
    // }
    if (!event.target.email.value.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(event.target.email.value.trim())) {
      errors.email = 'Invalid email';
      isValid = false;
    }
    if (!event.target.contphone.checked && !event.target.contemail.checked) {
      errors.preferredContact = 'Select at least one preferred contact method';
      isValid = false;
    }
    if (!event.target.message.value.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }
    if (!isAgreed) {
      errors.agree = 'Please agree to be contacted';
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      try {
        // Prepare the data object to be sent in the request
        const data = {
          firstName: event.target.firstname.value.trim(),
          lastName: event.target.lastname.value.trim(),
          phoneNumber: event.target.phone.value.trim(),
          email: event.target.email.value.trim(),
          // city: event.target.city.value.trim(),
          message: event.target.message.value.trim(),
          contactPreference: (() => {
            if (
              event.target.contphone.checked &&
              event.target.contemail.checked
            ) {
              return 'phoneEmail';
            } else if (event.target.contphone.checked) {
              return 'phone';
            } else if (event.target.contemail.checked) {
              return 'email';
            }
          })(),
        };
        const response = await fetcher('/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });
        event.target.reset();
        setSubmissionStatus('success');
        // console.log('Response:', response);
      } catch (error) {
        setSubmissionStatus('error');
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
  };
  return (
    <div className="px-8">
      <h4 className="font-primary pt-20 text-center">
        get more information on
        <br />
        our services, careers or ceus
      </h4>
      <form className="py-0 md:py-16 md:px-0" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-24">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="firstname"
              id="firstname"
              className="block font-secondary py-2.5 px-0 w-full  p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="firstname"
              className="peer-focus:font-medium font-secondary absolute p14  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              FIRST NAME<span className="text-red">*</span>
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="lastname"
              id="lastname"
              className="block font-secondary py-2.5 px-0 w-full  p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="lastname"
              className="peer-focus:font-medium font-secondary absolute p14  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              LAST NAME<span className="text-red">*</span>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-24">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              PHONE
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-24">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              EMAIL<span className="text-red">*</span>
            </label>
          </div>
        </div>

        {/* <div className="grid md:grid-cols-1 md:gap-24">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
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
        </div> */}

        <div className="grid md:grid-cols-1 md:gap-24">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="message"
              id="message"
              className="block font-secondary py-2.5 px-0 w-full p14 text-blackColor bg-transparent border-0 border-b-[1px] border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="message"
              className="peer-focus:font-medium font-secondary absolute p14 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              TYPE YOUR MESSAGE HERE<span className="text-red">*</span>
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-24">
          <div className="  w-full mb-6 group md:flex">
            <label className="font-secondary p14">
              I PREFER TO BE CONTACTED BY<span className="text-red">*</span>
            </label>
            <div>
              <label htmlFor="contphone" className="font-secondary p14 md:pl-4">
                <input type="checkbox" name="contphone" className="mr-4" />
                PHONE
              </label>

              <label htmlFor="contemail" className="font-secondary p14 pl-4">
                <input type="checkbox" name="contemail" className="mr-4" />
                EMAIL
              </label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-24">
          <div className="  w-full mb-6 group">
            <label htmlFor="agree" className="font-secondary p14 uppercase">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                className="mr-4"
                checked={isAgreed}
                onChange={handleAgreeChange}
                required
              />
              <span className="text-justify">
                By ticking this box you give Access Behavior Analysis permission
                to contact you via email or phone.
                <span className="text-red">*</span>
              </span>
            </label>
          </div>
        </div>
        {Object.values(formErrors).map(
          (error, index) =>
            error && (
              <p key={index} className="text-red-500">
                {error}
              </p>
            )
        )}
        <Button
          cssName="hover:bg-yellowColor uppercase"
          name="SUBMIT"
          type="submit"
        />
        {submissionStatus === 'success' && <p>Message sent successfully!</p>}
        {submissionStatus === 'error' && <p>Message could not be sent!</p>}
      </form>
    </div>
  );
};

export default Contact;
