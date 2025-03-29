import {Injectable} from '@angular/core';
import {Option} from '../Models/esgOptions';
import {Question} from '../Models/esgQuestion';

@Injectable({
  providedIn: 'root'
})
export class EsgService {
  private responses: { [id: number]: number } = {};

  private questions :Question[]= [
    // Environment Questions (1-5)
    {
      id: 1,
      category: 'Environment',
      text: 'Reducing GHG emissions',
      options: this.generateOptions([
        'No policy in place',
        'General objectives but no concrete actions',
        'Partially implemented action plan',
        'Structured action plan with regular monitoring',
        'Certification or validated commitment',
      ]),
    },
    {
      id: 2,
      category: 'Environment',
      text: 'Waste management and recycling',
      options: this.generateOptions([
        'No policy in place',
        'Limited recycling program',
        'Systematic recycling with reporting',
        'Advanced circular approach',
        'Waste management certification',
      ]),
    },
    {
      id: 3,
      category: 'Environment',
      text: 'Development of renewable energy',
      options: this.generateOptions([
        'No use of renewable energy',
        'Less than 20% renewable energy',
        'Between 20% and 50% renewable energy',
        'More than 50% renewable energy',
        '100% renewable and carbon neutral',
      ]),
    },
    {
      id: 4,
      category: 'Environment',
      text: 'Water management',
      options: this.generateOptions([
        'No water consumption tracking',
        'Tracking but no reduction measures',
        'Water-saving measures in place',
        'Water recycling and reuse',
        'Water management certification',
      ]),
    },
    {
      id: 5,
      category: 'Environment',
      text: 'Biodiversity and environment',
      options: this.generateOptions([
        'No specific actions',
        'Limited measures to protect biodiversity',
        'Active program with monitoring',
        'Direct contribution to environmental preservation',
        'Biodiversity certification',
      ]),
    },

    // Social Questions (6-10)
    {
      id: 6,
      category: 'Social',
      text: 'Diversity and inclusion',
      options: this.generateOptions([
        'No policy',
        'Written policy but not applied',
        'Active program with training',
        'Concrete inclusion measures with monitoring',
        'Certifications and official recognition',
      ]),
    },
    {
      id: 7,
      category: 'Social',
      text: 'Health and safety at work',
      options: this.generateOptions([
        'No policy in place',
        'Basic measures but not formalized',
        'Structured program with regular audits',
        'Advanced tracking and continuous improvement',
        'Safety certification',
      ]),
    },
    {
      id: 8,
      category: 'Social',
      text: 'Employee well-being',
      options: this.generateOptions([
        'No specific measures',
        'Some benefits but limited',
        'Active well-being programs',
        'Strong engagement with employee satisfaction',
        'Certification or quality of work life label',
      ]),
    },
    {
      id: 9,
      category: 'Social',
      text: 'Policies on working conditions',
      options: this.generateOptions([
        'No specific internal regulation',
        'General policies without control',
        'Strict regulation with monitoring',
        'Regular audits and certifications',
        'International standards followed',
      ]),
    },
    {
      id: 10,
      category: 'Social',
      text: 'Engagement with local communities',
      options: this.generateOptions([
        'No engagement',
        'Occasional support actions',
        'Social investment program',
        'Active partnerships with associations',
        'Formalized engagement with monitoring',
      ]),
    },

    // Governance Questions (11-15)
    {
      id: 11,
      category: 'Governance',
      text: 'Governance policies',
      options: this.generateOptions([
        'No clear governance policy',
        'Policy exists but not applied',
        'Formalized and followed policy',
        'Advanced best practices',
        'Corporate governance certification',
      ]),
    },
    {
      id: 12,
      category: 'Governance',
      text: 'Transparency and integrity of the company',
      options: this.generateOptions([
        'No transparency policy',
        'Limited transparency',
        'Regular communication and internal audits',
        'Full transparency and external reporting',
        'Ethics and transparency certification',
      ]),
    },
    {
      id: 13,
      category: 'Governance',
      text: 'Conflicts of interest and responsible management',
      options: this.generateOptions([
        'No conflict of interest management framework',
        'Management policy but not applied',
        'Structured process with monitoring',
        'Proactive management and strict controls',
        'Certification and external audits',
      ]),
    },
    {
      id: 14,
      category: 'Governance',
      text: 'Ethics and business responsibility',
      options: this.generateOptions([
        'No ethics framework in place',
        'Formal policy but no follow-up',
        'Regular follow-up with employee training',
        'Certification and ethical recognition',
        'Strong CSR commitment',
      ]),
    },
    {
      id: 15,
      category: 'Governance',
      text: 'Stakeholder involvement',
      options: this.generateOptions([
        'No interaction with stakeholders',
        'Limited stakeholder consultation',
        'Regular engagement and structured dialogue',
        'Co-creation of decisions with stakeholders',
        'Certification or label for stakeholder involvement',
      ]),
    },
  ];


  private generateOptions(texts: string[]): Option[] {
    return texts.map((text, index) => ({
      text: `${text} (${index * 2} points)`,
      isSelected: false,
      score: index * 2
    }));
  }

 getQuestionById(id: number): Question {
    return this.questions.find(q => q.id === id)!;
  }
  getQuestionsByCategory(category: string): Question[] {
    return this.questions.filter(q => q.category === category);
  }

  updateResponse(questionId: number, selectedOptionId: number): void {
    this.responses[questionId] = selectedOptionId;  // Store the option ID
  }

  getResponses(): {[id: number]: number} {
    return this.responses;
  }
  calculateEsg(): any {
    const categories = ['Environment', 'Social', 'Governance'] as const;
    const results: any = {};

    categories.forEach(category => {
      const questions = this.getQuestionsByCategory(category);
      results[category] = questions.reduce((sum, q) => {
        const selectedOptionId = this.responses[q.id];
        if (selectedOptionId !== undefined) {
          sum += q.options[selectedOptionId].score;  // Add the score based on the
        }
        return sum;
      }, 0);
    });

    results.total = Math.round((results.Environment + results.Social + results.Governance) / 3);
    return results;
  }
}
