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
    title: 'Editar Home',
    link: '/admin/edicao-home',
    icon: 'nb-home',
  },
];
