// // import { Input } from "./Input";
// // import { useState } from "react";
// // import { Button } from "./Button";

// // export default function SearchBar({
// //   onSearch,
// // }: {
// //   onSearch: (query: string) => void;
// // }) {
// //   const [query, setQuery] = useState("");

// //   const handleSearch = () => {
// //     onSearch(query);
// //   };

// //   return (
// //     <div className="w-full max-w-lg mx-auto flex gap-2">
// //       <Input placeholder="Search for products or businesses..." type="search" />
// //       {/* <button
// //         onClick={handleSearch}
// //         className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition"
// //       >
// //         Search
// //       </button> */}
// //       <Button size="md" text="Search" variant="ter"></Button>
// //     </div>
// //   );

// // // }
// // import { Input } from "./Input";
// // import { useState, useEffect, useRef } from "react";
// // import { Button } from "./Button";

// // interface SearchResult {
// //   name: string;
// // }

// // interface SearchResponse {
// //   sellers: SearchResult[];
// //   products: SearchResult[];
// // }

// // export default function SearchBar({
// //   onSearch,
// // }: {
// //   onSearch: (results: SearchResponse) => void;
// // }) {
// //   const [query, setQuery] = useState<string>("");
// //   const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
// //   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   // Fetch search suggestions (debounced)
// //   useEffect(() => {
// //     if (!query.trim()) {
// //       setSuggestions([]);
// //       return;
// //     }

// //     const delay = setTimeout(async () => {
// //       try {
// //         const response = await fetch(
// //           `/search?query=${encodeURIComponent(query)}`
// //         );
// //         const data: SearchResponse = await response.json();
// //         const formattedSuggestions = [
// //           ...data.sellers.map((s) => ({ name: s.name })),
// //           ...data.products.map((p) => ({ name: p.name })),
// //         ];
// //         setSuggestions(formattedSuggestions);
// //         setShowSuggestions(true);
// //       } catch (error) {
// //         console.error("Error fetching search suggestions:", error);
// //       }
// //     }, 300); // Debounce delay (300ms)

// //     return () => clearTimeout(delay);
// //   }, [query]);

// //   // Handle search on button click
// //   const handleSearch = async () => {
// //     if (!query.trim()) return;

// //     try {
// //       const response = await fetch(
// //         `/search?query=${encodeURIComponent(query)}`
// //       );
// //       const data: SearchResponse = await response.json();
// //       onSearch(data);
// //       setShowSuggestions(false);
// //     } catch (error) {
// //       console.error("Error fetching search results:", error);
// //     }
// //   };

// //   return (
// //     <div className="relative w-full max-w-lg mx-auto">
// //       <div className="flex gap-2">
// //         <Input
// //           placeholder="Search for products or businesses..."
// //           type="search"
// //           reff={inputRef}
// //           value={query}
// //           onChange={(e) => setQuery(e.target.value)}
// //           onFocus={() => setShowSuggestions(true)}
// //         />
// //         <Button size="md" text="Search" variant="ter" onClick={handleSearch} />
// //       </div>

// //       {/* Search Suggestions Dropdown */}
// //       {showSuggestions && suggestions.length > 0 && (
// //         <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-10">
// //           {suggestions.map((s, index) => (
// //             <li
// //               key={index}
// //               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
// //               onClick={() => {
// //                 setQuery(s.name);
// //                 setShowSuggestions(false);
// //               }}
// //             >
// //               {s.name}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }
// import { Input } from "./Input";
// import { useState, useEffect, useRef } from "react";
// import { Button } from "./Button";

// interface SearchResult {
//   name: string;
// }

// interface SearchResponse {
//   sellers: SearchResult[];
//   products: SearchResult[];
// }

// export default function SearchBar() {
//   const [query, setQuery] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Fetch search suggestions (debounced)
//   useEffect(() => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     const delay = setTimeout(async () => {
//       try {
//         const response = await fetch(
//           `/search?query=${encodeURIComponent(query)}`
//         );
//         const data: SearchResponse = await response.json();
//         const formattedSuggestions = [
//           ...data.sellers.map((s) => ({ name: s.name })),
//           ...data.products.map((p) => ({ name: p.name })),
//         ];
//         setSuggestions(formattedSuggestions);
//         setShowSuggestions(true);
//       } catch (error) {
//         console.error("Error fetching search suggestions:", error);
//       }
//     }, 300); // Debounce delay (300ms)

