import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate("/lihat")
      } catch (err) {
         console.error(err.message);
         setError("Email atau password salah.");
      }
   };

   return (
      <main className="flex justify-center min-h-screen w-full bg-leaf px-4">
         <section className="flex flex-col justify-center items-center gap-4 md:gap-6 w-full max-w-md">
            <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-center">Welcome bro!</h1>

            <form onSubmit={handleLogin} className="bg-gradient-plus rounded-2xl w-full p-6 px-7 py-9 md:p-8 md:py-10 flex flex-col gap-5 shadow-xl">
               <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base md:text-lg font-medium">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="guekeren@gmail.com"
                     className="text-base font-medium rounded-xl p-3 md:py-3 md:px-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                  />
               </div>
               <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-base md:text-lg font-medium">
                     Password
                  </label>
                  <input
                     type="password"
                     id="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="guekece123"
                     className="text-base font-medium rounded-xl p-3 md:py-3 md:px-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                  />
               </div>

               {error && <p className="text-red-600 font-medium text-md -my-1 -mb-2">{error}</p>}

               <button
                  type="submit"
                  className="bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-base md:text-lg py-2 md:py-2 text-center mt-3 text-black transition-all duration-200 cursor-pointer focus:outline-none"
               >
                  LOGIN
               </button>
            </form>
         </section>
      </main>
   );
};

export default Login;