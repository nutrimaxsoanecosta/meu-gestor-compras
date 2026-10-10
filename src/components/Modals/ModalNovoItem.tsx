import React, { useState } from 'react';

interface ModalNovoItemProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dados: any) => void;
}

export default function ModalNovoItem({ isOpen, onClose, onSubmit }: ModalNovoItemProps) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [medida, setMedida] = useState('Unid.');
  const [prioridade, setPrioridade] = useState('BAIXA');
  const [categoria, setCategoria] = useState('Geral');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-slate-800">Adicionar Item</h3>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do Produto (Ex: Leite)"
          className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            step="0.01"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade"
            className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <select
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="Unid.">Unid.</option>
            <option value="Kg">Kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-slate-500">Prioridade</label>
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta 🔥</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            >
              <option value="Geral">Geral</option>
              <option value="Mercearia">Mercearia</option>
              <option value="Hortifrúti">Hortifrúti</option>
              <option value="Limpeza">Limpeza</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Frios">Frios 🧊</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl text-sm font-medium">
            Cancelar
          </button>
          <button
            onClick={() => {
              onSubmit({ nome, quantidade, medida, prioridade, categoria });
              setNome('');
              setQuantidade('');
              setCategoria('Geral');
            }}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}