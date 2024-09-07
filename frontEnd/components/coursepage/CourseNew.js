'use client';
import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Button from '../Button';
import StarRating from './StarRating';
import { Disclosure } from '@headlessui/react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';

const CourseNew = ({ courseData }) => {
  const { addItem, cartDetails } = useShoppingCart();
  const [isOpen, setOpen] = useState(false);

  const addToCart = (course) => {
    const existingCartItem = cartDetails[course.title];
    if (existingCartItem && existingCartItem.quantity >= 1) {
      return;
    }
    addItem(course);
  };

  const ImageUrl = 'https://aba.ravimehra.in';
  return (
    <div className="px-8">
      <div>
        {courseData?.map((cd) => {
          cd.courseId = cd.id;

          return (
            <React.Fragment key={cd.id}>
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
                          <div className="h-72 mb-2 md:mr-6 overflow-hidden rounded-lg md:w-[320px] md:h-[300px]">
                            <Image
                              // src="/assets/images/course1.jpeg"
                              src={`${ImageUrl}${cd.courseImage.url}`}
                              alt="course image"
                              width={800}
                              height={800}
                            />
                          </div>
                          <div className="flex justify-center items-center">
                            <p
                              className="p14 font-secondary flex items-center cursor-pointer underline text-center"
                              onClick={() => setOpen(true)}
                            >
                              preview <br />
                              this course
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
                            <p className="p14 font-secondary">CEU: {cd.ceu} </p>
                            <p className="p14 font-secondary md:col-span-2">
                              Instructor: {cd.instructor}
                            </p>
                            <p className="p14 font-secondary">
                              Date: {cd.date}
                            </p>
                            <p className="p14 font-secondary">
                              Reviews: <StarRating rating={cd.totalRating} />{' '}
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
};

export default CourseNew;
