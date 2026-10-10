import React, { useState, useEffect } from 'react';

interface ModalEditarCompraProps {
  isOpen: boolean;
  onClose: () => void;
  compra: any;
  estabelecimentos: any[];
  onSubmit: (dados: any) => void;
}

export default function ModalEditarCompra({
  isOpen,
  onClose,
  compra,
  estabelecimentos,
  onSubmit,
}: ModalEditarCompraProps) {
  const [estabelecimentoId, setEstabelecimentoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [medida, setMedida] = useState('Unid.');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [dataValidade, setDataValidade] = useState('');

  useEffect(() => {
    if (compra) {
      setEstabelecimentoId(compra.estabelecimentoId || '');
      setQuantidade(compra.quantidade || '');
      setMedida(compra.medida || 'Unid.');
      setPrecoUnitario(compra.precoUnitario || '');
      setDataValidade(compra.dataValidade ? compra.dataValidade.split('T')[0] : '');
    }
  }, [compra]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Editar Lançamento</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Estabelecimento / Loja</label>
            <select
              value={estabelecimentoId}
              onChange={(e) => setEstabelecimentoId(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1 font-medium"
            >
              <option value="">-- Selecione a Loja --</option>
              {estabelecimentos.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">Qtd Comprada</label>
              <input
                type="number"
                step="0.01"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Medida</label>
              <select
                value={medida}
                onChange={(e) => setMedida(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
              >
                <option value="Unid.">Unid.</option>
                <option value="Kg">Kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Preço Unitário (R$)</label>
            <input
              type="number"
              step="0.01"
              value={precoUnitario}
              onChange={(e) => setPrecoUnitario(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500">Data de Validade (Opcional)</label>
            <input
              type="date"
              value={dataValidade}
              onChange={(e) => setDataValidade(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl text-sm font-medium">
            Cancelar
          </button>
          <button
            onClick={() =>
              onSubmit({
                id: compra.id,
                estabelecimentoId,
                quantidade,
                medida,
                precoUnitario,
                dataValidade,
              })
            }
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}