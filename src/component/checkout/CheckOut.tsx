'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdClose, IoMdAdd, IoMdRemove } from 'react-icons/io';
import useStore from '@/store/useStore';
import NextLink from 'next/link';
import Modal from '@/utils/Modal';
import { useState } from 'react';

export default function CheckOut() {
   const router = useRouter();
   const [isModalOpen, setIsModalOpen] = useState(false);

   const cartItems = useStore((state) => state.carts);
   const removeFromCart = useStore((state) => state.removeItemFromCart);
   const incrementItemQuantity = useStore(
      (state) => state.incrementItemQuantity
   );
   const decrementItemQuantity = useStore(
      (state) => state.decrementItemQuantity
   );

   const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );
   const tax = subtotal * 0.08;
   const shipping = subtotal > 500 ? 0 : 500;
   const total = subtotal + tax + shipping;

   const targetPhoneNumber = '+2348147052842';

   const handleConfirm = () => {
      let message =
         'Hello! I would like to confirm my order. Here is my cart:\n\n';
      let total = 0;

      cartItems.forEach((item) => {
         const itemTotal = item.price * item.quantity;
         total += itemTotal;
         message += `${item.quantity}x ${item.title} (₦${item.price.toFixed(
            2
         )}) - Total: ₦${itemTotal.toFixed(2)}\n`;
      });

      message += `\n---`;
      message += `\nSubtotal: ₦${total.toFixed(2)}`;
      message += `\n---`;
      message += `\nPlease provide payment details for this order. Thank you!`;

      // 2. Encode Message and Construct URL
      const encodedMessage = encodeURIComponent(message);

      const cleanNumber = targetPhoneNumber.replace(/[^\d]/g, '');
      const whatsappURL = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

      setIsModalOpen(false);
      router.push('/');
      useStore.setState({ carts: [] });
   };

   return (
      <div className="min-h-screen bg-white lg:px-8">
         <div className="max-w-7xl mx-auto">
            <h1 className=" text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">
               Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Cart Items Section */}
               <div className="lg:col-span-2 space-y-4">
                  {cartItems.length === 0 ? (
                     <div className="bg-purple-50 rounded-lg p-12 text-center">
                        <p className="text-gray-600 text-lg">
                           Your cart is empty
                        </p>
                        <NextLink
                           href="/"
                           passHref
                           style={{
                              textDecoration: 'none',
                              color: 'inherit',
                           }}
                        >
                           <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition cursor-pointer">
                              Continue Shopping
                           </button>
                        </NextLink>
                     </div>
                  ) : (
                     cartItems.map((item) => (
                        <div
                           key={item.id}
                           className="bg-white border border-gray-200 rounded-lg p-[6px] shadow-sm hover:shadow-md transition"
                        >
                           <div className="flex gap-4">
                              {/* Product Image */}
                              <Image
                                 src={item.image}
                                 alt={item.title}
                                 className="w-24 h-29 object-cover rounded-lg"
                                 width={96}
                                 height={96}
                              />

                              {/* Product Details */}
                              <div className="flex-1">
                                 <div className="flex justify-between items-start">
                                    <div>
                                       <h3 className="font-semibold text-gray-900 text-lg">
                                          {item.title}
                                       </h3>
                                       <p className="text-purple-600 font-bold mt-1">
                                          ₦{item.price.toFixed(2)}
                                       </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                       onClick={() => removeFromCart(item.id)}
                                       className="text-gray-400 hover:text-red-500 transition cursor-pointer "
                                    >
                                       <IoMdClose className="h-6 w-6" />
                                    </button>
                                 </div>

                                 {/* Quantity Controls */}
                                 <div className="flex items-center gap-3 mt-4">
                                    <span className="text-sm text-gray-600">
                                       Quantity:
                                    </span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                       <button
                                          onClick={() =>
                                             decrementItemQuantity(item.id)
                                          }
                                          className="p-2 hover:bg-gray-100 rounded-l-lg transition"
                                       >
                                          <IoMdRemove className="h-4 w-4 text-gray-600" />
                                       </button>
                                       <span className="px-4 py-2 font-medium text-gray-900">
                                          {item.quantity}
                                       </span>
                                       <button
                                          onClick={() =>
                                             incrementItemQuantity(item.id)
                                          }
                                          className="p-2 hover:bg-gray-100 rounded-r-lg transition"
                                       >
                                          <IoMdAdd className="h-4 w-4 text-gray-600" />
                                       </button>
                                    </div>
                                    <span className="ml-auto font-semibold text-gray-900">
                                       ₦
                                       {(item.price * item.quantity).toFixed(2)}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  )}
               </div>

               {/* Order Summary Section */}
               <div className="lg:col-span-1">
                  <div className="bg-purple-50 rounded-lg p-6 sticky top-8 border border-purple-100">
                     <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Order Summary
                     </h2>

                     <div className="space-y-4">
                        <div className="flex justify-between text-gray-700">
                           <span>Subtotal</span>
                           <span className="font-medium">
                              ₦{subtotal.toFixed(2)}
                           </span>
                        </div>

                        <div className="flex justify-between text-gray-700">
                           <span>Shipping</span>
                           <span className="font-medium">
                              {shipping === 0
                                 ? 'FREE'
                                 : `₦${shipping.toFixed(2)}`}
                           </span>
                        </div>

                        <div className="flex justify-between text-gray-700">
                           <span>Tax (8%)</span>
                           <span className="font-medium">
                              ₦{tax.toFixed(2)}
                           </span>
                        </div>

                        <div className="border-t border-purple-200 pt-4">
                           <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-gray-900">
                                 Total
                              </span>
                              <span className="text-2xl font-bold text-purple-600">
                                 ₦{total.toFixed(2)}
                              </span>
                           </div>
                        </div>
                     </div>

                     {shipping > 0 && (
                        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                           <p className="text-sm text-purple-800">
                              Add ₦{(500 - subtotal).toFixed(2)} more for free
                              shipping!
                           </p>
                        </div>
                     )}

                     <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={cartItems.length === 0}
                        className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                     >
                        Proceed to Checkout
                     </button>
                     <NextLink
                        href="/"
                        passHref
                        style={{
                           textDecoration: 'none',
                           color: 'inherit',
                        }}
                     >
                        <button className="w-full mt-3 border-2 border-purple-600 text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                           Continue Shopping
                        </button>
                     </NextLink>
                  </div>
               </div>
            </div>
         </div>
         <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
               <p className="text-gray-700 mb-6 leading-relaxed">
                  You can continue this on the owners WhatsApp for more closure
                  and clearance on payment methods.
               </p>
               <div className="flex justify-end space-x-3">
                  <button
                     onClick={() => setIsModalOpen(false)}
                     className="px-5 py-2.5 rounded-md border-2 border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition-colors"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={() => handleConfirm()}
                     className="px-5 py-2.5 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-sm"
                  >
                     Confirm
                  </button>
               </div>
            </div>
         </Modal>
      </div>
   );
}
