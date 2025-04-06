// interface InputProps {
//   placeholder: string;
//   type?: "text" | "password" | "search";
//   reff?: React.Ref<HTMLInputElement>;
//   value?:string;
// }

// export function Input({ placeholder, type = "text", reff,value }: InputProps) {
//   return (
//     <div className="relative w-full">
//       {/* Search Icon for Search Input */}
//       {type === "search" && (
//         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
//           🔍
//         </span>
//       )}

//       <input
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         ref={reff}
//         className={`px-4 py-2 border rounded-md w-full outline-none bg-white text-gray-700 
//           ${type === "search" ? "pl-10" : ""} shadow-sm focus:border-black`}
//       />
//     </div>
//   );
// }

interface InputProps {
  placeholder: string;
  type?: "text" | "password" | "search";
  reff?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export function Input({
  placeholder,
  type = "text",
  reff,
  value,
  onChange,
  onFocus,
}: InputProps) {
  return (
    <div className="relative w-full">
      {/* Search Icon for Search Input */}
      {type === "search" && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
          🔍
        </span>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        ref={reff}
        onChange={onChange}
        onFocus={onFocus}
        className={`px-4 py-2 border rounded-md w-full outline-none bg-white text-gray-700 
          ${type === "search" ? "pl-10" : ""} shadow-sm focus:border-black`}
      />
    </div>
  );
}

