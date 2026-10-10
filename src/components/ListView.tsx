import React from 'react';

interface ListViewProps {
  listas: any[];
  listaSelecionada: string;
  setListaSelecionada: (id: string) => void;
  estabelecimentos: any[];
  estabelecimentoPrincipal: string;
  setEstabelecimentoPrincipal: (id: string) => void;
  dadosLista: any;
  abrirNovaLista: () => void;                  // <-- Novo prop
  abrirModalEditarLista: () => void;
  excluirListaSelecionada: () => void;
  abrirNovoEstabelecimento: () => void;        // <-- Novo prop
  abrirModalEditarEstabelecimento: () => void;
  abrirModalEditarItem: (item: any) => void;
  abrirModalHistoricoCompras: (item: any) => void;
  carregarItensDaListaSelecionada: () => void;
}

export default function ListView({
  listas,
  listaSelecionada,
  setListaSelecionada,
  estabelecimentos,
  estabelecimentoPrincipal,
  setEstabelecimentoPrincipal,
  dadosLista,
  abrirNovaLista,
  abrirModalEditarLista,
  excluirListaSelecionada,
  abrirNovoEstabelecimento,
  abrirModalEditarEstabelecimento,
  abrirModalEditarItem,
  abrirModalHistoricoCompras,
  carregarItensDaListaSelecionada,
}: ListViewProps) {
  const pesoPrioridade: { [key: string]: number } = { ALTA: 3, MEDIA: 2, BAIXA: 1 };

  const itensOrdenados = dadosLista?.itens
    ? [...dadosLista.itens].sort((a, b) => {
        const aConcluido = a.status === 'CONCLUIDO';
        const bConcluido = b.status === 'CONCLUIDO';
        if (aConcluido !== bConcluido) return aConcluido ? 1 : -1;

        // Regra para categoria "Frios" ir para o final
        const aFrios = a.categoria === 'Frios';
        const bFrios = b.categoria === 'Frios';
        if (aFrios !== bFrios) return aFrios ? 1 : -1;

        const prioA = pesoPrioridade[a.prioridade] || 1;
        const prioB = pesoPrioridade[b.prioridade] || 1;
        return prioB - prioA;
      })
    : [];

  const progresso =
    dadosLista && dadosLista.totalItens > 0
      ? Math.round((dadosLista.itensConcluidos / dadosLista.totalItens) * 100)
      : 0;

  return (
    <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4">
      {/* Seção Seletores */}
      <section className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        {/* SELEÇÃO DE LISTA */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Selecionar Lista
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={abrirNovaLista}
                title="Cadastrar Nova Lista"
                className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                <i className="fa-solid fa-plus"></i> Nova
              </button>
              <button
                onClick={abrirModalEditarLista}
                title="Editar Lista Selecionada"
                className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1"
              >
                <i className="fa-solid fa-pen"></i> Editar
              </button>
              <button
                onClick={excluirListaSelecionada}
                title="Excluir Lista Selecionada"
                className="text-xs text-rose-600 font-bold hover:underline flex items-center gap-1"
              >
                <i className="fa-solid fa-trash"></i> Apagar
              </button>
            </div>
          </div>
          <select
            value={listaSelecionada}
            onChange={(e) => setListaSelecionada(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">-- Selecione uma lista --</option>
            {listas.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nome}
              </option>
            ))}
          </select>
        </div>

        {/* SELEÇÃO DE ESTABELECIMENTO / LOJA */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Estabelecimento / Loja
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={abrirNovoEstabelecimento}
                title="Cadastrar Nova Loja"
                className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
              >
                <i className="fa-solid fa-plus"></i> Nova
              </button>
              <button
                onClick={abrirModalEditarEstabelecimento}
                title="Editar Loja"
                className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1"
              >
                <i className="fa-solid fa-pen"></i> Editar
              </button>
            </div>
          </div>
          <select
            value={estabelecimentoPrincipal}
            onChange={(e) => setEstabelecimentoPrincipal(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-xl px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">-- Selecione a Loja / Mercado --</option>
            {estabelecimentos.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Resumo */}
      {dadosLista && (
        <section className="grid grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-2xl shadow-sm border flex flex-col justify-between transition-colors ${
              dadosLista.metaGasto && dadosLista.valorTotalGastoLista > dadosLista.metaGasto
                ? 'bg-rose-100 border-rose-200'
                : 'bg-white border-slate-100'
            }`}
          >
            <span className="text-xs text-slate-500 font-medium">Total Gasto</span>
            <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-xl font-black text-emerald-600">
                R$ {dadosLista.valorTotalGastoLista.toFixed(2)}
              </span>
              {dadosLista.metaGasto > 0 && (
                <span className="text-xs font-bold text-slate-400">
                  / Meta: R$ {dadosLista.metaGasto.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <span className="text-xs text-slate-500 font-medium">Progresso</span>
            <div className="mt-1">
              <span className="text-xl font-black text-indigo-600">{progresso}%</span>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${progresso}%` }}></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Itens */}
      <section className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Itens da Lista</h2>
            <button
              onClick={carregarItensDaListaSelecionada}
              title="Atualizar Lista"
              className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
            {dadosLista?.totalItens || 0}
          </span>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar pr-1 pb-20">
          {!listaSelecionada ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              <i className="fa-solid fa-clipboard-list text-3xl mb-2 block"></i>
              Selecione uma lista acima para visualizar os itens.
            </div>
          ) : itensOrdenados.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Nenhum item cadastrado nesta lista ainda.
            </div>
          ) : (
            itensOrdenados.map((item: any) => {
              const isConcluido = item.status === 'CONCLUIDO';
              const isParcial = item.status === 'PARCIAL';

              let statusBadge = (
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  PENDENTE
                </span>
              );
              if (isConcluido)
                statusBadge = (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    CONCLUÍDO
                  </span>
                );
              if (isParcial)
                statusBadge = (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    PARCIAL
                  </span>
                );

              let bordaPrioridade = 'border-l-4 border-l-slate-300';
              let iconePrioridade = null;
              if (item.prioridade === 'ALTA') {
                bordaPrioridade = 'border-l-4 border-l-rose-500';
                iconePrioridade = (
                  <span title="Prioridade Alta" className="text-rose-500 text-xs">
                    <i className="fa-solid fa-fire"></i>
                  </span>
                );
              } else if (item.prioridade === 'MEDIA') {
                bordaPrioridade = 'border-l-4 border-l-amber-500';
                iconePrioridade = (
                  <span title="Prioridade Média" className="text-amber-500 text-xs">
                    <i className="fa-solid fa-bolt"></i>
                  </span>
                );
              }

              return (
                <div
                  key={item.id}
                  className={`bg-white p-4 rounded-2xl shadow-sm border border-slate-100 ${bordaPrioridade} flex items-center justify-between gap-3 ${
                    isConcluido ? 'opacity-60 bg-slate-50' : ''
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {iconePrioridade}
                      <h4 className={`font-bold text-slate-800 ${isConcluido ? 'line-through text-slate-400' : ''}`}>
                        {item.nome}
                      </h4>
                      {statusBadge}
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.categoria || 'Geral'}
                      </span>
                      <button
                        onClick={() => abrirModalEditarItem(item)}
                        className="text-slate-400 hover:text-indigo-600 text-xs p-1 ml-auto"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">
                      Falta: <strong className="text-slate-700">{item.quantidadePendente} {item.medida}</strong> (de{' '}
                      {item.quantidadeDesejada} {item.medida})
                    </p>
                    {item.valorTotalGastoItem > 0 && (
                      <p className="text-[11px] text-emerald-600 font-medium">
                        Gasto: R$ {item.valorTotalGastoItem.toFixed(2)} (Média: R$ {item.precoMedioUnitario.toFixed(2)}/
                        {item.medida})
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => abrirModalHistoricoCompras(item)}
                    className="w-10 h-10 bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-600 rounded-xl flex items-center justify-center transition font-bold text-sm"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}