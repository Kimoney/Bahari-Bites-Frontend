import React from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import SidebarCheckout from '../SidebarCheckout/SidebarCheckout';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQuantity, addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row pt-20 justify-center gap-8 px-4 lg:px-16 mt-8">
      <div className="w-full lg:w-8/12">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-4">
        <h1 className="text-2xl font-bold text-orange-500 mb-6 text-left">Shopping Cart</h1>
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl font-bold mb-4">Your cart is empty</p>
              <Link 
                to="/menu" 
                className="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block"
              >
                Shop More
              </Link>
            </div>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left py-2 px-4">Product</th>
                  <th className="text-left py-2 px-4">Price</th>
                  <th className="text-left py-2 px-4">Quantity</th>
                  <th className="text-left py-2 px-4">Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-4 flex items-center">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="h-[1.5cm] w-auto rounded-lg mr-4" 
                      />
                      <span className="font-bold">{item.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">KES {item.price}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="bg-orange-500 text-white p-2 rounded-lg"
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="bg-orange-500 text-white p-2 rounded-lg"
                        >
                          <FiPlus />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="bg-red-500 text-white p-2 rounded-lg"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">KES {item.price * item.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-left py-4">
                    <Link 
                      to="/menu" 
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-4 inline-block"
                    >
                      Shop More
                    </Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
      <div className="w-full lg:w-4/12 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        <SidebarCheckout totalPrice={totalPrice} cart={cart} />
      </div>
    </div>
  );
};

export default Cart;
