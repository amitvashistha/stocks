import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NseService {

  private baseUrl = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=";
  private url1 = "https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json";

  constructor(private http: HttpClient) { }

  GetStockQuote(symbol: string) {
    return this.http.get(this.url1);
  }
}
