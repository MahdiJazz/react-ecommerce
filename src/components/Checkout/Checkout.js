import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Checkout = ({ isLogin, setSelectedProductQuantity }) => {
  const navigate = useNavigate();

  const handleOrderSubmit = () => {
    if (!isLogin) {
      alert('لطفاً ابتدا وارد سیستم شوید تا بتوانید سفارش خود را ثبت کنید.');
      navigate('/login'); // هدایت به صفحه ورود
    } else {
      alert('سفارش شما ثبت شد!');
      if (typeof setSelectedProductQuantity === 'function') {
        setSelectedProductQuantity(1); // ریست کردن مقدار پس از ثبت سفارش
      }
      navigate('/'); // هدایت به صفحه اصلی یا صفحه‌ای که مدنظرته
    }
  };

  return (
    <div>
      <h2>ثبت سفارش</h2>
      <Button variant="primary" onClick={handleOrderSubmit}>
        ثبت سفارش
      </Button>
    </div>
  );
};

export default Checkout;
