import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FileDownloadService } from '../../Service/file-download-service.service';

@Component({
  selector: 'app-marketplace-blog',
  templateUrl: './marketplace-blog.component.html',
  styleUrls: ['./marketplace-blog.component.css'],
})
export class MarketplaceBlogComponent {
  copyUrl: string = environment.websiteUrl + 'assets/blogs/Marketplace.pdf';
  constructor(private fileDownloadService: FileDownloadService) {}
  copyText() {
    navigator.clipboard.writeText(this.copyUrl);
  }
  printPage(): void {
    // Add print-specific class to body for additional styling if needed
    document.body.classList.add('printing');

    // Small delay to ensure styles are applied
    setTimeout(() => {
      window.print();

      // Remove the class after printing
      setTimeout(() => {
        document.body.classList.remove('printing');
      }, 1000);
    }, 100);
  }
  share(platform: string) {
    let url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
  saveDocument(): void {
    // Implement save functionality
    this.printPage();
  }

  downloadDocument(): void {
    // Create a clean version for download
    const printWindow = window.open('', '_blank');
    const cleanContent = this.generateCleanContent();

    if (printWindow) {
      printWindow.document.write(cleanContent);
      printWindow.document.close();

      // Trigger print dialog in new window
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  }

  private generateCleanContent(): string {
    const blogTitle =
      document.querySelector('.blog-title')?.textContent ||
      'Carbon Voluntary Markets';
    const blogContent = document.querySelectorAll(
      '.blog-content, .blog-header'
    );

    let contentHtml = '';
    blogContent.forEach((element) => {
      if (element.classList.contains('blog-header')) {
        contentHtml += `<h2 style="font-size: 16pt; font-weight: bold; margin: 1.5rem 0 0.5rem 0; color: black; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem;">${element.textContent}</h2>`;
      } else {
        contentHtml += `<div style="font-size: 11pt; line-height: 1.6; text-align: justify; color: black; margin-bottom: 1rem;">${element.innerHTML}</div>`;
      }
    });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${blogTitle}</title>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.5;
            color: black;
            margin: 2cm;
            padding: 0;
            background: white;
          }
          h1 {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
          }
          h2 {
            font-size: 16pt;
            font-weight: bold;
            margin: 1.5rem 0 0.5rem 0;
            border-bottom: 1px solid #ccc;
            padding-bottom: 0.25rem;
          }
          p, div {
            margin-bottom: 1rem;
            text-align: justify;
          }
          @media print {
            body { margin: 1cm; }
            h2 { page-break-after: avoid; }
            div { orphans: 3; widows: 3; }
          }
        </style>
      </head>
      <body>
        <h1>${blogTitle}</h1>
        ${contentHtml}
      </body>
      </html>
    `;
  }
}
