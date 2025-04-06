import { Input } from "../assets/Comp/Input";
import { Button } from "../assets/Comp/Button";
import { useRef } from "react";
import { BACK_END_URL } from "../CONFIG";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const userRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  async function signin() {
    const username = userRef.current?.value;
    const password = passRef.current?.value;
    

    const response = await axios.post(BACK_END_URL + "/api/v1/signin", {
      username,
      password,
    });
    alert("You have Logged in ");
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
  if(response.data.role==='Business Owner'){
  navigate('/Owner')
  

    }else if (response.data.role === "User") {
      navigate("/User");

    } else {
      navigate("/");
    }
  }

  
  return (
    
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-black text-3xl font-bold mb-6">Login</h1>

      <div className="bg-white rounded-xl border min-w-48 p-8">
       
        <Input placeholder="Username" reff={userRef}></Input>
        <br />
        <Input placeholder="Password" type="password" reff={passRef}></Input>

        <div className="flex justify-center pt-4">
          <Button
            variant="prim"
            onClick={signin}
            loading={false}
            size="md"
            text="Login"
            fullwidth={true}
          ></Button>
        </div>
      </div>
    </div>
  );

}