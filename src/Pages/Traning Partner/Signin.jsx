import React, { useState } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { Loader, LoaderCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { server } from "@/main";
import { tokenAtoms } from "@/Components/Traning Partner/Atoms/tokenAtom";
import logo from "../../assets/logo.png";

const Signin = () => {
  const navigate = useNavigate();
  const [registeredOfficeEmail, setRegisteredOfficeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [tpStatus, setTpStatus] = useState("");
  const [responseData, setResponseData] = useRecoilState(tpDataAtoms);
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useSetRecoilState(tokenAtoms);
  const handleEmailChange = (e) => {
    setRegisteredOfficeEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${server}/tp/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registeredOfficeEmail,
          password,
        }),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
      setResponseData(data.data.data);
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("trainingPartnerId", data.data.data._id);
      toast.success(data.message);
      console.log("satatus", data.data.data.applicationStatus);
      if (data.data.data.applicationStatus === "Approved") {
        navigate("/trainingPartner/dashboard");
      } else {
        navigate("/statusFail");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Please provide valid credentials");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center p-4 bg-[#F3F6F8]">
      <div className=" w-[400px] h-[500px] p-4 pt-8 shadow-xl bg-[#FFFFFF] rounded-md ">
        <div className="w-full  flex flex-row justify-center">
          <img src={logo} alt="" className="h-20 text-center  " />
        </div>
        <div className="flex justify-center font-medium text-lg m-6  text-gray-900">
          Training Partner 
        </div>
       
        <div className="px-4 ">
          <div>
            <label className="text-white">Email</label>
            <Input
              type="email"
              value={registeredOfficeEmail}
              onChange={handleEmailChange}
              placeholder="registered office email"
              className="bg-transparent focus-visible:ring-transparent text-black p-3 outline-none border-black"
            />
          </div>
          
          <div className="relative">
            <label className="text-white">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="password"
              className="bg-transparent focus-visible:ring-transparent text-black border-black p-3"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <div className="flex justify-center ">
          <Button className="w-full m-3 mt-6 py-2   bg-violet-700" onClick={handleSignin}>
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Login"}
          </Button>
        </div>
        <div className="ml-4">
          <p>
            New here ?{" "}
            <span
              className="cursor-pointer text-blue-700"
              onClick={() => navigate("/trainingPartner/signup")}
            >
              create a new Account{" "}
            </span>
            <span>
            OR{" "}
            </span>
            <span className="cursor-pointer text-blue-700"
            onClick={() => navigate("/")}>
            GoToHome
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;