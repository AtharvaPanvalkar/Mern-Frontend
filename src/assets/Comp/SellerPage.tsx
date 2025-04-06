// import ProductCard from "./ProductCard";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { OwnerInfo } from "./ProductPage";
import { Content } from "./ProductCard";
import { BACK_END_URL } from "../../CONFIG";
const SellerPage = () => {
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const ownerID = searchParams.get("id");

  useEffect(() => {
    if (!ownerID) return;

    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    };

    fetch(`${BACK_END_URL}/api/v1/seller/${ownerID}`, {
      method: "GET",
      headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setOwnerInfo(data.ownerInfo);
        setContents(Array.isArray(data.product) ? data.product : []);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setContents([]); // Ensures no `.map()` crash
      });
  }, [ownerID]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      {ownerInfo ? (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg text-center">
          <img
            src={ownerInfo.Profilepic}
            alt={ownerInfo.name}
            className="w-24 h-24 rounded-full object-cover mx-auto border"
          />
          <h1 className="text-2xl font-bold mt-4">{ownerInfo.name}</h1>
          <p className="text-gray-600">{ownerInfo.location}</p>
          <p className="text-blue-600 cursor-pointer mt-1">
            {ownerInfo.contact}
          </p>
        </div>
      ) : (
        <p>Loading seller info...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-100">
        {contents.length > 0 ? (
          contents.map((content) => (
            <div
              key={content._id}
              className="bg-white backdrop-blur-lg shadow-xl rounded-2xl p-5 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {content.name}
              </h3>
              <p className="text-gray-600 mt-2">{content.description}</p>
              <p className="text-gray-600 mt-2">Color : {content.color}</p>
              <p className="text-gray-600 mt-2">Type : {content.clothingforwho}</p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                Price : <span className="text-blue-600">${content.price}</span>
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

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
                onClick={() =>
                  navigate(`/product?id=${content._id}&owner=${content.owner}`)
                }
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default SellerPage;
