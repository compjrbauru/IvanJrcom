import { Injectable } from '@angular/core';

@Injectable()
export class TableService {
  constructor() { }

  getColumnsEvento() {
    return {
      nome: {
        title: 'Nome',
        type: 'string',
      },
      categoria: {
        title: 'Categoria',
        type: 'string',
      },
      data: {
        title: 'Data',
        type: 'Timestamp',
      },
      lote: {
        disponiveis: {
          title: 'Disponiveis',
          type: 'number',
        },
        numero: {
          title: 'Lote',
          type: 'number',
        },
      },
    };
  }

  getAddButton() {
    return {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    };
  }

  getEditButton() {
    return {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
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


