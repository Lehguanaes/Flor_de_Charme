import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import NavBarPublica from "./components/navBarPublica/NavBarPublica";
import Navbar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

import Login from "./pages/login/Login";
import Clientes from "./pages/clientes/Clientes";
import Produtos from "./pages/produtos/Produtos";
import Regioes from "./pages/regioes/Regioes";
import Veiculos from "./pages/veiculos/Veiculos";
import Vendas from "./pages/vendas/Vendas";
import SobreNos from "./pages/sobreNos/SobreNos";
import HomePage from "./pages/homePage/HomePage";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAuthenticated") === "true";
  });

  const location = useLocation();
  const currentPath = location.pathname;

  // 🔓 Páginas públicas
  const isPublicPage = [
    "/", 
    "/homePage", 
    "/homepage",
    "/login", 
    "/sobreNos"
  ].includes(currentPath);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  // 🔹 CORREÇÃO: Remove o useEffect problemático
  // Não force redirecionamentos com window.location

  return (
    <div className="app-container">
      {/* 🔸 Navbar pública nas páginas públicas */}
      {isPublicPage ? (
        <NavBarPublica />
      ) : (
        isAuthenticated ? <Navbar onLogout={handleLogout} /> : <NavBarPublica />
      )}

      <main className="main-content">
        <Routes>
          {/* Páginas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/homepage" element={<Navigate to="/homePage" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/sobreNos" element={<SobreNos />} />

          {/* Páginas privadas - só acessíveis se autenticado */}
          <Route 
            path="/clientes" 
            element={isAuthenticated ? <Clientes /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/produtos" 
            element={isAuthenticated ? <Produtos /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/regioes" 
            element={isAuthenticated ? <Regioes /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/veiculos" 
            element={isAuthenticated ? <Veiculos /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/vendas" 
            element={isAuthenticated ? <Vendas /> : <Navigate to="/login" replace />} 
          />

          {/* Rota coringa */}
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/vendas" : "/"} replace />} 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}