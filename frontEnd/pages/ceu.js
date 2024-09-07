'use client';
import React, { useEffect, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Button from '../components/Button';
import StarRating from '../components/coursepage/StarRating';
import { Disclosure } from '@headlessui/react';
import CircleButton from '@/components/CircleButton';
import fetchData from '@/utils/api';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';

const Ceu = () => {
  const { addItem, cartDetails } = useShoppingCart();
  const [isOpen, setOpen] = useState(false);

  const addToCart = (course) => {
    const existingCartItem = cartDetails[course.title];
    if (existingCartItem && existingCartItem.quantity >= 1) {
      return;
    }
    addItem(course);
  };

  const [category, setCategory] = useState();
  const [course, setCourses] = useState();
  const [bundle, setBundle] = useState();

  useEffect(() => {
    allCourses();
    Courses();
    allBundle();
  }, []);

  const allCourses = async () => {
    const { data } = await fetchData(
      '/api/categories?populate[courses][populate][0]=courseImage'
    );
    setCategory(data);
  };

  const Courses = async () => {
    const { data } = await fetchData('/api/courses?populate=*');
    setCourses(data);
  };

  const allBundle = async () => {
    const { data } = await fetchData('/api/bundles?populate=*');
    setBundle(data);
  };

  const ImageUrl = 'https://aba.ravimehra.in';
  // console.log({ Courses });
  return (
    <div>
      {/* <div className="text-center pt-10 md:flex md:justify-between md:items-center md:h-full md:pl-8"> */}
      <div className="pt-10 pb-20 md:pb-60 flex justify-center md:flex md:justify-between md:items-center md:h-full">
        <div className="m-p48 coursetitle font-primary md:text-left text-yellowColorDark">
          explore<br></br>courses:
        </div>
        <div className="hidden md:block mr-[-50px]">
          <CircleButton />
        </div>
      </div>
      <div>
        {category?.map(({ attributes: c, id }) => {
          return (
            <div key={id} className="">
              <div className="coursetitle m-p48 px-8 pt-14 text-center  font-primary text-yellowColorDark">
                {c.categoryName}
              </div>
              <div className="py-16 px-8 md:px-0">
                {c.courses.data.map(({ attributes: cd, id }) => {
                  cd.courseId = id;
                  cd.type = 'course';
                  return (
                    <React.Fragment key={id}>
                      <Disclosure>
                        {({ open }) => (
                          <div>
                            <Disclosure.Button className="py-2 w-full font-secondary">
                              <div className="flex justify-between">
                                <div className="text-left">{cd.title}</div>
                                <div>
                                  {' '}
                                  {open ? (
                                    <MinusIcon className="h-4 w-4" />
                                  ) : (
                                    <PlusIcon className="h-4 w-4" />
                                  )}
                                </div>
                              </div>
                            </Disclosure.Button>
                            <hr className="border-yellowColorDark mb-2" />
                            <Disclosure.Panel className="text-gray-500">
                              <div className="border p-[19px] md:flex">
                                <div>
                                  <div className="h-52 mb-2 md:mr-6 overflow-hidden rounded-lg md:w-[320px] md:h-[300px]">
                                    <Image
                                      // src="/assets/images/course1.jpeg"
                                      src={`${ImageUrl}${cd.courseImage.data.attributes.url}`}
                                      alt="course image"
                                      width={800}
                                      height={800}
                                    />
                                  </div>
                                  <div className="flex justify-center items-center">
                                    <p
                                      className="p14 font-secondary flex items-center cursor-pointer text-center"
                                      onClick={() => setOpen(true)}
                                    >
                                      preview <br /> this course
                                    </p>

                                    <ModalVideo
                                      channel="youtube"
                                      youtube={{ mute: 0, autoplay: 0 }}
                                      isOpen={isOpen}
                                      videoId={cd.coursePreviewUrl}
                                      onClose={() => setOpen(false)}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="md:grid md:grid-cols-3 gap-5">
                                    <p className="p14 font-secondary">
                                      CEU: {cd.ceu}{' '}
                                    </p>
                                    <p className="p14 font-secondary md:col-span-2">
                                      Instructor: {cd.instructor}
                                    </p>
                                    <p className="p14 font-secondary">
                                      Date: {cd.date}
                                    </p>
                                    <p className="p14 font-secondary">
                                      Reviews:{' '}
                                      <StarRating rating={cd.totalRating} />
                                      {cd.review}
                                    </p>
                                  </div>
                                  <p className="p14 font-secondaryLight">
                                    <span className="p14 font-secondary">
                                      Course Description:
                                    </span>
                                    {cd.description}
                                  </p>
                                  <div className="md:grid md:grid-cols-3 gap-5">
                                    <p className="p14 font-secondary flex items-center">
                                      Price: $ {cd.price}
                                    </p>

                                    <div className="md:col-span-2">
                                      <Button
                                        click={() => addToCart(cd)}
                                        name="ADD TO BASKET"
                                        cssName="hover:bg-yellowColor"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Disclosure.Panel>
                          </div>
                        )}
                      </Disclosure>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {/* {bundle?.map(({ attributes: c, id }) => {
          return ( */}
        {/* <div key={id} className=""> */}
        <div className="">
          <div className="coursetitle m-p48 px-8 pt-14 text-center  font-primary text-yellowColorDark">
            {/* {c.bundleName} */}course bundle
          </div>
          <div className="font-primary text-center pt-14 text-[20px]">
            SAVE MONEY AND GET MORE CREDITS WITH OUR SUPER BUNDLES
          </div>
          <div className="py-16 px-8 md:px-0">
            {bundle?.map(({ attributes: c, id }) => {
              c.bundleId = id;
              c.type = 'bundle';
              return (
                <React.Fragment key={id}>
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <Disclosure.Button className="py-2 w-full font-secondary">
                          <div className="flex justify-between">
                            <div>{c.bundleName}</div>
                            <div>
                              {open ? (
                                <MinusIcon className="h-4 w-4" />
                              ) : (
                                <PlusIcon className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </Disclosure.Button>
                        <hr className="border-yellowColorDark mb-2" />
                        <Disclosure.Panel className="text-gray-500">
                          <div className="border p-[19px] md:flex">
                            <div>
                              <div className="h-52 mb-2 md:mr-6 overflow-hidden rounded-lg">
                                <Image
                                  src="/assets/images/course1.jpeg"
                                  //src={`${ImageUrl}${c.url}`}
                                  alt="course image"
                                  width={420}
                                  height={240}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="py-2 w-full font-secondary">
                                Course Description:{' '}
                              </div>
                              {c.courses.data.map(({ attributes: cd, id }) => {
                                return (
                                  <React.Fragment key={id}>
                                    <div className="py-2 w-full font-secondary">
                                      <div className="flex justify-between">
                                        <div>- {cd.title}</div>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              })}

                              <div className="">
                                <div className="md:grid md:grid-cols-3 gap-5">
                                  <p className="p14 font-secondary flex items-center">
                                    Price: $ {c.price}
                                  </p>

                                  <div className="md:col-span-2">
                                    <Button
                                      click={() => addToCart(c)}
                                      name="ADD TO BASKET"
                                      cssName="hover:bg-yellowColor"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {/* );
        })} */}
      </div>
    </div>
  );
};

export default Ceu;
