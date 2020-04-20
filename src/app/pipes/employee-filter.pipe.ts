import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../shared/employee';

@Pipe({
  name: 'employeeFilter'
})

export class EmployeeFilterPipe implements PipeTransform {
  transform(employees: any, searchData: any, headers: any) {
    if (!employees || !searchData || !headers) {
      return employees;
    }

    let filterKey = headers.find(x => x.isSelected === true);
    if (filterKey !== null && filterKey !== undefined) {
      return employees.filter(x =>
        x[filterKey.key].toLowerCase().indexOf(searchData.toLowerCase()) !== -1

      );
    }

    return employees.filter(employee => {
      let isFound = false;
      for (let key in employee) {
        if (typeof (employee[key]) === 'string') {
          isFound = employee[key].toLowerCase().indexOf(searchData.toLowerCase()) !== -1;
          if (isFound) break;
        } else {
          isFound = employee[key].toString().indexOf(searchData.toLowerCase()) !== -1;
          if (isFound) break;
        }
      }
      return isFound;
    });
  }
}