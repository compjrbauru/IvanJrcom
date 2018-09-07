import { Component, OnDestroy, AfterViewInit, Output, Input,  EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-tiny-mce',
  template: '',
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {

  @Output() editorKeyup = new EventEmitter<any>();

  @Input()
  set text(text: string) {
    if (text && this.editor)
      this.editor.setContent(text);
  }

  editor: any;

  constructor(private host: ElementRef) { }

  ngAfterViewInit() {
    tinymce.init({
      target: this.host.nativeElement,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.editorKeyup.emit(editor.getContent());
        });
      },
      height: '320',
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
