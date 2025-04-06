import { Input } from "../assets/Comp/Input";
import { Button } from "../assets/Comp/Button"
import { useRef } from "react";
import { BACK_END_URL } from "../CONFIG";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {

 

  const userRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
    const RoleRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  async function signin() {
    const username = userRef.current?.value;
    const password = passRef.current?.value;
    const role=RoleRef.current?.value;

    const response = await axios.post(BACK_END_URL + "/api/v1/signup", {
      username,
      password,
      role
    });
    alert("You have signed up ");
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    localStorage.setItem("sellerProfileComplete", "false");
    if(response.data.role==='Business Owner'){
    navigate("/sellerinfo");
    }else if (response.data.role === "User") {
      navigate("/User");

    } else {
      navigate("/");
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
      <h1 className="text-black text-3xl font-bold mb-6">Sign up</h1>
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" reff={userRef}></Input>
        <Input placeholder="Password" type="password" reff={passRef}></Input>
        <select
          name="User"
          id="User"
          className="bg-white p-2 w-full border-1 rounded"
          defaultValue="User"
          // @ts-ignore
          ref={RoleRef}
        >
          <option value="User">user</option>
          <option value="Business Owner">Business Owner</option>
        </select>

        <div className=" flex justify-center pt-4">
          <Button
            variant="prim"
            onClick={signin}
            loading={false}
            size="md"
            text="Sign up"
            fullwidth={true}
          ></Button>
        </div>
      </div>
    </div>
  );
}
