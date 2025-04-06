// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// // interface ProductCardProps {
// //   image: string;
// //   name: string;
// //   description: string;
// //   price: string;
// //   available: number;
// // }
//    export interface Content {
//      _id: string;
//      name: string;
//      description: string;
//      price: number;
//      available: number;
//      multipleImages: string[];
//      owner: string;
//      color: string;
//      clothingforwho: string;
//    }
  

// export default function ProductCard() {
//   const [contents, setContents] = useState<Content[]>([]);
//    const navigate = useNavigate();


//      useEffect(() => {
//            // Fetch all content
//           //  fetch("http://localhost:3000/api/v1/contents")
//           //    .then((res) => res.json())
//           //    .then((data) => setContents(data))
//           //    .catch((err) => console.error(err));
          
    
//       const token = localStorage.getItem("token"); // Might be null
    
//       const headers: HeadersInit = {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: token }), // Only include if token exists
//       };
    
//       fetch("http://localhost:3000/api/v1/allcontents", {
//         method: "GET",
//         headers, // Use dynamically created headers object
//       })
//         .then((res) => res.json())
//         .then((data) => setContents(data))
//         .catch((err) => console.error("Error fetching contents:", err));
    
         
//          }, []);
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xxl:grid-col-6 xl:grid-cols-6 lg:grid-cols-5 gap-6 p-6 bg-gray-100 ">
//       {contents.map((content) => (
//         <div
//           key={content._id}
//           className="bg-white backdrop-blur-lg shadow-xl rounded-2xl p-5 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
//           onClick={() =>
//             navigate(`/product?id=${content._id}&owner=${content.owner}`)
//           }
//         >
//           <h3 className="text-xl font-bold text-gray-900">{content.name}</h3>
//           <hr />
//           <p className="text-gray-600 mt-2">{content.description}</p>
//           <p className="text-gray-900 mt-2"> Color : {content.color}</p>
//           <p className="text-gray-900 mt-2">Type : {content.clothingforwho}</p>
//           <p className="text-lg font-semibold text-gray-800 mt-2">
//             Price : <span className="text-blue-600">₹{content.price}</span>
//           </p>
//           <p className="text-green-600 font-medium mt-1">
//             Available: {content.available}
//           </p>

//           {/* Image Section */}
//           <div className="flex flex-wrap gap-3 mt-4">
//             {/* {content.multipleImages.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Content ${index}`}
//                 className="w-24 h-24 object-cover rounded-lg border border-gray-300"
//               />
//             ))} */}
//             {content.multipleImages.length > 0 && (
//               <img
//                 src={content.multipleImages[0]} // Display only the first image
//                 alt={`Content Image`}
//                 className="w-24 h-24 object-cover rounded-lg border border-gray-300 mt-4"
//               />
//             )}
//           </div>
//           {/* <div className="mt-auto">
           
//             <button
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all "
//               onClick={() =>
//                 navigate(`/product?id=${content._id}&owner=${content.owner}`)
//               }
//             >
//               View Details
//             </button>
//           </div> */}
//         </div>
//       ))}
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BACK_END_URL } from "../../CONFIG";

export interface Content {
  _id: string;
  name: string;
  description: string;
  price: number;
  available: number;
  multipleImages: string[];
  owner: string;
  color: string;
  clothingforwho: string;
}

export default function ProductCard() {
  const [contents, setContents] = useState<Content[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    };

    fetch(`${BACK_END_URL}/api/v1/allcontents`, {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((data) => setContents(data))
      .catch((err) => console.error("Error fetching contents:", err));
  }, []);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 sm:p-6 bg-gray-100">
      {contents.map((content) => (
        <div
          key={content._id}
          className="bg-white backdrop-blur-lg shadow-lg rounded-xl p-4 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col"
          onClick={() =>
            navigate(`/product?id=${content._id}&owner=${content.owner}`)
          }
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            {content.name}
          </h3>
          <hr />
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            {content.description}
          </p>
          <p className="text-gray-900 mt-2 text-sm sm:text-base">
            <strong>Color:</strong> {content.color}
          </p>
          <p className="text-gray-900 mt-2 text-sm sm:text-base">
            <strong>Type:</strong> {content.clothingforwho}
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-2">
            Price: <span className="text-blue-600">₹{content.price}</span>
          </p>
          <p className="text-green-600 font-medium mt-1">
            Available: {content.available}
          </p>

          {/* Image Section */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {content.multipleImages.length > 0 && (
              <img
                src={content.multipleImages[0]}
                alt="Product"
                className="w-24 h-24 object-cover rounded-lg border border-gray-300 mt-4"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
