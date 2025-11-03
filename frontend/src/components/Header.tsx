import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-primary-600 rounded-lg group-hover:bg-primary-700 transition-colors duration-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">ShopHub</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-200 relative group">
                My Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
            )}
          </div>

          {/* Right Side - Cart & Auth */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-all duration-200 hover:scale-110 group">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 font-medium hidden sm:block">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 hover:bg-red-50 px-2 py-1 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white py-4 px-2">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              {!user && (
                <div className="flex space-x-2 pt-2">
                  <Link to="/login" className="btn-secondary text-sm flex-1 text-center">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-sm flex-1 text-center">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

