import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut',
})
export class TextCutPipe implements PipeTransform {
  transform(value: string, maxWords: number = 20): string {
    // Check if the value is not null or undefined
    if (!value) {
      return '';
    }

    // Split the value into words
    const words = value.split(' ');

    // If the number of words is less than or equal to maxWords, return the original value
    if (words.length <= maxWords) {
      return value;
    }

    // Otherwise, slice the array to get the first maxWords words and join them with a space
    // Then add "..." at the end
    return words.slice(0, maxWords).join(' ') + '...';
  }
}
