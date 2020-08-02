import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ProductBuySellService } from './../../_service/ProductBuySell/product-buy-sell.service';
import { ProductModel,ProductCategoryModel, ProductPriceDetailModel } from './../../_model/user';
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { AddPriceComponent } from '../add-price/add-price.component';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';

export interface DialogData {
  id: number;
  selectedProductId:number;
  selectedProductCategoryId:number;
  quantity:number;
  unitPrice:number;
  total:number;
  isAddOrUpdate:number;
  productList:ProductModel[];
  productCategoryList:ProductCategoryModel[];
}

@Component({
  selector: 'app-add-product-buy-sell',
  templateUrl: './add-product-buy-sell.component.html',
  styleUrls: ['./add-product-buy-sell.component.css']
})
export class AddProductBuySellComponent implements OnInit {
  id:number;
  selectedProductId:number;
  selectedProductCategoryId:number;
  selectedDate:Date;
  quantity:number;
  unitPrice:number;
  total:number;
  isAddOrUpdate:number;
  buyOrSell:number=0;
  productPriceDetailModel: ProductPriceDetailModel={id:0,unitPrice:0,weightType:0,buyOrSell:0,date:new Date(),productCategoryId:0,productId:0,quantity:0,total:0,productCategoryName:'',productName:''};
  productList:ProductModel[]=[];
  productCategoryList:ProductCategoryModel[] = [];

  constructor(public dialogRef: MatDialogRef<AddPriceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private productService: ProductBuySellService) {
    if (data) {
      console.log("PopUp:"+data.id);
      this.id = data.id;
      this.selectedProductId = data.selectedProductId;
      this.selectedProductCategoryId = data.selectedProductCategoryId;
      this.quantity = data.quantity;
      this.unitPrice = data.unitPrice;
      this.total = data.total;
      this.isAddOrUpdate = data.isAddOrUpdate;
      this.productList = data.productList;
      this.productCategoryList = data.productCategoryList;
    }
   }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close({ isUpdate: false });
  }
  onBuySellChange():void{
    console.log(this.buyOrSell);
  }

  onSaveClick(): void {
    this.productPriceDetailModel.id = this.id;
    this.productPriceDetailModel.buyOrSell = this.buyOrSell;
    this.productPriceDetailModel.date = this.selectedDate;
    this.productPriceDetailModel.productCategoryId=this.selectedProductCategoryId;
    this.productPriceDetailModel.productId=this.selectedProductId;
    this.productPriceDetailModel.quantity=Number(this.quantity);
    this.productPriceDetailModel.total=Number(this.total);
    this.productPriceDetailModel.unitPrice=Number(this.unitPrice);
    this.productPriceDetailModel.weightType=1;
    console.log(this.productPriceDetailModel);
    //this.dialogRef.close({ data: this.responseText });
    if(this.isAddOrUpdate == 1 ){
    this.productService.SaveProductPriceDetail(this.productPriceDetailModel).subscribe((data: any) => {
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
      this.productService.UpdateUserPriceDetail(this.productPriceDetailModel).subscribe((data: any) => {
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
