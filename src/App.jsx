import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <h1 className="text-3xl font-bold text-red-600">Bem-vinda!</h1>
        <p className="mt-4 text-gray-700">
          Aqui vai o conteúdo principal do seu sistema.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default App;