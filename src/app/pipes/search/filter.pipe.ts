import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (value) {
      return value.filter(el => {
        if (args?.length > 0) {
          args = args.toLowerCase();
          return el.FirstName.toLowerCase().includes(args);
        }
        else { return el; }
      });
    } else {
      return value;
    }
  }
}


