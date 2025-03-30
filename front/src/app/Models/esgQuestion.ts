import {Option} from "./esgOption";

export interface Question {
  id: number;
  category: 'Environment' | 'Social' | 'Governance';
  text: string;
  options: Option[];
}
