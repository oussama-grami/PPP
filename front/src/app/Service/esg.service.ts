import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Option } from '../Models/esgOption';
import { Question } from '../Models/esgQuestion';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EsgResult } from '../Models/esgResult';
import { EsgResponse } from '../Models/esgResponse';

@Injectable({
  providedIn: 'root',
})
export class EsgService {
  private apiUrl = 'http://localhost:8080/esg';
  private responses: { [id: number]: number } = {};
  private questions: Question[] = [];
  private currentIndex=0;
  constructor(private http: HttpClient) {
   
  }
  loadQuestions(): Observable<Question[]> {
    console.log('Loading questions...');
    this.currentIndex = 0; 
    return new Observable((observer) => {
      if (this.questions.length > 0) {
        observer.next(this.questions);
        observer.complete();
        return;
      }
      this.http.get<Question[]>(`${this.apiUrl}/questions`).subscribe((data) => {
        this.questions = data.map((question) => {
          question.options = question.options.map((option) => ({
            ...option,
            isSelected: false,
          }));
          return question;
        });
        this.currentIndex = 0;
        observer.next(this.questions);
        observer.complete();
      });
    });}

   

    getQuestions(): Question[] {
      return this.questions;
    }
  
    // Return current question
    getCurrentQuestion(): Question | undefined {
      return this.questions[this.currentIndex];
    }
  
    // Navigation
    nextQuestion(): void {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
    }
  
    previousQuestion(): void {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
  
    getCurrentIndex(): number {
      return this.currentIndex;
    }
  
    setCurrentIndex(index: number): void {
      this.currentIndex = index;
    }
  
    isLastQuestion(): boolean {
      return this.currentIndex === this.questions.length - 1;
    }
  
    isFirstQuestion(): boolean {
      return this.currentIndex === 0;
    }

  getQuestionsByCategory(category: string): Observable<Question[]> {
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }
  
    return this.http.get<Question[]>(`${this.apiUrl}/questions`, { params });
  }
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }
  

  updateResponse(questionId: number, selectedOptionId: number): Observable<void> {
    const body = {
      questionId: questionId,
      optionId: selectedOptionId
    };
    return this.http.post<void>(`${this.apiUrl}/responses`, body);
  }
  
  getResponses(): Observable<Array<EsgResponse>> {
    const params = new HttpParams().set('companyId', (7).toString());
    return this.http.get<Array<EsgResponse>>(`${this.apiUrl}/responses`, { params });
  }
  calculateEsg(): Observable<EsgResult> {
    const params = new HttpParams().set('companyId', (7).toString());
    return this.http.get<EsgResult>(`${this.apiUrl}/calculate`, { params });
  }

  previous(): boolean {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return true;
    }
    return false;
  }
  next(): boolean {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }
}
