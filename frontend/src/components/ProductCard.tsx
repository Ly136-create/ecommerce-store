import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card group hover-lift cursor-pointer">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-100 aspect-square rounded-t-lg">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-16 h-16 text-gray-400 group-hover:text-gray-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg px-3 py-1 bg-red-600 rounded-full">Out of Stock</span>
          </div>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200 line-clamp-2 group-hover:text-primary-700">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105 active:scale-95 shadow-sm hover:shadow-md'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

