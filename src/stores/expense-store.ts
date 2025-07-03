import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Expense, ExpenseSummary } from "@/types/expense";

interface ExpenseState {
  expenses: Expense[];
  isHydrated: boolean;
  // Actions
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpenseStatus: (id: string, status: Expense["status"]) => void;
  deleteExpense: (id: string) => void;
  setHydrated: () => void;
  // Computed values
  getSummary: () => ExpenseSummary;
  getFilteredExpenses: (
    searchTerm: string,
    categoryFilter: string,
    statusFilter: string
  ) => Expense[];
}

const initialExpenses: Expense[] = [
  {
    id: "1",
    amount: 125.5,
    category: "Travel",
    description: "Taxi to client meeting",
    date: "2024-01-15",
    employee: "John Smith",
    status: "approved",
  },
  {
    id: "2",
    amount: 45.0,
    category: "Meals & Entertainment",
    description: "Team lunch",
    date: "2024-01-14",
    employee: "Sarah Johnson",
    status: "pending",
  },
  {
    id: "3",
    amount: 89.99,
    category: "Office Supplies",
    description: "Printer paper and ink",
    date: "2024-01-13",
    employee: "Mike Davis",
    status: "rejected",
  },
];

export const useExpenseStore = create<ExpenseState>()(
  devtools(
    persist(
      (set, get) => ({
        expenses: initialExpenses,
        isHydrated: false,

        setHydrated: () => {
          set({ isHydrated: true });
        },

        addExpense: (expenseData) => {
          const newExpense: Expense = {
            ...expenseData,
            id: Date.now().toString(),
          };
          set(
            (state) => ({
              expenses: [newExpense, ...state.expenses],
            }),
            false,
            "addExpense"
          );
        },

        updateExpenseStatus: (id, status) => {
          set(
            (state) => ({
              expenses: state.expenses.map((expense) =>
                expense.id === id ? { ...expense, status } : expense
              ),
            }),
            false,
            "updateExpenseStatus"
          );
        },

        deleteExpense: (id) => {
          set(
            (state) => ({
              expenses: state.expenses.filter((expense) => expense.id !== id),
            }),
            false,
            "deleteExpense"
          );
        },

        getSummary: () => {
          const { expenses } = get();
          const total = expenses.reduce(
            (sum, expense) => sum + expense.amount,
            0
          );
          const pending = expenses
            .filter((e) => e.status === "pending")
            .reduce((sum, e) => sum + e.amount, 0);
          const approved = expenses
            .filter((e) => e.status === "approved")
            .reduce((sum, e) => sum + e.amount, 0);
          const rejected = expenses
            .filter((e) => e.status === "rejected")
            .reduce((sum, e) => sum + e.amount, 0);

          const byCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] =
              (acc[expense.category] || 0) + expense.amount;
            return acc;
          }, {} as Record<string, number>);

          return { total, pending, approved, rejected, byCategory };
        },

        getFilteredExpenses: (searchTerm, categoryFilter, statusFilter) => {
          const { expenses } = get();
          return expenses.filter((expense) => {
            const matchesSearch =
              expense.employee
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              expense.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              expense.category.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
              categoryFilter === "all" || expense.category === categoryFilter;
            const matchesStatus =
              statusFilter === "all" || expense.status === statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
          });
        },
      }),
      {
        name: "expense-storage",
        partialize: (state) => ({ expenses: state.expenses }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.setHydrated();
          }
        },
      }
    ),
    {
      name: "expense-store",
    }
  )
);
