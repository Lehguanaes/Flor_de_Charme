import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Bem-vinda!</h1>
        <p className="mt-4 text-gray-700">
          Aqui vai o conteúdo principal do seu sistema.
        </p>
      </main>
    </div>
  );
}

export default App;
