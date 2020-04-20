import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitador'
})
export class LimitadorPipe implements PipeTransform {

  transform(value:any, limite:any) : string{
    let limit = parseInt(limite);
    return value.length > limit ? value.substring(0,limit)+"..." :   value;
  }

}
