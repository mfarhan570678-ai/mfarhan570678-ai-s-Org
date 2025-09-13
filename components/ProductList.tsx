import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import SearchIcon from './icons/SearchIcon';

interface ProductListProps {
    products: Product[];
    onProductClick: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        if (!searchQuery) {
            return products;
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(lowercasedQuery) ||
            product.category.toLowerCase().includes(lowercasedQuery)
        );
    }, [products, searchQuery]);

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    Collections
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Discover our latest collection of futuristic and stylish products.
                </p>
            </div>

            <div className="mb-12 max-w-lg mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm"
                        aria-label="Search products"
                    />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-gray-700">No Products Found</h2>
                    <p className="mt-2 text-gray-500">Try adjusting your search query.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;