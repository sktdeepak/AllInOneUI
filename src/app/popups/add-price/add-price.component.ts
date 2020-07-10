import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { PriceModel } from './../../_model/user';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

export interface DialogData {
  modelname: string,
      id: number,
      price: number,
      description: string,
      name: string,
      isAddOrUpdate:number;
}


@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css']
})
export class AddPriceComponent implements OnInit {
  modelname: string;
  id: number;
  price: number;
  description: string;
  name: string;
  isAddOrUpdate:number;
  priceModel : PriceModel = {Description:'',Id:0,Name:'',UnitPrice:0};

  constructor(public dialogRef: MatDialogRef<AddPriceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private agricultureservieService: AgricultureservieService) {
    if (data) {
      console.log("PopUp:"+data.id);
      this.id = data.id;
      this.price = data.price;
      this.description = data.description;
      this.name = data.name;
      this.isAddOrUpdate = data.isAddOrUpdate;
    }
   }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close({ isUpdate: false });
  }

  onSaveClick(): void {
    this.priceModel.Id = this.id;
    this.priceModel.Name = this.name;
    this.priceModel.UnitPrice = Number(this.price);
    this.priceModel.Description = this.description;
    console.log(this.priceModel);
    //this.dialogRef.close({ data: this.responseText });
    this.agricultureservieService.SavePrice(this.priceModel).subscribe((data: any) => {
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

  opensweetalert() {
    console.log("fire");
    if(this.isAddOrUpdate == 1 )
    Swal.fire({ text: 'Price Saved Successfully!', icon: 'success',timer: 1500 ,position: 'top-end',showConfirmButton: false});
    else
    Swal.fire({ text: 'Price Updated Successfully!', icon: 'success',timer: 1500,position: 'top-end',showConfirmButton: false });
  }
  opensweetalertdng() {
    Swal.fire('Oops...', 'Something went wrong!', 'error')
  }
}