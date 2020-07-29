import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductCategoryService } from './../../_service/ProductCategory/product-category.service';
import { UserPriceDetailModel, ProductCategoryModel } from './../../_model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AddFieldWorkComponent } from 'src/app/popups/add-field-work/add-field-work.component';
import { UserServiceService } from 'src/app/_service/user-service.service';
import { UserInfoModel } from 'src/app/_model/user';
import Swal from 'sweetalert2';
import { AddUserPriceDetailComponent } from 'src/app/popups/add-user-price-detail/add-user-price-detail.component';
import { AddProductCategoryComponent } from 'src/app/popups/add-product-category/add-product-category.component';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'action'];
  dialogRef;
  userId: number = 0;
  productCategoryList = new MatTableDataSource<ProductCategoryModel[]>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productCategoryService: ProductCategoryService, private userServiceService: UserServiceService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.productCategoryService.GetProductPriceDetailList().subscribe((data: any) => {
      if (data != null) {
        this.productCategoryList = new MatTableDataSource(data);
        this.productCategoryList.paginator = this.paginator;
        this.productCategoryList.sort = this.sort;
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
    this.dialogRef = this.dialog.open(AddProductCategoryComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.productCategoryService.GetProductPriceDetailList().subscribe((data: any) => {
          if (data != null) {
            this.productCategoryList = new MatTableDataSource(data);
            this.productCategoryList.paginator = this.paginator;
            this.productCategoryList.sort = this.sort;
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
    dialogConfig.width = '568px';
    //  dialogConfig.height = '760px';

    dialogConfig.data = {
      name: '',
      id: 0,
      description:'',
      isAddOrUpdate:1
    };
    this.dialogRef = this.dialog.open(AddProductCategoryComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.productCategoryService.GetProductPriceDetailList().subscribe((data: any) => {
          if (data != null) {
            this.productCategoryList = new MatTableDataSource(data);
            this.productCategoryList.paginator = this.paginator;
            this.productCategoryList.sort = this.sort;
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
        this.productCategoryService.DeleteFieldWork(obj.id).subscribe((data: any) => {
          if (data != null) {
            this.productCategoryList = new MatTableDataSource(data);
            this.productCategoryList.paginator = this.paginator;
            this.productCategoryList.sort = this.sort;
          }
        });

      }
    });
  }

}