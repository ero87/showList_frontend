import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private http: HttpClient) {
  }

  itemsUrl = 'http://localhost:8080/items/';
  loadData = (requestPage: number) => this.http.get(this.itemsUrl + requestPage);
}
