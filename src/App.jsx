
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HeroPage from "./components/HeroPage"; 
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <><Navbar />
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  );
}
export default App;