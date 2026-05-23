import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const { data } = await API.get("/cart");
          setCart(data.items || []);
        } catch (err) {
          console.error("Failed to load cart:", err);
        }
      } else {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setCart(guestCart);
      }
    };
    loadCart();
  }, [user]);

  const addToCart = async (product, quantity) => {
    quantity = Number(quantity);
    const { data } = await API.post("/cart/add", {
      productId: product._id,
      quantity,
    });

    setCart(data.items);
  };

  // Update quantity
  const updateQty = async (productId, qty) => {
    if (!user) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const item = guestCart.find((i) => i.productId === productId);
      if (item) item.qty = qty;

      localStorage.setItem("guestCart", JSON.stringify(guestCart));
      setCart(guestCart);
      return;
    }

    const { data } = await API.put("/cart/update", { productId, qty });
    setCart(data.items);
  };

  // Remove item
  const removeFromCart = async (productId) => {
    if (!user) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const updated = guestCart.filter((i) => i.productId !== productId);

      localStorage.setItem("guestCart", JSON.stringify(updated));
      setCart(updated);
      return;
    }

    const { data } = await API.delete(`/cart/remove/${productId}`);
    setCart(data.items);
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) {
      localStorage.removeItem("guestCart");
      setCart([]);
      return;
    }

    const { data } = await API.delete("/cart/clear");
    setCart(data.items);
  };

  // Merge guest cart after login
  const mergeGuestCart = async () => {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (guestCart.length === 0) return;

    const { data } = await API.post("/cart/merge", { guestCart });
    localStorage.removeItem("guestCart");
    setCart(data);
  };

  const increaseQty = async (productId) => {
    const item = cart.find((i) =>
      user ? i.product._id === productId : i.productId === productId,
    );

    if (!item) return;

    const newQty = user ? item.quantity + 1 : item.qty + 1;

    await updateQty(productId, newQty);
  };

  const decreaseQty = async (productId) => {
    const item = cart.find((i) =>
      user ? i.product._id === productId : i.productId === productId,
    );

    if (!item) return;

    const currentQty = user ? item.quantity : item.qty;

    if (currentQty === 1) {
      await removeFromCart(productId);
    } else {
      await updateQty(productId, currentQty - 1);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        mergeGuestCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
