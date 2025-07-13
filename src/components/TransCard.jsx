const TransCard = () => {
   return (
      <main className="mt-3">
         <section className="flex flex-col justify-between gap-3 min-h-[160px] px-5 py-4 bg-white w-full max-w-md mx-auto sm:max-w-none sm:w-full rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col gap-2 py-2">
               <h2 className="font-semibold text-lg sm:text-xl">Beli Mikropipet</h2>
               <h4 className="text-base sm:text-lg text-gray-700">Rp200.000</h4>
            </div>
            <div className="flex flex-row justify-between items-center border-t border-gray-200 pt-3">
               <p className="text-sm sm:text-base text-gray-600">Hari, tanggal</p>
               <button className="bg-green-100 hover:bg-green-200 px-4 py-2 font-semibold text-sm sm:text-base rounded-xl transition-colors duration-200 cursor-pointer">Detail</button>
            </div>
         </section>
      </main>
   );
}

export default TransCard;