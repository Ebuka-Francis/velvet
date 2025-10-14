'use client';
import React, { useState } from 'react';
import { IoMdCart, IoIosContact, IoMdClose } from 'react-icons/io';
import VelvetLogo from '../logo/Logo';
import NextLink from 'next/link';
import useStore from '@/store/useStore';

const TopNav = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
   const cartLength = useStore((state) => state.carts.length);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
   };

   return (
      <>
         <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
               <div className="relative flex h-16 items-center justify-between">
                  {/* Mobile menu button */}
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                     <button
                        type="button"
                        onClick={toggleMobileMenu}
                        className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                     >
                        <span className="sr-only">Open main menu</span>
                        <svg
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth={1.5}
                           aria-hidden="true"
                           className="h-6 w-6"
                        >
                           <path
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                     </button>
                  </div>

                  {/* Desktop Navigation - Left side */}
                  <div className="hidden sm:flex sm:flex-1 sm:items-center">
                     <div className="flex space-x-4">
                        <a
                           href="#"
                           className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100"
                        >
                           Brand
                        </a>
                        <select className="rounded-md px-3 py-2 text-sm font-medium text-black bg-transparent hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500">
                           <option value="">Category</option>
                           <option value="electronics">Electronics</option>
                           <option value="clothing">Clothing</option>
                           <option value="books">Books</option>
                           <option value="home">Home & Garden</option>
                           <option value="sports">Sports</option>
                        </select>
                     </div>
                  </div>

                  {/* Center - Logo */}
                  <div className=" hidden sm:flex shrink-0 items-center">
                     <VelvetLogo />
                  </div>

                  {/* Right side - Cart and Contact */}
                  <div className="flex flex-1 items-center justify-end pr-2 sm:static sm:inset-auto sm:pr-0">
                     <NextLink
                        href="/checkout"
                        style={{
                           textDecoration: 'none',
                           color: 'inherit',
                        }}
                     >
                        <button
                           type="button"
                           className="relative rounded-full p-1 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                           <span className="sr-only">View cart</span>
                           <IoMdCart className="h-6 w-6" />

                           {/* Badge */}
                           {cartLength > 0 && (
                              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                 {cartLength}
                              </span>
                           )}
                        </button>
                     </NextLink>

                     <div className="relative ml-3">
                        <button
                           onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                           className="relative flex rounded-full p-1 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                           <span className="sr-only">Open user menu</span>
                           <IoIosContact className="h-6 w-6" />
                        </button>

                        {/* User dropdown menu */}
                        {isUserMenuOpen && (
                           <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                              <a
                                 href="#"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                 Your profile
                              </a>
                              <a
                                 href="#"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                 Settings
                              </a>
                              <a
                                 href="#"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                 Sign out
                              </a>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </nav>

         {/* Mobile menu overlay */}
         {isMobileMenuOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden transition-opacity duration-300"
               onClick={closeMobileMenu}
            />
         )}

         {/* Mobile menu drawer */}
         <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
               isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
         >
            <div className="flex flex-col h-full">
               {/* Drawer header */}
               <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <VelvetLogo onClose={closeMobileMenu} />
                  <button
                     onClick={closeMobileMenu}
                     className="rounded-md p-2 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                     <span className="sr-only">Close menu</span>
                     <IoMdClose className="h-6 w-6" />
                  </button>
               </div>

               {/* Drawer content */}
               <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-2">
                     <a
                        href="#"
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-100"
                     >
                        Brand
                     </a>
                     <div className="px-3 py-2">
                        <select className="w-full rounded-md px-3 py-2 text-base font-medium text-black border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                           <option value="">Category</option>
                           <option value="electronics">Electronics</option>
                           <option value="clothing">Clothing</option>
                           <option value="books">Books</option>
                           <option value="home">Home & Garden</option>
                           <option value="sports">Sports</option>
                        </select>
                     </div>
                     <a
                        href="#"
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                     >
                        Dashboard
                     </a>
                     <a
                        href="#"
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                     >
                        Team
                     </a>
                     <a
                        href="#"
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                     >
                        Projects
                     </a>
                     <a
                        href="#"
                        onClick={closeMobileMenu}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                     >
                        Calendar
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default TopNav;
