import { Component, OnInit } from '@angular/core';
import {  DashboardService} from './../_service/dashboard.service';
import {DashboardModel} from './../_model/user';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  saleDataList:DashboardModel[]=[];
  saleData:any = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.GetDashboardFieldWorkList().subscribe((data: any) => {
      if (data != null) {
        this.saleData = data;
        // data.forEach(dataEntity => {
        //   let val:DashboardModel={name:dataEntity.fullname,value: dataEntity.weight};
        //   console.log({ name: dataEntity.fullName, value: dataEntity.weight });
        //   this.saleDataList.push({ name: dataEntity.fullName, value: dataEntity.weight });
        // });
        // this.saleData = this.saleDataList;
      }
    });
  }

}
