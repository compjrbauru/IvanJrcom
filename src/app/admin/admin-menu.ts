import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Admin',
    icon: 'nb-gear',
    link: '/admin/main',
    home: true,
  },
  {
    title: 'Ferramentas',
    group: true,
  },
  {
    title: 'Eventos',
    icon: 'nb-compose',
    children: [
      {
        title: 'Criar Evento',
        link: '/admin/events/create',
      },
      {
        title: 'Editar Eventos',
        link: '/admin/events/edit',
      },
    ],
  },
  {
    title: 'Categorias',
    icon: 'nb-tables',
    children: [
      {
        title: 'Criar Categoria',
        link: '/admin/categorias/create',
      },
      {
        title: 'Editar Categorias',
        link: '/admin/categorias/edit',
      },
    ],
  },
  {
    title: 'Depósitos',
    icon: 'nb-paper-plane',
    children: [
      {
        title: 'Criar Conta',
        link: '/admin/deposito/create',
      },
      {
        title: 'Editar Contas',
        link: '/admin/deposito/edit',
      },
      {
        title: 'Depósitos Ativos',
        link: '/admin/deposito/ativos',
      },
    ],
  },
  {
    title: 'Editar Home',
    link: '/admin/edicao-home',
    icon: 'nb-home',
  },
];
