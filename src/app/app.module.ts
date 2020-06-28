import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button'

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaseConverterComponent } from './converter/case-converter/case-converter.component';
import { from } from 'rxjs';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HomeComponent } from './home/home.component';
import { DateDifferenceComponent } from './converter/date-difference/date-difference.component';
import { AverageCalculateComponent } from './converter/average-calculate/average-calculate.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { RoleComponent } from './role/role.component';

import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CaseConverterComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    DateDifferenceComponent,
    AverageCalculateComponent,
    LoginComponent,
    RegisterationComponent,
    RoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, MatInputModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, FlexLayoutModule,
    FormsModule, MatToolbarModule, MatGridListModule, MatTableModule, MatDialogModule, MatButtonModule
  ],
  providers: [TitleCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
