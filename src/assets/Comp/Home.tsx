
import { useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate=useNavigate();

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
        <SidebarItem
          text="Sign up"
          onClick={() => {
            navigate("/signup");
          }}
        />{" "}
        <SidebarItem
          text="Login"
          onClick={() => {
            navigate("/login");
          }}
        />
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
