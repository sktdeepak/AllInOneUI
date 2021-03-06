import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductBuySellService } from './../../_service/ProductBuySell/product-buy-sell.service';
import { ProductService } from './../../_service/Product/product.service';
import { ProductCategoryService } from './../../_service/ProductCategory/product-category.service';
import { ProductPriceDetailModel,ProductModel,ProductCategoryModel } from './../../_model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AddProductBuySellComponent } from 'src/app/popups/add-product-buy-sell/add-product-buy-sell.component';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit {
  displayedColumns: string[] = ['product', 'productcategory','quantity','unitprice','total','date', 'action'];
  dialogRef;
  productPriceDetailList = new MatTableDataSource<ProductPriceDetailModel[]>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productList:ProductModel[]=[];
  productCategoryList:ProductCategoryModel[] = [];
  constructor(private productBuySellService: ProductBuySellService, public dialog: MatDialog,private productService:ProductService,private productCategoryService:ProductCategoryService) { }


  ngOnInit(): void {
    this.productBuySellService.GetProductPriceDetailList().subscribe((data: any) => {
      if (data != null) {
        this.productPriceDetailList = new MatTableDataSource(data);
        this.productPriceDetailList.paginator = this.paginator;
        this.productPriceDetailList.sort = this.sort;
      }
    });

    this.productService.GetProductList().subscribe((data: any) => {
      if (data != null) {
        this.productList = data;
      }
    });

    this.productCategoryService.GetProductPriceDetailList().subscribe((data: any) => {
      if (data != null) {
        this.productCategoryList=data;
      }
    });
  }

  updateRecord(action, obj): void {
    const dialogConfig = new MatDialogConfig();
    console.log(obj);
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    // dialogConfig.restoreFocus = true;
    dialogConfig.width = '568px';
    //  dialogConfig.height = '760px';

    dialogConfig.data = {
      id: obj.id,
      name: obj.name,
      description: obj.description
    };
    this.dialogRef = this.dialog.open(AddProductBuySellComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.productBuySellService.GetProductPriceDetailList().subscribe((data: any) => {
          if (data != null) {
            this.productPriceDetailList = new MatTableDataSource(data);
            this.productPriceDetailList.paginator = this.paginator;
            this.productPriceDetailList.sort = this.sort;
          }
        });
      }
    });
  }

  addNewRecord(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    // dialogConfig.restoreFocus = true;
    dialogConfig.width = '800px';
    //  dialogConfig.height = '760px';

    dialogConfig.data = {
      name: '',
      id: 0,
      description:'',
      isAddOrUpdate:1,
  selectedProductId:0,
  selectedProductCategoryId:0,
  selectedDate:'',
  quantity:0,
  unitPrice:0,
  total:0,
  buyOrSell:0,
      productList:this.productList,
  productCategoryList:this.productCategoryList
    };
    this.dialogRef = this.dialog.open(AddProductBuySellComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.productBuySellService.GetProductPriceDetailList().subscribe((data: any) => {
          if (data != null) {
            this.productPriceDetailList = new MatTableDataSource(data);
            this.productPriceDetailList.paginator = this.paginator;
            this.productPriceDetailList.sort = this.sort;
          }
        });
      }
    });
  }

  deleteRecord(action, obj) {
    this.openDeletesweetalert(obj);
  }

  openDeletesweetalert(obj: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.productBuySellService.DeleteFieldWork(obj.id).subscribe((data: any) => {
          if (data != null) {
            this.productPriceDetailList = new MatTableDataSource(data);
            this.productPriceDetailList.paginator = this.paginator;
            this.productPriceDetailList.sort = this.sort;
          }
        });

      }
    });
  }

}

