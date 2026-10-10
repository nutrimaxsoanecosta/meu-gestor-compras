import React from 'react';

interface NavigationBarProps {
  abrirModalNovaLista: () => void;
  abrirModalNovoItem: () => void;
  abrirModalNovoEstabelecimento: () => void;
}

export default function NavigationBar({
  abrirModalNovaLista,
  abrirModalNovoItem,
  abrirModalNovoEstabelecimento,
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

      <button
        onClick={abrirModalNovoEstabelecimento}
        className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
          <i className="fa-solid fa-store text-base"></i>
        </div>
        <span>Loja</span>
      </button>
    </nav>
  );
}