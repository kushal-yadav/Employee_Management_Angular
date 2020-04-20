import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  Employee: any = [];
  searchData: any;
  searchOption: any;

  headers = [
    { key: 'id', isAsc: false, isSelected: false, isActive: false },
    { key: 'name', isAsc: false, isSelected: false, isActive: false },
    { key: 'email', isAsc: false, isSelected: false, isActive: false },
    { key: 'phone', isAsc: false, isSelected: false, isActive: false },
  ]

  constructor(
    public restApi: RestApiService,
    public router: Router,
    public location: Location
  ) { }

  ngOnInit() {
    this.loadEmployees();
    this.searchOption = "none";
  }

  loadEmployees() {
    return this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
    });
  }

  deleteEmployee(id: number) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteEmployee(id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }

  editEmployee(employeeId) {
    this.router.navigate(['/edit', employeeId]);
  }

  sortData(keyPassed: string | number) {
    let previousSortHeader = this.headers.find(x => x.isActive === true);
    if (previousSortHeader !== null && previousSortHeader !== undefined) {
      previousSortHeader.isActive = false;
    }

    let currentSortHeader = this.headers.find(x => x.key == keyPassed);
    this.Employee.sort((a, b) => {
      return this.compare(a[keyPassed], b[keyPassed], currentSortHeader.isAsc);
    });

    currentSortHeader.isAsc = !currentSortHeader.isAsc;
    currentSortHeader.isActive = true;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a === 'string' && typeof b === 'string') {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  refresh(): void {
    this.router.navigateByUrl("/list", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

  selectedSearchOption(keyPassed: string | number) {
    let previousOption = this.headers.find(x => x.isSelected === true);
    if (previousOption !== null && previousOption !== undefined) {
      previousOption.isSelected = false;
    }

    let currentOption = this.headers.find(x => x.key === keyPassed);
    currentOption.isSelected = true;
  }
}
