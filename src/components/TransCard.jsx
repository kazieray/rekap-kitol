import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

const TransCard = ({ data }) => {
   const navigate = useNavigate();

   const formatHarga = (angka) => {
      return angka?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   };

   return (
      <main className="my-3">
         <section className="flex flex-col justify-between gap-3 min-h-[160px] px-5 py-4 bg-white w-full max-w-md mx-auto sm:max-w-none sm:w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col gap-2 py-2">
               <h2 className="font-semibold text-lg sm:text-xl">{data.judul}</h2>
               <h4 className="text-base sm:text-lg text-gray-700">Rp{formatHarga(data.harga)}</h4>
            </div>
            <div className="flex flex-row justify-between items-center border-t border-gray-200 pt-3">
               <p className="text-sm sm:text-base text-gray-600">{dayjs(data.tanggal).format("dddd, D MMMM YYYY")}</p>
               <button onClick={() => navigate(`/detail/${data.id}`)} className="bg-green-100 hover:bg-green-200 px-4 py-2 font-semibold text-sm sm:text-base rounded-xl transition-colors duration-200 cursor-pointer">
                  Detail
               </button>
            </div>
         </section>
      </main>
   );
};

export default TransCard;