

import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../../CONFIG";
import * as QRCode from "qrcode";


interface Product {
  name: string;
  description: string;
  price: number;
  available: number;
  multipleImages: string[];
  color: string;
  clothingforwho: string;
  Size:string;
}

export interface OwnerInfo {
  _id:string;
  name: string;
  contact: string;
  location: string;
  Profilepic: string;
}

export default function ProductPage() {
  const navigate =useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentId = searchParams.get("id");
  const owner = searchParams.get("owner");
 

  const [product, setProduct] = useState<Product | null>(null);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const generateAndDownloadQR = async () => {
    const url = window.location.href;

    try {
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, url, { width: 300 });

      const link = document.createElement("a");
      link.download = "product-page-qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("QR code generation failed:", error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token"); // Might be null
    if (!contentId || !owner) return;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }), // Only include if token exists
    };

    fetch(`${BACK_END_URL}/api/v1/contents/${contentId}?owner=${owner}`, {
      method: "GET",
      headers, // Use dynamically created headers object
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setOwnerInfo(data.ownerInfo);
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [contentId, owner]);

  if (!product || !ownerInfo)
    return <p className="text-center mt-10">Loading product details...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        {/* Product Images */}
        <div className="relative w-full h-80 flex items-center justify-center bg-gray-200 rounded">
          <img
            src={product.multipleImages[currentImage]}
            alt={product.name}
            className="max-h-72 object-contain"
          />
          <div
            className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-2xl"
            onClick={() =>
              setCurrentImage((prev) =>
                prev > 0 ? prev - 1 : product.multipleImages.length - 1
              )
            }
          >
            ⬅️
          </div>
          <div
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-2xl"
            onClick={() =>
              setCurrentImage((prev) =>
                prev < product.multipleImages.length - 1 ? prev + 1 : 0
              )
            }
          >
            ➡️
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="flex mt-3 space-x-2 overflow-x-auto">
          {product.multipleImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer ${
                index === currentImage ? "border-2 border-black" : ""
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        {/* Product Info */}
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-gray-900 mt-2"> Color :{product.color}</p>
        <p className="text-gray-900 mt-2"> Size :{product.Size}</p>
        <p className="text-gray-900 mt-2">Type :{product.clothingforwho}</p>
        <p className="text-2xl font-semibold mt-2">Price : ₹{product.price}</p>
        <p
          className={`mt-1 ${
            product.available > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.available > 0
            ? `In Stock: ${product.available}`
            : "Out of Stock"}
        </p>
        <button
          onClick={generateAndDownloadQR}
          className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Download QR for this page
        </button>

        {/* Seller Info */}
        <div
          className="flex items-center mt-6 p-4 border-t"
          onClick={() => navigate(`/prodseller?id=${ownerInfo._id}`)}
        >
          <img
            src={ownerInfo.Profilepic}
            alt={ownerInfo.name}
            className="w-16 h-16 rounded-full object-cover border mr-4"
          />
          <div>
            <p className="font-bold text-lg">{ownerInfo.name}</p>
            <p className="text-gray-500">{ownerInfo.location}</p>
            <p className="text-blue-600 cursor-pointer mt-1">
              {ownerInfo.contact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

