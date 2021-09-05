import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from './stock-list.component';

@Injectable({
  providedIn: 'root'
})
export class NseService {

  private baseUrl = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=";
  private url1 = "https://www1.nseindia.com//emerge/homepage/smeNormalMktStatus.json";

  constructor(private http: HttpClient) { }

  GetStockQuote(symbol: string) {
    return this.http.get(this.baseUrl+symbol);
  }

  GetStockList() {
    return this.http.get<Stock[]>("./assets/stock-list.json");
  }

  PostStockList(stockList: Stock[]) {
  }
}
