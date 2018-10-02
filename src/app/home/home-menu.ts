import { NbMenuItem } from '@nebular/theme';

export let MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/home/main',
    home: true,
  },
  {
    title: 'Eventos',
    icon: 'nb-tables',
    link: '/home/todos-eventos',
  },
  {
    title: 'Categorias',
    icon: 'nb-grid-a-outline',
    link: '/home/categoria',
  },
];
