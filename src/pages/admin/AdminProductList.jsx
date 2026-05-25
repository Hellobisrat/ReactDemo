import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";
import { API } from "../../api/axios";

const AdminProductList = () => {
  const { products, fetchProducts } = useProducts();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500">${p.price}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/admin/products/${p._id}/edit`}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
