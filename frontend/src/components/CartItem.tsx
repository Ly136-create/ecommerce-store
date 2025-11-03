import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-primary-700 transition-colors duration-200">
          {item.name}
        </h3>
        <p className="text-primary-600 font-bold text-lg">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-white hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
          disabled={item.quantity <= 1}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-12 text-center font-bold text-gray-900 bg-white rounded-md py-2">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-white hover:bg-green-50 hover:text-green-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right min-w-[120px]">
        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
        <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 group/remove"
        title="Remove item"
      >
        <svg className="w-5 h-5 group-hover/remove:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;

