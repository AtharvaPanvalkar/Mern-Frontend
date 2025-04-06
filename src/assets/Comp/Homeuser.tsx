import { useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export default function Homeuser() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    sessionStorage.removeItem("token"); // (If stored there too)
    navigate("/"); // Redirect to login page
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar title="Dashboard">
        <SidebarItem
          text="Home"
          onClick={() => {
            navigate("/");
          }}
        />
        {/* <SidebarItem
          text="Archived"
          onClick={() => {
            navigate("/");
          }}
        /> */}
        <SidebarItem text="Logout" onClick={handleLogout} />
      </Sidebar>

      {/* Main Content */}
      <div className="p-4 ml-72 w-full">
        {/* Search Bar */}
        <SearchBar />

        {/* Product Cards */}
        <div className="flex justify-center items-center min-h-screen  flex-wrap gap-4 mt-4">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
