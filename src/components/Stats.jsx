import { GiHammerNails, GiTakeMyMoney } from "react-icons/gi";
import { PiPackageLight } from "react-icons/pi";

const Stats = () => {
   return (
      <main className="flex gap-3 mt-6 justify-center items-center flex-col sm:flex-row">
         <section className="flex gap-2 justify-center items-center bg-sky-500 p-6 sm:p-8 md:p-10 w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <GiTakeMyMoney className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="font-semibold text-white text-base sm:text-lg md:text-xl">Total: Rp200.000</h2>
         </section>
         <section className="flex gap-2 justify-center items-center bg-yellow-500 p-6 sm:p-8 md:p-10 w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <GiHammerNails className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="font-semibold text-white text-base sm:text-lg md:text-xl">Alat: 2</h2>
         </section>
         <section className="flex gap-2 justify-center items-center bg-pink-500 p-6 sm:p-8 md:p-10 w-full rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <PiPackageLight className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="font-semibold text-white text-base sm:text-lg md:text-xl">Bahan: 10</h2>
         </section>
      </main>
   );
};

export default Stats;
