import { FiAlertTriangle, FiX } from "react-icons/fi";

const ConfirmDialog = ({ title = "Konfirmasi", message, onConfirm, onCancel }) => {
   return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
         <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
               <FiAlertTriangle className="text-yellow-500 w-6 h-6" />
               <h2 className="font-semibold text-lg">{title}</h2>
            </div>
            <p className="text-sm text-gray-700">{message}</p>
            <div className="flex justify-end gap-3 mt-6">
               <button onClick={onCancel} className="px-4 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                  Cancel
               </button>
               <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 cursor-pointer">
                  Delete
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmDialog;