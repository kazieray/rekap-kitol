import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import TransForm from "../components/TransForm";
import Notif from "../components/Notif";
import ConfirmDialog from "../components/ConfirmDialog";

const DetailTrans = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [showConfirm, setShowConfirm] = useState(false);
   const [notif, setNotif] = useState({ isVisible: false, message: "", type: "success" });

   useEffect(() => {
      const fetchData = async () => {
         try {
            const docRef = doc(db, "laporan", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
               const fetched = docSnap.data();
               fetched.id = docSnap.id;
               setData(fetched);
            } else {
               setNotif({ isVisible: true, message: "Data tidak ditemukan", type: "error" });
               setTimeout(() => navigate("/lihat"), 1500);
            }
         } catch (error) {
            console.error("Gagal ambil data:", error);
            setNotif({ isVisible: true, message: "Terjadi kesalahan", type: "error" });
            setTimeout(() => navigate("/lihat"), 1500);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id, navigate]);

   const handleDelete = async () => {
      try {
         await deleteDoc(doc(db, "laporan", id));
         setNotif({ isVisible: true, message: "Laporan berhasil dihapus!", type: "success" });
         setTimeout(() => navigate("/lihat"), 1500);
      } catch (error) {
         console.error("Gagal menghapus:", error);
         setNotif({ isVisible: true, message: "Gagal menghapus laporan", type: "error" });
      }
   };

   return (
      <>
         <Notif message={notif.message} type={notif.type} isVisible={notif.isVisible} onClose={() => setNotif((prev) => ({ ...prev, isVisible: false }))} />

         {showConfirm && (
            <ConfirmDialog
               message="Apakah kamu yakin ingin menghapus laporan ini?"
               onConfirm={() => {
                  setShowConfirm(false);
                  handleDelete();
               }}
               onCancel={() => setShowConfirm(false)}
            />
         )}

         {loading ? (
            <p className="text-center mt-10">Memuat data...</p>
         ) : (
            data && (
               <>
                  <TransForm initialData={data} mode="view" onCancel={() => navigate(`/lihat`)} />
                  <div className="max-w-2xl mx-auto flex gap-4 mt-2 mb-6 px-4">
                     <button onClick={() => navigate(`/update/${id}`)} className="flex-1 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 cursor-pointer">
                        Update
                     </button>
                     <button onClick={() => setShowConfirm(true)} className="flex-1 px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition duration-300 cursor-pointer">
                        Delete
                     </button>
                  </div>
               </>
            )
         )}
      </>
   );
};

export default DetailTrans;