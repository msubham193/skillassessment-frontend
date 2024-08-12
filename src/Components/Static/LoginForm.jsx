import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleAction = async () => {
    if (!selectedOption) return;

    setIsRedirecting(true);
    try {
      const redirectURL = getRedirectURL();
      console.log(
        `${isRegistering ? "Registering" : "Logging in"} as ${selectedOption}`
      );

      // Show "Redirecting..." for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to the appropriate URL
      navigate(redirectURL);
    } catch (error) {
      console.error(
        `${isRegistering ? "Registration" : "Login"} failed`,
        error
      );
      setIsRedirecting(false);
    }
  };

  const getRedirectURL = () => {
    if (isRegistering) {
      return selectedOption === "Training Partner"
        ? "/register-training-partner"
        : "/register-assessment-agency";
    } else {
      return selectedOption === "Training Partner"
        ? "/login-training-partner"
        : "/login-assessment-agency";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const optionVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden mx-auto max-w-7xl my-16 bg-[#004b23]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center items-center text-white">
        <h2 className="text-5xl font-bold mb-8 text-center">
          {isRegistering ? "Join Our Platform" : "Welcome Back"}
        </h2>
        <p className="mb-10 text-xl text-center">
          {isRegistering
            ? "Choose your registration type:"
            : "Select your account type:"}
        </p>

        <div className="flex flex-col sm:flex-row justify-center w-full mb-10 space-y-4 sm:space-y-0 sm:space-x-4">
          {["Training Partner", "Assessment Agency"].map((option) => (
            <motion.div
              key={option}
              className={`flex-1 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer backdrop-blur-md ${
                selectedOption === option
                  ? "bg-white bg-opacity-30 shadow-lg"
                  : "bg-white bg-opacity-10 hover:bg-opacity-20"
              }`}
              onClick={() => setSelectedOption(option)}
              variants={optionVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="w-16 h-16 mb-4 rounded-full bg-white flex items-center justify-center"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <svg
                  className="w-10 h-10 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
              <span className="font-semibold text-lg text-center">
                {option}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.button
          className={`w-full py-4 px-8 bg-white text-indigo-600 rounded-xl font-bold text-lg transition duration-300 ${
            !selectedOption || isRedirecting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-90"
          }`}
          disabled={!selectedOption || isRedirecting}
          onClick={handleAction}
        >
          {isRedirecting
            ? "Redirecting..."
            : isRegistering
            ? "Register Now"
            : "Login Now"}
        </motion.button>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold mb-6 text-indigo-600">
          {isRegistering ? "Already a Member?" : "New to Our Platform?"}
        </h3>
        <p className="mb-8 text-lg text-gray-600 text-center">
          {isRegistering
            ? "Login to your account and start your journey with us."
            : "Register now and unlock a world of opportunities!"}
        </p>
        <motion.button
          className="py-3 px-8 bg-indigo-600 text-white rounded-xl font-semibold text-lg transition duration-300 hover:bg-indigo-700"
          onClick={() => setIsRegistering(!isRegistering)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRegistering ? "Login Instead" : "Register Instead"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LoginForm;
