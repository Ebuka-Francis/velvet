import React from 'react';
// import Image from 'next/image';

import { showRoom1 } from '@/data/data';
import ProductItem from './ProductItem';

export default function ProductCard1() {
   return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
         {showRoom1.map((product) => (
            <ProductItem
               key={product.id}
               title={product.title}
               id={product.id}
               price={product.price}
               image={product.image}
               description={product.description}
               rating={product.rating}
            />
         ))}
      </div>
   );
}
