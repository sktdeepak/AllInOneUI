import { Component, OnInit, Inject } from '@angular/core';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { FieldWorkModel,PriceModel } from './../../_model/user';
import{AppDateAdapter,APP_DATE_FORMATS} from './AppDateAdapter';
import { from } from 'rxjs';
import Swal from 'sweetalert2'
export interface DialogData {
  id: number;
  position: any;
  userList: any;
  priceList:any;
  weightValue: number;
  name: string;
  selectedUserId: number;
  selectedDate: string;
  price: number;
}

@Component({
  selector: 'app-add-field-work',
  templateUrl: './add-field-work.component.html',
  styleUrls: ['./add-field-work.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddFieldWorkComponent implements OnInit {
  id: number;
  userList: any;
  priceList:any;
  weightValue: number;
  fieldWorkModel: FieldWorkModel = { UserId: 0, Weight: 0, WeightType: 0, Lastname: '', Firstname: '', FullName: '', Date: new Date(), Id: 0,PriceId:0 };
  selectedUserId: number;
  selectedDate: string;
  selectedPriceId: number;
  priceId: number;


  constructor(public dialogRef: MatDialogRef<AddFieldWorkComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private agricultureservieService: AgricultureservieService) {
    console.log();
    if (data) {
      console.log("PopUp:"+data.weightValue);
      this.userList = data.userList;
      this.id = data.id;
      this.selectedUserId = data.selectedUserId;
      this.selectedDate = data.selectedDate;
      this.weightValue = data.weightValue;
      this.priceList = data.priceList;
      this.selectedPriceId = data.price;
    }
  }

  ngOnInit(): void {
    this.selectedDate = new Date().toString();
  }

  onNoClick(): void {
    this.dialogRef.close({ isUpdate: false });
  }

  onSaveClick(): void {
    this.fieldWorkModel.Id = this.id;
    this.fieldWorkModel.UserId = this.selectedUserId;
    this.fieldWorkModel.Weight = Number(this.weightValue);
    
    this.fieldWorkModel.Date = new Date(this.selectedDate);
    console.log(this.fieldWorkModel.Date);
    this.fieldWorkModel.PriceId = this.selectedPriceId;
    console.log(this.fieldWorkModel);
    //this.dialogRef.close({ data: this.responseText });
    this.agricultureservieService.SaveFieldWork(this.fieldWorkModel).subscribe((data: any) => {
      if (data != null && data == 1) {
        this.opensweetalert();
        this.dialogRef.close({ isUpdate: true });
      }
      else {
        console.log(data + "eeeeee");
        this.opensweetalertdng();
      }
    });
  }

  fromDateChange(event) {
    // this.fromDate = Date();
    this.selectedDate = (event.value.getMonth() + 1) + '/' + (event.value.getDate()) + '/' + event.value.getFullYear();
    console.log(this.selectedDate);
    // console.log((event.value.getMonth() + 1) + '/' + event.value.getDate() + '/' + event.value.getFullYear(), 'fromDateChange');

  }

  opensweetalert() {
    console.log("fire");
    Swal.fire({ text: 'Hello!', icon: 'success' });
  }
  opensweetalertdng() {
    Swal.fire('Oops...', 'Something went wrong!', 'error')
  }

//   convertUTCDateToLocalDate(date:Date) {
//     var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);

//     return newDate;   
// }
}
