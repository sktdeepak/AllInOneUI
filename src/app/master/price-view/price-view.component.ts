import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PriceModel } from './../../_model/user';
import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/_service/user-service.service';
import { AddPriceComponent } from 'src/app/popups/add-price/add-price.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-price-view',
  templateUrl: './price-view.component.html',
  styleUrls: ['./price-view.component.css']
})
export class PriceViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'description', 'action'];
  dialogRef;
  priceList = new MatTableDataSource<PriceModel[]>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private agricultureService: AgricultureservieService, private userServiceService: UserServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(new Date());
    this.agricultureService.GetPriceList().subscribe((data: any) => {
      if (data != null) {
        this.priceList = new MatTableDataSource(data);
        this.priceList.paginator = this.paginator;
        this.priceList.sort = this.sort;
      }
    });

  }

  deleteRecord(action, obj) {
    this.openDeletesweetalert(obj);
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
      modelname: 'Price-Update',
      id: obj.id,
      price: obj.unitPrice,
      description: obj.description,
      name: obj.name,
      isAddOrUpdate: 2
    };
    this.dialogRef = this.dialog.open(AddPriceComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.agricultureService.GetPriceList().subscribe((data: any) => {
          if (data != null) {
            console.log(data);
            this.priceList = data;
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
      modelname: 'Price-Add',
      id: 0,
      price: 0,
      description: '',
      name: '',
      isAddOrUpdate: 1
    };
    this.dialogRef = this.dialog.open(AddPriceComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.agricultureService.GetPriceList().subscribe((data: any) => {
          if (data != null) {
            console.log("ViewUserDetails" + data);
            this.priceList = data;
          }
        });
      }
    });
  }
  openDeletesweetalert(obj:any){
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
      this.agricultureService.DeletePrice(obj.id).subscribe((data: any) => {
        if (data != null) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.priceList = data;
        }
      });
      
    }
  });
}
  

}
