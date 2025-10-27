import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, LogIn, UserPlus, Home, Layout, User, ChevronDown, Settings, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);
  
  // Check if user is logged in and get user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName') || 'User';
    const email = localStorage.getItem('userEmail') || '';
    
    setIsLoggedIn(!!token);
    setUserName(name);
    setUserEmail(email);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  // Determine if link is active
  const isActive = (path) => location.pathname === path;

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FileText size={24} className="text-blue-200" />
              <span className="text-xl font-bold tracking-tight">AI Resume Builder</span>
            </Link>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center space-x-1 
                ${isActive('/') 
                  ? 'bg-blue-800 text-white' 
                  : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center space-x-1
                    ${isActive('/dashboard') 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                >
                  <Layout size={18} />
                  <span>Dashboard</span>
                </Link>
                
                {/* User Profile Dropdown */}
                <div className="relative ml-3" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium 
                      bg-blue-600 hover:bg-blue-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold text-xs">
                      {getUserInitials(userName)}
                    </div>
                    <span className="max-w-[120px] truncate">{userName}</span>
                    <ChevronDown size={16} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                        </div>
                        
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User size={16} className="mr-2" />
                          <span>My Profile</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings size={16} className="mr-2" />
                          <span>Settings</span>
                        </Link>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={16} className="mr-2" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 flex items-center space-x-1
                    ${isActive('/signin') 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-100 hover:bg-blue-600 hover:text-white'}`}
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="px-3 py-2 rounded-md text-sm font-medium 
                    bg-white text-blue-700 hover:bg-blue-50 flex items-center space-x-1 transition-colors duration-150"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* User Info Header (Mobile) */}
            {isLoggedIn && (
              <div className="px-3 py-3 mb-2 bg-blue-700 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white text-blue-700 flex items-center justify-center font-semibold">
                    {getUserInitials(userName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{userName}</p>
                    <p className="text-xs text-blue-200 truncate">{userEmail}</p>
                  </div>
                </div>
              </div>
            )}

            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 
                ${isActive('/') 
                  ? 'bg-blue-900 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    ${isActive('/dashboard') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Layout size={18} />
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  to="/profile" 
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    ${isActive('/profile') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={18} />
                  <span>My Profile</span>
                </Link>
                
                <Link 
                  to="/settings" 
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    ${isActive('/settings') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </Link>
                
                <div className="border-t border-blue-700 my-2"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    ${isActive('/signin') 
                      ? 'bg-blue-900 text-white' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
                    bg-white text-blue-700 hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
