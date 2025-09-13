
import React from 'react';
import { Order } from '../types';

interface OrderHistoryViewProps {
    orders: Order[];
}

const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({ orders }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500 bg-white p-8 rounded-lg shadow">You have no past orders.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
                                <div>
                                    <p className="text-sm text-gray-500">Order Placed</p>
                                    <p className="font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-medium text-gray-800">${order.total.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>{order.status}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Order #</p>
                                    <p className="font-mono text-xs text-gray-600">{order.id}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Items</h3>
                                {order.items.map(({product, quantity}) => (
                                    <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100">
                                        <div className="flex items-center">
                                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4"/>
                                            <div>
                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-600">${(product.price * quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistoryView;
