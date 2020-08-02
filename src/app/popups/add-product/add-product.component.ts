import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ProductService } from './../../_service/Product/product.service';
import { ProductModel } from './../../_model/user';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { AddPriceComponent } from '../add-price/add-price.component';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';

export interface DialogData {
  id: number;
  name: string;
  description: string;
  isAddOrUpdate:number;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  modelname: string;
  id: number;
  price: number;
  description: string;
  name: string;
  isAddOrUpdate:number;
  productModel : ProductModel = {Description:'',Id:0,Name:''};

  constructor(public dialogRef: MatDialogRef<AddPriceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private productService: ProductService) {
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
    this.productModel.Id = this.id;
    this.productModel.Name = this.name;
    this.productModel.Description = this.description;
    console.log(this.productModel);
    //this.dialogRef.close({ data: this.responseText });
    if(this.isAddOrUpdate == 1 ){
    this.productService.SaveProduct(this.productModel).subscribe((data: any) => {
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
      this.productService.UpdateProduct(this.productModel).subscribe((data: any) => {
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
