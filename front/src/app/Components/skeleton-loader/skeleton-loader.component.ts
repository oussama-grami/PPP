import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.css']
})
export class SkeletonLoaderComponent {
  @Input() type: 'text' | 'card' | 'image' | 'avatar' | 'paragraph' = 'text';
  @Input() lines: number = 1;
  @Input() width: string = '100%';
  @Input() height: string = '';
  @Input() margin: string = '0';
  
  get dimensions() {
    return {
      width: this.width,
      height: this.getHeight(),
      margin: this.margin
    };
  }
  
  getHeight(): string {
    if (this.height) {
      return this.height;
    }
    
    switch (this.type) {
      case 'text':
        return '1rem';
      case 'card':
        return '200px';
      case 'image':
        return '200px';
      case 'avatar':
        return '50px';
      case 'paragraph':
        return `${this.lines * 1.2}rem`;
      default:
        return '1rem';
    }
  }
  
  getItems(): number[] {
    return Array(this.lines).fill(0).map((x, i) => i);
  }
}