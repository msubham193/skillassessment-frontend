import React, { useState } from "react";
import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import "./coustom.css";
import { Label } from "@/components(shadcn)/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();
  const [registeredOfficeEmail, setRegisteredOfficeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tpStatus, setTpStatus] = useState("");

  const handleEmailChange = (e) => {
    setRegisteredOfficeEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    try {
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
      localStorage.setItem("token", data.data.token);
      toast.success(`Welcome back!`);
      console.log(data.data.data.applicationStatus)
      if (data.data.data.applicationStatus === "Sucess") {
        navigate("/trainingPartner/dashboard");
      } else {
        navigate("/statusFail");
      }
     
    } catch (error) {
      console.log(error);
      toast.error("Please provide valid credentials");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="bg-slate-300 w-[400px] h-[400px] rounded-md pt-8">
        <div className="flex justify-center font-extrabold text-lg m-6">
          Training Partner Signin
        </div>
        <div className="p-4">
          <div>
            <label>Email</label>
            <Input
              type="email"
              value={registeredOfficeEmail}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="flex justify-center pt-8" onClick={handleSignin}>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
