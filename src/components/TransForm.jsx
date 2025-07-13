import { useState, useEffect } from "react";
import { FiUpload, FiX, FiCalendar, FiMapPin, FiDollarSign, FiFileText, FiTag } from "react-icons/fi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const TransForm = ({initialData = null, mode = "create", onSubmit, onCancel}) => {
   const [formData, setFormData] = useState({
      judul: "",
      harga: "",
      tempat: "",
      tanggal: "",
      deskripsi: "",
      kategori: "",
      nota: null,
   });

   const [previewImage, setPreviewImage] = useState(null);
   const [errors, setErrors] = useState({});

   useEffect(() => {
      if (initialData) {
         setFormData(initialData);
         if (initialData.nota) {
            setPreviewImage(initialData.nota);
         }
      }
   }, [initialData]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: "",
         }));
      }
   };

   const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({
               ...prev,
               nota: "Ukuran file maksimal 5MB",
            }));
            return;
         }

         setFormData((prev) => ({
            ...prev,
            nota: file,
         }));

         const reader = new FileReader();
         reader.onload = (e) => {
            setPreviewImage(e.target.result);
         };
         reader.readAsDataURL(file);

         if (errors.nota) {
            setErrors((prev) => ({
               ...prev,
               nota: "",
            }));
         }
      }
   };

   const removeImage = () => {
      setFormData((prev) => ({
         ...prev,
         nota: null,
      }));
      setPreviewImage(null);
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.judul.trim()) newErrors.judul = "Judul pembelian wajib diisi";
      if (!formData.harga) newErrors.harga = "Harga wajib diisi";
      if (!formData.tempat.trim()) newErrors.tempat = "Tempat pembelian wajib diisi";
      if (!formData.tanggal) newErrors.tanggal = "Tanggal wajib diisi";
      if (!formData.kategori) newErrors.kategori = "Kategori wajib dipilih";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (mode === "view") return;

      if (!validateForm()) return;

      try {
         let notaURL = formData.nota;

         // Upload nota jika berupa file
         if (formData.nota instanceof File) {
            const notaRef = ref(storage, `nota/${Date.now()}_${formData.nota.name}`);
            await uploadBytes(notaRef, formData.nota);
            notaURL = await getDownloadURL(notaRef);
         }

         const finalData = {
            ...formData,
            nota: notaURL,
         };

         // 🔥 Simpan ke Firestore collection 'laporan'
         await addDoc(collection(db, "laporan"), finalData);

         // Panggil callback jika ada
         onSubmit && onSubmit(finalData);
      } catch (error) {
         console.error("Gagal mengupload atau menyimpan data:", error);
         alert("Terjadi kesalahan saat upload atau simpan data.");
      }
   };

   const isReadOnly = mode === "view";
   const isEditing = mode === "edit";

   return (
      <main className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
         <header className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
               {mode === "create" && "Buat Laporan Baru"}
               {mode === "view" && "Detail Laporan"}
               {mode === "edit" && "Edit Laporan"}
            </h2>
            {onCancel && (
               <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <FiX className="w-5 h-5 text-gray-500" />
               </button>
            )}
         </header>

         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul Pembelian */}
            <section>
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiFileText className="w-4 h-4" />
                  Judul Pembelian
               </label>
               <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  placeholder="Masukkan judul pembelian..."
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 
                     ${isReadOnly ? "bg-gray-50 cursor-not-allowed" : "border-gray-300"} 
                     ${errors.judul ? "border-red-500" : ""}`}
               />
               {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul}</p>}
            </section>

            {/* Harga dan Tempat */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                     <FiDollarSign className="w-4 h-4" />
                     Harga
                  </label>
                  <input
                     type="number"
                     name="harga"
                     value={formData.harga}
                     onChange={handleInputChange}
                     readOnly={isReadOnly}
                     placeholder="0"
                     className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 
                        ${isReadOnly ? "bg-gray-50 cursor-not-allowed" : "border-gray-300"} 
                        ${errors.harga ? "border-red-500" : ""}`}
                  />
                  {errors.harga && <p className="text-red-500 text-sm mt-1">{errors.harga}</p>}
               </div>

               <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                     <FiMapPin className="w-4 h-4" />
                     Tempat
                  </label>
                  <input
                     type="text"
                     name="tempat"
                     value={formData.tempat}
                     onChange={handleInputChange}
                     readOnly={isReadOnly}
                     placeholder="Nama toko/tempat..."
                     className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 
                        ${isReadOnly ? "bg-gray-50 cursor-not-allowed" : "border-gray-300"} 
                        ${errors.tempat ? "border-red-500" : ""}`}
                  />
                  {errors.tempat && <p className="text-red-500 text-sm mt-1">{errors.tempat}</p>}
               </div>
            </section>

            {/* Tanggal dan Kategori */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                     <FiCalendar className="w-4 h-4" />
                     Tanggal
                  </label>
                  <input
                     type="date"
                     name="tanggal"
                     value={formData.tanggal}
                     onChange={handleInputChange}
                     readOnly={isReadOnly}
                     className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 
                        ${isReadOnly ? "bg-gray-50 cursor-not-allowed" : "border-gray-300"} 
                        ${errors.tanggal ? "border-red-500" : ""}`}
                  />
                  {errors.tanggal && <p className="text-red-500 text-sm mt-1">{errors.tanggal}</p>}
               </div>

               <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                     <FiTag className="w-4 h-4" />
                     Kategori
                  </label>
                  <div className="relative">
                     <select
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleInputChange}
                        disabled={isReadOnly}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer 
                           ${isReadOnly ? "bg-gray-50 cursor-not-allowed" : "border-gray-300 bg-white"} 
                           ${errors.kategori ? "border-red-500" : ""}`}
                     >
                        <option value="">Pilih kategori...</option>
                        <option value="alat">Alat</option>
                        <option value="bahan">Bahan</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                     </div>
                  </div>
                  {errors.kategori && <p className="text-red-500 text-sm mt-1">{errors.kategori}</p>}
               </div>
            </section>

            {/* Deskripsi */}
            <div>
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiFileText className="w-4 h-4" />
                  Deskripsi Singkat
               </label>
               <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                  placeholder="Tambahkan deskripsi singkat (opsional)..."
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 resize-none ${
                     isReadOnly ? "bg-gray-50 cursor-not-allowed" : "border-gray-300"
                  }`}
               />
            </div>

            {/* Upload Nota */}
            <div>
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FiUpload className="w-4 h-4" />
                  Upload Nota
               </label>

               {!previewImage && !isReadOnly && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors duration-300">
                     <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="nota-upload" />
                     <label htmlFor="nota-upload" className="cursor-pointer">
                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Klik untuk upload nota</p>
                        <p className="text-sm text-gray-400 mt-1">PNG, JPG hingga 5MB</p>
                     </label>
                  </div>
               )}

               {previewImage && (
                  <div className="relative text-center">
                     <img src={previewImage} alt="Preview nota" className="w-full max-w-md mx-auto rounded-xl shadow-md" />

                     {/* Tombol Hapus Gambar jika bukan mode view */}
                     {!isReadOnly && (
                        <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200">
                           <FiX className="w-4 h-4" />
                        </button>
                     )}

                     {/* Tombol Download jika mode view */}
                     {isReadOnly && (
                        <a href={previewImage} download="nota.jpg" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-green-600 font-medium underline hover:text-green-800 transition-colors">
                           Unduh Gambar Nota
                        </a>
                     )}
                  </div>
               )}

               {errors.nota && <p className="text-red-500 text-sm mt-1">{errors.nota}</p>}
            </div>

            {/* Action Buttons */}
            {!isReadOnly && (
               <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  {onCancel && (
                     <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold">
                        Batal
                     </button>
                  )}
                  <button type="submit" className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl cursor-pointer">
                     {mode === "create" ? "Buat Laporan" : "Simpan Perubahan"}
                  </button>
               </div>
            )}
         </form>
      </main>
   );
};

export default TransForm;