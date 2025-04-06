

  import { useState, useEffect } from "react";
  import axios from "axios";
  import { BACK_END_URL } from "../../CONFIG";
  import { useNavigate } from "react-router-dom";

  
 

 export interface Product {
   _id: string;
   images: string[]; // Base64 images
   name: string;
   description: string;
   price: string;
   available: number;
   clothingforwho :string;
   color:string;
 }

  function SellerAddProduct() {
    const navigate = useNavigate();
    const [, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [contents, setContents] = useState<Content[]>([]);
    const [newProduct, setNewProduct] = useState<Omit<Product, "_id">>({
      images: [],
      name: "",
      description: "",
      price: "",
      available: 0,
      clothingforwho: "Men",
      color: "",
    });
    interface Content {
      _id: string;
      name: string;
      description: string;
      price: number;
      available: number;
      multipleImages: string[];
      clothingforwho: string;
      color: string;
    }
   
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
   
    useEffect(() => {
      // Fetch all content
      //  fetch("http://localhost:3000/api/v1/contents")
      //    .then((res) => res.json())
      //    .then((data) => setContents(data))
      //    .catch((err) => console.error(err));

      const token = localStorage.getItem("token"); // Might be null

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }), // Only include if token exists
      };

      fetch(`${BACK_END_URL}/api/v1/contents`, {
        method: "GET",
        headers, 
      })
        .then((res) => res.json())
        .then((data) => setContents(data))
        .catch((err) => console.error("Error fetching contents:", err));
    }, []);

    // ✅ Handle Product Addition
    const handleAddProduct = async () => {
      try {
        const response = await axios.post(
          BACK_END_URL + "/api/v1/upload",
          newProduct,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        setProducts((prev) => [
          ...prev,
          { ...newProduct, _id: response.data._id },
        ]);
        setShowForm(false);
        setNewProduct({
          images: [],
          name: "",
          description: "",
          price: "",
          available: 0,
             clothingforwho :"",
   color:""
        });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    // ✅ Handle Image Upload (Base64 Encoding)
    const handleImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        const base64Images = await Promise.all(
          files.map((file) => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
            });
          })
        );
        setNewProduct((prev) => ({ ...prev, images: base64Images }));
      }
    };

    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

        {/* ✅ Add Product Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ✙ Add Product
        </button>
        <br />

       
        {showForm && (
          <div className="mt-6 p-6 border rounded-lg shadow-md bg-white">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="block w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="block w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="block w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="block w-full border p-2 rounded mb-2"
            />
            <input
              type="number"
              placeholder="Available"
              value={newProduct.available}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  available: Number(e.target.value),
                })
              }
              className="block w-full border p-2 rounded mb-4"
            />
            <input
              type="text"
              placeholder="color"
              value={newProduct.color}
              onChange={(e) =>
                setNewProduct({ ...newProduct, color: e.target.value })
              }
              className="block w-full border p-2 rounded mb-4"
            />
            <select
              name="forwhom"
              id="Unisex"
              className="bg-white p-2 w-full border-1 rounded"
              // @ts-ignore
              defaultValue="Men"
              required
              onChange={(e) =>
                setNewProduct({ ...newProduct, clothingforwho: e.target.value })
              }
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </select>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddProduct}
            >
              Save Product
            </button>
          </div>
        )}
        <br />
        {/* ✅ Display Retrieved Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100">
          {contents.map((content) => (
            <div
              key={content._id}
              className="bg-white backdrop-blur-lg shadow-xl rounded-2xl p-5 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {content.name}
              </h3>
              <hr />
              <p className="text-gray-600 mt-2">{content.description}</p>
              <p className="text-gray-900 mt-2"> Color : {content.color}</p>
              <p className="text-gray-900 mt-2">
                Type : {content.clothingforwho}
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Price : <span className="text-blue-600">₹{content.price}</span>
              </p>
              <p className="text-green-600 font-medium mt-1">
                Available: {content.available}
              </p>

              {/* Image Section */}
              <div className="flex flex-wrap gap-3 mt-4">
                {/* {content.multipleImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Content ${index}`}
                className="w-24 h-24 object-cover rounded-lg border border-gray-300"
              />
            ))} */}
                {content.multipleImages.length > 0 && (
                  <img
                    src={content.multipleImages[0]} // Display only the first image
                    alt={`Content Image`}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300 mt-4"
                  />
                )}
              </div>

              {/* Action Button */}
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                onClick={() => navigate(`/product-details/${content._id}`)}
              >
                Update Details
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default SellerAddProduct;
