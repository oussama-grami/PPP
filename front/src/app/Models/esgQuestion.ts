import {Option} from "./esgOptions";

export interface Question {
  id: number;
  category: 'Environment' | 'Social' | 'Governance';
  text: string;
  options: Option[];
}
