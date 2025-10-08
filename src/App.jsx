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

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("isAuthenticated") === "true";
  });

  const location = useLocation();
  const currentPath = location.pathname;

  // 🔓 Páginas públicas
  const isPublicPage = currentPath === "/login" || currentPath === "/sobreNos";

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  // 🔹 Se não estiver logado e tentar acessar página privada, vai pro login
  useEffect(() => {
    if (!isAuthenticated && !isPublicPage) {
      window.location.replace("/login");
    }
  }, [isAuthenticated, isPublicPage]);

  return (
    <div className="app-container">
      {/* 🔸 Navbar pública no login e sobre nós */}
      {isPublicPage ? (
        <NavBarPublica />
      ) : (
        isAuthenticated && <Navbar onLogout={handleLogout} />
      )}

      <main className="main-content">
        <Routes>
          {/* Páginas públicas */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/sobreNos" element={<SobreNos />} />

          {/* Páginas privadas */}
          {isAuthenticated && (
            <>
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/regioes" element={<Regioes />} />
              <Route path="/veiculos" element={<Veiculos />} />
              <Route path="/vendas" element={<Vendas />} />
            </>
          )}

          {/* Redireciona raiz */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/vendas" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Qualquer rota desconhecida → redireciona */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/vendas" : "/login"} />} />
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
