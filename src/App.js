import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import AboutPage from "./Components/About/AboutPage";
import Pesticides from "./Components/Pesticides/Pesticides";
import AdminDashboard from "./Admin/Components/AdminDashboard/AdminDashboard";
import PesticidesData from "./Admin/Components/Pesticides/PesticidesData";
import Navbar from "./Components/Navbar/Navbar";
import LoginData from "../src/Admin/Components/Login/LoginData";
import AdminHomePage from "./Admin/Components/AdminHomepage/AdminHomePage";
import PesticidesForm from "./Admin/Components/Pesticides/PesticidesForm";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/";

  return (
    <>
      {!isAdminRoute && !isLoginRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pesticides" element={<Pesticides />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="" element={<AdminHomePage />} />
          <Route path="pesticides" element={<PesticidesData />} />
          <Route path="login" element={<LoginData />} />
          <Route path="pesticidesform" element={<PesticidesForm />} />
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
