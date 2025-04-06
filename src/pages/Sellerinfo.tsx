// import { useState } from "react";

// type SellerFormData = {
//   profilepic: string;
//   name: string;
//   location: string;
//   contact: string;
// };

// export default function SellerForm() {
//   const [formData, setFormData] = useState<SellerFormData>({
//     profilepic: "",
//     name: "",
//     location: "",
//     contact: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
//      e.preventDefault();
//      const token = localStorage.getItem("token"); // Might be null
 
//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//     ...(token && { Authorization: token }), // Only include if token exists
//   };


//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/api/v1/Sellerinfo", {
//         method: "POST",
//         headers,
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       console.log("Response:", data);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Seller Registration
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium">
//             Profile Picture URL
//           </label>
//           <input
//             type="text"
//             name="profilepic"
//             value={formData.profilepic}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             placeholder="Enter image URL"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             placeholder="Enter name"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             placeholder="Enter location"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium">Contact</label>
//           <input
//             type="text"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             placeholder="Enter contact info"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../CONFIG";
import img from "../assets/Img/img.jpg"
type SellerFormData = {
  Profilepic: string;
  name: string;
  location: string;
  contact: string;
};

export default function SellerForm() {
  
    const navigate =useNavigate()
  const [formData, setFormData] = useState<SellerFormData>({
    Profilepic: ""  ,
    name: "",
    location: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFormData({ ...formData, Profilepic: reader.result as string });
      };
      reader.onerror = (error) => {
        console.error("Error uploading image:", error);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    };

    try {
      const response = await fetch(`${BACK_END_URL}/api/v1/Sellerinfo`, {
        method: "POST",
        headers,
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
      console.log("Profile submitted:", data);
      localStorage.setItem("sellerProfileComplete", "true"); // Set profile complete flag
      navigate("/Owner")
      
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
    

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Seller Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        {formData.Profilepic && (
          <img
            src={formData.Profilepic || img}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter location"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter contact info"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
