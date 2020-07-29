import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { UserPriceDetailModel } from './../../_model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AddFieldWorkComponent } from 'src/app/popups/add-field-work/add-field-work.component';
import { UserServiceService } from 'src/app/_service/user-service.service';
import { UserInfoModel } from 'src/app/_model/user';
import Swal from 'sweetalert2';
import { UserPriceDetailService } from 'src/app/_service/Price/user-price-detail.service';
import { AddUserPriceDetailComponent } from 'src/app/popups/add-user-price-detail/add-user-price-detail.component';

@Component({
  selector: 'app-user-price-detail',
  templateUrl: './user-price-detail.component.html',
  styleUrls: ['./user-price-detail.component.css']
})
export class UserPriceDetailComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'date', 'debitAmount', 'creditAmount', 'action'];
  dialogRef;
  userList: UserInfoModel[] = [];
  userId: number = 0;
  priceDetailList = new MatTableDataSource<UserPriceDetailModel[]>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userPriceDetailService: UserPriceDetailService, private userServiceService: UserServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userPriceDetailService.GetUserPriceDetailList().subscribe((data: any) => {
      if (data != null) {
        this.priceDetailList = new MatTableDataSource(data);
        this.priceDetailList.paginator = this.paginator;
        this.priceDetailList.sort = this.sort;
      }
    });

    this.userServiceService.ViewUserDetails().subscribe((data: any) => {
      if (data != null) {
        console.log("ViewUserDetails" + data);
        this.userList = data;
      }
    });
  }
  deleteRecord(action, obj) {
    this.openDeletesweetalert(obj);
  }

  change(event) {
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      this.userPriceDetailService.SearchUserPriceDetailList(event.source.value).subscribe((data: any) => {
        if (data != null) {
          this.priceDetailList = new MatTableDataSource(data);
          this.priceDetailList.paginator = this.paginator;
          this.priceDetailList.sort = this.sort;
        }
      });
    }
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
        this.userPriceDetailService.DeleteFieldWork(obj.id).subscribe((data: any) => {
          if (data != null) {
            this.priceDetailList = new MatTableDataSource(data);
            this.priceDetailList.paginator = this.paginator;
            this.priceDetailList.sort = this.sort;
          }
        });

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
      name: 'DEEPAK',
      userList: this.userList,
      id: obj.id,
      selectedUserId: obj.userId,
      selectedDate: obj.date,
      creditAmount: obj.creditAmount,
      debitAmount: obj.debitAmount
    };
    this.dialogRef = this.dialog.open(AddUserPriceDetailComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.userPriceDetailService.GetUserPriceDetailList().subscribe((data: any) => {
          if (data != null) {
            this.priceDetailList = new MatTableDataSource(data);
            this.priceDetailList.paginator = this.paginator;
            this.priceDetailList.sort = this.sort;
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
      name: 'DEEPAK',
      userList: this.userList,
      id: 0,
      selectedUserId: 0,
      selectedDate: '',
      creditAmount: 0,
      debitAmount: 0
    };
    this.dialogRef = this.dialog.open(AddUserPriceDetailComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.userPriceDetailService.GetUserPriceDetailList().subscribe((data: any) => {
          if (data != null) {
            this.priceDetailList = new MatTableDataSource(data);
            this.priceDetailList.paginator = this.paginator;
            this.priceDetailList.sort = this.sort;
          }
        });
      }
    });
  }

}
