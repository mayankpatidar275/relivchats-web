export interface User {
  user_id: string; // Changed from 'id' to 'user_id'
  email?: string; // Made optional as per your backend schema
  first_name?: string; // Made optional
  last_name?: string; // Made optional
}

export interface UserOut {
  user_id: string;
  email?: string;
  created_at?: string;
  credit_balance: number;
}
