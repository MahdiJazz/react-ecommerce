import React, { useState, useEffect } from 'react';
import RoutesConfig from './routes';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userId = localStorage.getItem('userId');

    console.log('app - Checking login state:', { loggedIn, user, userId });

    if (loggedIn && user && userId) {
      console.log('app - Setting user data from localStorage');
      setIsLogin(true);
      setCurrentUser(user);
    } else {
      console.error('app - Invalid user state in localStorage', { loggedIn, user, userId });
    }
  }, []);

  const handleLogin = (user, userId) => {
    console.log('app - Handling login:', { user, userId });

    // Check if userId is undefined or null
    if (!userId || userId === 'undefined') {
      console.error('app - Received invalid userId:', userId);
      return;
    }

    setIsLogin(true);
    setCurrentUser(user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userId', userId); // ذخیره شناسه کاربر به‌طور مستقیم از Login.js
    console.log('app - User logged in and saved to localStorage:', { user, userId });
  };

  const handleLogout = () => {
    console.log('app - Handling logout');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId'); // حذف شناسه کاربر از لوکال‌استوریج

    setIsLogin(false);
    setCurrentUser(null);
    console.log('app - User logged out');
    window.location.reload();
  };

  const removeFromCart = id => {
    console.log('app - Removing item from cart:', id);
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      console.log('app - Setting cart items from localStorage:', storedCartItems);
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    console.log('app - Saving cart items to localStorage:', cartItems);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    console.log('app - Adding item to cart:', item);
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += item.quantity && item.quantity > 0 ? item.quantity : 1;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...item, quantity: item.quantity && item.quantity > 0 ? item.quantity : 1 }];
      }
    });
  };

  const CartItem = ({ item }) => {
    return (
      <div className="cart-item">
        <Link to={`/product/${item.type}/${item.id}`}>
          <img src={item.img} alt={item.title} />
        </Link>
        <Link to={`/product/${item.type}/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <p>تعداد: {item.quantity}</p>
        <p>قیمت: {item.price} تومان</p>
      </div>
    );
  };

  return (
    <div>
      <Navbar
        cartItems={cartItems}
        isLogin={isLogin}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <RoutesConfig
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        handleLogin={handleLogin}
        setCartItems={setCartItems}
        isLogin={isLogin}
        CartItem={CartItem}
        selectedProductQuantity={selectedProductQuantity}
        setSelectedProductQuantity={setSelectedProductQuantity}
      />
    </div>
  );
};

export default App;
