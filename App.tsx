
import React, { useState, useCallback, useEffect } from 'react';
import { User, Product, CartItem, Order, Role, View } from './types';
import { MOCK_PRODUCTS } from './constants';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import OrderHistoryView from './components/OrderHistoryView';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [view, setView] = useState<View>('products');
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    const handleLogin = (role: Role) => {
        setCurrentUser({
            id: 'user-123',
            name: role === 'admin' ? 'Admin User' : 'Customer',
            email: role === 'admin' ? 'admin@example.com' : 'customer@example.com',
            role: role,
        });
        setView('products');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('products');
    };

    const navigate = (newView: View) => {
        setView(newView);
    };

    const viewProduct = (productId: number) => {
        setSelectedProductId(productId);
        setView('product_detail');
    };
    
    const addToCart = useCallback((product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { product, quantity }];
        });
    }, []);

    const updateCartQuantity = useCallback((productId: number, newQuantity: number) => {
        setCart(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.product.id !== productId);
            }
            return prevCart.map(item =>
                item.product.id === productId ? { ...item, quantity: newQuantity } : item
            );
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);
    
    const placeOrder = (orderDetails: Omit<Order, 'id' | 'userId' | 'items' | 'date' | 'total'>) => {
        if (!currentUser) {
            alert("Please log in to place an order.");
            return;
        }
        const newOrder: Order = {
            id: `order-${Date.now()}`,
            userId: currentUser.id,
            items: cart,
            total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            date: new Date().toISOString(),
            ...orderDetails
        };
        setOrders(prevOrders => [...prevOrders, newOrder]);
        clearCart();
        setView('order_history');
    };
    
    const addProduct = useCallback((product: Omit<Product, 'id'>) => {
        const newProduct: Product = {
            ...product,
            id: Date.now(),
        };
        setProducts(prev => [newProduct, ...prev]);
    }, []);
    
    const updateProduct = useCallback((updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    }, []);

    const deleteProduct = useCallback((productId: number) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }, []);

    const renderContent = () => {
        switch (view) {
            case 'products':
                return <ProductList products={products} onProductClick={viewProduct} />;
            case 'product_detail':
                const product = products.find(p => p.id === selectedProductId);
                if (!product) return <ProductList products={products} onProductClick={viewProduct} />;
                return <ProductDetail product={product} onAddToCart={addToCart} onBack={() => setView('products')} />;
            case 'cart':
                return <CartView cart={cart} onUpdateQuantity={updateCartQuantity} onCheckout={() => setView('checkout')} />;
            case 'checkout':
                return <CheckoutView cart={cart} onPlaceOrder={placeOrder} onBack={() => setView('cart')} />;
            case 'order_history':
                if (!currentUser) return <p>Please log in to see your orders.</p>;
                const userOrders = orders.filter(o => o.userId === currentUser.id);
                return <OrderHistoryView orders={userOrders} />;
            case 'admin':
                if(currentUser?.role !== 'admin') {
                    setView('products');
                    return null;
                }
                return <AdminDashboard 
                    products={products}
                    orders={orders}
                    onAddProduct={addProduct}
                    onUpdateProduct={updateProduct}
                    onDeleteProduct={deleteProduct}
                />;
            default:
                return <ProductList products={products} onProductClick={viewProduct} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header
                currentUser={currentUser}
                cartItemCount={cart.reduce((count, item) => count + item.quantity, 0)}
                onNavigate={navigate}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />
            <main className="container mx-auto p-4 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
