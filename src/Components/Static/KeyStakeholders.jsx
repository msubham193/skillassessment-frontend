import React from "react";

const KeyStakeholders = () => {
  const stakeholders = [
    {
      name: "Ministry of Education",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3qBVX4XIA8zq3LpBn64zAuOt9_IZ7_H5uA&s",
    },
    {
      name: "National Examination Board",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4xjShh4ynJbrgYrW_aB4lhKSxeMzQ3cO_A&s",
    },
    {
      name: "Teachers Association",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
    },
    {
      name: "Educational Technology Institute",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3qBVX4XIA8zq3LpBn64zAuOt9_IZ7_H5uA&s",
    },
    {
      name: "Student Welfare Organization",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLA994hpL3PMmq0scCuWOu0LGsjef49dyXVg&s",
    },
    
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Our Key <span className="text-blue-600">Stakeholders</span>
        </h2>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          We're proud to collaborate with leading organizations in the education
          sector to drive innovation and excellence in assessment.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-full h-32 flex items-center justify-center mb-4">
                <img
                  src={stakeholder.logo}
                  alt={`${stakeholder.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 text-center">
                {stakeholder.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStakeholders;
