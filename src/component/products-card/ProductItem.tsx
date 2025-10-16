'use client';
import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import useStore from '@/store/useStore';

interface ProductItemProps {
   id: string;
   title: string;
   price: number;
   image: string; // Now expecting a regular URL string
   description?: string;
   rating?: number;
}

export default function ProductItem({
   id,
   title,
   price,
   image,
   description,
   rating = 0,
}: ProductItemProps) {
   const MAX_STARS = 5;
   const addItemToCart = useStore((state) => state.addItemToCart);
   // Dynamic Star Rendering Function
   const renderStars = (currentRating: number) => {
      // Round the rating to the nearest whole number for display
      const actualRating = Math.max(
         0,
         Math.min(MAX_STARS, Math.round(currentRating))
      );
      const stars = [];

      // Render filled stars
      for (let i = 0; i < actualRating; i++) {
         stars.push(
            <Star
               key={`filled-${i}`}
               // Use a smaller size (w-4 h-4) appropriate for a product card
               className="w-4 h-4 fill-yellow-500 text-yellow-500"
            />
         );
      }

      // Render empty/outline stars to complete the 5-star look
      for (let i = actualRating; i < MAX_STARS; i++) {
         stars.push(
            <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
         );
      }
      return stars;
   };

   return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
         <div className="relative h-64 w-full">
            <Image
               src={image}
               alt={title} // Changed from name to title
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
         </div>

         <div className=" p-[10px] sm:p-4">
            <div className="flex flex-col sm:flex-row items-start justify-between sm:gap-2">
               <h3 className="text-[16px] mt-0 mb-0 sm:text-lg font-semibold text-gray-800 sm:mt-1 sm:mb-2">
                  {title}
               </h3>

               {/* Dynamic Star Component Display */}
               {rating > 0 && (
                  <div className="mt-0 flex items-center gap-0 sm:gap-0.5 sm:mt-1 flex-shrink-0">
                     {renderStars(rating)}
                     {/* Display the numerical rating for precision */}
                     <span className="text-xs font-medium text-gray-500 ml-1">
                        ({rating.toFixed(1)})
                     </span>
                  </div>
               )}
            </div>

            {description && (
               <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {description}
               </p>
            )}

            <div className="flex items-center justify-between mt-4">
               <span className="text-[16px] sm:text-xl font-bold text-gray-900">
                  ₦{price.toFixed(2)}
               </span>

               <button
                  onClick={() => addItemToCart({ id, title, price, image })}
                  className="bg-purple-900 text-white px-2 py-1 rounded-full font-medium shadow-md hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105 cursor-pointer"
               >
                  <ShoppingCart />
               </button>
            </div>
         </div>
      </div>
   );
}
