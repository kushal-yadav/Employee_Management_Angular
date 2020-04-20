import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../shared/employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeFormGroup: FormGroup;
  employee = new Object();
  // id = this.actRoute.snapshot.params['id'];
  id: number;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public actRoute: ActivatedRoute,
    public location: Location
  ) {
    this.actRoute.params.subscribe(x => {
      this.id = x.id;
      this.getEmployee()

    });
  }

  ngOnInit() {
    this.employeeFormGroup = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    });

  }

  getEmployee(){
    if (this.id !== null && this.id !== undefined) {
      this.restApi.getEmployee(this.id).subscribe(data => {
        this.editEmployee(data);
      });
    }
  }

  addEmployee() {
    this.employee['name'] = this.employeeFormGroup.value.name;
    this.employee['email'] = this.employeeFormGroup.value.email;
    this.employee['phone'] = this.employeeFormGroup.value.phone;

    if (this.id !== null && this.id !== undefined) {
      this.restApi.updateEmployee(this.id, this.employee).subscribe(data => {
        this.router.navigate(['/create']);
      });
    } else {
      this.restApi.createEmployee(this.employee).subscribe(data => {
        this.refresh();
      });
    }
  }

  editEmployee(employee: Employee) {
    this.employeeFormGroup.patchValue({
      name: employee.name,
      email: employee.email,
      phone: employee.phone
    });
  }

  refresh(): void {
    this.router.navigateByUrl("/list", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
