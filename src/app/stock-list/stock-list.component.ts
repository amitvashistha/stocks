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
    this.nseService.GetStockQuote(company).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res));
      console.log(response.data[0].closePrice);
      this.stockList[index].Price = + (response.data[0].closePrice+"").replace(',','');
    });
  }

  onQtyChange(index: number) {
    console.log("qty changed");

  }

  onAverageChange(index: number) {
    console.log("avg changed");
    this.calculate(index);
  }

  calculate(index: number) {
    let qty = this.stockList[index].Quantity;
    let avg = this.stockList[index].Average;
    let prc = this.stockList[index].Price;

    this.stockList[index].Invested = +(qty*avg).toFixed(2);
    this.stockList[index].Total = +(qty*prc).toFixed(2);

    let inv = this.stockList[index].Invested;
    let tot = this.stockList[index].Total;
    let totalInvested = this.calculateTotalInvestment();

    this.stockList[index].Allocation = +(tot/totalInvested*100).toFixed(2);
    this.stockList[index].Return = +(qty*(prc - avg)).toFixed(2);

    var rtrn = this.stockList[index].Return;

    this.stockList[index].PctReturn = +(rtrn/inv*100).toFixed(2);
    console.log(JSON.stringify(this.stockList));
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

  saveList() {
    this.nseService.GetStockList().subscribe(data => this.stockList = data);
    // this.nseService.PostStockList(this.stockList);
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
