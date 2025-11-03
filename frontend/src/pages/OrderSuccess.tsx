import { Link } from 'react-router-dom';
import Button from '../components/Button';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-2xl font-bold text-primary-600">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>

          <div className="space-y-3">
            <Link to="/orders">
              <Button variant="primary" size="lg" fullWidth>
                View Orders
              </Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" size="lg" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

