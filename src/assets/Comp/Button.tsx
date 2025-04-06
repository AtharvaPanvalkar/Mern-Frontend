type VARS = "prim" | "sec"|"ter";
export interface Butprop {
  variant: VARS;
  size: "sm" | "lg" | "md";
  text: string;
  starticon?: any;
  endicon?: any;
  fullwidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const varstyle = {
  prim: "bg-purple-700 text-white hover:bg-purple-800 transition-all duration-150",
  sec: "bg-purple-300 text-purple-700 hover:bg-purple-500 hover:text-white transition-all duration-300",
  ter: "bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition",
};
const defsty = "rounded-md flex items-center shadow-2xl";

const stylesize = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-md",
  lg: "py-4 px-6 text-lg",
};
export const Button = (props: Butprop) => {
  return (
    <button
      onClick={props.onClick}
      className={`${varstyle[props.variant]} ${defsty} ${
        stylesize[props.size]
      } ${
        props.fullwidth ? " w-full flex justify-center items-center p-8" : ""
      } ${props.loading ? " opacity-45" : ""}  `}
      disabled={props.loading}
    >
      {props.starticon ? <div className="pr-2">{props.starticon}</div> : null}{" "}
      {props.text} {props.endicon}
    </button>
  );
};
