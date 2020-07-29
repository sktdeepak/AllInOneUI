import { Component, OnInit, Inject } from '@angular/core';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { FieldWorkModel, PriceModel, UserPriceDetailModel } from './../../_model/user';
import { AppDateAdapter, APP_DATE_FORMATS } from './../add-field-work/AppDateAdapter';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { UserPriceDetailService } from 'src/app/_service/Price/user-price-detail.service';

export interface DialogData {
  id: number;
  position: any;
  userList: any;
  name: string;
  selectedUserId: number;
  selectedDate: Date;
  price: number;
  creditAmount: number;
  debitAmount: number;
}
@Component({
  selector: 'app-add-user-price-detail',
  templateUrl: './add-user-price-detail.component.html',
  styleUrls: ['./add-user-price-detail.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class AddUserPriceDetailComponent implements OnInit {

  id: number;
  position: any;
  userList: any;
  name: string;
  selectedUserId: number;
  selectedDate: Date;
  price: number;
  creditAmount: number;
  debitAmount: number;
  userPriceDetailModel: UserPriceDetailModel = {UserId:0,CreditAmount:0,DebitAmount:0,Id:0,Date:new Date()}

  constructor(public dialogRef: MatDialogRef<AddUserPriceDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private userPriceDetailService: UserPriceDetailService) {
    console.log();
    if (data) {
      console.log(data);
      this.userList = data.userList;
      this.id = data.id;
      this.selectedUserId = data.selectedUserId;
      this.selectedDate = data.selectedDate;
      this.creditAmount = data.creditAmount;
      this.debitAmount = data.debitAmount;
    }
  }

  onSaveClick(): void {
    this.userPriceDetailModel.Id = this.id;
    this.userPriceDetailModel.UserId = this.selectedUserId;
    this.userPriceDetailModel.CreditAmount = Number(this.creditAmount);
    this.userPriceDetailModel.DebitAmount = Number(this.debitAmount);
    this.userPriceDetailModel.Date = this.selectedDate;
    
    if(this.id == 0){
    //this.dialogRef.close({ data: this.responseText });
    this.userPriceDetailService.SaveUserPriceDetail(this.userPriceDetailModel).subscribe((data: any) => {
      if (data != null) {
        this.opensweetalert();
        this.dialogRef.close({ isUpdate: true });
      }
      else {
        console.log(data + "eeeeee");
        this.opensweetalertdng();
      }
    });}
    else{
      this.userPriceDetailService.UpdateUserPriceDetail(this.userPriceDetailModel).subscribe((data: any) => {
        if (data != null) {
          this.opensweetalert();
          this.dialogRef.close({ isUpdate: true });
        }
        else {
          console.log(data + "eeeeee");
          this.opensweetalertdng();
        }
      });
    }
  }

  // fromDateChange(event) {
  //   // this.fromDate = Date();
  //   this.selectedDate = (event.value.getMonth() + 1) + '/' + (event.value.getDate()) + '/' + event.value.getFullYear();
  //   console.log(this.selectedDate);
  //   // console.log((event.value.getMonth() + 1) + '/' + event.value.getDate() + '/' + event.value.getFullYear(), 'fromDateChange');

  // }

  opensweetalert() {
    console.log("fire");
    Swal.fire({ text: 'Hello!', icon: 'success' });
  }
  opensweetalertdng() {
    Swal.fire('Oops...', 'Something went wrong!', 'error')
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
  }

  onNoClick(): void {
    this.dialogRef.close({ isUpdate: false });
  }

}
