import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const AdminProductList = () => {
  const { products, deleteProduct,loading } = useProducts();
 const [deletingId, setDeletingId] = useState(null);

 

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
    const token = localStorage.getItem("token");
    setDeletingId(id)
    await deleteProduct(id, token);
    setDeletingId(null)
    toast.success("Product deleted");
  } catch (err) {
    toast.error("Failed to delete product");
  }
  };
   if (loading) {
  return <div className="text-center mt-10">Loading products...</div>;
  }
  
  if (!loading && products.length === 0) {
  return <div className="text-center mt-10">No products found</div>;
}


  return (
    <div className="p-6 w-[700px] md:w-[850px] mx-auto">
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center p-4 border rounded"
          >
            <div>
              <h2 className="font-semibold">{p.title}</h2>
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
                disabled={deletingId === p._id}
                onClick={()=>handleDelete(p._id)}
               className={`px-3 py-1 rounded text-white ${
                   deletingId === p._id ? "bg-gray-400" : "bg-red-500"
                }`}
                   >
               {deletingId === p._id ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductList;
