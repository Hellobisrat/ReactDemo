import { createContext, useState, useEffect } from "react";
import { API } from "../api/axios";

export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

  const createProduct = async (productData, token) => {
    const { data } = await API.post("/products", productData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts((prev) => [...prev, data]);
    return data;
  };

  const updateProduct = async (id, productData, token) => {
    const { data } = await API.put(`/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts((prev) =>
      prev.map((p) => (p._id === id ? data : p))
    );

    return data;
  };

  const deleteProduct = async (id, token) => {
    await API.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
