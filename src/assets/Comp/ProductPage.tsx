

import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../../CONFIG";


import { QRCodeCanvas } from "qrcode.react";
// import { toPng } from "html-to-image";
import { useRef } from "react";

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
 


const qrRef = useRef<HTMLDivElement>(null);
 const [isCanvasReady, setIsCanvasReady] = useState(false);

// const downloadQR = () => {
//   if (!qrRef.current) return;
//   toPng(qrRef.current)
//     .then((dataUrl) => {
//       const link = document.createElement("a");
//       link.download = "qr-code.png";
//       link.href = dataUrl;
//       link.click();
//     })
//     .catch((err) => console.error("QR download error:", err));
// };
useEffect(() => {
  const timer = setTimeout(() => {
    setIsCanvasReady(true); // Mark canvas as ready after it's been rendered
  }, 100); // Add a small delay to ensure QR code has time to render
  return () => clearTimeout(timer);
}, []);

const downloadQR = () => {
  if (!isCanvasReady) return; // Wait until the QR canvas is ready

  const canvas = qrRef.current?.querySelector("canvas");
  if (canvas) {
    const dataUrl = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qr-code.png";
    link.click();
  }
};



  const [product, setProduct] = useState<Product | null>(null);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

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
        
        <div className="flex items-center justify-center gap-x-4 mt-2">
         
          <div
            ref={qrRef}
            style={{ visibility: "hidden", height: 0, width: 0 }}
          >
            <QRCodeCanvas value={window.location.href} size={128} />
          </div>

          <button
            onClick={downloadQR}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white font-medium text-base shadow hover:scale-105 transform transition duration-300"
          >
            📥 Download QR Code
          </button>
        </div>
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

