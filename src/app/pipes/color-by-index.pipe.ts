import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorByIndex',
  standalone: true,
})
export class ColorByIndexPipe implements PipeTransform {
  transform(index: number, lastCorrectIndex: number, length: number): string {
    let classColor: string = '';

    if (index < lastCorrectIndex) classColor = 'green';
    else if (index === lastCorrectIndex) {
      if (length > lastCorrectIndex) classColor = 'red';
      else classColor = 'blue';
    } else if (
      length > lastCorrectIndex &&
      index > lastCorrectIndex &&
      index < length
    )
      classColor = 'red';

    return classColor;
  }
}

// @if (idx < lastCorrectCharacterIndex) {
// <span class="green">{{ character }}</span>
// } @else if (idx == lastCorrectCharacterIndex) { @if (input.value.length >
// lastCorrectCharacterIndex) {
// <span class="red">{{ character }}</span>
// } @else {
// <span class="blue">{{ character }}</span>
// } } @else { @if(input.value.length > lastCorrectCharacterIndex && idx >
// lastCorrectCharacterIndex && idx < input.value.length) {
// <span class="red">{{ character }}</span>
// } @else {
// <span>{{ character }}</span>
// } }
