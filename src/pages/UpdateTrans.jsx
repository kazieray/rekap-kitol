import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import TransForm from "../components/TransForm";
import Notif from "../components/Notif";

const UpdateTrans = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
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
               setTimeout(() => navigate("/lihat"), 1000);
            }
         } catch (error) {
            console.error("Gagal mengambil data:", error);
            setNotif({ isVisible: true, message: "Gagal mengambil data", type: "error" });
            setTimeout(() => navigate("/lihat"), 1000);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [id, navigate]);

   const handleUpdate = async (updatedData) => {
      try {
         const docRef = doc(db, "laporan", id);
         await updateDoc(docRef, updatedData);
         setNotif({ isVisible: true, message: "Laporan berhasil diperbarui!", type: "success" });
         setTimeout(() => navigate(`/detail/${id}`), 500);
      } catch (error) {
         console.error("Gagal update:", error);
         setNotif({ isVisible: true, message: "Terjadi kesalahan saat update", type: "error" });
      }
   };

   return (
      <>
         <Notif message={notif.message} type={notif.type} isVisible={notif.isVisible} onClose={() => setNotif((prev) => ({ ...prev, isVisible: false }))} />
         {loading ? <p className="text-center mt-10">Memuat data...</p> : data && <TransForm initialData={data} mode="edit" onSubmit={handleUpdate} onCancel={() => navigate(`/detail/${id}`)} />}
      </>
   );
};

export default UpdateTrans;