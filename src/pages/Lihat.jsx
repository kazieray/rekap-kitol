import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import TransCard from "../components/TransCard";

const Lihat = () => {
   return (
      <>
         <Navbar />
         <section className="px-4 sm:px-6 md:px-15 flex flex-col max-w-7xl mx-auto">
            <Stats />
            <SearchBar />
            <h2>Juli</h2>
            <TransCard />
            <TransCard />
            <h2>Juni</h2>
            <TransCard />
            <TransCard />
         </section>
      </>
   );
}

export default Lihat;