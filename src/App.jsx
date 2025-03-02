import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Yüklenemedi:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex justify-between">
        <div className="w-full sm:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Ürünler;</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.length === 0 ? (
              <p>Ürünler yükleniyor...</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="border p-4 rounded-md">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>{product.category}</p>
                  <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 w-full"
                  >
                    Sepete ekle
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full sm:w-1/3 mt-8 sm:mt-0">
          <h2 className="text-2xl font-bold mb-4">Sepetiniz;</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            {cart.length === 0 ? (
              <p>Sepet boş.</p>
            ) : (
              <div>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-300 px-2 py-1 rounded-md mr-2"
                        >
                          -
                        </button>
                        <span>{item.name} ({item.quantity})</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-300 px-2 py-1 rounded-md ml-2"
                        >
                          +
                        </button>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 ml-4"
                      >
                        Sil
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 font-semibold">
                  <p>Toplam: ${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
