import { Injectable } from '@angular/core';

@Injectable()
export class TableService {
  basic = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true, // Para emitir o evento de confirmamento de edicao da linha
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    noDataMessage: 'Nenhum dado foi encontrado!',
  };
  evento = {
    columns: {
      categoria: {
        title: 'Categoria',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
    },
  };
  mostrarhome = {
    columns: {
      mostraHome: {
        title: 'Mostra Home',
        type: 'string',
        editor: { // Opcoes de edicao para a coluna
          type: 'list', // Tipo lista (select)
          config: {
            list: [{ title: 'Inicio', value: 'Inicio' }, { title: 'Carousel', value: 'Carousel' }],
          },
        },
      },
      nome: {
        title: 'Nome',
        type: 'string',
        editable: false,
      },
    },
  };
  categorias = {
    columns: {
      showhome: {
        title: 'Mostra Home',
        type: 'string',
        editor: { // Opcoes de edicao para a coluna
          type: 'list', // Tipo lista (select)
          config: {
            list: [{ title: 'True', value: true }, { title: 'False', value: false }],
          },
        },
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
    },
  };
  categoriasEdit = {
    columns: {
      nome: {
        title: 'Nome',
        type: 'string',
      },
    },
  };

  ingressosFisicos = {
    columns: {
      nomeEvento: {
        title: 'Nome do Evento',
        type: 'string',
      },
      data: {
        title: 'Data e Hora',
        type: 'string',
      },
    },
  };
  contasDepositoEdit = {
    columns: {
      nome: {
        title: 'Nome',
        type: 'string',
      },
      conta: {
        title: 'Conta',
        type: 'string',
      },
      agencia: {
        title: 'Agência',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
    },
  };
  accounts = {
    columns: {
      nome: {
        title: 'Nome',
        type: 'string',
        editable: false,
      },
      email: {
        title: 'Email',
        type: 'string',
        editable: false,
      },
      role: {
        title: 'Cargo',
        type: 'string',
        editor: { // Opcoes de edicao para a coluna
          type: 'list', // Tipo lista (select)
          config: {
            list: [
              { title: 'cliente', value: 'cliente' },
              { title: 'admin', value: 'admin' },
              { title: 'superadmin', value: 'superadmin' },
            ],
          },
        },
      },
    },
  };

  constructor() { }

  setEdit(edit = false) {
    this.basic.actions.edit = edit;
  }

  getColumns(tipo: any) {
    let column: any;
    switch (tipo) {
      case 'evento': {
        column = this.evento;
        break;
      }
      case 'mostrarhome': {
        column = this.mostrarhome;
        break;
      }
      case 'categorias': {
        column = this.categorias;
        break;
      }
      case 'categoriasEdit': {
        column = this.categoriasEdit;
        break;
      }
      case 'ingressosFisicos': {
        column = this.ingressosFisicos;
        break;
      }
      case 'contasDepositoEdit': {
        column = this.contasDepositoEdit;
        break;
      }
      case 'accounts': {
        column = this.accounts;
        break;
      }
    }
    return { ...this.basic, ...column };
  }

  getAddButton() {
    return {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    };
  }

  getDeleteButton() {
    return {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    };
  }

}


