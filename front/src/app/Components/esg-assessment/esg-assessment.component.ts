import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Option} from 'src/app/Models/esgOptions';
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
  choiceSelected = false;
  warnUser = false;
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
    this.question = this.esgService.getQuestionById(this.currentQuestion);
    this.options = this.question?.options;
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
    this.esgService.updateResponse(this.currentQuestion, this.options!.findIndex((option) => option.isSelected));
    if (this.currentQuestion == 15) {
      this.res= this.esgService.calculateEsg();
      console.log(this.res);
      this.router.navigate(['/esg-result']);
      return;
    }
    this.router.navigate(['/esg-assessment', this.currentQuestion + 1]);
  }
}
