import { Component, OnInit } from '@angular/core';
import { UserInfoModel } from 'src/app/_model/user';
import {UserServiceService}  from './../../_service/user-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email','edit'];
  userList: UserInfoModel[] = [];
  constructor(private userServiceService:UserServiceService) { }

  ngOnInit(): void {
    this.userServiceService.ViewUserDetails().subscribe((data: any) => {
    if(data != null){
      console.log(data);
      this.userList = data;
    }
  });
  }


}
