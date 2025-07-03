"use client";

import { useEffect, useState, useMemo } from "react";
import { useExpenseStore } from "@/stores/expense-store";

export function useExpenses() {
  const [isClient, setIsClient] = useState(false);

  // Always call these hooks in the same order
  const isHydrated = useExpenseStore((state) => state.isHydrated);
  const expenses = useExpenseStore((state) => state.expenses);
  const addExpense = useExpenseStore((state) => state.addExpense);
  const updateExpenseStatus = useExpenseStore(
    (state) => state.updateExpenseStatus
  );
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const getSummary = useExpenseStore((state) => state.getSummary);
  const getFilteredExpenses = useExpenseStore(
    (state) => state.getFilteredExpenses
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Compute summary only when hydrated
  const summary = useMemo(() => {
    if (!isClient || !isHydrated) {
      return {
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        byCategory: {},
      };
    }
    return getSummary();
  }, [isClient, isHydrated, getSummary]);

  // Return appropriate values based on hydration state
  if (!isClient || !isHydrated) {
    return {
      expenses: [],
      summary,
      filteredExpenses: [],
      addExpense: () => {},
      updateExpenseStatus: () => {},
      deleteExpense: () => {},
      getFilteredExpenses: () => [],
    };
  }

  return {
    expenses,
    summary,
    filteredExpenses: getFilteredExpenses("", "all", "all"),
    addExpense,
    updateExpenseStatus,
    deleteExpense,
    getFilteredExpenses,
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
