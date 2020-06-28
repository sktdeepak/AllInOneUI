import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-average-calculate',
  templateUrl: './average-calculate.component.html',
  styleUrls: ['./average-calculate.component.css']
})
export class AverageCalculateComponent implements OnInit {
  quantity1: number;
  quantity2: number;
  price1: number;
  price2: number;
  lblAvgPrice: string;

  constructor() { }

  ngOnInit(): void {
  }


  calculateAverage(): void {
    console.log(this.quantity1 * this.price1);
    console.log(this.quantity2 * this.price2);
    console.log(((this.quantity1 * this.price1) + (this.quantity2 * this.price2)));
    var val = Number.parseFloat(this.quantity1.toString()) + Number.parseFloat(this.quantity2.toString());
    var resultValue = ((this.quantity1 * this.price1) + (this.quantity2 * this.price2)) / (val);
    this.lblAvgPrice = resultValue.toString();
  }

  calculateClear(): void {
    this.quantity1 = this.quantity2 = this.price1 = this.price2 = 0;
    this.lblAvgPrice = '';
  }

}
