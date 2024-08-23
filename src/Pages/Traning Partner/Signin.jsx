import React, { useState } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { Loader } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { server } from "@/main";
import { tokenAtoms } from "@/Components/Traning Partner/Atoms/tokenAtom";

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
      console.log('Response Data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }
      setResponseData(data.data.data);
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("trainingPartnerId", data.data.data._id);
      toast.success(data.message);
      console.log("satatus",data.data.data.applicationStatus)
      if ( data.data.data.applicationStatus === "Approved") {
        navigate("/trainingPartner/dashboard");
      } else {
        navigate("/statusFail");
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error("Please provide valid credentials");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center p-4 bg-black">
      <div className="bg-black w-[400px] h-[400px] rounded-md pt-8 border border-gray-800">
        <div className="flex justify-center font-medium text-lg m-6 text-white">
          Training Partner Signin
        </div>
        <div className="p-4">
          <div>
            <label className="text-white">Email</label>
            <Input
              type="email"
              value={registeredOfficeEmail}
              onChange={handleEmailChange}
              placeholder="registered office email"
              className="bg-transparent text-white"
            />
          </div>
          <div className="relative">
            <label className="text-white">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="password"
              className="bg-transparent text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <Button className="w-full m-3 bg-violet-700" onClick={handleSignin}>
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;