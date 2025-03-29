import {Component, OnInit} from '@angular/core';
import {EsgService} from 'src/app/Service/esg.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {
  SelectedCategory!: string;
  Envi1!: number;
  Envi2!: number;
  Envi3!: number;
  Envi4!: number;
  Envi5!: number;
  GOUV1!: number;
  GOUV2!: number;
  GOUV3!: number;
  GOUV4!: number;
  GOUV5!: number;
  Soc1!: number;
  Soc2!: number;
  Soc3!: number;
  Soc4!: number;
  Soc5!: number;

  constructor(private esgService: EsgService) { }

  ngOnInit() {
    // Get all responses from the service
    const responses = this.esgService.getResponses();

    // Environment scores (questions 1-5)
    this.Envi1 = this.getNormalizedScore(1, responses);
    this.Envi2 = this.getNormalizedScore(2, responses);
    this.Envi3 = this.getNormalizedScore(3, responses);
    this.Envi4 = this.getNormalizedScore(4, responses);
    this.Envi5 = this.getNormalizedScore(5, responses);

    // Social scores (questions 6-10)
    this.Soc1 = this.getNormalizedScore(6, responses);
    this.Soc2 = this.getNormalizedScore(7, responses);
    this.Soc3 = this.getNormalizedScore(8, responses);
    this.Soc4 = this.getNormalizedScore(9, responses);
    this.Soc5 = this.getNormalizedScore(10, responses);

    // Governance scores (questions 11-15)
    this.GOUV1 = this.getNormalizedScore(11, responses);
    this.GOUV2 = this.getNormalizedScore(12, responses);
    this.GOUV3 = this.getNormalizedScore(13, responses);
    this.GOUV4 = this.getNormalizedScore(14, responses);
    this.GOUV5 = this.getNormalizedScore(15, responses);
  }

  private getNormalizedScore(questionId: number, responses: {[id: number]: number}): number {
    const question = this.esgService.getQuestionById(questionId);
    const selectedOptionId = responses[questionId];

    if (selectedOptionId !== undefined) {
      // Normalize score to 1-5 range (since original scores are 0-8 in steps of 2)
      return (question.options[selectedOptionId].score / 2) + 1;
    }
    return 0; // Default score if no response
  }
  printRoadMap() {
    let printContent: HTMLElement | null = null; // Select the content to print

    // Hide any existing warnings
    const warningMessage = document.getElementById('warningMessage');
    if (warningMessage) {
      warningMessage.style.display = 'none';
    }

    // Check if a category has been selected
    switch (this.SelectedCategory) {
      case 'Environment':
        printContent = document.querySelector('.Env') as HTMLElement;
        break;
      case 'Social':
        printContent = document.querySelector('.Soc') as HTMLElement;
        break;
      case 'Governance':
        printContent = document.querySelector('.Gouv') as HTMLElement;
        break;
      default:
        console.error('No category selected');
        // Show a Bootstrap warning message
        if (warningMessage) {
          warningMessage.style.display = 'block';
        }
        return; // Stop further execution if no category is selected
    }

    // If no content is found for the selected category, show a warning
    if (!printContent) {
      console.error('Content not found for the selected category');
      if (warningMessage) {
        warningMessage.style.display = 'block';
        warningMessage.textContent = 'No content available for the selected category.';
      }
      return; // Stop further execution if no content is available
    }

    // If content is found, proceed with printing
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow?.document.write('<html><head><title>Print</title></head><body>');
    printWindow?.document.write(printContent.innerHTML); // Add the selected content
    printWindow?.document.write('</body></html>');
    printWindow?.document.close(); // Close the document to complete the writing

    printWindow?.print();

    printWindow?.close();
  }



  selectCategory(category: string) {
    this.SelectedCategory = category;
    console.log('Selected category:', category);


  }
}
