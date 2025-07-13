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
            <Route path="/buat" element={
               <PrivateRoute>
                  <Buat />
               </PrivateRoute>
            } />
            <Route path="/detail/:id" element={
               <PrivateRoute>
                  <DetailTrans />
               </PrivateRoute>
            } />
            <Route path="/update/:id" element={
               <PrivateRoute>
                  <UpdateTrans />
               </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App;