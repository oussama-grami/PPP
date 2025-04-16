import {Option} from "./esgOption";

export interface Question {
  id: number;
  text: string;
  category: 'Environment' | 'Social' | 'Governance';
  options: Option[];
}
