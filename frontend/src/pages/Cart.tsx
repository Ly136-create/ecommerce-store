import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();

  const total = getCartTotal();
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.1; // 10% tax
  const grandTotal = total + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link to="/">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-600 text-lg">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
              <Button variant="danger" onClick={clearCart} className="w-full sm:w-auto">
                Clear Cart
              </Button>
              <Link to="/" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                    <p className="text-sm text-primary-700 font-medium">
                      Add ${(50 - total).toFixed(2)} more for free shipping!
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button variant="primary" size="lg" fullWidth>
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Secure SSL encrypted checkout</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Fast & reliable shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

