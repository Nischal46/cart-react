import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearCart,
  decreasedItem,
  getTotal,
  increasedItem,
  removeFromCart,
} from "../Features/cartFeature";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);
  console.log(cart.cartTotalAmount);

  const handleRmoveItems = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreasedItem = (cartItem) => {
    dispatch(decreasedItem(cartItem));
  };

  const handleIncreasedItem = (cartItem) => {
    dispatch(increasedItem(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  console.log(cart);
  return (
    <div className="cart-container">
      <h2>Shopping chart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="emptycard">
          <p>Your cart is empty. Do shop your favourite items</p>
          <div className="startshopping">
            <Link to="/">
              <span>Start Shopping</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-box-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-titles">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div
                className="cart-item"
                key={cartItem.id}
                style={{ background: "whitesmoke" }}
              >
                <div className="cart-product">
                  <img
                    src={cartItem.image}
                    alt={cartItem.name}
                    style={{ width: "180px", height: "180px" }}
                  />
                  <div style={{ paddingTop: "3.5rem" }}>
                    <h3>
                      <strong>{cartItem.title}</strong>
                    </h3>
                    <p>{cartItem.description.slice(0, 150)}....</p>
                    <button onClick={() => handleRmoveItems(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreasedItem(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreasedItem(cartItem)}>
                    +
                  </button>
                </div>
                <div className="cart-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>
              Clear cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>SubTotal:</span>
                <span className="amount">{cart.cartTotalAmount}</span>
              </div>

              <p>Tax and Delivery charge included while checkout</p>
              <button>Check out</button>
              <div className="continueshopping">
                <Link to="/">
                  <span>Continue Shopping</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-box-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
