// import { useState } from "react";
// import { useNavigate ,useLocation } from "react-router-dom";

// interface ProductProps {
//   images: string[];
//   name: string;
//   description: string;
//   price: string;
//   available: number;
//   seller: {
//     profilePhoto: string;
//     name: string;
//     location: string;
//     contact: string;
//   };
// }

// export default function ProductPage({
//   images,
//   name,
//   description,
//   price,
//   available,
//   seller,
// }: ProductProps) {
//   const [currentImage, setCurrentImage] = useState(0);
//  const navigate = useNavigate();
//  const handleClick = () => {
//    navigate("/prodseller");
//  };
//    const location = useLocation();
//    const searchParams = new URLSearchParams(location.search);
//    const contentId = searchParams.get("id");
//    const owner = searchParams.get("owner");


//   return (
    
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
//         {/* Product Images */}
//         <div className="relative w-full h-80 flex items-center justify-center bg-gray-200 rounded">
//           <img
//             src={images[currentImage]}
//             alt={name}
//             className="max-h-72 object-contain"
//           />
//           <div
//             className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer"
//             onClick={() =>
//               setCurrentImage((prev) =>
//                 prev > 0 ? prev - 1 : images.length - 1
//               )
//             }
//           >
//             ⬅️
//           </div>
//           <div
//             className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
//             onClick={() =>
//               setCurrentImage((prev) =>
//                 prev < images.length - 1 ? prev + 1 : 0
//               )
//             }
//           >
//             ➡️
//           </div>
//         </div>

//         {/* Thumbnail Images */}
//         <div className="flex mt-3 space-x-2 overflow-x-auto">
//           {images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               alt={`Thumbnail ${index}`}
//               className={`w-20 h-20 object-cover rounded cursor-pointer ${
//                 index === currentImage ? "border-2 border-black" : ""
//               }`}
//               onClick={() => setCurrentImage(index)}
//             />
//           ))}
//         </div>

//         {/* Product Info */}
//         <h1 className="text-3xl font-bold mt-4">{name}</h1>
//         <p className="text-gray-600 mt-2">{description}</p>
//         <p className="text-2xl font-semibold mt-2">{price}</p>
//         <p
//           className={`mt-1 ${
//             available > 0 ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {available > 0 ? `In Stock: ${available}` : "Out of Stock"}
//         </p>

//         {/* Seller Info */}
//         <div className="flex items-center mt-6 p-4 border-t" 
//         onClick={handleClick}>
//           <img
//             src={seller.profilePhoto}
//             alt={seller.name}
//             className="w-16 h-16 rounded-full object-cover border mr-4"
//           />
//           <div>
//             <p className="font-bold text-lg">{seller.name}</p>
//             <p className="text-gray-500">{seller.location}</p>
//             <p className="text-blue-600 cursor-pointer mt-1">
//               {seller.contact}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../../CONFIG";

interface Product {
  name: string;
  description: string;
  price: number;
  available: number;
  multipleImages: string[];
  color: string;
  clothingforwho: string;
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
        <p className="text-gray-900 mt-2"> Color:{product.color}</p>
        <p className="text-gray-900 mt-2">Type:{product.clothingforwho}</p>
        <p className="text-2xl font-semibold mt-2">Price: ₹{product.price}</p>
        <p
          className={`mt-1 ${
            product.available > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.available > 0
            ? `In Stock: ${product.available}`
            : "Out of Stock"}
        </p>

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

