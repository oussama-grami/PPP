import {Component} from '@angular/core';
import {FileDownloadService} from "../../Service/file-download-service.service";
import {environment} from 'src/environments/environment'


@Component({
  selector: 'app-carbon-co-benifits-blog',
  templateUrl: './carbon-co-benifits-blog.component.html',
  styleUrls: ['./carbon-co-benifits-blog.component.css']
})
export class CarbonCoBenifitsBlogComponent {
  copyUrl :string  = environment.websiteUrl+"assets/blogs/Co.pdf";
  constructor(private fileDownloadService :FileDownloadService) {
  }
  copyText(){
    navigator.clipboard.writeText(this.copyUrl);
  }
  printPage(){
    window.print()
  }
  share(platform:string) {
    let url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
  saveDocument() {
    const url = window.location.href;
    const title = document.title;
    alert(`To add this page to your bookmarks, press Ctrl+D (Windows) or Cmd+D (Mac)`);
  }

  downloadDocument() {
    const url = 'blogs/Co.pdf';
    const filename = 'Co-benifits.pdf';
    this.fileDownloadService.downloadFile(url, filename);
  }

}
