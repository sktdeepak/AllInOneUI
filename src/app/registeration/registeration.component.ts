import { Component, OnInit } from '@angular/core';
import{UserServiceService} from '../_service/user-service.service';
import { UserInfo } from '../_model/user';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {
  email:string;
  username:string;
  password:string;
  gender:number;
  dateOfBirth:Date;
  mobile:string;
  firstname:string;
  lastname:string;
  userInfo: UserInfo = {Email:'',IsActive:true,Password:'',RoleId:1,Username:'',DateOfBirth:null,Firstname:'',Lastname:''};

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }
  
  submitUserRegister(){
    
    console.log(this.userInfo);
    this.userInfo.Firstname = this.firstname;
    this.userInfo.Lastname = this.lastname;
    this.userInfo.Email = this.email;
    this.userInfo.Username = this.username;
    this.userInfo.Password = this.password;
    this.userInfo.RoleId = 1;
    this.userInfo.DateOfBirth = this.dateOfBirth;
    this.userInfo.IsActive = true;
    this.userService.SubmitUserDetails(this.userInfo).subscribe(
      (data: any) => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
