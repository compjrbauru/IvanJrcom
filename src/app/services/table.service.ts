import { Injectable } from '@angular/core';

@Injectable()
export class TableService {
  basic = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
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
      local: {
        title: 'Local',
        type: 'string',
      },
    },
  };

  constructor() { }

  getColumns(tipo: any) {
    let column: any;
    switch (tipo) {
      case 'evento': {
        column = this.evento;
        break;
      }
    }
    return  { ...this.basic, ...column } ;
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


