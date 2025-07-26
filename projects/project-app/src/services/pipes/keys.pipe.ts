import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(value: any): string[] {
    if (!value) return [];

    // Get the keys (property names) of the object
    return Object.keys(value);
  }
}

