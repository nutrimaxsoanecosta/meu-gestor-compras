import React from 'react';

interface PantryViewProps {
  compras: any[];
  filtro: string;
  setFiltro: (filtro: string) => void;
  carregarTodasAsCompras: () => void;
  alternarConsumido: (id: string, consumido: boolean) => void;
  formatarDataBr: (data: string) => string;
}

export default function PantryView({
  compras,
  filtro,
  setFiltro,
  carregarTodasAsCompras,
  alternarConsumido,
  formatarDataBr,
}: PantryViewProps) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const comprasFiltradas = compras.filter((c) => {
    if (filtro === 'pendentes') return !c.consumido;
    if (filtro === 'consumidos') return c.consumido;
    return true;
  });

  return (
    <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4">
      <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <div>
            <h2 className="text-base font-bold text-slate-800">Compras & Validade</h2>
            <p className="text-xs text-slate-500">Controle de validade e itens consumidos</p>
          </div>
          <button
            onClick={carregarTodasAsCompras}
            className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
          >
            <i className="fa-solid fa-rotate-right"></i> Atualizar
          </button>
        </div>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-3 py-1.5 rounded-xl font-bold ${
              filtro === 'todos' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('pendentes')}
            className={`px-3 py-1.5 rounded-xl font-bold ${
              filtro === 'pendentes' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Na Despensa
          </button>
          <button
            onClick={() => setFiltro('consumidos')}
            className={`px-3 py-1.5 rounded-xl font-bold ${
              filtro === 'consumidos' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Consumidos
          </button>
        </div>
      </section>

      <section className="space-y-2">
        {comprasFiltradas.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">Nenhum registro encontrado.</div>
        ) : (
          comprasFiltradas.map((c) => {
            let isVencido = false;
            let dataValidadeFmt = 'Sem validade';

            if (c.dataValidade) {
              const valDate = new Date(c.dataValidade);
              dataValidadeFmt = formatarDataBr(c.dataValidade);
              if (valDate < hoje && !c.consumido) {
                isVencido = true;
              }
            }

            const bgClass = isVencido
              ? 'bg-red-50 border-red-200'
              : c.consumido
              ? 'bg-slate-100 border-slate-200 opacity-75'
              : 'bg-white border-slate-100';

            return (
              <div
                key={c.id}
                className={`${bgClass} p-4 rounded-2xl shadow-sm border flex items-center justify-between gap-3 transition`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold text-slate-800 ${c.consumido ? 'line-through text-slate-400' : ''}`}>
                      {c.nomeItem || 'Item sem nome'}
                    </h4>
                    {isVencido && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                        VENCIDO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Qtd: <strong className="text-slate-700">{c.quantidade} {c.medida}</strong>
                    {c.estabelecimentoNome ? ` | Loja: ${c.estabelecimentoNome}` : ''}
                  </p>
                  <p className={`text-[11px] ${isVencido ? 'text-red-700 font-bold' : 'text-slate-400'}`}>
                    <i className="fa-regular fa-calendar-days mr-1"></i>Validade: {dataValidadeFmt}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition">
                    <input
                      type="checkbox"
                      checked={c.consumido}
                      onChange={(e) => alternarConsumido(c.id, e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span className={c.consumido ? 'text-emerald-700' : 'text-slate-600'}>
                      {c.consumido ? 'Consumido' : 'Marcar Consumido'}
                    </span>
                  </label>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}