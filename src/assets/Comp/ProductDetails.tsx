

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACK_END_URL } from "../../CONFIG";

interface Product {
  _id: string;
  multipleImages: string[];
  name: string;
  description: string;
  price: string;
  available: number;
  color: string;
  clothingforwho: string;
}

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`${BACK_END_URL}/api/v1/content/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

 
 useEffect(() => {
   axios
     .post(
       `${BACK_END_URL}/api/v1/check`,
       {},
       {
         headers: { Authorization: localStorage.getItem("token") },
       }
     )
     .then((response) => {
       // Handle successful response here (if needed)
       console.log("Owner Info: ", response.data);
     })
     .catch((err) => {
       // If the error is a 404, navigate to the sellerinfo page
       if (err.response && err.response.status === 404) {
         console.log("Owner info not found, navigating to sellerinfo page.");
         navigate("/sellerinfo"); // Navigate to sellerinfo page
       } else {
         // Log any other errors
         console.error("Error fetching product:", err);
       }
     });
 }, [navigate]);

  // 🔥 Handle Product Deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`${BACK_END_URL}/api/v1/content/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Product deleted successfully!");
      navigate("/selleradd"); // Redirect to another page after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // 🔥 Handle Product Update
  const handleUpdate = async () => {
    try {
      await axios.put(`${BACK_END_URL}/api/v1/content/${id}`, product, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // 🔥 Handle Image Deletion
  const handleDeleteImage = async (index: number) => {
    if (!product) return;

    try {
      await axios.delete(
        `${BACK_END_URL}/api/v1/content/${id}/images/${index}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      // Remove the deleted image from state
      const updatedImages = product.multipleImages.filter(
        (_, i) => i !== index
      );
      setProduct({ ...product, multipleImages: updatedImages });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // 🔥 Handle Image Upload (Convert to Base64 before sending)
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        const response = await axios.post(
          `${BACK_END_URL}/api/v1/content/${id}/add-image`,
          { image: base64Image },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        // Update the state with the new image
        if (product) {
          setProduct({
            ...product,
            multipleImages: [...product.multipleImages, response.data.image],
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Product</h1>

      {/* 📝 Product Name */}
      <p> Product Name</p>
      <input
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
      />
      <p>Description</p>
      {/* 📝 Product Description */}
      <input
        type="text"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
        className="block w-full border p-2 rounded mb-2"
      />

      <p>Color</p>
      <input
        type="text"
        value={product.color}
        onChange={(e) => setProduct({ ...product, color: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
      />
      <p>Type</p>
      <select
        name="forwhom"
        id="Unisex"
        className="bg-white p-2 w-full border-1 rounded"
        defaultValue={product.clothingforwho}
        // @ts-ignore
        required
        onChange={(e) =>
          setProduct({ ...product, clothingforwho: e.target.value })
        }
      >
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
        <option value="Unisex">Unisex</option>
      </select>
      {/* 📝 Product Price */}
      <p>Price</p>

      <input
        type="text"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
        className="block w-full border p-2 rounded mb-2"
      />

      {/* 📝 Product Availability */}
      <p>Available</p>
      <input
        type="number"
        value={product.available}
        placeholder="Available"
        onChange={(e) =>
          setProduct({ ...product, available: Number(e.target.value) })
        }
        className="block w-full border p-2 rounded mb-4"
      />

      {/* 🎯 Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleUpdate}
        >
          Update Product
        </button>

        {/* 🚀 Image Upload Button */}
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          id="imageInput"
        />
        <label
          htmlFor="imageInput"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Image
        </label>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          onClick={handleDelete}
        >
          Delete Product
        </button>
      </div>

      {/* 🖼️ Product Images Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Product Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {product.multipleImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-40 object-cover rounded shadow"
              />
              {/* ❌ Delete Image Button */}
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                ⓧ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
