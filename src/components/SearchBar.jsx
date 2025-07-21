const SearchBar = ({ searchTerm, selectedKategori, onSearchChange, onKategoriChange }) => {
   return (
      <form className="flex flex-col sm:flex-row mt-8 gap-3 sm:gap-2 mb-4">
         <input
            type="search"
            placeholder="Cari sesuatu..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 text-base border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
         />
         <div className="relative w-full sm:w-40 z-10">
            <select
               value={selectedKategori}
               onChange={(e) => onKategoriChange(e.target.value)}
               className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 bg-white appearance-none cursor-pointer"
            >
               <option value="">Semua</option>
               <option value="alat">Alat</option>
               <option value="bahan">Bahan</option>
               <option value="sewa">Sewa</option>
               <option value="perjalanan-lokal">Perjalanan Lokal</option>
               <option value="lain-lain">Lain-lain</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
            </div>
         </div>
      </form>
   );
};

export default SearchBar;