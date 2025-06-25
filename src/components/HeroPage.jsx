import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footprint from "../assets/resume.jpg";
<<<<<<< HEAD
import Footer from "./Footer"; 

=======
import Footer from "./Footer";
>>>>>>> 77aa29efc5b7b3ae1d754129a27d40903ca41cd9
import { ArrowRight, CheckCircle, Star } from "lucide-react";

export default function HeroPage() {
  const features = [
    { icon: <CheckCircle className="text-green-500" />, text: "AI-powered resume builder" },
    { icon: <CheckCircle className="text-green-500" />, text: "Professional templates" },
    { icon: <CheckCircle className="text-green-500" />, text: "ATS-friendly formats" },
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Marketing Specialist",
      text: "Landed my dream job within 2 weeks of using this amazing platform!",
      rating: 5,
    },
    {
      name: "Michael T.",
      role: "Software Engineer",
      text: "The AI suggestions made my skills truly stand out. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-100 to-purple-200 p-6 md:p-16 rounded-b-3xl">
        {/* Left Side Text */}
        <div className="md:w-1/2 space-y-6">
          <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4">
            <span className="text-blue-700 font-medium text-sm">Resume Builder v2.0</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
            Build Your <span className="text-purple-600">Dream Resume</span> Effortlessly
          </h1>
          
          <p className="text-gray-700 text-lg md:pr-10">
            Use AI to create stunning, professional resumes in minutes. Stand out, get noticed, and land your dream job with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup">
              <Button className="w-full sm:w-auto px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" className="w-full sm:w-auto px-6 py-3 text-lg border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                {feature.icon}
                <span className="text-sm font-medium text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Side Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
          <div className="absolute -top-6 -right-6 bg-yellow-100 px-4 py-2 rounded-lg shadow-md rotate-3 z-10">
            <span className="text-yellow-700 font-bold">New Templates!</span>
          </div>
          <img
            src={Footprint}
            alt="Resume Building"
            className="w-3/4 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-6 md:px-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-600 mt-2">Three simple steps to your perfect resume</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "01", title: "Input Your Details", description: "Fill in your work experience, skills, and education or import from LinkedIn." },
            { number: "02", title: "Choose a Template", description: "Select from our beautiful, professionally-designed templates." },
            { number: "03", title: "Download & Apply", description: "Get your polished resume in PDF, DOCX, or other formats instantly." }
          ].map((step, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">{step.number}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-6 md:px-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
          <p className="text-gray-600 mt-2">Join thousands of satisfied job seekers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
              <div>
                <div className="font-semibold text-gray-800">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 md:px-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join over 10,000 professionals who have boosted their career with our resume builder.
        </p>
        <Link to="/signup">
          <Button className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
            Create Your Resume Now
          </Button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
