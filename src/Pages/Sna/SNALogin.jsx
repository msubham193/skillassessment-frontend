/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { server } from "../../main";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.removeItem("state");
    localStorage.removeItem("scheme");
  }, []);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`${server}/scheme/`);
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
    setLoading(true);
    localStorage.setItem("scheme", formData.scheme);
    try {
      const response = await axios.post(`${server}/sna/login`, formData);
      const { data } = response.data.data;
      localStorage.setItem("state", data.state);
      navigate("/sna/snadashboard");
    } catch (error) {
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen px-80 py-16">
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 rounded-xl border w-full"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
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
              className="bg-green-800 rounded-2xl text-white py-2 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
            </button>
          </form>
          <div className="mt-4">
            <Link to="/" className="text-green-800 underline">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SNALogin;
