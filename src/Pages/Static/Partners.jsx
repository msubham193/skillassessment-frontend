import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { FaChartLine, FaLightbulb, FaPuzzlePiece } from "react-icons/fa";

export default function Partners() {
  const partners = [
    {
      name: "Partner 1",
      description:
        "Description of the partner and their role in the assessment process.",
    },
    {
      name: "Partner 2",
      description:
        "Description of the partner and their role in the assessment process.",
    },
    {
      name: "Partner 3",
      description:
        "Description of the partner and their role in the assessment process.",
    },
    {
      name: "Partner 3",
      description:
        "Description of the partner and their role in the assessment process.",
    },
    {
      name: "Partner 3",
      description:
        "Description of the partner and their role in the assessment process.",
    },
    {
      name: "Partner 3",
      description:
        "Description of the partner and their role in the assessment process.",
    },
    {
      name: "Partner 3",
      description:
        "Description of the partner and their role in the assessment process.",
    },
  ];

  const trainingPartners = [
    {
      name: "Training Partner 1",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 2",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 3",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 3",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 3",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 3",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 3",
      description: "Description of the training partner and their offerings.",
    },
    {
      name: "Training Partner 3",
      description: "Description of the training partner and their offerings.",
    },
  ];

  const assessmentAgencies = [
    {
      name: "Agency 1",
      description:
        "Description of the agency and their role in the assessment process.",
    },
    {
      name: "Agency 2",
      description:
        "Description of the agency and their role in the assessment process.",
    },
    {
      name: "Agency 3",
      description:
        "Description of the agency and their role in the assessment process.",
    },
    {
      name: "Agency 3",
      description:
        "Description of the agency and their role in the assessment process.",
    },
    {
      name: "Agency 3",
      description:
        "Description of the agency and their role in the assessment process.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CarouselSection
            title="Our"
            title2="Trusted Stakeholders"
            description="We collaborate with a network of leading organizations to deliver comprehensive assessment solutions."
            items={partners}
            CardComponent={PartnerCard}
            bgColor="bg-blue-50"
          />
          <CarouselSection
            title="Our"
            title2="Training Partners"
            description="We partner with top training organizations to provide the best resources for employee development."
            items={trainingPartners}
            CardComponent={TrainingCard}
            bgColor="bg-green-50"
          />
          <CarouselSection
            title="Our"
            title2="Assessment Agencies"
            description="We collaborate with leading agencies to provide comprehensive and reliable assessment solutions."
            items={assessmentAgencies}
            CardComponent={AgencyCard}
            bgColor="bg-purple-50"
          />
          <Testimonials />
        </div>
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-r from-blue-100 to-indigo-300 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
            Empowering <span className="text-blue-600">Stakeholders</span> for
            Growth
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-600">
            Our comprehensive assessment solutions help organizations identify
            and nurture talent, ensuring success across all levels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              Learn More
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors border border-blue-600 text-lg"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeatureCard
            title="Comprehensive Assessments"
            description="Gain deep insights into your organization's talent landscape."
          />
          <FeatureCard
            title="Data-Driven Decisions"
            description="Make informed choices based on robust analytics and reporting."
          />
          <FeatureCard
            title="Tailored Solutions"
            description="Customized approaches to meet your unique organizational needs."
          />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon }) {
  const iconComponents = {
    chart: FaChartLine,
    lightbulb: FaLightbulb,
    puzzle: FaPuzzlePiece,
  };

  const IconComponent = iconComponents[icon] || FaLightbulb;

  return (
    <motion.div
      className="bg-white bg-opacity-50 rounded-lg p-6 flex flex-col items-center text-center"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <IconComponent className="text-3xl text-blue-600" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <motion.a
        href="#"
        className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center"
        whileHover={{ x: 5 }}
      >
        Learn More
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.a>
    </motion.div>
  );
}

function CarouselSection({ title, title2, description, items, CardComponent }) {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            {title} <span className="text-blue-600">{title2}</span>
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
          className="py-8"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className="p-2">
              <CardComponent {...item} />
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </section>
  );
}

function PartnerCard({ name, description }) {
  return (
    <div className="bg-white rounded-lg hover:shadow-md p-6 h-full flex flex-col justify-between cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
      <div>
        <img
          src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
          alt={`${name} Logo`}
          className="w-24 h-24 mx-auto rounded-lg object-cover mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-4 text-blue-600">
          {name}
        </h3>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function TrainingCard({ name, description }) {
  return (
    <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-between cursor-pointer hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105">
      <div>
        <img
          src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
          alt={`${name} Logo`}
          className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-4 text-green-600">
          {name}
        </h3>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function AgencyCard({ name, description }) {
  return (
    <div className="bg-white rounded-lg hover:shadow-md p-6 h-full flex flex-col justify-between cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
      <div>
        <img
          src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFnZW5jeXxlbnwwfDB8MHx8fDA%3D"
          alt={`${name} Logo`}
          className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
        />
        <h3 className="text-xl font-semibold text-center mb-4 text-purple-600">
          {name}
        </h3>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-green-100 to-green-50 w-full py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-gray-800">
            Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients and partners about their experiences
            working with our assessment company.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <TestimonialCard
            quote="The assessment solutions provided by this company have been invaluable in helping us identify and develop the talents of our employees. Highly recommended!"
            name="John Doe"
            title="CEO, Acme Inc."
            imageSrc="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
          />
          <TestimonialCard
            quote="Working with this assessment company has been a game-changer for our organization. Their expertise and innovative solutions have helped us unlock the full potential of our team."
            name="Jane Smith"
            title="HR Manager, Globex Inc."
            imageSrc="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
          />
          <TestimonialCard
            quote="Working with this assessment company has been a game-changer for our organization. Their expertise and innovative solutions have helped us unlock the full potential of our team."
            name="Jane Smith"
            title="HR Manager, Globex Inc."
            imageSrc="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
          />
          <TestimonialCard
            quote="Working with this assessment company has been a game-changer for our organization. Their expertise and innovative solutions have helped us unlock the full potential of our team."
            name="Jane Smith"
            title="HR Manager, Globex Inc."
            imageSrc="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, title, imageSrc }) {
  return (
    <div className="bg-green-200 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col">
      <blockquote className="text-gray-600 mb-4">{quote}</blockquote>
      <div className="flex items-center mt-auto">
        <img
          src={imageSrc}
          alt={name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
}
