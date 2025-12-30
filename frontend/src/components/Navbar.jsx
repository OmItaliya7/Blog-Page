import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Hide navbar on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold tracking-tight">
          Blog<span className="text-gray-500 font-medium">Space</span>
        </Link>

        
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link className="text-gray-600 hover:text-black transition" to="/">
            Home
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="text-gray-600 hover:text-black transition"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full px-5 py-2 bg-black text-white hover:bg-gray-900 transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">
                {user.email}
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>

     
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 text-sm">
          <Link to="/" className="block">
            Home
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="block">
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className="block">
                Login
              </Link>
              <Link to="/register" className="block font-medium">
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
