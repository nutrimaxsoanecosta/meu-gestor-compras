import React, { useState, useEffect } from 'react';

interface ModalEditarEstabelecimentoProps {
  isOpen: boolean;
  onClose: () => void;
  estabelecimento: any;
  onSubmit: (id: string, nome: string) => void;
}

export default function ModalEditarEstabelecimento({
  isOpen,
  onClose,
  estabelecimento,
  onSubmit,
}: ModalEditarEstabelecimentoProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (estabelecimento) setNome(estabelecimento.nome || '');
  }, [estabelecimento]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-slate-800">Editar Estabelecimento</h3>
        <div>
          <label className="text-xs font-semibold text-slate-500">Nome do Estabelecimento / Loja</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl text-sm font-medium">
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(estabelecimento.id, nome)}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}