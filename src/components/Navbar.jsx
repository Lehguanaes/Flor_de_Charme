import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Vendas", href: "#" },
    { name: "Produtos", href: "#" },
    { name: "Clientes", href: "#" },
    { name: "Veículos", href: "#" },
    { name: "Região", href: "#" },
  ];

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold">MinhaEmpresa</div>
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gray-200 transition"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-red-700 px-4 pb-4 space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-white hover:text-gray-200 transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
