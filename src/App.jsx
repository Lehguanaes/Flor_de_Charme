import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Quando abre a aplicação, checa no localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // salva no navegador
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // limpa no navegador
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navbar depende do login */}
        {isAuthenticated ? <Navbar onLogout={handleLogout} /> : <NavBarPublica />}

        <main className="main-content">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/sobreNos" element={<SobreNos />} />

            {/* Redirecionar root */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/vendas" /> : <Navigate to="/login" />} />

            {/* Rotas privadas */}
            <Route path="/clientes" element={<PrivateRoute isAuthenticated={isAuthenticated}><Clientes /></PrivateRoute>} />
            <Route path="/produtos" element={<PrivateRoute isAuthenticated={isAuthenticated}><Produtos /></PrivateRoute>} />
            <Route path="/regioes" element={<PrivateRoute isAuthenticated={isAuthenticated}><Regioes /></PrivateRoute>} />
            <Route path="/veiculos" element={<PrivateRoute isAuthenticated={isAuthenticated}><Veiculos /></PrivateRoute>} />
            <Route path="/vendas" element={<PrivateRoute isAuthenticated={isAuthenticated}><Vendas /></PrivateRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
