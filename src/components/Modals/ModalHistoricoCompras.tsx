import React from 'react';

interface ModalHistoricoComprasProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  compras: any[];
  onNovaCompra: () => void;
  onEditarCompra: (compra: any) => void;
  onExcluirCompra: (id: string) => void;
  onDesistir: () => void;
  formatarDataBr: (data: string) => string;
}

export default function ModalHistoricoCompras({
  isOpen,
  onClose,
  item,
  compras,
  onNovaCompra,
  onEditarCompra,
  onExcluirCompra,
  onDesistir,
  formatarDataBr,
}: ModalHistoricoComprasProps) {
  if (!isOpen || !item) return null;

  const pendente = item.quantidadePendente > 0 ? item.quantidadePendente : 0;
  const comprados = item.quantidadeComprada || 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-xl flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{item.nome}</h3>
            <p className="text-xs text-slate-500">Histórico de lançamentos</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-3 text-center">
          <div>
            <span className="text-[10px] text-slate-500 font-medium uppercase block">Faltam</span>
            <span className="text-sm font-black text-indigo-600">
              {pendente} {item.medida}
            </span>
          </div>
          <div className="border-x border-indigo-200 px-1">
            <span className="text-[10px] text-slate-500 font-medium uppercase block">Total Meta</span>
            <span className="text-sm font-bold text-slate-700">
              {item.quantidadeDesejada} {item.medida}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium uppercase block">Comprados</span>
            <span className="text-sm font-black text-emerald-600">
              {comprados} {item.medida}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar min-h-[150px]">
          {compras.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">Nenhuma compra registrada para este item ainda.</div>
          ) : (
            compras.map((c) => (
              <div
                key={c.id}
                className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center text-xs"
              >
                <div className="space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1">
                    <i className="fa-solid fa-store text-indigo-500 text-[10px]"></i>
                    <span>{c.estabelecimentoNome}</span>
                  </div>
                  <div className="text-slate-600">
                    {c.quantidade} {c.medida} x R$ {c.precoUnitario.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Data: {c.data} {c.dataValidade ? ` | Val: ${formatarDataBr(c.dataValidade)}` : ''}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-black text-emerald-600 text-sm mr-1">R$ {c.total.toFixed(2)}</span>
                  <button
                    onClick={() => onEditarCompra(c)}
                    className="text-amber-500 hover:text-amber-700 p-1"
                    title="Editar Lançamento"
                  >
                    <i className="fa-solid fa-pen text-xs"></i>
                  </button>
                  <button
                    onClick={() => onExcluirCompra(c.id)}
                    className="text-red-400 hover:text-red-600 p-1 rounded transition"
                    title="Excluir Lançamento"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-2">
          <button
            onClick={onNovaCompra}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm"
          >
            <i className="fa-solid fa-plus"></i> Registrar Nova Compra
          </button>
          <button
            onClick={onDesistir}
            className="w-full bg-slate-100 hover:bg-rose-50 text-rose-600 hover:text-rose-700 py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-xs border border-slate-200"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}