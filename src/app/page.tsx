'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import ListView from '@/components/ListView';
import PantryView from '@/components/PantryView';

import ModalCompra from '@/components/Modals/ModalCompra';
import ModalEditarCompra from '@/components/Modals/ModalEditarCompra';
import ModalEditarEstabelecimento from '@/components/Modals/ModalEditarEstabelecimento';
import ModalEditarItem from '@/components/Modals/ModalEditarItem';
import ModalHistoricoCompras from '@/components/Modals/ModalHistoricoCompras';
import ModalNovaLista from '@/components/Modals/ModalNovaLista';
import ModalNovoItem from '@/components/Modals/ModalNovoItem';

export default function Home() {
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'lista' | 'despensa'>('lista');

  const [listas, setListas] = useState<any[]>([]);
  const [listaSelecionada, setListaSelecionada] = useState('');
  const [estabelecimentos, setEstabelecimentos] = useState<any[]>([]);
  const [estabelecimentoPrincipal, setEstabelecimentoPrincipal] = useState('');
  const [dadosLista, setDadosLista] = useState<any>(null);

  const [comprasDespensa, setComprasDespensa] = useState<any[]>([]);
  const [filtroDespensa, setFiltroDespensa] = useState('todos');

  const [comprasHistorico, setComprasHistorico] = useState<any[]>([]);
  const [itemAtualHistorico, setItemAtualHistorico] = useState<any>(null);
  const [compraEditando, setCompraEditando] = useState<any>(null);
  const [itemEditando, setItemEditando] = useState<any>(null);
  const [estabelecimentoEditando, setEstabelecimentoEditando] = useState<any>(null);
  const [listaEditando, setListaEditando] = useState<any>(null);

  // Estados dos Modais
  const [modalCompraOpen, setModalCompraOpen] = useState(false);
  const [modalEditarCompraOpen, setModalEditarCompraOpen] = useState(false);
  const [modalEditarEstabelecimentoOpen, setModalEditarEstabelecimentoOpen] = useState(false);
  const [modalEditarItemOpen, setModalEditarItemOpen] = useState(false);
  const [modalHistoricoOpen, setModalHistoricoOpen] = useState(false);
  const [modalNovaListaOpen, setModalNovaListaOpen] = useState(false);
  const [modalNovoItemOpen, setModalNovoItemOpen] = useState(false);

  // Carregar dados iniciais do LocalStorage
  useEffect(() => {
    const storedListas = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
    const storedEstabelecimentos = JSON.parse(localStorage.getItem('LOCAL_ESTABELECIMENTOS') || '[]');
    const storedRefresh = localStorage.getItem('AUTO_REFRESH_ENABLED') === 'true';

    setListas(storedListas);
    setEstabelecimentos(storedEstabelecimentos);
    setAutoRefreshEnabled(storedRefresh);

    if (storedListas.length > 0) {
      setListaSelecionada(storedListas[0].id);
    }
    if (storedEstabelecimentos.length > 0) {
      setEstabelecimentoPrincipal(storedEstabelecimentos[0].id);
    }
  }, []);

  // Salvar e atualizar dados da lista selecionada
  useEffect(() => {
    if (listaSelecionada) {
      calcularStatusLista(listaSelecionada);
    } else {
      setDadosLista(null);
    }
  }, [listaSelecionada]);

  useEffect(() => {
    if (abaAtiva === 'despensa') {
      carregarTodasAsCompras();
    }
  }, [abaAtiva]);

  // Função para salvar dados locais de listas
  const persistirListas = (novasListas: any[]) => {
    setListas(novasListas);
    localStorage.setItem('LOCAL_LISTAS', JSON.stringify(novasListas));
  };

  // Função para salvar dados locais de estabelecimentos
  const persistirEstabelecimentos = (novasLojas: any[]) => {
    setEstabelecimentos(novasLojas);
    localStorage.setItem('LOCAL_ESTABELECIMENTOS', JSON.stringify(novasLojas));
  };

  // Calcula o status, progresso e gastos da lista com base nos itens e compras locais
  function calcularStatusLista(idLista: string) {
    const listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
    const listaAlvo = listasStorage.find((l: any) => String(l.id) === String(idLista));

    if (!listaAlvo) {
      setDadosLista(null);
      return;
    }

    const itens = listaAlvo.itens || [];
    let valorTotalGastoLista = 0;
    let itensConcluidos = 0;

    const itensProcessados = itens.map((item: any) => {
      const comprasItem = item.compras || [];
      let qtdComprada = 0;
      let valorTotalGastoItem = 0;

      comprasItem.forEach((c: any) => {
        qtdComprada += parseFloat(c.quantidade) || 0;
        valorTotalGastoItem += (parseFloat(c.quantidade) || 0) * (parseFloat(c.precoUnitario) || 0);
      });

      valorTotalGastoLista += valorTotalGastoItem;

      const quantidadePendente = Math.max(0, (item.quantidadeDesejada || 0) - qtdComprada);
      let status = 'PENDENTE';
      if (qtdComprada >= (item.quantidadeDesejada || 0)) {
        status = 'CONCLUIDO';
        itensConcluidos++;
      } else if (qtdComprada > 0) {
        status = 'PARCIAL';
      }

      const precoMedioUnitario = qtdComprada > 0 ? valorTotalGastoItem / qtdComprada : 0;

      return {
        ...item,
        quantidadeComprada: qtdComprada,
        quantidadePendente,
        status,
        valorTotalGastoItem,
        precoMedioUnitario,
      };
    });

    setDadosLista({
      totalItens: itens.length,
      itensConcluidos,
      valorTotalGastoLista,
      metaGasto: parseFloat(listaAlvo.metaGasto) || 0,
      itens: itensProcessados,
    });
  }

  function carregarTodasAsCompras() {
    const listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
    const lojasStorage = JSON.parse(localStorage.getItem('LOCAL_ESTABELECIMENTOS') || '[]');
    let todasCompras: any[] = [];

    listasStorage.forEach((lista: any) => {
      (lista.itens || []).forEach((item: any) => {
        (item.compras || []).forEach((c: any) => {
          const loja = lojasStorage.find((e: any) => String(e.id) === String(c.estabelecimentoId));
          todasCompras.push({
            ...c,
            nomeItem: item.nome,
            medida: item.medida,
            estabelecimentoNome: loja ? loja.nome : 'Loja Desconhecida',
          });
        });
      });
    });

    setComprasDespensa(todasCompras);
  }

  function formatarDataBr(dataIsoStr: string) {
    if (!dataIsoStr) return '';
    const parts = dataIsoStr.split('T')[0].split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dataIsoStr;
  }

  return (
    <div className="flex flex-col h-full min-h-screen">
      <Header
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
      />

      {abaAtiva === 'lista' ? (
      <ListView
        listas={listas}
        listaSelecionada={listaSelecionada}
        setListaSelecionada={setListaSelecionada}
        estabelecimentos={estabelecimentos}
        estabelecimentoPrincipal={estabelecimentoPrincipal}
        setEstabelecimentoPrincipal={setEstabelecimentoPrincipal}
        dadosLista={dadosLista}
        abrirNovaLista={() => {
          setListaEditando(null);
          setModalNovaListaOpen(true);
        }}
        abrirModalEditarLista={() => {
          if (!listaSelecionada) return alert('Selecione uma lista para editar.');
          const l = listas.find((item) => String(item.id) === String(listaSelecionada));
          setListaEditando(l);
          setModalNovaListaOpen(true);
        }}
        excluirListaSelecionada={() => {
          if (!listaSelecionada) return alert('Selecione uma lista para apagar.');
          if (!confirm('Tem certeza que deseja APAGAR esta lista e todos os seus itens?')) return;
          const novas = listas.filter((l) => String(l.id) !== String(listaSelecionada));
          persistirListas(novas);
          setListaSelecionada(novas.length > 0 ? novas[0].id : '');
        }}
        abrirNovoEstabelecimento={() => {
          const nome = prompt('Nome do Estabelecimento (ex: Padaria, Supermercado):');
          if (nome) {
            const novasLojas = [...estabelecimentos, { id: Date.now().toString(), nome }];
            persistirEstabelecimentos(novasLojas);
            setEstabelecimentoPrincipal(novasLojas[novasLojas.length - 1].id);
            alert(`Estabelecimento criado com sucesso!`);
          }
        }}
        abrirModalEditarEstabelecimento={() => {
          if (!estabelecimentoPrincipal) return alert('Selecione uma loja para editar.');
          const est = estabelecimentos.find((e) => String(e.id) === String(estabelecimentoPrincipal));
          setEstabelecimentoEditando(est);
          setModalEditarEstabelecimentoOpen(true);
        }}
        abrirModalEditarItem={(item) => {
          setItemEditando(item);
          setModalEditarItemOpen(true);
        }}
        carregarItensDaListaSelecionada={() => calcularStatusLista(listaSelecionada)}
          abrirModalHistoricoCompras={(item) => {
            setItemAtualHistorico(item);
            const listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
            const lojasStorage = JSON.parse(localStorage.getItem('LOCAL_ESTABELECIMENTOS') || '[]');
            const listaAlvo = listasStorage.find((l: any) => String(l.id) === String(listaSelecionada));
            const itemAlvo = listaAlvo?.itens?.find((i: any) => String(i.id) === String(item.id));
            
            const comprasFormatadas = (itemAlvo?.compras || []).map((c: any) => {
              const loja = lojasStorage.find((e: any) => String(e.id) === String(c.estabelecimentoId));
              return {
                ...c,
                estabelecimentoNome: loja ? loja.nome : 'Loja Desconhecida',
                total: (parseFloat(c.quantidade) || 0) * (parseFloat(c.precoUnitario) || 0),
              };
            });

            setComprasHistorico(comprasFormatadas);
            setModalHistoricoOpen(true);
          }}
        />
      ) : (
        <PantryView
          compras={comprasDespensa}
          filtro={filtroDespensa}
          setFiltro={setFiltroDespensa}
          carregarTodasAsCompras={carregarTodasAsCompras}
          alternarConsumido={(compraId, consumido) => {
            const listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
            listasStorage.forEach((l: any) => {
              (l.itens || []).forEach((i: any) => {
                (i.compras || []).forEach((c: any) => {
                  if (String(c.id) === String(compraId)) {
                    c.consumido = consumido;
                  }
                });
              });
            });
            persistirListas(listasStorage);
            carregarTodasAsCompras();
          }}
          formatarDataBr={formatarDataBr}
        />
      )}

      <NavigationBar
        abrirModalNovaLista={() => {
          setListaEditando(null);
          setModalNovaListaOpen(true);
        }}
        abrirModalNovoItem={() => {
          if (!listaSelecionada) return alert('Selecione uma lista antes de adicionar itens.');
          setModalNovoItemOpen(true);
        }}
        abrirModalNovoEstabelecimento={() => {
          const nome = prompt('Nome do Estabelecimento (ex: Padaria, Supermercado):');
          if (nome) {
            const novasLojas = [...estabelecimentos, { id: Date.now().toString(), nome }];
            persistirEstabelecimentos(novasLojas);
            if (!estabelecimentoPrincipal) setEstabelecimentoPrincipal(novasLojas[0].id);
            alert(`Estabelecimento criado com sucesso!`);
          }
        }}
      />

      <ModalNovaLista
        isOpen={modalNovaListaOpen}
        onClose={() => setModalNovaListaOpen(false)}
        listaEditando={listaEditando}
        onSubmit={({ id, nome, metaGasto }) => {
          if (!nome) return alert('Insira o nome da lista!');
          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');

          if (id) {
            listasStorage = listasStorage.map((l: any) =>
              String(l.id) === String(id) ? { ...l, nome, metaGasto } : l
            );
          } else {
            const novaL = { id: Date.now().toString(), nome, metaGasto, itens: [] };
            listasStorage.push(novaL);
            setListaSelecionada(novaL.id);
          }

          persistirListas(listasStorage);
          setModalNovaListaOpen(false);
          if (id) calcularStatusLista(listaSelecionada);
        }}
      />

      <ModalNovoItem
        isOpen={modalNovoItemOpen}
        onClose={() => setModalNovoItemOpen(false)}
        onSubmit={({ nome, quantidade, medida, prioridade, categoria }) => {
          if (!nome || !quantidade) return alert('Preencha todos os campos.');
          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');

          listasStorage = listasStorage.map((l: any) => {
            if (String(l.id) === String(listaSelecionada)) {
              const novoItem = {
                id: Date.now().toString(),
                nome,
                quantidadeDesejada: parseFloat(quantidade),
                medida,
                prioridade,
                categoria: categoria || 'Geral',
                compras: [],
              };
              return { ...l, itens: [...(l.itens || []), novoItem] };
            }
            return l;
          });

          persistirListas(listasStorage);
          setModalNovoItemOpen(false);
          calcularStatusLista(listaSelecionada);
        }}
      />

      <ModalEditarItem
        isOpen={modalEditarItemOpen}
        onClose={() => setModalEditarItemOpen(false)}
        item={itemEditando}
        onSubmit={({ id, nome, quantidade, medida, prioridade, categoria }) => {
          if (!nome || !quantidade) return alert('Preencha todos os campos!');
          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');

          listasStorage = listasStorage.map((l: any) => {
            if (String(l.id) === String(listaSelecionada)) {
              const itensAtualizados = (l.itens || []).map((i: any) =>
                String(i.id) === String(id)
                  ? { ...i, nome, quantidadeDesejada: parseFloat(quantidade), medida, prioridade, categoria: categoria || 'Geral' }
                  : i
              );
              return { ...l, itens: itensAtualizados };
            }
            return l;
          });

          persistirListas(listasStorage);
          setModalEditarItemOpen(false);
          calcularStatusLista(listaSelecionada);
        }}
      />

      <ModalEditarEstabelecimento
        isOpen={modalEditarEstabelecimentoOpen}
        onClose={() => setModalEditarEstabelecimentoOpen(false)}
        estabelecimento={estabelecimentoEditando}
        onSubmit={(id, nome) => {
          if (!nome) return alert('Informe o nome da loja!');
          const lojasAtualizadas = estabelecimentos.map((e) =>
            String(e.id) === String(id) ? { ...e, nome } : e
          );
          persistirEstabelecimentos(lojasAtualizadas);
          setModalEditarEstabelecimentoOpen(false);
        }}
      />

      <ModalHistoricoCompras
        isOpen={modalHistoricoOpen}
        onClose={() => setModalHistoricoOpen(false)}
        item={itemAtualHistorico}
        compras={comprasHistorico}
        formatarDataBr={formatarDataBr}
        onNovaCompra={() => {
          setModalHistoricoOpen(false);
          setModalCompraOpen(true);
        }}
        onEditarCompra={(compra) => {
          setCompraEditando(compra);
          setModalEditarCompraOpen(true);
        }}
        onExcluirCompra={(compraId) => {
          if (!confirm('Tem certeza que deseja apagar este lançamento de compra?')) return;
          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
          
          listasStorage.forEach((l: any) => {
            (l.itens || []).forEach((i: any) => {
              if (i.compras) {
                i.compras = i.compras.filter((c: any) => String(c.id) !== String(compraId));
              }
            });
          });

          persistirListas(listasStorage);
          calcularStatusLista(listaSelecionada);
          setModalHistoricoOpen(false);
        }}
        onDesistir={() => {
          if (!itemAtualHistorico) return;
          const qtdFaltante = itemAtualHistorico.quantidadePendente > 0 ? itemAtualHistorico.quantidadePendente : 0;
          if (!confirm(`Deseja desistir de comprar as ${qtdFaltante} ${itemAtualHistorico.medida} restantes?`)) return;

          let estabId = estabelecimentoPrincipal;
          if (!estabId && estabelecimentos.length > 0) estabId = estabelecimentos[0].id;
          if (!estabId) return alert('Selecione ou cadastre uma loja primeiro.');

          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
          const novaCompra = {
            id: Date.now().toString(),
            estabelecimentoId: estabId,
            quantidade: qtdFaltante,
            precoUnitario: 0,
            data: new Date().toISOString().split('T')[0],
            dataValidade: '',
            consumido: false,
          };

          listasStorage.forEach((l: any) => {
            (l.itens || []).forEach((i: any) => {
              if (String(i.id) === String(itemAtualHistorico.id)) {
                i.compras = [...(i.compras || []), novaCompra];
              }
            });
          });

          persistirListas(listasStorage);
          setModalHistoricoOpen(false);
          calcularStatusLista(listaSelecionada);
        }}
      />

      <ModalCompra
        isOpen={modalCompraOpen}
        onClose={() => setModalCompraOpen(false)}
        estabelecimentos={estabelecimentos}
        estabelecimentoPadrao={estabelecimentoPrincipal}
        itemAtual={itemAtualHistorico}
        onSubmit={(dados) => {
          if (!dados.estabelecimentoId) return alert('Selecione um Estabelecimento / Loja!');
          if (!dados.quantidade || !dados.precoUnitario) return alert('Preencha quantidade e preço!');

          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
          const novaCompra = {
            id: Date.now().toString(),
            estabelecimentoId: dados.estabelecimentoId,
            quantidade: parseFloat(dados.quantidade),
            precoUnitario: parseFloat(dados.precoUnitario),
            data: new Date().toISOString().split('T')[0],
            dataValidade: dados.dataValidade || '',
            consumido: false,
          };

          listasStorage.forEach((l: any) => {
            (l.itens || []).forEach((i: any) => {
              if (String(i.id) === String(dados.itemListaId)) {
                i.compras = [...(i.compras || []), novaCompra];
              }
            });
          });

          persistirListas(listasStorage);
          setModalCompraOpen(false);
          calcularStatusLista(listaSelecionada);
        }}
      />

      <ModalEditarCompra
        isOpen={modalEditarCompraOpen}
        onClose={() => setModalEditarCompraOpen(false)}
        compra={compraEditando}
        estabelecimentos={estabelecimentos}
        onSubmit={(dados) => {
          if (!dados.estabelecimentoId || !dados.quantidade || !dados.precoUnitario) {
            return alert('Preencha os campos obrigatórios.');
          }

          let listasStorage = JSON.parse(localStorage.getItem('LOCAL_LISTAS') || '[]');
          listasStorage.forEach((l: any) => {
            (l.itens || []).forEach((i: any) => {
              if (i.compras) {
                i.compras = i.compras.forEach((c: any) => {
                  if (String(c.id) === String(dados.id)) {
                    c.estabelecimentoId = dados.estabelecimentoId;
                    c.quantidade = parseFloat(dados.quantidade);
                    c.precoUnitario = parseFloat(dados.precoUnitario);
                    c.dataValidade = dados.dataValidade || '';
                  }
                });
              }
            });
          });

          persistirListas(listasStorage);
          setModalEditarCompraOpen(false);
          calcularStatusLista(listaSelecionada);
        }}
      />
    </div>
  );
}