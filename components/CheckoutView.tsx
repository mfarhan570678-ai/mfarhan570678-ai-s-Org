
import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import Button from './common/Button';

interface CheckoutViewProps {
    cart: CartItem[];
    onPlaceOrder: (orderDetails: Omit<Order, 'id' | 'userId' | 'items' | 'date' | 'total'>) => void;
    onBack: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onPlaceOrder, onBack }) => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!shippingAddress.trim() || !name.trim() || !email.trim()) {
            alert("Please fill out all fields.");
            return;
        }
        onPlaceOrder({
            shippingAddress,
            status: 'Pending'
        });
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                        <textarea id="address" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" rows={3} required />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <button type="button" onClick={onBack} className="text-sm text-indigo-600 hover:text-indigo-800">&larr; Back to cart</button>
                        <Button type="submit">Place Order</Button>
                    </div>
                </form>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                    {cart.map(({product, quantity}) => (
                        <div key={product.id} className="flex justify-between items-start">
                           <div className="flex items-center">
                             <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                             <div>
                               <p className="font-semibold text-gray-800">{product.name}</p>
                               <p className="text-sm text-gray-500">Qty: {quantity}</p>
                             </div>
                           </div>
                           <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
                    <div className="flex justify-between text-gray-600"><p>Subtotal</p><p>${subtotal.toFixed(2)}</p></div>
                    <div className="flex justify-between text-gray-600"><p>Taxes (8%)</p><p>${tax.toFixed(2)}</p></div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 mt-2"><p>Total</p><p>${total.toFixed(2)}</p></div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;
