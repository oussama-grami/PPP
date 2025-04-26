import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDescription'
})
export class FormatDescriptionPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const sentences = value.split(/(?<=\.)\s+(?=[A-Z])/g);
    const icon = '🌱';
    return sentences
      .map(sentence => `<p style="margin: 0 0 12px 0; line-height: 1.8; font-size: 16px;">${icon} ${sentence.trim()}</p>`)
      .join('');
  }
}
