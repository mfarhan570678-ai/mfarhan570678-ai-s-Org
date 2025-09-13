
import React from 'react';
import { User, Role, View } from '../types';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';
import AdminIcon from './icons/AdminIcon';

interface HeaderProps {
    currentUser: User | null;
    cartItemCount: number;
    onNavigate: (view: View) => void;
    onLogin: (role: Role) => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, cartItemCount, onNavigate, onLogin, onLogout }) => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => onNavigate('products')} className="flex-shrink-0 text-2xl font-bold text-gray-800 tracking-wider">
                           GEMINI-C
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <nav className="flex space-x-4">
                            <button onClick={() => onNavigate('products')} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Shop</button>
                            {currentUser && (
                                <button onClick={() => onNavigate('order_history')} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">My Orders</button>
                            )}
                            {currentUser?.role === 'admin' && (
                                <button onClick={() => onNavigate('admin')} className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                                    <AdminIcon /> Admin
                                </button>
                            )}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => onNavigate('cart')} className="relative text-gray-600 hover:text-indigo-600">
                            <ShoppingCartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        <div className="relative">
                            {currentUser ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-700 hidden sm:block">Hi, {currentUser.name}</span>
                                    <button onClick={onLogout} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Logout</button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => onLogin('customer')} className="text-sm font-medium text-gray-600 hover:text-indigo-600">Login</button>
                                    <span className="text-gray-300">|</span>
                                    <button onClick={() => onLogin('admin')} className="text-sm font-medium text-gray-600 hover:text-indigo-600">Admin</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
