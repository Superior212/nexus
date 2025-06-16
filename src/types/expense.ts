export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  employee: string;
  status: "pending" | "approved" | "rejected";
}

export interface ExpenseSummary {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byCategory: Record<string, number>;
}
