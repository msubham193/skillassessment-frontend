import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { Button } from "@/components(shadcn)/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthentication } from "./Atoms/Authentiation";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showbuttion, setShowbuttion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loginAdmin } = useAuthentication();

  // console.log(useAuthentication());

  const handleClick = () => {
    navigate('/'); // Replace with your desired endpoint
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setShowbuttion(true);
    try {
      await loginAdmin(email, password);
      setShowbuttion(false);
    } catch (error) {
    
      setShowbuttion(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
          <CardDescription>Secure Login to Your Dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <div className="flex">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute mt-3 ml-[270px]"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={showbuttion} onClick={handelSubmit}>
            {showbuttion ? "Loding...." : "Enter Dashboard"}
          </Button>
          <Button disabled={showbuttion} onClick={handleClick} >
            {"Back"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
