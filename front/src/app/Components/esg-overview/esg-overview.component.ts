import { Component, OnInit } from '@angular/core';
import { EsgService } from 'src/app/Service/esg.service';
interface EsgCategory {
  name: string;
  score: number;
  color: string;
  levels: {
    range: [number, number];
    title: string;
    description: string;
    color: string;
  }[];
}

@Component({
  selector: 'app-esg-overview',
  templateUrl: './esg-overview.component.html',
  styleUrls: ['./esg-overview.component.css']
})
export class EsgOverviewComponent implements OnInit {
  categories: EsgCategory[] = [
    {
      name: 'Environment',
      score: 0, // Example score
      color: '#014131',
      levels: [
        { range: [0, 10], title: 'Regulatory compliance', color: '#7AB68F', 
          description: 'Regulatory Compliance: You adhere to applicable environmental regulations, ensuring compliance with standards and laws without exceeding minimum requirements.',
        },
        { range: [11, 20], title: 'Risk management', color: '#00E096',
          description: 'Risk Management: Your company takes a proactive stance in managing environmental risks, implementing mitigation and prevention measures.',
        },
        { range: [21, 30], title: 'Environmental performance', color: '#0BB783',
          description: 'Environmental Performance: You demonstrate commitment by reducing your ecological footprint, optimizing resource utilization, and embracing sustainable practices.',
        },
        { range: [31, 40], title: 'Environmental leadership', color: '#014131',
          description: 'Environmental Leadership: Your company integrates sustainability into its strategy, champions innovation, and forges partnerships to drive a greener economy.',
        }
      ]
    },
    {
      name: 'Social',
      score: 0, // Example score
      color: '#76B82A',
      levels: [
        { range: [0, 10], title: 'Social Regulatory Compliance', color: '#7AB68F',
          description: 'Social Regulatory Compliance: You focus on adhering to applicable social regulations, ensuring compliance with labor laws and safety standards.',
        },
        { range: [11, 20], title: 'Social Risk Management', color: '#00E096',
          description: 'Social Risk Management: Your company actively manages social risks by assessing impacts on employees, communities, and stakeholders.',
        },
        { range: [21, 30], title: 'Responsible social practices', color: '#0BB783',
          description: 'Responsible Social Practices: You implement responsible social practices that positively impact employees and communities.',
        },
        { range: [31, 40], title: 'Social leadership', color: '#014131',
          description: 'Social Leadership: You incorporate the social dimension into your strategy and work to generate a positive societal impact.',
        }
      ]
    },
    {
      name: 'Governance',
      score: 0, // Example score
      color: '#7AB68F',
      levels: [
        { range: [0, 10], title: 'Core governance', color: '#7AB68F',
          description: 'Basic Governance: Your company establishes fundamental governance structures with clear management and decision-making processes.',
        },
        { range: [11, 20], title: 'Good governance practices', color: '#00E096',
          description: 'Advanced Governance Practices: You adopt governance practices that exceed minimum requirements with robust oversight mechanisms.',
        },
        { range: [21, 30], title: 'Proactive governance', color: '#0BB783',
          description: 'Proactive Governance: You take a forward-thinking approach by integrating ESG considerations into your overall governance strategy.',
        },
        { range: [31, 40], title: 'Governance Leadership', color: '#014131',
          description: 'Leadership in Governance: Your company distinguishes itself through strategic vision and innovative governance practices.',
        }
      ]
    }
  ];

  constructor(private esgService:EsgService) {}

  ngOnInit(): void {
    
    const scores = this.esgService.calculateEsg().subscribe((scores) => {
      this.categories[0].score = scores.environment;
    this.categories[1].score = scores.social;
    this.categories[2].score = scores.governance;})
    console.log("hello",this.categories);

  }

  getActiveLevel(category: EsgCategory) {
    return category.levels.find(level => 
      this.isInScoreRange(category.score, level.range[0], level.range[1])
    );
  }

  isInScoreRange(score: number, min: number, max: number): boolean {
    return score >= min && score <= max;
  }

  getSliderPosition(score: number): string {
    const percentage = Math.min(Math.max(score, 0), 40) / 40 * 100;
    return `calc(${percentage}% - 9px)`; // Adjust for indicator width
  }
}