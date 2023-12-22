import type { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: 'Administrador',
    singular: 'Administradores',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24, // one day
    useAPIKey: true,
  }, 
  admin: {
    group: 'Configurações',    
    useAsTitle: 'email',
    disableDuplicate: true,
    defaultColumns: ['email', 'name'],
    description: {
      pt:'Usuários que gerenciam o sistema',      
      en: 'Users who can manage our system',
    },      
  },    
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },   
  ],
};

export default Users;
