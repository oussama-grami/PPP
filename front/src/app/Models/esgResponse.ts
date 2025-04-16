export interface EsgResponse {
    category: string;
    responses: {
      questionText: string;
      optionText: string;
      score: number;
    }[];
}