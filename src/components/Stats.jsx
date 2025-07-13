import { useEffect, useState } from "react";
import { GiHammerNails, GiTakeMyMoney } from "react-icons/gi";
import { PiPackageLight } from "react-icons/pi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Stats = () => {
   const [total, setTotal] = useState(0);
   const [alatCount, setAlatCount] = useState(0);
   const [bahanCount, setBahanCount] = useState(0);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchStats = async () => {
         try {
            const querySnapshot = await getDocs(collection(db, "laporan"));
            let totalHarga = 0;
            let alat = 0;
            let bahan = 0;

            querySnapshot.forEach((doc) => {
               const data = doc.data();
               const harga = parseInt(data.harga);
               if (!isNaN(harga)) {
                  totalHarga += harga;
               }

               if (data.kategori === "alat") alat++;
               else if (data.kategori === "bahan") bahan++;
            });

            setTotal(totalHarga);
            setAlatCount(alat);
            setBahanCount(bahan);
         } catch (error) {
            console.error("Gagal memuat statistik:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchStats();
   }, []);

   const formatHarga = (angka) => {
      return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   };

   return (
      <main className="flex gap-3 mt-6 justify-center items-center flex-col sm:flex-row">
         <section className="flex gap-2 justify-center items-center bg-sky-500 p-6 sm:p-8 md:p-10 w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <GiTakeMyMoney className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="font-semibold text-white text-base sm:text-lg md:text-xl">{loading ? "Memuat..." : `Total: Rp${formatHarga(total)}`}</h2>
         </section>
         <section className="flex gap-2 justify-center items-center bg-yellow-500 p-6 sm:p-8 md:p-10 w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <GiHammerNails className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="font-semibold text-white text-base sm:text-lg md:text-xl">{loading ? "Memuat..." : `Alat: ${alatCount}`}</h2>
         </section>
         <section className="flex gap-2 justify-center items-center bg-pink-500 p-6 sm:p-8 md:p-10 w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <PiPackageLight className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="font-semibold text-white text-base sm:text-lg md:text-xl">{loading ? "Memuat..." : `Bahan: ${bahanCount}`}</h2>
         </section>
      </main>
   );
};

export default Stats;