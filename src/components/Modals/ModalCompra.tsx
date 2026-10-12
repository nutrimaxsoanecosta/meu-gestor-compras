import React, { useEffect, useState } from 'react';

interface ModalCompraProps {
  isOpen: boolean;
  onClose: () => void;
  estabelecimentos: any[];
  estabelecimentoPadrao: string;
  itemAtual: any;
  onSubmit: (dados: any) => void;
}

export default function ModalCompra({
  isOpen,
  onClose,
  estabelecimentos,
  estabelecimentoPadrao,
  itemAtual,
  onSubmit,
}: ModalCompraProps) {
  const [estabelecimentoId, setEstabelecimentoId] = useState(estabelecimentoPadrao);
  const [quantidade, setQuantidade] = useState(itemAtual?.quantidadePendente || '');
  const [medida, setMedida] = useState(itemAtual?.medida || 'Unid.');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [dataValidade, setDataValidade] = useState('');

  // Adicione este useEffect para atualizar a loja padrão e os valores iniciais ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      setEstabelecimentoId(estabelecimentoPadrao || '');
      setQuantidade(itemAtual?.quantidadePendente || '');
      setMedida(itemAtual?.medida || 'Unid.');
      setPrecoUnitario('');
      setDataValidade('');
    }
  }, [isOpen, estabelecimentoPadrao, itemAtual]);

  if (!isOpen) return null;

  const total = (parseFloat(String(quantidade)) || 0) * (parseFloat(String(precoUnitario)) || 0);
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Abater / Comprar</h3>
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

          <div className="grid grid-cols-2 gap-2">
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
              <label className="text-xs font-semibold text-slate-500">Valor Total (R$)</label>
              <input
                type="text"
                readOnly
                disabled
                value={`R$ ${total.toFixed(2).replace('.', ',')}`}
                className="w-full bg-slate-200 border-none rounded-xl p-3 text-sm font-bold text-slate-700 outline-none mt-1 cursor-not-allowed"
              />
            </div>
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

        <button
          onClick={() =>
            onSubmit({
              itemListaId: itemAtual?.id,
              estabelecimentoId,
              quantidade,
              medida,
              precoUnitario,
              dataValidade,
            })
          }
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}