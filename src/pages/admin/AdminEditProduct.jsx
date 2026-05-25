import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../api/axios";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setForm(data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, form);
      alert("Product updated");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Price"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Image URL"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
