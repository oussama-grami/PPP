import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Option } from 'src/app/Models/esgOption';
import { Question } from 'src/app/Models/esgQuestion';
import { EsgResult } from 'src/app/Models/esgResult';
import { EsgService } from 'src/app/Service/esg.service';
import { RoutesEnum } from 'src/app/enumerations/Routes.enum';

@Component({
  selector: 'app-esg-assessment',
  templateUrl: './esg-assessment.component.html',
  styleUrls: ['./esg-assessment.component.css'],
  
})
export class EsgAssessmentComponent implements OnInit {
  questions: Question[] = []; 
  currentQuestionIndex: number = 0; 
  question?: Question;  
  options?: Option[] = [];
  choiceSelected: boolean = false;
  warnUser: boolean = false;
  res: EsgResult = {} as EsgResult;
  routesEnum = RoutesEnum;
  selectedOption: Option | null = null; 
  loading: boolean = true;

  constructor(
    private esgService: EsgService,
    private router: Router,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    // Start loading questions asynchronously
    this.esgService.loadQuestions().subscribe((data) => {
      this.questions = data;
      this.route.params.subscribe(params => {
        const questionId = +params['questionId'];
        const index = this.questions.findIndex(q => q.id === questionId);
        if (index >= 0) {
          this.esgService.setCurrentIndex(index);
        }
        this.loadCurrentQuestion();
        this.loading = false;  
      });
    });
  }

  loadCurrentQuestion() {
    this.currentQuestionIndex = this.esgService.getCurrentIndex();
    this.question = this.esgService.getCurrentQuestion();
    this.options = this.question?.options?.map(option => ({
      ...option,
      isSelected: false
    }));
    this.choiceSelected = false;
    this.warnUser = false;
  }
 
  warning() {
    this.warnUser = true;
  }

  onDivClick(selectedOption: Option): void {
    this.options?.forEach((option) => {
      option.isSelected = option === selectedOption;
    });
    this.choiceSelected = true;
    this.selectedOption = selectedOption; 
  }

  addScoreAndNavigate() {
    if (!this.choiceSelected || !this.selectedOption) {
      this.warning();
      return;
    }
  
    const selectedIndex = this.selectedOption.id;
    const questionId = this.question!.id;
  
    const hasNext = this.esgService.next();
    const nextQuestion = this.esgService.getCurrentQuestion();
    if (hasNext && nextQuestion) {
      this.router.navigate([
        `/${this.routesEnum.ESG_ASSESSMENT.replace(':questionId', nextQuestion.id.toString())}`
      ]);
      this.loadCurrentQuestion();
    } else {
      this.esgService.calculateEsg().subscribe((res) => {
        this.res = res;
        this.router.navigate([`/${this.routesEnum.RESULT_ESG}`]);
      });
    }
  
    this.esgService.updateResponse(questionId, selectedIndex).subscribe({
      error: err => console.error('Failed to save response', err)
    });
  }
  
  
  goBack() {
    if (this.esgService.previous()) {
      const prevQuestion = this.esgService.getCurrentQuestion();
      this.router.navigate([
        prevQuestion ? `/${this.routesEnum.ESG_ASSESSMENT.replace(':questionId', prevQuestion.id.toString())}` : `/${this.routesEnum.ESG}`
      ]);
      this.loadCurrentQuestion();
    } else {
      this.router.navigate([`/${this.routesEnum.ESG}`]);
    }
  }
}  