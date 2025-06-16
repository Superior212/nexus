"use client";

import { useState } from "react";
import { ExpenseFormModal } from "@/components/modals/expense-form-modal";
import { ExpenseSummaryCards } from "@/components/cards/expense-summary";
import { ExpenseFilters } from "@/components/expense-filters";
import { ExpenseTable } from "@/components/tables/expense-table";
import { ExportButtons } from "@/components/export-buttons";
import { useExpenseStore } from "@/stores/expense-store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";

export default function ExpensesTracker() {
  // Use Zustand store directly for better performance
  const addExpense = useExpenseStore((state) => state.addExpense);
  const updateExpenseStatus = useExpenseStore(
    (state) => state.updateExpenseStatus
  );
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);
  const getSummary = useExpenseStore((state) => state.getSummary);
  const getFilteredExpenses = useExpenseStore(
    (state) => state.getFilteredExpenses
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get computed values
  const summary = getSummary();
  const filteredExpenses = getFilteredExpenses(
    searchTerm,
    categoryFilter,
    statusFilter
  );

  return (
    <div className="flex flex-col min-h-screen  dark:bg-brand-dark light:bg-brand-light">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border  dark:bg-brand-dark light:bg-brand-white shadow-sm px-6">
        <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-brand-primary" />
          <h1 className="text-xl font-semibold dark:text-brand-light light:text-brand-dark">
            Expenses
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ExportButtons expenses={filteredExpenses} summary={summary} />
          <ExpenseFormModal onAddExpense={addExpense} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <ExpenseSummaryCards summary={summary} />

        <div className="space-y-4">
          <ExpenseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          <ExpenseTable
            expenses={filteredExpenses}
            onUpdateStatus={updateExpenseStatus}
            onDeleteExpense={deleteExpense}
          />
        </div>
      </div>
    </div>
  );
}
