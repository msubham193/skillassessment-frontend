/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import image from "../../../assets/poorpeople.png";
import { Link, useNavigate } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const SNALogin = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [schemes, setSchemes] = useState([]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    scheme: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.removeItem("state");
    localStorage.removeItem("scheme");
  }, []);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/scheme/`
        );
        console.log(response.data.data);
        setSchemes(response.data.data);
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data : ", formData);
    localStorage.setItem("scheme", formData.scheme);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/sna/login",
        formData
      );
      const { data } = response.data.data;
      console.log(data.state);
      localStorage.setItem("state", data.state);
      navigate("/snadashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen px-80 py-5">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="sm:w-1/2 px-6">
          <h2 className="font-bold text-2xl text-green-800">Login</h2>
          <p className="text-sm mt-4 text-start text-green-800">
            If you are already a member, easily login
          </p>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 mt-8 rounded-xl border"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded-xl border"
            />
            <div>
              <label htmlFor="state" className="block mb-2">
                Select State:
              </label>
              <select
                id="state"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="p-2 rounded-xl border w-full"
              >
                <option value="">--Select State--</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="scheme" className="block mb-2">
                Select Scheme:
              </label>
              <select
                id="scheme"
                name="scheme"
                value={formData.scheme}
                onChange={handleChange}
                className="p-2 rounded-xl border w-full"
              >
                <option value="">--Select Scheme--</option>
                {schemes.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-800 rounded-2xl text-white py-2"
            >
              Login
            </button>
          </form>
          <div className="mt-10 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>
          {/* <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm">
            Login with Google
          </button> */}
          {/* <p className="mt-5 text-xs border-b py-4">Forgot your password</p> */}
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>{`Don't have an account`}</p>
            <Link to="/registration">
              <button className="py-2 px-5 bg-white border rounded-xl">
                Register
              </button>
            </Link>
          </div>
        </div>
        {/* <div className="sm:block hidden w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRirLNCbs4j_NKIf02OrlIFq-F8kFDUyJxmwQ&s"
            alt=""
            className="rounded-2xl"
          />
        </div> */}
      </div>
    </section>
  );
};

export default SNALogin;
