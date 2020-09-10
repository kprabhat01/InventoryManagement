import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movementSearch'
})
export class MovementSearchPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (value) {
      return value.filter(el => {
        if (args?.length > 0) {
          args = args.toLowerCase();
          return el.normalizeName.toLowerCase().includes(args) || el.item.toLowerCase().includes(args);
        }
        else { return el; }
      });
    } else {
      return value;
    }
  }

}
