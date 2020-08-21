import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commonSearch'
})
export class CommonSearchPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (value) {
      return value.filter(el => {
        if (args?.length > 0) {
          args = args.toLowerCase();
          return el.NormalizeName.toLowerCase().includes(args);
        }
        else { return el; }
      });
    } else {
      return value;
    }
  }

}
