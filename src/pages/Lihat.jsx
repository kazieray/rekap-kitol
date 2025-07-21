import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import TransCard from "../components/TransCard";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const Lihat = () => {
   const [groupedData, setGroupedData] = useState({});
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedKategori, setSelectedKategori] = useState("");

   useEffect(() => {
      const fetchData = async () => {
         const querySnapshot = await getDocs(collection(db, "laporan"));
         const data = [];

         querySnapshot.forEach((doc) => {
            const laporan = doc.data();
            laporan.id = doc.id;
            data.push(laporan);
         });

         const filtered = data.filter((item) => {
            const cocokJudul = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
            const cocokKategori = selectedKategori ? item.kategori === selectedKategori : true;
            return cocokJudul && cocokKategori;
         });

         const sortedData = filtered.sort((a, b) => {
            return dayjs(b.tanggal).valueOf() - dayjs(a.tanggal).valueOf();
         });

         const grouped = sortedData.reduce((acc, item) => {
            const bulan = dayjs(item.tanggal).format("MMMM YYYY");
            if (!acc[bulan]) acc[bulan] = [];
            acc[bulan].push(item);
            return acc;
         }, {});

         const sortedGrouped = Object.fromEntries(
            Object.entries(grouped).sort((a, b) => {
               const dateA = dayjs(a[0], "MMMM YYYY");
               const dateB = dayjs(b[0], "MMMM YYYY");
               return dateB - dateA;
            })
         );

         setGroupedData(sortedGrouped);
      };

      fetchData();
   }, [searchTerm, selectedKategori]);

   return (
      <>
         <Navbar />
         <section className="px-4 sm:px-6 md:px-15 flex flex-col max-w-7xl mx-auto">
            <Stats />
            <SearchBar searchTerm={searchTerm} selectedKategori={selectedKategori} onSearchChange={setSearchTerm} onKategoriChange={setSelectedKategori} />
            {Object.keys(groupedData).length === 0 ? (
               <p className="text-gray-500 text-center my-8">Tidak ada data ditemukan.</p>
            ) : (
               Object.keys(groupedData).map((bulan) => (
                  <div key={bulan}>
                     <h2 className="text-xl font-semibold mt-6 mb-2">{bulan}</h2>
                     {groupedData[bulan].map((item) => (
                        <TransCard key={item.id} data={item} />
                     ))}
                  </div>
               ))
            )}
         </section>
      </>
   );
};

export default Lihat;