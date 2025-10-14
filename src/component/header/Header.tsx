'use client';
import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function Header() {
   // State to control the visibility of the dropdown
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   // Function to toggle the dropdown state
   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   return (
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-b-2 border-purple-200">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            {/* Mobile Layout */}
            <div className="flex flex-col gap-4 md:hidden">
               <h1 className="text-purple-900 text-3xl sm:text-4xl font-bold tracking-tight">
                  CATALOG
               </h1>
               <div className="flex flex-wrap items-center gap-3">
                  {/* <select className="flex-1 min-w-[120px] rounded-lg px-4 py-2.5 text-sm font-medium text-purple-900 bg-white border-2 border-purple-300 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer transition-all shadow-sm">
                     <option value="">Popular</option>
                     <option value="electronics">Electronics</option>
                     <option value="clothing">Clothing</option>
                     <option value="books">Books</option>
                     <option value="home">Home & Garden</option>
                     <option value="sports">Sports</option>
                  </select> */}
                  <div className="flex items-center gap-3 flex-1 justify-end">
                     {/* <p className="text-sm font-semibold text-purple-700 whitespace-nowrap">
                        17,000 Products
                     </p> */}
                     {/* Mobile Sort Dropdown */}
                     <div className="relative">
                        <button
                           onClick={toggleDropdown}
                           className="flex items-center gap-1.5 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition-colors shadow-md cursor-pointer"
                        >
                           <SlidersHorizontal size={16} />
                           <span>Sort</span>
                        </button>
                        {isDropdownOpen && (
                           <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-purple-200">
                              <button
                                 // Handle Lowest Price click logic here
                                 onClick={() => {
                                    console.log('Sorting by Lowest Price');
                                    setIsDropdownOpen(false); // Close dropdown
                                 }}
                                 className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors cursor-pointer"
                              >
                                 Lowest Price
                              </button>
                              <button
                                 // Handle Highest Price click logic here
                                 onClick={() => {
                                    console.log('Sorting by Highest Price');
                                    setIsDropdownOpen(false); // Close dropdown
                                 }}
                                 className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors cursor-pointer"
                              >
                                 Highest Price
                              </button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex justify-between items-center">
               <h1 className="text-purple-900 text-5xl lg:text-6xl font-bold tracking-tight">
                  CATALOG
               </h1>
               <div className="flex items-center gap-6 lg:gap-8">
                  {/* Desktop Sort Dropdown */}
                  <div className="relative">
                     <button
                        onClick={toggleDropdown}
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition-colors shadow-md"
                     >
                        <SlidersHorizontal size={16} />
                        <span>Sort</span>
                     </button>
                     {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-purple-200">
                           <button
                              // Handle Lowest Price click logic here
                              onClick={() => {
                                 console.log('Sorting by Lowest Price');
                                 setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors"
                           >
                              Lowest Price
                           </button>
                           <button
                              // Handle Highest Price click logic here
                              onClick={() => {
                                 console.log('Sorting by Highest Price');
                                 setIsDropdownOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-800 transition-colors"
                           >
                              Highest Price
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
