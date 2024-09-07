import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Button from './Button';
import { useShoppingCart } from 'use-shopping-cart';
import { TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const Cart = ({ openCart, setOpenCart }) => {
  const { cartCount, cartDetails, removeItem, clearCart, totalPrice } =
    useShoppingCart();
  const removeItemFromCart = (entry) => {
    removeItem(entry.id);
  };

  const handleEmptyCart = () => {
    clearCart();
  };

  return (
    <div className="z-10 absolute overflow-hidden">
      {openCart && (
        <div className="w-screen h-screen p-5 flex flex-col fixed bg-yellowColor top-0 right-0 md:w-1/2">
          <button onClick={() => setOpenCart(false)}>
            <div className="flex justify-end">
              <XMarkIcon className="h-10 w-10 stroke-[3]" />
            </div>
          </button>
          <p className="font-primary text-center  pt-5 p24">Your Cart</p>
          {cartCount && cartCount > 0 ? (
            <div className="overflow-auto">
              {Object.values(cartDetails ?? {}).map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between pt-12 pb-6 relative"
                >
                  <p className="font-secondary tracking-[1.12px]">
                    {entry.title ? entry.title : entry.bundleName}
                    <span className="font-secondaryLight absolute top-[95px] tracking-[1.12px] left-0">
                      {entry.ceu}
                    </span>
                  </p>
                  <p className="font-secondary tracking-[1.12px]">
                    ${entry.price}.00
                    <span className="font-secondaryLight absolute top-[95px] right-0 ">
                      <button onClick={() => removeItemFromCart(entry)}>
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </span>
                  </p>
                </div>
              ))}
              <div className="border-y-[1px] py-1 flex tracking-[1.6px] justify-between font-primary text-[20px] mt-20 mb-10">
                <p>Price in USD</p>
                <p>$ {totalPrice}.00</p>
              </div>

              <div className="flex justify-between">
                <Button
                  click={() => handleEmptyCart()}
                  cssName="hover:bg-whiteColor hidden"
                  name="EMPTY"
                />
                <Link href="/checkout" onClick={() => setOpenCart(false)}>
                  <Button cssName="hover:bg-whiteColor" name="CHECK OUT" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-3/4">
              <Image
                src="/assets/images/empty-cart.png"
                width={400}
                height={800}
                alt="Empty Cart"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
