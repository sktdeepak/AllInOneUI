import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { UserPriceDetailModel, ProductModel } from './../../_model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AddFieldWorkComponent } from 'src/app/popups/add-field-work/add-field-work.component';
import { UserServiceService } from 'src/app/_service/user-service.service';
import { UserInfoModel } from 'src/app/_model/user';
import Swal from 'sweetalert2';
import { ProductService } from './../../_service/Product/product.service'
import { AddProductComponent } from 'src/app/popups/add-product/add-product.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'action'];
  dialogRef;
  userId: number = 0;
  productDetailList = new MatTableDataSource<UserPriceDetailModel[]>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productService: ProductService, private userServiceService: UserServiceService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.productService.GetProductList().subscribe((data: any) => {
      if (data != null) {
        this.productDetailList = new MatTableDataSource(data);
        this.productDetailList.paginator = this.paginator;
        this.productDetailList.sort = this.sort;
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
    this.dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.productService.GetProductList().subscribe((data: any) => {
          if (data != null) {
            this.productDetailList = new MatTableDataSource(data);
            this.productDetailList.paginator = this.paginator;
            this.productDetailList.sort = this.sort;
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
    this.dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.productService.GetProductList().subscribe((data: any) => {
          if (data != null) {
            this.productDetailList = new MatTableDataSource(data);
            this.productDetailList.paginator = this.paginator;
            this.productDetailList.sort = this.sort;
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
        this.productService.DeleteProduct(obj.id).subscribe((data: any) => {
          if (data != null) {
            this.productDetailList = new MatTableDataSource(data);
            this.productDetailList.paginator = this.paginator;
            this.productDetailList.sort = this.sort;
          }
        });

      }
    });
  }

}
