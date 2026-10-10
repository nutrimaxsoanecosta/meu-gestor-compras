import React, { useState, useEffect } from 'react';

interface ModalNovaListaProps {
  isOpen: boolean;
  onClose: () => void;
  listaEditando: any;
  onSubmit: (dados: any) => void;
}

export default function ModalNovaLista({ isOpen, onClose, listaEditando, onSubmit }: ModalNovaListaProps) {
  const [nome, setNome] = useState('');
  const [metaGasto, setMetaGasto] = useState('');

  useEffect(() => {
    if (listaEditando) {
      setNome(listaEditando.nome || '');
      setMetaGasto(listaEditando.metaGasto || '');
    } else {
      setNome('');
      setMetaGasto('');
    }
  }, [listaEditando, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-slate-800">
          {listaEditando ? 'Editar Lista' : 'Criar Nova Lista'}
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Nome da Lista</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Churrasco do Fim de Semana"
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Meta de Gasto R$ (Opcional)</label>
            <input
              type="number"
              step="0.01"
              value={metaGasto}
              onChange={(e) => setMetaGasto(e.target.value)}
              placeholder="Ex: 250.00"
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl text-sm font-medium">
            Cancelar
          </button>
          <button
            onClick={() => onSubmit({ id: listaEditando?.id, nome, metaGasto })}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}