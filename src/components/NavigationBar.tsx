import React from 'react';

interface NavigationBarProps {
  abrirModalNovaLista: () => void;
  abrirModalNovoItem: () => void;
  abrirModalCadastroRapido: () => void; // Nova prop
}

export default function NavigationBar({
  abrirModalNovaLista,
  abrirModalNovoItem,
  abrirModalCadastroRapido,
}: NavigationBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around items-center z-20 max-w-md mx-auto">
      <button
        onClick={abrirModalNovaLista}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
          <i className="fa-solid fa-folder-plus text-base"></i>
        </div>
        <span>Nova Lista</span>
      </button>

      <button
        onClick={abrirModalNovoItem}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs"
      >
        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center -mt-5 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition">
          <i className="fa-solid fa-plus text-lg"></i>
        </div>
        <span className="font-bold text-indigo-600">Item</span>
      </button>

      {/* Botão de Cadastro Rápido (Raio/Relâmpago) substituindo a Loja */}
      <button
        onClick={abrirModalCadastroRapido}
        className="flex flex-col items-center text-amber-500 hover:text-amber-600 transition group"
        title="Cadastro Rápido (Item + Histórico)"
      >
        <div className="bg-amber-50 group-hover:bg-amber-100 p-2.5 rounded-2xl transition">
          <i className="fa-solid fa-bolt text-lg"></i>
        </div>
        <span className="text-[10px] font-bold mt-1 text-amber-600">Rápido</span>
      </button>
    </nav>
  );
}