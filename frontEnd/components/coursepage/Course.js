"use client";
import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Button from "../Button";
import StarRating from "./StarRating";

const Course = ({ courseData }) => {
  const [showCourses, setShowCourses] = useState(false);

  const { addItem, cartDetails } = useShoppingCart();

  const addToCart = () => {
    const existingCartItem = cartDetails[courseData.data[0].attributes.title];
    if (existingCartItem && existingCartItem.quantity >= 1) {
      return;
    }
    courseData.data[0].attributes.id = id;
    addItem(courseData.data[0].attributes);
  };
  return (
    <div className="px-8">
      {courseData?.data?.map(({ attributes: cd, id }) => {
        return (
          <div key={id}>
            <button
              onClick={() => setShowCourses(!showCourses)}
              className="flex justify-between items-center w-full py-2"
            >
              <p className="p14 font-secondary text-blackColor ">{cd.title}</p>
              {showCourses == true ? (
                <MinusIcon className="h-4 w-4" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </button>
            <hr className="border-yellowColorDark mb-2" />
            {showCourses && (
              <div className="border p-[19px] md:flex">
                <div className="h-52 mb-8 md:mr-6">
                  <Image
                    src="/assets/images/courseimage.png"
                    alt="course image"
                    width={420}
                    height={240}
                  />
                </div>
                <div className="space-y-4">
                  <div className="md:grid md:grid-cols-3 gap-5">
                    <p className="p14 font-secondary">CEU: {cd.ceu} </p>
                    <p className="p14 font-secondary md:col-span-2">
                      Instructor: {cd.instructor}
                    </p>
                    <p className="p14 font-secondary">Date: {cd.date}</p>
                    <p className="p14 font-secondary">
                      Reviews: <StarRating rating={cd.totalRating} />{" "}
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
                        click={() => addToCart()}
                        name="ADD TO BASKET"
                        cssName="hover:bg-yellowColor"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Course;
