import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <>
      <AboutUsSection />
      <main className="flex-1 max-w-7xl mx-0.4 px-4 sm:px-6 lg:px-8">
        <ImageGallery />
        <OurTeam />
      </main>
    </>
  );
}

function AboutUsSection() {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-blue-100 to-indigo-300 text-gray-900">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-16 bg-gradient-to-r from-blue-100 to-indigo-300 text-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              About Our <span className="text-blue-600">Organization</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto">
              Empowering organizations and individuals through innovative
              assessment solutions
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <AboutUsCard
              title="Our Mission"
              description="To revolutionize the assessment industry by leveraging cutting-edge technology and expertise to deliver accurate, insightful, and actionable results."
              icon={<MissionIcon />}
            />
            <AboutUsCard
              title="Our Vision"
              description="To be the global leader in assessment solutions, fostering growth and driving innovation across industries and organizations of all sizes."
              icon={<VisionIcon />}
            />
            <AboutUsCard
              title="Our Values"
              description="Integrity, Innovation, Excellence, Collaboration, and Continuous Improvement guide everything we do."
              icon={<ValuesIcon />}
            />
            <AboutUsCard
              title="Our Expertise"
              description="With decades of combined experience, our team of experts brings unparalleled knowledge in psychometrics, data science, and organizational development."
              icon={<ExpertiseIcon />}
            />
            <AboutUsCard
              title="Our Approach"
              description="We combine scientific rigor with practical application, ensuring our assessments are both valid and relevant to real-world challenges."
              icon={<ApproachIcon />}
            />
            <AboutUsCard
              title="Our Impact"
              description="We've helped thousands of organizations and individuals unlock their potential, leading to improved performance, satisfaction, and growth."
              icon={<ImpactIcon />}
            />
          </div>
        </div>
      </motion.section>
    </section>
  );
}
function AboutUsCard({ title, description, icon }) {
  return (
    <motion.div
      className="bg-white bg-opacity-50 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 text-yellow-600">{icon}</div>
        <h2 className="text-blue-600 text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
function MissionIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

function ValuesIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

function ExpertiseIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      />
    </svg>
  );
}

function ApproachIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  );
}

function ImpactIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}
function ImageGallery() {
  const programs = [
    {
      name: "Leadership Assessment",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhZGVyc2hpcHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Technical Skills Evaluation",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5pY2FsJTIwc2tpbGxzfGVufDB8fDB8fHww",
    },
    {
      name: "Soft Skills Development",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdCUyMHNraWxsc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Career Aptitude Testing",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyZWVyfGVufDB8fDB8fHww",
    },
    {
      name: "Team Building Workshops",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww",
    },
    {
      name: "Executive Coaching",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhlY3V0aXZlJTIwY29hY2hpbmd8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center text-gray-800">
          Our <span className="text-blue-600">Highlighted Programs</span>
        </h2>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.05 }}
        >
          {programs.map((program, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
            >
              <img
                src={program.image}
                alt={program.name}
                className="object-cover w-full h-60 transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold text-center">
                  {program.name}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OurTeam() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Mike Johnson",
      role: "COO",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Sarah Brown",
      role: "Head of HR",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "David Lee",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emily Chen",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Alex Turner",
      role: "Data Scientist",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Lisa Wang",
      role: "Marketing Manager",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Tom Wilson",
      role: "Sales Director",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Rachel Green",
      role: "Customer Support Lead",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Chris Taylor",
      role: "Financial Analyst",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      name: "Amanda White",
      role: "Content Strategist",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      name: "Ryan Murphy",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      name: "Olivia Davis",
      role: "Quality Assurance",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Daniel Kim",
      role: "Business Development",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
    },
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center text-gray-800">
          Our <span className="text-blue-600">Team</span>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.05 }}
          className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mb-2 sm:mb-3 md:mb-4 object-cover"
              />
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
