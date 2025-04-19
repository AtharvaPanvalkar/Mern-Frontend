import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import { Sidebar } from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

export default function Homeadminuser() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
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
          text="Business list"
          onClick={() => {
            navigate("/Admin");
          }}
        />

        <SidebarItem text="Logout" onClick={handleLogout} />
      </Sidebar>

      <div className="p-4 ml-72 w-full">
        {/* Search Bar */}
        <SearchBar />

        <div className="flex justify-center items-center min-h-screen  flex-wrap gap-4 mt-4">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
