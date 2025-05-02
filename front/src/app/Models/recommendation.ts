export interface RecommendationResponse {
  status: string;
  recommendations: Recommendation[];
}

export interface Recommendation {
  parameter: string;
  objective: string;
  advice: string;
}
