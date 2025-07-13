import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Lihat from "./pages/Lihat";
import Buat from "./pages/Buat";
import DetailTrans from "./pages/DetailTrans";
import UpdateTrans from "./pages/UpdateTrans";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

function App() {
   return (
      <BrowserRouter> 
         <Routes>
            <Route path="/" element={ <Login />} />
            <Route path="/lihat" element={ 
               <PrivateRoute>
                  <Lihat />
               </PrivateRoute>
            } />
            <Route path="/buat" element={<Buat />} />
            <Route path="/detail/:id" element={<DetailTrans />} />
            <Route path="/update/:id" element={<UpdateTrans />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App;