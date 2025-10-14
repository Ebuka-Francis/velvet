'use client';
import React from 'react';
import NextLink from 'next/link';

type LogoSize = 'small' | 'default' | 'large';

interface VelvetLogoProps {
   size?: LogoSize;
   onClose?: () => void;
}

const VelvetLogo: React.FC<VelvetLogoProps> = ({
   size = 'default',
   onClose,
}) => {
   const sizes: Record<LogoSize, string> = {
      small: 'text-lg',
      default: 'text-2xl',
      large: 'text-4xl',
   };

   return (
      <NextLink
         href={'/'}
         onClick={() => onClose?.()}
         style={{
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
         }}
      >
         <div className="flex flex-col items-center justify-center">
            <div className={`font-serif ${sizes[size]} tracking-wider`}>
               <span className="font-light text-gray-800">Velvet</span>
               <span className="font-bold text-purple-900 ml-1">Essence</span>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent mt-1"></div>
         </div>
      </NextLink>
   );
};

export default VelvetLogo;
