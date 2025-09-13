
import React, { useState } from 'react';
import { Product } from '../types';
import Button from './common/Button';

interface ProductDetailProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
    onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center rounded-lg"
                        style={{maxHeight: '600px'}}
                    />
                </div>
                <div className="p-8 flex flex-col justify-center">
                    <button onClick={onBack} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 self-start">&larr; Back to shop</button>
                    <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{product.category}</span>
                    <h1 className="text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
                    <p className="text-3xl font-light text-gray-900 my-4">${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-md"
                            >-</button>
                            <span className="px-4 py-2 font-medium">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-md"
                            >+</button>
                        </div>
                        <Button onClick={handleAddToCart} className="flex-grow">
                            Add to Cart
                        </Button>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
