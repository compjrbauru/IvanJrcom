import { Injectable } from '@angular/core';

@Injectable()
export class TableService {
  constructor() { }

  getColumnsEvento() {
    return {
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


