import React, { useState, useEffect } from 'react';

interface ModalCadastroRapidoProps {
  isOpen: boolean;
  onClose: () => void;
  estabelecimentos: any[];
  estabelecimentoPadrao: string;
  onSubmit: (dados: any) => void;
}

export default function ModalCadastroRapido({
  isOpen,
  onClose,
  estabelecimentos,
  estabelecimentoPadrao,
  onSubmit,
}: ModalCadastroRapidoProps) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [medida, setMedida] = useState('Unid.');
  const [prioridade, setPrioridade] = useState('BAIXA');
  const [categoria, setCategoria] = useState('Geral');
  const [estabelecimentoId, setEstabelecimentoId] = useState(estabelecimentoPadrao);
  const [precoUnitario, setPrecoUnitario] = useState('0');
  const [dataValidade, setDataValidade] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNome('');
      setQuantidade('1');
      setMedida('Unid.');
      setPrioridade('BAIXA');
      setCategoria('Geral');
      setEstabelecimentoId(estabelecimentoPadrao || '');
      setPrecoUnitario('0');
      setDataValidade('');
    }
  }, [isOpen, estabelecimentoPadrao]);

  if (!isOpen) return null;

  const total = (parseFloat(String(quantidade)) || 0) * (parseFloat(String(precoUnitario)) || 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl my-8 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-600 p-2 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-bolt text-sm"></i>
            </span>
            <h3 className="text-lg font-bold text-slate-800">Cadastro Rápido</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-3">
          {/* Dados do Item */}
          <div>
            <label className="text-xs font-semibold text-slate-500">Nome do Produto</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Leite Integral"
              className="w-full bg-slate-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-500">Qtd Desejada</label>
              <input
                type="number"
                step="0.01"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="0"
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

          <hr className="border-slate-100 my-2" />

          {/* Dados da Compra / Histórico Inicial */}
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

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl text-sm font-semibold transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!nome || !quantidade) {
                return alert('Preencha pelo menos o nome e a quantidade do item.');
              }
              onSubmit({
                nome,
                quantidadeDesejada: parseFloat(quantidade),
                medida,
                prioridade,
                categoria: categoria || 'Geral',
                compraInicial: {
                  estabelecimentoId,
                  quantidade: parseFloat(quantidade),
                  precoUnitario: parseFloat(precoUnitario) || 0,
                  dataValidade,
                },
              });
            }}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
          >
            <i className="fa-solid fa-bolt"></i> Salvar Rápido
          </button>
        </div>
      </div>
    </div>
  );
}