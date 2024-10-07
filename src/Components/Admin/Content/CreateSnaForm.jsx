import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import { server } from "@/main";
import axios from "axios";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateSnaForm = () => {
    const [schemes, setSchemes] = useState([]);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [schemetype, setSchemetype] = useState("");
    const [scheme,setScheme]=useState("");
    const [state,setState]=useState("");
    const [showButton, setShowButton] = useState(false); 
  

    //funcction for create SNA......
    const submitHandler = async (e) => {
      e.preventDefault();
      setShowButton(true);
      try {
        const response = await axios.post(
          `${server}/sna`,
          {email,password,state,schemetype,scheme }, 
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        confirm(`Email for SNA is ${email} and the password is ${password} please copy for avoide conflict !!`)
        setEmail("");
        setPassword("");
        setScheme("");
        setState("");
        setSchemetype("");
        toast.success("New SNA added !!", {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        setShowButton(false);
      } catch (error) {
        toast.error("Something went wrong, try after some time !!!", {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        console.log(error);
        setShowButton(false);
      }
    };


    //function for get all scheme's
    useEffect(() => {
        try {
          axios
            .get(`${server}/scheme`, {
              withCredentials: true,
              headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
            })
            .then((response) => {
              setSchemes(response.data.data);
            });
        } catch (error) {
          console.log(error);
        }
      }, []);
  
    return (
      <div className="h-full flex-1 flex-col p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create SNA!</h2>
            <p className="text-muted-foreground">
              Here&apos;you can create SNA !!!
            </p>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <div className="mx-72 mt-20">
            
            <Label htmlFor="projectType" className="text-left w-40">
            Set Email for  SNA
            </Label>
            <Input
              id="projectType"
              className="col-span-4 py-6"
              placeholder="Add email for SNA"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="name" className="text-left w-40">
              Add password for SNA
            </Label>
            <Input
              id="name"
              className="col-span-4 py-6"
              placeholder="Add password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label htmlFor="schemeType" className="text-left w-40">
              Select State
            </Label>
            <Select
              id="schemeType"
              value={state}
              onValueChange={(value) => setState(value)}
            >
              <SelectTrigger className="col-span-4 py-6">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Odisha">Odisha</SelectItem>
              <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
              <SelectItem value="West Bengal">West Bengal</SelectItem>
              <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
              <SelectItem value="Jharkhand">Jharkhand</SelectItem>
              </SelectContent>
            </Select>  
            <Label htmlFor="schemeType" className="text-left w-40">
              Scheme Type
            </Label>
            <Select
              id="schemeType"
              value={schemetype}
              onValueChange={(value) => setSchemetype(value)}
            >
              <SelectTrigger className="col-span-4 py-6">
                <SelectValue placeholder="Select Scheme Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="State Government">State Government</SelectItem>
                <SelectItem value="Central Government">Central Government</SelectItem>
              </SelectContent>
            </Select>  
            <Label htmlFor="schemeType" className="text-left w-40">
              Scheme Name
            </Label>
            <Select
              id="schemeType"
              value={scheme}
              onValueChange={(value) => setScheme(value)}
            >
            <SelectTrigger className="col-span-4 py-6">
              <SelectValue placeholder="Select secheme name" />
            </SelectTrigger>
            <SelectContent>
              {schemes.map((scheme) => (
                <SelectItem key={scheme.id} value={scheme.name}>
                  {scheme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
            
          </div>
        </form>
        <Button
          className="w-32 flex mx-72 mt-3"
          disabled={showButton}
          onClick={submitHandler}
        >
          {showButton ? "Loading..." : "Create SNA"}
        </Button>
      </div>
    );
}

export default CreateSnaForm
