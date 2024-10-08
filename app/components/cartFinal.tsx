"use client"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import useStore from '../../useStore';

import dynamic from 'next/dynamic'
 
const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },

  ]

export default function CartFinal(props:any) {
  const [open, setOpen] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const {cartData ,updateCartData,updateTotalCost} = useStore();
  useEffect(()=>{
    const existingCartData = localStorage.getItem("cartTest");
    let totalPrice = 0;

    if (existingCartData) {
      const cartItems = JSON.parse(existingCartData);

      cartItems.forEach((item: { price: number; quantity: number }) => {
        const itemTotalPrice = item.price * item.quantity;
        totalPrice += itemTotalPrice;
      });
    }
    setTotalPrice(totalPrice);
    updateTotalCost(totalPrice);
   },[cartData])
   useEffect(() => {
    const cartDataFromStorage = localStorage.getItem("cartTest");
    if (cartDataFromStorage) {
        const parsedCartData = JSON.parse(cartDataFromStorage);
        updateCartData(parsedCartData);
    }
  }, [ updateCartData]);

  const handleQuantityChange = (id: string, newQuantity: any) => {
    const existingCartData = localStorage.getItem("cartTest");
  
    if (existingCartData) {
      let updatedCartData = JSON.parse(existingCartData);
      const index = updatedCartData.findIndex((item: any) => item.id === id);
  
      if (index !== -1) {
        
        updatedCartData[index].quantity = newQuantity;
  
        localStorage.setItem("cartTest", JSON.stringify(updatedCartData));
        updateCartData(updatedCartData);
      }
    }
  };

  const handleRemove = (index: number)=>{
    const existingCartData = localStorage.getItem("cartTest");

  if (existingCartData) {
    
    let updatedCartData = JSON.parse(existingCartData);

    
    const indexValue = updatedCartData.findIndex((item: any) => item.id === index);

    if (indexValue !== -1) {

      updatedCartData.splice(indexValue, 1);
      updateCartData(updatedCartData);
  
      localStorage.setItem("cartTest", JSON.stringify(updatedCartData));

    }
  }
  }
  console.log(cartData[0]?.price,'price')

  return (
    <>
    <Transition show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => props.setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                            {cartData.length >=1  && cartData[0]?.price !== '' && (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartData.map((product:any,index:number) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <p className="ml-4">{'$'}{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-900 sm:text-gray-900">Qty {product.quantity}</p>
                                    <input
                                       type="number"
                                        min={1}
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                        className="w-16 text-center border border-gray-300 rounded text-gray-900"
                                    />

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={()=>{handleRemove(product.id)}}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
)}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{'$'}{totalPrice}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link href="/payment">
                        <span
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </span>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => props.setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  )
}
