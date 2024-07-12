import React, { useState } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import "./coustom.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { Loader } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';

const Signin = () => {
  const navigate = useNavigate();
  const [registeredOfficeEmail, setRegisteredOfficeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [tpStatus, setTpStatus] = useState("");
  const [responseData, setResponseData] = useRecoilState(tpDataAtoms);
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await fetch("http://localhost:8000/api/v1/tp/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registeredOfficeEmail,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      setTpStatus(data.applicationStatus);
      console.log(data.data.data.applicationStatus);
      setResponseData(data.data.data);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("trainingPartnerId", data.data.data._id);
      toast.success(data.message);

      if (data.data.data.applicationStatus === "Approved") {
        navigate("/trainingPartner/dashboard");
      } else {
        navigate("/statusFail");
      }
    } catch (error) {
      console.log(error);
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
            <label>Email</label>
            <Input
              type="email"
              value={registeredOfficeEmail}
              onChange={handleEmailChange}
              placeholder="registered office email"
              className="bg-transparent text-white"
            />
          </div>
          <div className="relative">
            <label>Password</label>
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
        <div className="flex justify-center pt-8" onClick={handleSignin}>
          <Button className="w-full m-3 bg-violet-700">
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;