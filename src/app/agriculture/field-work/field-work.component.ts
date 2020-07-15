import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { FieldWorkModel, PriceModel } from './../../_model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AddFieldWorkComponent } from 'src/app/popups/add-field-work/add-field-work.component';
import { UserServiceService } from 'src/app/_service/user-service.service';
import { UserInfoModel } from 'src/app/_model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-field-work',
  templateUrl: './field-work.component.html',
  styleUrls: ['./field-work.component.css']
})
export class FieldWorkComponent implements OnInit {
  //fieldWorkList: FieldWorkModel[] = [];
  displayedColumns: string[] = ['fullName', 'date', 'weight', 'weighttype', 'action'];
  dialogRef;
  userList: UserInfoModel[] = [];
  priceList: PriceModel[] = [];
  userId:number=0;
  fieldWorkList = new MatTableDataSource<FieldWorkModel[]>()
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private agricultureService: AgricultureservieService, private userServiceService: UserServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.agricultureService.GetFieldWorkList().subscribe((data: any) => {
      if (data != null) {
        console.log("GetFieldWorkList:"+ data[0].id);
        this.fieldWorkList = new MatTableDataSource(data);
        this.fieldWorkList.paginator = this.paginator;
    this.fieldWorkList.sort = this.sort;
      }
    });

    this.userServiceService.ViewUserDetails().subscribe((data: any) => {
      if (data != null) {
        console.log("ViewUserDetails" +data);
        this.userList = data;
      }
    });

    this.agricultureService.GetPriceList().subscribe((data: any) => {
      if (data != null) {
        console.log("GetFieldWorkList:"+ data[0].id);
        this.priceList = data;
      }
    });
  }

  deleteRecord(action, obj) {
    this.openDeletesweetalert(obj);
  }

  change(event)
  {
    if(event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      this.agricultureService.SearchFieldWorkList(event.source.value).subscribe((data: any) => {
        if (data != null) {
          this.fieldWorkList = new MatTableDataSource(data);
          this.fieldWorkList.paginator = this.paginator;
      this.fieldWorkList.sort = this.sort;
        }
      });
    }
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
      this.agricultureService.DeleteFieldWork(obj.id).subscribe((data: any) => {
        if (data != null) {
          this.fieldWorkList = data;
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
      selectedDate: obj.selectedDate,
      weightValue: obj.weight,
      priceList: this.priceList
    };
    this.dialogRef = this.dialog.open(AddFieldWorkComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.agricultureService.GetFieldWorkList().subscribe((data: any) => {
          if (data != null) {
            console.log(data);
            this.fieldWorkList = data;
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
      selectedDate: new Date(),
      weightValue: 0,
      priceList: this.priceList
    };
    this.dialogRef = this.dialog.open(AddFieldWorkComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.isUpdate) {
        console.log(result);
        this.agricultureService.GetFieldWorkList().subscribe((data: any) => {
          if (data != null) {
            console.log("ViewUserDetails" +data);
            this.fieldWorkList = data;
          }
        });
      }
    });
  }

}
