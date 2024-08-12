import React from "react";

const LocationAndContact = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-indigo-100">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Our <span className="text-blue-600">Location</span>
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Our team is here to assist you. Feel free to reach out using the
            contact information below.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col justify-center md:w-1/2 space-y-8">
            <div className="p-6 h-44 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Company Address
              </h3>
              <p className="text-gray-700">
                123 Main Street, Anytown USA 12345
              </p>
            </div>
            <div className="p-6 h-44 bg-purple-50 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Phone and Email
              </h3>
              <p className="text-gray-700">
                Phone: (123) 456-7890
                <br />
                Email: info@assessmentcompany.com
              </p>
            </div>
          </div>
          <div className="md:w-1/2 h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3744.99524658213!2d85.70367367376993!3d20.17592341652618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19aec948fe62ef%3A0xb6c968c7957b6b4f!2sCenturion%20University%20of%20Technology%20%26%20Management%2C%20Bhubaneswar%20(CUTM)!5e0!3m2!1sen!2sin!4v1719212843098!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationAndContact;
