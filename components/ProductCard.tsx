
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onProductClick: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
    return (
        <div 
            onClick={() => onProductClick(product.id)}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            <div className="w-full h-56 bg-gray-200 overflow-hidden">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
            </div>
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 m-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View
            </div>
        </div>
    );
};

export default ProductCard;
