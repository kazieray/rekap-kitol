import { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

const Notif = ({ message, type = "success", isVisible, onClose, duration = 4000 }) => {
   const [show, setShow] = useState(false);

   useEffect(() => {
      if (isVisible) {
         setShow(true);
         const timer = setTimeout(() => {
            handleClose();
         }, duration);
         return () => clearTimeout(timer);
      }
   }, [isVisible, duration]);

   const handleClose = () => {
      setShow(false);
      setTimeout(() => {
         onClose && onClose();
      }, 300);
   };

   if (!isVisible) return null;

   const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
   const icon = type === "success" ? <FiCheckCircle className="w-5 h-5" /> : <FiXCircle className="w-5 h-5" />;

   return (
      <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
         <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80 max-w-96`}>
            {icon}
            <span className="flex-1 text-sm font-medium">{message}</span>
            <button onClick={handleClose} className="hover:bg-white/20 rounded-full p-1 transition-colors duration-200">
               <FiX className="w-4 h-4" />
            </button>
         </div>
      </div>
   );
};

export default Notif;