import type { CollectionConfig } from 'payload/types';
import stockEndpoints from './endpoints';

const Stock: CollectionConfig = {
  slug: 'stocks',
  labels: {
    plural: 'Ações',
    singular: 'Ação',
  },
  admin: {
    useAsTitle: 'CodigoInstrumento',
    group: 'Financeiro',
    listSearchableFields: ['CodigoInstrumento', 'PrecoNegocio', 'QuantidadeNegociada'],
    disableDuplicate: true,
    defaultColumns: ['DataReferencia', 'CodigoInstrumento', 'PrecoNegocio', 'QuantidadeNegociada', 'HoraFechamento', 'updatedAt'],
  },
  endpoints: stockEndpoints,
  fields: [
    {
      name: 'DataReferencia',
      label: 'Data de Referência',
      type: 'text',
    },
    {
      name: 'CodigoInstrumento',
      label: 'Código do Instrumento',
      type: 'text',
    },
    {
      name: 'AcaoAtualizacao',
      label: 'Ação de Atualização',
      type: 'number',
    },
    {
      name: 'PrecoNegocio',
      label: 'Preço do Negócio',
      type: 'number',
    },
    {
      name: 'QuantidadeNegociada',
      label: 'Quantidade Negociada',
      type: 'number',
    },
    {
      name: 'HoraFechamento',
      label: 'Hora de Fechamento',
      type: 'text', 
    },
    {
      name: 'CodigoIdentificadorNegocio',
      label: 'Código Identificador do Negócio',
      type: 'text',
    },
    {
      name: 'TipoSessaoPregao',
      label: 'Tipo de Sessão do Pregão',
      type: 'number',
    },
    {
      name: 'DataNegocio',
      label: 'Data do Negócio',
      type: 'text',
    },
    {
      name: 'CodigoParticipanteComprador',
      label: 'Código do Participante Comprador',
      type: 'text', 
    },
    {
      name: 'CodigoParticipanteVendedor',
      label: 'Código do Participante Vendedor',
      type: 'text',
    },
  ],
};

export default Stock;
