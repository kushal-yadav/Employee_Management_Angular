import { BrowserModule, } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeesListComponent } from './employee-list/employee-list.component';
import { EmployeeFilterPipe } from './pipes/employee-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeesListComponent,
    EmployeeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
