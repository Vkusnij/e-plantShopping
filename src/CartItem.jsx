import React from 'react';
import './CartItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item.cost.toString().substring(1));
      total += price * item.quantity;
    });
    return total;
  };

  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.toString().substring(1));
    return price * item.quantity;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 className="total_cart_amount">
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cartItems.map((item, index) => (
        <div className="cart-item" key={index}>
          <div className="cart-item-image">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="cart-item-details">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-cost">{item.cost}</p>

            <div className="cart-item-quantity">
              <button
                className="cart-item-button"
                onClick={() => handleDecrement(item)}
              >
                -
              </button>
              <span className="cart-item-quantity-value">
                {item.quantity}
              </span>
              <button
                className="cart-item-button"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>

            <p className="cart-item-total">
              Total: ${calculateTotalCost(item)}
            </p>

            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button
          className="get-started-button1 continue_shopping_btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          className="get-started-button1"
          onClick={handleCheckoutShopping}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
