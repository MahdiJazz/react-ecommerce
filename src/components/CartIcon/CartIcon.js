import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = ({ itemCount }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <FaShoppingCart size={24} /> {/* آیکون سبد خرید */}
      {itemCount > 0 && (
        <Badge
          bg="danger"
          pill
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            fontSize: '0.8rem',
            padding: '4px 6px',
            borderRadius: '50%',
          }}
        >
          {itemCount}
        </Badge>
      )}
    </div>
  );
};

export default CartIcon;
