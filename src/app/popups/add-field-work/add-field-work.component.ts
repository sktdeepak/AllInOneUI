import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AgricultureservieService } from './../../_service/agricultureservie.service';
import { FieldWorkModel } from './../../_model/user';
import { from } from 'rxjs';
import Swal from 'sweetalert2'
export interface DialogData {
  id: number;
  position: any;
  userList: any;
  weightValue: number;
  name: string;
  selectedUserId: number;
  selectedDate: Date;
}

@Component({
  selector: 'app-add-field-work',
  templateUrl: './add-field-work.component.html',
  styleUrls: ['./add-field-work.component.css']
})
export class AddFieldWorkComponent implements OnInit {
  id: number;
  userList: any;
  weightValue: number;
  fieldWorkModel: FieldWorkModel = { UserId: 0, Weight: 0, WeightType: 0, Lastname: '', Firstname: '', FullName: '', Date: new Date(), Id: 0 };
  selectedUserId: number;
  selectedDate: Date;


  constructor(public dialogRef: MatDialogRef<AddFieldWorkComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private agricultureservieService: AgricultureservieService) {
    console.log();
    if (data) {
      console.log("PopUp:"+data.weightValue);
      this.userList = data.userList;
      this.id = data.id;
      this.selectedUserId = data.selectedUserId;
      this.selectedDate = data.selectedDate;
      this.weightValue = data.weightValue;
    }
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
  }

  onNoClick(): void {
    this.dialogRef.close({ isUpdate: false });
  }

  onSaveClick(): void {
    this.fieldWorkModel.Id = this.id;
    this.fieldWorkModel.UserId = this.selectedUserId;
    this.fieldWorkModel.Weight = Number(this.weightValue);
    this.fieldWorkModel.Date = this.selectedDate;
    console.log(this.fieldWorkModel);
    //this.dialogRef.close({ data: this.responseText });
    this.agricultureservieService.SaveFieldWork(this.fieldWorkModel).subscribe((data: any) => {
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
    Swal.fire({ text: 'Hello!', icon: 'success' });
  }
  opensweetalertdng() {
    Swal.fire('Oops...', 'Something went wrong!', 'error')
  }
}
