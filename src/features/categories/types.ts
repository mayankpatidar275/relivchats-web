export interface InsightType {
  id: string;
  name: string;
  display_title: string;
  description?: string;
  icon?: string;
  is_premium: boolean;
  credit_cost: number;
}

export interface Category {
  id: string;
  name: string; // slug
  display_name: string;
  description?: string;
  icon?: string;
  insight_types: InsightType[];
  insights_count: number;
  base_cost: number;
}
