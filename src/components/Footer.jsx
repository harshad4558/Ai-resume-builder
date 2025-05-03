import { Link } from 'react-router-dom';
import { 
  FileText, 
  Mail, 
  FileQuestion, 
  Shield, 
  Info,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText size={24} className="text-blue-400" />
              <span className="text-xl font-bold text-white tracking-tight">AI Resume Builder</span>
            </div>
            <p className="text-sm">
              Craft professional, ATS-friendly resumes with AI assistance. Stand out from the crowd and land your dream job.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Features
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Resume Templates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Career Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Resume Guides
                </Link>
              </li>
              <li>
                <Link to="/examples" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>Example Resumes
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="mr-2">&#8227;</span>FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} />
                <a href="mailto:support@airesumebuilder.com" className="hover:text-white transition-colors duration-200">
                  support@airesumebuilder.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 mt-4">
                <FileQuestion size={16} />
                <Link to="/support" className="hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom bar with copyright and policies */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            Design & Developed By : Harshad Patil
            &copy; {currentYear} AI Resume Builder. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
              <Shield size={14} className="mr-1" />
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
              <Info size={14} className="mr-1" />
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}