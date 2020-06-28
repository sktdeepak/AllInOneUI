import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-case-converter',
  templateUrl: './case-converter.component.html',
  styleUrls: ['./case-converter.component.css']
})
export class CaseConverterComponent implements OnInit {
  inputUserText: string;
  outputUserText: string;

  constructor(private titlecasePipe:TitleCasePipe) { }

  ngOnInit(): void {
  }

  convertToUpper(): void {
   console.log(this.inputUserText);
    
    this.outputUserText = this.inputUserText.toUpperCase();
  }

  convertToLower(): void {
    console.log(this.inputUserText);
     
     this.outputUserText = this.inputUserText.toLowerCase();
   }
   convertToTitleCase():void{
    this.outputUserText = this.titlecasePipe.transform(this.inputUserText);
   }

}
