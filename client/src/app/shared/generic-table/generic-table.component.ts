import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T extends {id: number}> implements OnInit {
  @Input() columns: string[] = []
  @Input() items: T[] = []
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() actionColumn: boolean = true
  @Input() clickableRow: boolean = false
  @Input() actionPrefix !: string;
  @Input() onDelete: (deletedItem: T) => void = () => {}

  @Output() rowClickedEmitter: EventEmitter<T> = new EventEmitter();

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }
  
  handleRowClicked(item: T): void {
    if (!this.clickableRow) return

    this.rowClickedEmitter.emit(item)
  }
}
