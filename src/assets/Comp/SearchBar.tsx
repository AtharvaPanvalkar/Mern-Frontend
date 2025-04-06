

  import { Input } from "./Input";
  import { useState, useEffect, useRef } from "react";
  import { Button } from "./Button";
  import { useNavigate } from "react-router-dom";
  import { BACK_END_URL } from "../../CONFIG";

  interface SearchResult {
    _id?:string,
    name: string;
    description?: string;
    available?: string;
    price?: string;
    multipleImages?: string[];
    Profilepic?: string;
    location?: string;
    contact?: string;
    owner?:string;
  }

  export default function SearchBar() {
    const [query, setQuery] = useState<string>("");
    const [filter, setFilter] = useState<string>("store");
    const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `${BACK_END_URL}/api/v1/search?query=${query}&filter=${filter}`
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    }, [query, filter]);

    return (
      <div className="relative w-full max-w-lg mx-auto" ref={containerRef}>
        <div className="flex gap-2">
          <select
            className="border px-3 py-2 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="store">Stores</option>
            <option value="product">Products</option>
            <option value="location">Locations</option>
            <option value="Forwhom">Gender wise</option>
            <option value="desc">description</option>
            <option value="color">color</option>
          </select>

          <Input
            placeholder="Search for products, stores, or locations..."
            type="search"
            reff={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />

          <Button
            size="md"
            text="Search"
            variant="ter"
            onClick={() => setShowSuggestions(true)}
          />
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-10">
            {suggestions.map((s, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(s.name);
                  setShowSuggestions(false);
                }}
              >
                <div className="flex items-center gap-3">
                  {Array.isArray(s.multipleImages) ? (
                    <div
                      className="flex items-center gap-3"
                      onClick={() =>
                        navigate(`/product?id=${s._id}&owner=${s.owner}`)
                      }
                    >
                      {s.multipleImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Preview"
                          className="w-10 h-10 rounded-md"
                        />
                      ))}
                      <span>{s.name}</span>
                    </div>
                  ) : s.Profilepic ? (
                    <div
                      className="flex items-center gap-3"
                      onClick={() => navigate(`/prodseller?id=${s._id}`)}
                    >
                      <img
                        src={s.Profilepic}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                      <span>{s.name}</span>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

