import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ProductCategoryService } from './../../_service/ProductCategory/product-category.service';
import { ProductModel, ProductCategoryModel } from './../../_model/user';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { AddPriceComponent } from '../add-price/add-price.component';

export interface DialogData {
  id: number;
  name: string;
  description: string;
  isAddOrUpdate:number;
}
@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css']
})
export class AddProductCategoryComponent implements OnInit {
  modelname: string;
  id: number;
  price: number;
  description: string;
  name: string;
  isAddOrUpdate:number;
  productCategoryModel : ProductCategoryModel = {Description:'',Id:0,Name:''};

  constructor(public dialogRef: MatDialogRef<AddProductCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private productService: ProductCategoryService) {
    if (data) {
      console.log("PopUp:"+data.id);
      this.id = data.id;
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
    this.productCategoryModel.Id = this.id;
    this.productCategoryModel.Name = this.name;
    this.productCategoryModel.Description = this.description;
    console.log(this.productCategoryModel);
    //this.dialogRef.close({ data: this.responseText });
    if(this.isAddOrUpdate == 1 ){
    this.productService.SaveProductPriceDetail(this.productCategoryModel).subscribe((data: any) => {
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
      this.productService.UpdateUserPriceDetail(this.productCategoryModel).subscribe((data: any) => {
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

