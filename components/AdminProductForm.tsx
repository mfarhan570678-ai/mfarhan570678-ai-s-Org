
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { generateDescription } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';
import SparklesIcon from './icons/SparklesIcon';

interface AdminProductFormProps {
    product?: Product;
    onSubmit: (product: Product | Omit<Product, 'id'>) => void;
    onCancel: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        imageUrl: product?.imageUrl || '',
        category: product?.category || '',
        stock: product?.stock || 0,
    });
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                imageUrl: product.imageUrl,
                category: product.category,
                stock: product.stock,
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value }));
    };

    const handleGenerateDescription = async () => {
        if (!formData.name) {
            alert("Please enter a product name first.");
            return;
        }
        setIsGenerating(true);
        const description = await generateDescription(formData.name);
        setFormData(prev => ({ ...prev, description }));
        setIsGenerating(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (product) {
            onSubmit({ ...product, ...formData });
        } else {
            onSubmit(formData);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product ? 'Edit Product' : 'Add New Product'}</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 disabled:opacity-50">
                    {isGenerating ? <Spinner /> : <SparklesIcon />}
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://picsum.photos/seed/..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">{product ? 'Save Changes' : 'Add Product'}</Button>
            </div>
        </form>
    );
};

export default AdminProductForm;
