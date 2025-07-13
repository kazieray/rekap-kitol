import { useState } from "react";
import logo from "../assets/kitol.svg";
import { FiMenu, FiX } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const handleToggleMenu = () => setIsOpen(!isOpen);

   const navigate = useNavigate();
   const handleLogout = async() => {
      try {
         await signOut(auth);
         navigate("/");
      } catch (err) {
         console.log("Logout gagal:", err);
      }
   }

   const navLinks = [
      { label: "Lihat", to: "/lihat" },
      { label: "Buat", to: "/buat" },
      { label: "Keluar", isLogout: true },
   ];

   return (
      <header className="flex flex-row justify-between items-center py-4 px-4 md:px-15 sticky top-0 shadow-sm backdrop-blur-md bg-white/95 border-b border-gray-200/50 z-50">
         <img src={logo} alt="Kitol Logo" className="h-8 md:h-10 w-auto" />

         {/* hamburder button */}
         <button onClick={handleToggleMenu} className="md:hidden flex justify-center items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
         </button>

         {/* mobile vavigation */}
         {isOpen && (
            <nav className="absolute top-full left-0 w-full flex flex-col items-center shadow-lg md:hidden backdrop-blur-md bg-white/95 border-b border-gray-200/50 z-40">
               {navLinks.map((item, index) =>
                  item.isLogout ? (
                     <button key={index} onClick={handleLogout} className="w-full text-red-500 hover:text-red-600 border-t-1 border-t-gray-200 py-3 font-semibold text-base hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                        {item.label}
                     </button>
                  ) : (
                     <Link key={index} to={item.to} className="w-full text-green-600 hover:text-green-700 border-t-1 border-t-gray-200 py-3 font-semibold text-base text-center hover:bg-gray-100 transition-all duration-200">
                        {item.label}
                     </Link>
                  )
               )}
            </nav>
         )}

         {/* desktop navigation */}
         <nav className="hidden md:flex gap-6 lg:gap-8">
            {navLinks.map((item, index) =>
               item.isLogout ? (
                  <button key={index} onClick={handleLogout} className="text-red-500 hover:text-red-600 font-semibold text-base lg:text-lg hover:scale-105 transition-all duration-200 cursor-pointer">
                     {item.label}
                  </button>
               ) : (
                  <Link key={index} to={item.to} className="text-green-600 hover:text-green-700 font-semibold text-base lg:text-lg hover:scale-105 transition-all duration-200">
                     {item.label}
                  </Link>
               )
            )}
         </nav>
      </header>
   );
};

export default Navbar;