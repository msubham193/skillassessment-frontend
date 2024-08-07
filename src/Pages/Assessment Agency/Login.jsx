/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import image from "../../../public/poorpeople.png";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  assessmentAgencyIdState,
  assessmentAgencyNameState,
  authTokenState,
} from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";

function SkillPortal() {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authTokenState);
  const setIdState = useSetRecoilState(assessmentAgencyIdState);
  const setAssessmentAgencyName = useSetRecoilState(assessmentAgencyNameState);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/aa/login",
        formData
      );
      console.log(response.data);
      const { data } = response.data;
      const authToken = data.token;
      const applicationStatus = data.data.applicationStatus;
      const id = data.data._id;
      const name = data.data.agencyName;
      console.log(applicationStatus);

      if (applicationStatus !== "Approved") {
        setErrorMessage("Your application is not approved by the admin.");
        return;
      }

      setAuthToken((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        token: authToken,
        applicationStatus: applicationStatus,
      }));
      setIdState(id);
      setAssessmentAgencyName(name);
      localStorage.setItem("aaAuthToken", authToken);
      localStorage.setItem("applicationStatus", applicationStatus);
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("tokenExpiration", expirationTime);
      localStorage.setItem("assessmentAgencyId", id);

      navigate("/dashboard/assessmentschedule");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="sm:w-1/2 px-16">
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
          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm">
            Login with Google
          </button>
          <p className="mt-5 text-xs border-b py-4">Forgot your password</p>
          <div className="mt-3 text-xs flex justify-between items-center">
            <p>{`Don't have an account`}</p>
            <Link to="/registration">
              <button className="py-2 px-5 bg-white border rounded-xl">
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className="sm:block hidden w-1/2">
          <img src={image} alt="" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export default SkillPortal;
