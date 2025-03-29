import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalPages: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  get pages(): number[] {
    const visiblePages = 5; // Nombre de pages visibles avant et après l'actuelle
    const pages: number[] = [];

    if (this.totalPages <= visiblePages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.totalPages, this.currentPage + 2);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push(-1); // -1 représente "..."

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.totalPages - 1) pages.push(-1); // -1 représente "..."
    if (end < this.totalPages) pages.push(this.totalPages);

    return pages;
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
