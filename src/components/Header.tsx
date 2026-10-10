import React from 'react';

interface HeaderProps {
  abaAtiva: 'lista' | 'despensa';
  setAbaAtiva: (aba: 'lista' | 'despensa') => void;
}

export default function Header({ abaAtiva, setAbaAtiva }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <i className="fa-solid fa-cart-shopping"></i> Minhas Compras
        </h1>
        <p className="text-xs text-indigo-200">Painel de Controle</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setAbaAtiva('lista')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            abaAtiva === 'lista' ? 'bg-indigo-700' : 'bg-indigo-800/60 hover:bg-indigo-800'
          }`}
        >
          <i className="fa-solid fa-list-check mr-1"></i> Lista
        </button>
        <button
          onClick={() => setAbaAtiva('despensa')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            abaAtiva === 'despensa' ? 'bg-indigo-700' : 'bg-indigo-800/60 hover:bg-indigo-800'
          }`}
        >
          <i className="fa-solid fa-boxes-stacked mr-1"></i> Validade / Despensa
        </button>

      </div>
    </header>
  );
}