//     return () => clearTimeout(delay);
//   }, [query]);

//   // Handle search on button click
//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/v1/search?query=${encodeURIComponent(query)}`
//       );
//       const data: SearchResponse = await response.json();
//       console.log("Search results:", data);
//       setShowSuggestions(false);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <div className="relative w-full max-w-lg mx-auto">
//       <div className="flex gap-2">
//         <Input
//           placeholder="Search for products or businesses..."
//           type="search"
//           reff={inputRef}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setShowSuggestions(true)}
//         />
//         <Button size="md" text="Search" variant="ter" onClick={handleSearch} />
//       </div>

//       {/* Search Suggestions Dropdown */}
//       {showSuggestions && suggestions.length > 0 && (
//         <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-10">
//           {suggestions.map((s, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setQuery(s.name);
//                 setShowSuggestions(false);
//               }}
//             >
//               {s.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// import { Input } from "./Input";
// import { useState, useEffect, useRef } from "react";
// import { Button } from "./Button";

// interface SearchResult {
//   name: string;
// }

// interface SearchResponse {
//   sellers: SearchResult[];
//   products: SearchResult[];
// }

// export default function SearchBar() {
//   const [query, setQuery] = useState<string>("");
//   const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
//   const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement>(null);



//   return (
//     <div className="relative w-full max-w-lg mx-auto">
//       <div className="flex gap-2">
//         <Input
//           placeholder="Search for products or businesses..."
//           type="search"
//           reff={inputRef}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setShowSuggestions(true)}
//         />
//         <Button size="md" text="Search" variant="ter" onClick={handleSearch} />
//       </div>

//       {/* Search Suggestions Dropdown */}
//       {showSuggestions && suggestions.length > 0 && (
//         <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-10">
//           {suggestions.map((s, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 setQuery(s.name);
//                 setShowSuggestions(false);
//               }}
//             >
//               {s.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// // }
//   import { Input } from "./Input";
//   import { useState, useEffect, useRef } from "react";
//   import { Button } from "./Button";

//   interface SearchResult {
//     name: string;
//     description?:string,
//   available?:string ,
//   price?:string,
//     multipleImages?:string[],
//     Profilepic?:string,
//     location?:string,
//     contact?:string,

//   }

//   export default function SearchBar() {
//     const [query, setQuery] = useState<string>("");
//     const [filter, setFilter] = useState<string>("all");
//     const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
//     const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//       if (query.length < 2) {
//         setSuggestions([]);
//         return;
//       }

//       const fetchSuggestions = async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:3000/api/v1/search?query=${query}&filter=${filter}`
//           );
//           const data = await response.json();
//           setSuggestions(data);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//         }
//       };

//       fetchSuggestions();
//     }, [query, filter]);

//     return (
//       <div className="relative w-full max-w-lg mx-auto" ref={containerRef}>
//         <div className="flex gap-2">
//           <select
//             className="border px-3 py-2 rounded-md"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="store">Stores</option>
//             <option value="product">Products</option>
//             <option value="location">Locations</option>
//           </select>

//           <Input
//             placeholder="Search for products, stores, or locations..."
//             type="search"
//             reff={inputRef}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             onFocus={() => setShowSuggestions(true)}
//           />

//           <Button
//             size="md"
//             text="Search"
//             variant="ter"
//             onClick={() => setShowSuggestions(false)}
//           />
//         </div>

//         {showSuggestions && suggestions.length > 0 && (
//           <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-2 rounded-md shadow-lg z-10">
//             {suggestions.map((s, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setQuery(s.name);
//                   setShowSuggestions(false);
//                 }}
//               >

//                 {s.name}
//               </li>
              
//             ))}
//           </ul>
//         )}
//       </div>
//     );
//   }


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

