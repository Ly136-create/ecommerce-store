import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
      setFilteredProducts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight text-balance">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">ShopHub</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Discover amazing products at unbeatable prices. Quality meets affordability in our curated collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products" className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </Link>
              <Link to="#features" className="inline-flex items-center text-white hover:text-gray-200 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto container-padding py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Explore our handpicked selection of premium products</p>
          </div>
          <div className="w-full lg:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 pr-4 py-4 text-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto container-padding pb-20">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-red-200">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 text-red-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Products</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchProducts}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all products</p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn-primary"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="gradient-bg py-20" id="features">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose ShopHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience shopping like never before with our premium features and exceptional service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">Enjoy free shipping on all orders over $50. Fast and reliable delivery worldwide.</p>
            </div>
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">Your payments are protected with bank-level security. Multiple payment options available.</p>
            </div>
            <div className="text-center group">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Easy Returns</h3>
              <p className="text-gray-600 leading-relaxed">Not satisfied? Return any item within 30 days for a full refund. No questions asked.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

