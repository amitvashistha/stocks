import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NseService } from './nse.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stockList: Stock[] = [];
  companies: string[] = ["TCS", "c2", "c3"];
  baseUrl = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=";
  GET_QUOTE_URL = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=";
  temp: any;

  constructor(private nseService: NseService) { }

  ngOnInit(): void {
  }

  addStock() {
    let newStock = new Stock();
    this.stockList.push(newStock);
  }

  removeStock(index: number) {
    this.stockList.splice(index, 1);
  }

  onCompanySelect(index: number) {
    console.log(this.stockList);
    let company = this.stockList[index].Company;
    // const httpOptions = {
    //   headers: new HttpHeaders({ //Referer: this.GET_QUOTE_URL + encodeURIComponent(company),
    //     'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin':'*' })
    // };
    // this.http.get(this.baseUrl + encodeURIComponent(company), httpOptions).pipe();
    this.nseService.GetStockQuote(company).subscribe((response) => {
      console.log(response);
    }, err => {
      console.log(err.message);
    });
    console.log(this.temp);
  }

  onQtyChange(index: number) {
    console.log("qty changed");

  }

  onAverageChange(index: number) {
    console.log("avg changed");
    this.calculate(index);
  }

  calculate(index: number) {
    this.stockList[index].Invested = this.stockList[index].Quantity*this.stockList[index].Average;
    this.stockList[index].Total = this.stockList[index].Quantity*this.stockList[index].Price;
    let totalInvested = this.calculateTotalInvestment();

  }

  calculateTotalInvestment(): number {
    let total = 0;
    this.stockList.forEach(element => {
      if(element.Total) {
        total += element.Total;
      }
    });
    return total;
  }
}

export class Stock {
  Company: string;
  Price: number;
  Quantity: number;
  Average: number;
  Invested: number;
  Total: number;
  Allocation: number;
  Return: number;
  PctReturn: number;
}
