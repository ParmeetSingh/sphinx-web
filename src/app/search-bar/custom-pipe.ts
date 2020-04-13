import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'posPipe'})
export class PosPipe implements PipeTransform {
  transform(value: string): string {
    if(value==='n'){
        return 'Noun';
    }else if(value==='adv'){
        return 'Adverb';
    }else if(value==='adj'){
        return 'Adjective';
    }else{
        return 'Verb';
    }

  }
}