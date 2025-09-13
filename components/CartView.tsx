
import React from 'react';
import { CartItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import Button from './common/Button';

interface CartViewProps {
    cart: CartItem[];
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    onCheckout: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, onUpdateQuantity, onCheckout }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500 bg-white p-8 rounded-lg shadow">Your cart is empty.</p>
            ) : (
                <div className="bg-white rounded-lg shadow-lg">
                    <ul className="divide-y divide-gray-200">
                        {cart.map(({ product, quantity }) => (
                            <li key={product.id} className="flex items-center p-4 sm:p-6">
                                <img src={product.imageUrl} alt={product.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover mr-4 sm:mr-6" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button onClick={() => onUpdateQuantity(product.id, quantity - 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                                        <span className="px-3 py-1 font-medium">{quantity}</span>
                                        <button onClick={() => onUpdateQuantity(product.id, quantity + 1)} className="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                                    </div>
                                    <p className="font-semibold w-20 text-right">${(product.price * quantity).toFixed(2)}</p>
                                    <button onClick={() => onUpdateQuantity(product.id, 0)} className="text-gray-400 hover:text-red-500 ml-2">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="p-6 border-t border-gray-200">
                        <div className="flex justify-end items-center mb-4">
                            <span className="text-lg font-medium text-gray-600 mr-4">Subtotal:</span>
                            <span className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={onCheckout}>Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartView;
