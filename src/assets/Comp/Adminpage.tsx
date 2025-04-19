import  { useEffect, useState } from "react";
import { BACK_END_URL } from "../../CONFIG";

type Seller = {
  _id: string;
  name: string;
  location: string;
  contact: string;
  Profilepic: string;
  owner: string;
};



const AdminPage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Seller[]>([]);

  useEffect(() => {
    fetch(`${BACK_END_URL}/seller/all`)
      .then((res) => res.json())
      .then((data: Seller[]) => setBusinesses(data))
      .catch((err) => console.error("❌ Error fetching sellers:", err));
  }, []);

  const deleteBusiness = async (ownerId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this business?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${BACK_END_URL}/seller/delete-business/${ownerId}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      alert(result.message);
      setBusinesses((prev) => prev.filter((biz) => biz.owner !== ownerId));
    } catch (err) {
      console.error("❌ Error deleting business:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Registered Businesses</h1>
      {businesses.length === 0 ? (
        <p>No businesses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {businesses.map((biz) => (
            <div key={biz._id} className="bg-white p-4 shadow rounded">
              <img
                src={biz.Profilepic}
                alt={biz.name}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h2 className="text-xl font-semibold mt-2 text-center">
                {biz.name}
              </h2>
              <p className="text-center">{biz.location}</p>
              <p className="text-center text-blue-600">{biz.contact}</p>
              <button
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                onClick={() => deleteBusiness(biz.owner)}
              >
                🗑 Delete Business
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
