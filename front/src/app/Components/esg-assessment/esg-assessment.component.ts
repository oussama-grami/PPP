import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Option} from 'src/app/Models/esgOption';
import {Question} from 'src/app/Models/esgQuestion';
import {EsgService} from 'src/app/Service/esg.service';

@Component({
  selector: 'app-esg-assessment',
  templateUrl: './esg-assessment.component.html',
  styleUrls: ['./esg-assessment.component.css']
})
export class EsgAssessmentComponent implements OnInit {
  @Input() currentQuestion: number = 1;
  question?: Question;
  options?: Option[] = [];
  choiceSelected :boolean= false;
  warnUser :boolean = false;
  res=0;

  constructor(
    private esgService: EsgService,
    private router: Router,
    private route: ActivatedRoute // Injected ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentQuestion = +params['questionId'] || 1; // Extract current question from route
      this.loadQuestion();
    });

  }
  loadQuestion() {
    this.esgService.getQuestionById(this.currentQuestion).subscribe((question) => {
      this.question = question;
      this.options = this.question?.options || [];  // Ensure options is always an array
      this.choiceSelected = false;  // Reset selection state
      this.warnUser = false;  // Reset warning state
    });
  }

  warning() {
    this.warnUser = true;
  }

  onDivClick(selectedOption: Option): void {
    this.options?.forEach((option) => {
      option.isSelected = option === selectedOption;
    });
    this.choiceSelected = true;
  }

  addScoreAndNavigate() {
    if (!this.choiceSelected) {
      this.warning();
      return;
    }
  
    // Update response and then proceed with navigation
    this.esgService.updateResponse(this.currentQuestion, this.options!.findIndex((option) => option.isSelected))
      .subscribe(() => {
        if (this.currentQuestion === 15) {
          // Calculate ESG after the last question
          this.esgService.calculateEsg().subscribe((res) => {
            this.res = res;
            console.log(this.res);
            this.router.navigate(['/esg-result']);
          });
        } else {
          // Navigate to the next question
          this.router.navigate(['/esg-assessment', this.currentQuestion + 1]);
        }
      });
  }
  
  goBack() {
    if (this.currentQuestion > 1) {
      this.router.navigate(['/esg-assessment', this.currentQuestion - 1]);
    } else {
      this.router.navigate(['/esg']); 
    }
  }
  
}
