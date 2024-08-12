import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LocationAndContact from "../../Components/Static/LocationAndContact.jsx";

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen ">
      <ContactHeroSection />
      <div className="max-w-7xl mx-0.4 px-4 sm:px-6 lg:px-8 ">
        <LocationAndContact />

        <section
          className="w-full py-16 bg-gradient-to-br from-blue-50 to-indigo-100"
          id="contact-form"
        >
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Get in <span className="text-blue-600">Touch</span>
              </h2>
              <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
                We'd love to hear from you. Fill out the form below and we'll
                get back to you as soon as possible.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Enter the subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-300 focus:border-blue-300 min-h-[150px]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactHeroSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-r from-blue-100 to-indigo-300 text-gray-800">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Contact <span className="text-blue-600">Us</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600">
              We're here to help! Get in touch with our team to learn more about
              our assessment solutions and how we can empower your organization.
              We're here to help! Get in touch with our team to learn more about
              our assessment solutions and how we can empower your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/contact/form"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Get in Touch
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-blue-600 bg-white border border-blue-600 rounded-md shadow-md hover:bg-blue-50 transition duration-300 ease-in-out"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1659241869140-3cb7cdff42fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Contact Us"
              className="w-full h-auto rounded-2xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
