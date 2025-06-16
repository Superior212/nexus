"use client";

import { useExpenseStore } from "@/stores/expense-store";
import { useMemo } from "react";

export function useExpenses() {
  const expenses = useExpenseStore((state) => state.expenses);
  const addExpense = useExpenseStore((state) => state.addExpense);
  const updateExpenseStatus = useExpenseStore(
    (state) => state.updateExpenseStatus
  );
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const getSummary = useExpenseStore((state) => state.getSummary);

  const summary = useMemo(() => getSummary(), [expenses, getSummary]);

  return {
    expenses,
    addExpense,
    updateExpenseStatus,
    deleteExpense,
    summary,
  };
}

// Alternative: Direct store access hooks for better performance
export const useExpensesData = () => useExpenseStore((state) => state.expenses);
export const useExpenseActions = () =>
  useExpenseStore((state) => ({
    addExpense: state.addExpense,
    updateExpenseStatus: state.updateExpenseStatus,
    deleteExpense: state.deleteExpense,
  }));
export const useExpenseSummary = () =>
  useExpenseStore((state) => state.getSummary());
export const useFilteredExpenses = (
  searchTerm: string,
  categoryFilter: string,
  statusFilter: string
) =>
  useExpenseStore((state) =>
    state.getFilteredExpenses(searchTerm, categoryFilter, statusFilter)
  );
