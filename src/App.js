import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Client/Components/HomePage/HomePage";
import LoginPage from "./Client/Components/LoginPage/LoginPage";
import Pesticides from "./Client/Components/Pesticides/Pesticides";
import AdminDashboard from "./Admin/Components/AdminDashboard/AdminDashboard";
import PesticidesData from "./Admin/Components/Pesticides/PesticidesData";
import Navbar from "./Client/Components/Navbar/Navbar";
import AboutPage from "./Client/Components/About/AboutPage";
import AdminHomePage from "./Admin/Components/AdminHomepage/AdminHomePage";
import PesticidesForm from "./Admin/Components/Pesticides/PesticidesForm";
import ContactData from "./Admin/Components/Contact/ContactData";
import BlogPage from "./Client/Components/Blog/Blog";
import ContactPage from "./Client/Components/Contact/Contact";
import LoginData from "./Admin/Components/Login/LoginData";
import BlogData from "./Admin/Components/Blog/BlogData.jsx";
import BlogForm from "./Admin/Components/Blog/BlogForm.jsx";
import CropsPage from "./Client/Components/Crop/Crops.jsx";
import MyCrops from "./Client/Components/Crop/MyCrops.jsx";
import CropData from "./Admin/Components/Crop/CropData.jsx";
import CropsForm from "./Client/Components/Crop/CropsForm.jsx";
import FAQsPage from "./Client/Components/FAQs/FAQsPage.jsx";
import FAQsData from "./Admin/Components/FAQs/FAQsData.jsx";
import FAQsForm from "./Admin/Components/FAQs/FAQsForm.jsx";
import ProtectedRoute from "../src/Client/Components/ProtectedRoute.jsx";
import PesticidesDescription from "./Client/Components/Pesticides/PesticidesDescription.jsx";
import PaymentSuccessPage from "./Client/Components/Pesticides/PaymentSuccessPage.jsx";
import PesticidesTransaction from "./Client/Components/Pesticides/PesticidesTransaction.jsx";
import ScrollToTop from "./Client/Components/ScrollToTop.jsx";
import Transactions from "./Admin/Components/Transactions/Transactions.jsx";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/";

  // Mock: Replace this with actual admin check (e.g., context or API validation)
  const isAdmin = localStorage.getItem("role") === "Admin"; 

  return (
    <>
      {!isAdminRoute && !isLoginRoute && <Navbar />}
      
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pesticides" element={<Pesticides />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/crop" element={<CropsPage />} />
        <Route path="/cropsform/:id?" element={<CropsForm />} />
        <Route path="/mycrops" element={<MyCrops />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/pesticidesdescription/:id?" element={<PesticidesDescription />} />
        <Route path="/pesticidestransaction" element={<PesticidesTransaction />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route
          path="/admin/*"
          element={<ProtectedRoute isAdmin={isAdmin} element={<AdminDashboard />} />}
        >
          <Route path="" element={<AdminHomePage />} />
          <Route path="login" element={<LoginData />} />
          <Route path="pesticides" element={<PesticidesData />} />
          <Route path="pesticidesform/:id?" element={<PesticidesForm />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="blog" element={<BlogData />} />
          <Route path="blogform/:id?" element={<BlogForm />} />
          <Route path="crop" element={<CropData />} />
          <Route path="faqs" element={<FAQsData />} />
          <Route path="faqsform/:id?" element={<FAQsForm />} />
          <Route path="contact" element={<ContactData />} />
        </Route>
      </Routes>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
