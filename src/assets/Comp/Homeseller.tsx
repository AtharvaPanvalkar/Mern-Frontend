import { useEffect } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACK_END_URL } from "../../CONFIG";

export default function Homeseller() {
 
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    sessionStorage.removeItem("token"); 
    navigate("/");
  };

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
 
       console.log("Owner Info: ", response.data);
     })
     .catch((err) => {
      
       if (err.response && err.response.status === 404) {
         console.log("Owner info not found, navigating to sellerinfo page.");
         navigate("/sellerinfo"); 
       } else {
         // Log any other errors
         console.error("Error fetching product:", err);
       }
     });
 }, [navigate]);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar title="Dashboard">
        <SidebarItem
          text="Home"
          onClick={() => {
            navigate("/Owner");
          }}
        />
        <SidebarItem
          text="Manage Products"
          onClick={() => {
            navigate("/selleradd");
          }}
        />
        <SidebarItem text="Logout" onClick={handleLogout} />
      </Sidebar>

      {/* Main Content */}
      <div className="p-4 ml-72 w-full">
        {/* Search Bar */}
        <SearchBar />

        {/* Product Cards */}
        <div className="flex justify-center   max-h-screen flex-wrap gap-4 mt-4  w-full">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
