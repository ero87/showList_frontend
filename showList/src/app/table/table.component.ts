import {Component, OnInit} from '@angular/core';
import {RestService} from '../service/RestService';

export interface Item {
  itemId: number;
  itemNumber: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  responseData: any = [];
  items: Item[] = [];
  page = 1;
  pageFromRequest = 0;

  constructor(private restService: RestService) {
  }

  ngOnInit(): void {
    this.getList(this.pageFromRequest);
  }

  getList(requestPage: number): void {
    this.restService.loadData(requestPage).subscribe(data => {
      this.responseData = data;
      this.pageFromRequest = this.responseData.currentPage + 1;
      for (const item of this.responseData.itemsList) {
        this.items.push(item);
      }
    });
  }

  onTableDataChange = ($event: number) => {
    this.page = $event;
    const lastPageInCurrentState = Math.ceil(this.items.length / 10);
    if (this.page === lastPageInCurrentState) {
      this.getList(this.pageFromRequest);
    }
  }
}
