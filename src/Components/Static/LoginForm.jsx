import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { name: "Training Partner", registerAllowed: true },
    { name: "Assessment Agency", registerAllowed: true },
    { name: "SNA", registerAllowed: false },
  ];

  const handleAction = async () => {
    if (!selectedOption) return;

    setIsRedirecting(true);
    try {
      const redirectURL = getRedirectURL();
      console.log(
        `${isRegistering ? "Registering" : "Logging in"} as ${selectedOption}`
      );
 
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
    switch (selectedOption) {
      case "Training Partner":
        return isRegistering ? "/trainingPartner/signup" : "/trainingPartner/signin";
      case "Assessment Agency":
        return isRegistering ? "/registration" : "/login";
      case "SNA":
        return "/snalogin";
      default:
        return "/";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row shadow-2xl rounded-3xl overflow-hidden mx-auto max-w-7xl my-16 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Section - Guidelines */}
      <div className="w-full lg:w-1/2 p-12 flex flex-col justify-start items-start bg-blue-800 text-white">
        <h2 className="text-4xl font-bold mb-8 text-start">Necessary Guidelines</h2>
        <ul className="list-disc space-y-3 ml-6 text-lg">
          <li>guideline 1</li>
          <li>guideline 2</li>
          <li>guideline 3</li>
          <li>guideline 4</li>
          <li>guideline 5</li>
          <li>guideline 6</li>
        </ul>
      </div>

      {/* Right Section - Login/Registration */}
      <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold mb-6 text-indigo-600">
          {isRegistering ? "Join Our Platform" : "Login to Dashboard"}
        </h3>
        <p className="mb-8 text-lg text-gray-600 text-center">
          {isRegistering ? "Choose your registration type:" : "Select your account type:"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
          {roles.map((role) => (
            <motion.div
              key={role.name}
              className={`p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer ${
                (!isRegistering || role.registerAllowed) &&
                `${
                  selectedOption === role.name
                    ? "bg-indigo-100 border-2 border-indigo-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`
              } ${
                isRegistering && !role.registerAllowed
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => 
                (!isRegistering || role.registerAllowed) && setSelectedOption(role.name)
              }
            >
              <span className="font-semibold text-lg text-center">
                {role.name}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className={`w-full py-3 px-8 bg-indigo-600 text-white rounded-xl font-bold text-lg transition duration-300 ${
            !selectedOption || isRedirecting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
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

        <div className="mt-6 text-center">
          <span className="text-gray-600">
            {isRegistering ? "Already a member?" : "New to our platform?"}
          </span>
          <motion.button
            className="ml-2 text-indigo-600 font-semibold hover:underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login Instead" : "Register Instead"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;